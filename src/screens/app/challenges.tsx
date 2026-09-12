import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuth, hasPermission } from "@/auth/auth-context";
import { employeeApi } from "@/api/services";
import { ApiError } from "@/api/errors";
import { Screen, QueryState, FormError } from "@/components/screen";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";
import { EmptyState } from "@/components/ui/states";
import { formatDate, titleCase } from "@/lib/utils";

export function ChallengeDetailScreen() {
  const { challengeId="" } = useParams(); const { user } = useAuth(); const client = useQueryClient(); const [value,setValue] = useState("");
  const query = useQuery({ queryKey:["challenges",user?.organizationId,challengeId], queryFn:()=>employeeApi.challenge(user!.organizationId,challengeId) });
  const progress = useQuery({ queryKey:["challenge-progress",user?.id,challengeId], queryFn:async()=>{try{return await employeeApi.challengeProgress(user!.organizationId,challengeId);}catch(e){if(e instanceof ApiError && e.status===404)return null;throw e;}} });
  const refresh = () => {void client.invalidateQueries({queryKey:["challenges"]});void client.invalidateQueries({queryKey:["challenge-progress"]});void client.invalidateQueries({queryKey:["home"]});};
  const join = useMutation({mutationFn:(leave:boolean)=>employeeApi.joinChallenge(user!.organizationId,challengeId,leave),onSuccess:()=>{refresh();toast.success("Challenge membership updated.");}});
  const save = useMutation({mutationFn:()=>employeeApi.submitChallengeProgress(user!.organizationId,challengeId,Number(value)),onSuccess:()=>{refresh();setValue("");toast.success("Progress saved. Keep going!");}});
  const c = query.data; const p=progress.data;
  return <Screen title="Challenge"><QueryState query={query}>{c && <>{c.image_url && <img className="w-full rounded-3xl" src={c.image_url} alt=""/>}<span className="chip">{titleCase(c.status)}</span><h1 className="page-title">{c.name}</h1><p className="page-lead">{c.description}</p><Card className="content-card"><h3>{c.target_value??"—"} {c.metric_type??"goal"}</h3><p>{titleCase(c.target_type)} target</p><small>{c.start_date&&formatDate(c.start_date)} — {c.end_date&&formatDate(c.end_date)} · {c.participant_count} participants</small></Card><QueryState query={progress}>{p ? <><Card className="content-card"><span className="eyebrow">Your progress</span><strong className="score-value">{p.percent_complete??"0"}%</strong><div className="mini-progress"><span style={{width:`${Math.min(100,Math.max(0,Number(p.percent_complete??0)))}%`}}/></div><p>{p.current_value} of {p.target_value??"—"} · {p.days_logged} days logged</p></Card>{!p.completed_at && c.status!=="cancelled" && <form className="list-stack" onSubmit={(e)=>{e.preventDefault();save.mutate();}}><Field label={`Today’s ${c.metric_type??"progress"}`} hint="Enter the amount to record."><Input type="number" min="0" step="any" required value={value} onChange={(e)=>setValue(e.target.value)}/></Field><FormError error={save.error}/><Button loading={save.isPending}>Log progress</Button></form>}<Button variant="secondary" loading={join.isPending} onClick={()=>join.mutate(true)}>Leave challenge</Button>{p.daily_entries.map((entry)=><Card className="content-card" key={entry.entry_date}><strong>{formatDate(entry.entry_date)}</strong><p>{entry.value} {c.metric_type} {entry.met_target ? "· Target met" : ""}</p></Card>)}</> : c.status!=="cancelled" && <Button loading={join.isPending} onClick={()=>join.mutate(false)}>Join challenge</Button>}<FormError error={join.error}/></QueryState></>}</QueryState></Screen>;
}

export function CreateChallengeScreen() {
  const { user }=useAuth();const navigate=useNavigate();const client=useQueryClient();
  const [values,setValues]=useState({name:"",description:"",start_date:"",end_date:"",metric_type:"steps",target_type:"cumulative",target_value:""});
  const save=useMutation({mutationFn:()=>employeeApi.createChallenge(user!.organizationId,{...values,branch_id:user!.branchId,target_value:Number(values.target_value)}),onSuccess:(c)=>{void client.invalidateQueries({queryKey:["challenges"]});navigate(`/challenges/${c.id}`,{replace:true});}});
  if(!hasPermission(user,"challenge.create",user?.branchId))return <Screen title="Create challenge"><EmptyState title="Organizer access required" body="Your account does not have permission to create challenges."/></Screen>;
  return <Screen title="Create challenge"><h1 className="page-title">A shared goal.</h1><form className="list-stack" onSubmit={(e)=>{e.preventDefault();save.mutate();}}>{([['name','Challenge name','text'],['start_date','Start date','date'],['end_date','End date','date'],['metric_type','Metric (e.g. steps)','text'],['target_value','Target','number']] as const).map(([key,label,type])=><Field key={key} label={label}><Input type={type} required min={type==='number'?'1':key==='end_date'?values.start_date:undefined} value={values[key]} onChange={(e)=>setValues({...values,[key]:e.target.value})}/></Field>)}<Field label="Description"><textarea className="textarea" rows={3} value={values.description} onChange={(e)=>setValues({...values,description:e.target.value})}/></Field><Field label="Goal type"><select className="select" value={values.target_type} onChange={(e)=>setValues({...values,target_type:e.target.value})}><option value="cumulative">Cumulative</option><option value="daily_minimum">Daily minimum</option></select></Field><FormError error={save.error}/><Button loading={save.isPending}>Create challenge</Button></form></Screen>;
}
