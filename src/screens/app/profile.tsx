import { useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Camera } from 'iconsax-react';
import { useAuth } from '@/auth/auth-context';
import { employeeApi } from '@/api/services';
import { Screen, QueryState, FormError } from '@/components/screen';
import { Button } from '@/components/ui/button';
import { Field, Input } from '@/components/ui/field';
import { initials, titleCase } from '@/lib/utils';

type Details={first_name:string;last_name:string;country:string;state:string};
export function ProfileScreen(){
  const {user,refreshMe}=useAuth();const client=useQueryClient();const [draft,setDraft]=useState<Details|null>(null);
  const photoInput=useRef<HTMLInputElement>(null);
  const query=useQuery({queryKey:['profile',user?.id],queryFn:employeeApi.profile});
  const values=draft??{first_name:String(query.data?.first_name??''),last_name:String(query.data?.last_name??''),country:String(query.data?.country??''),state:String(query.data?.state??'')};
  const refresh=async()=>{await client.invalidateQueries({queryKey:['profile']});await refreshMe();};
  const save=useMutation({mutationFn:()=>employeeApi.updateProfile(values),onSuccess:async()=>{await refresh();setDraft(null);toast.success('Profile updated.');}});
  const upload=useMutation({mutationFn:async(file:File)=>{if(!file.type.startsWith('image/'))throw new Error('Choose a photo.');const url=await employeeApi.upload(file,'avatars');return employeeApi.avatar(url);},onSuccess:async()=>{await refresh();toast.success('Profile photo updated.');},onError:(error)=>toast.error(error instanceof Error?error.message:'Couldn’t update your photo.')});
  return <Screen title="Profile"><h1 className="page-title">A little about you.</h1><QueryState query={query}>
    <div className="avatar-edit">
      <span className="avatar xlarge">{user?.avatarUrl?<img src={user.avatarUrl} alt="Your profile"/>:initials(user?.firstName,user?.lastName)}</span>
      <button type="button" className="avatar-edit-badge" aria-label="Change profile photo" disabled={upload.isPending} onClick={()=>photoInput.current?.click()}><Camera size="16" color="currentColor" /></button>
      <input ref={photoInput} type="file" accept="image/*" className="sr-only" tabIndex={-1} disabled={upload.isPending} onChange={(e)=>{const file=e.target.files?.[0];if(file)upload.mutate(file);}}/>
    </div>
    <form className="list-stack mt-[10px]" onSubmit={(e)=>{e.preventDefault();save.mutate();}}>{([['first_name','First name'],['last_name','Last name'],['country','Country'],['state','State']] as const).map(([key,label])=><Field key={key} label={label}><Input value={values[key]} required={key==='first_name'||key==='last_name'} maxLength={100} onChange={(e)=>setDraft({...values,[key]:e.target.value})}/></Field>)}<Field label="Email address"><Input type="email" value={user?.email??''} readOnly/></Field><Field label="Role"><Input value={user?.role?titleCase(user.role):''} readOnly/></Field><FormError error={save.error}/><Button disabled={!draft||!values.first_name.trim()||!values.last_name.trim()} loading={save.isPending}>Save profile</Button></form>
  </QueryState></Screen>;
}
