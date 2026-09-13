import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@/auth/auth-context';
import { employeeApi } from '@/api/services';
import { Screen, FormError } from '@/components/screen';
import { Button } from '@/components/ui/button';
import { Field, Input } from '@/components/ui/field';
import { Card } from '@/components/ui/card';

export function SupportScreen(){
  const {user}=useAuth();const [values,setValues]=useState({name:`${user?.firstName??''} ${user?.lastName??''}`.trim(),email:user?.email??'',subject:'',message:''});
  const submit=useMutation({mutationFn:()=>employeeApi.createSupportTicket(values)});
  return <Screen title="Support"><p className="eyebrow">We’re here for you</p><h1 className="page-title">Let’s work it out.</h1>{submit.isSuccess?<Card className="content-card"><h2>We’ve received your message.</h2><p>Your support request is {submit.data.status}. We’ll reply to {values.email}.</p><small className="break-all">Reference: {submit.data.ticket_id}</small><Button variant="secondary" onClick={()=>{submit.reset();setValues({...values,subject:'',message:''});}}>Send another message</Button></Card>:<form className="list-stack" onSubmit={(e)=>{e.preventDefault();submit.mutate();}}><p className="page-lead">Tell us about your account issue, question, or feedback.</p><Field label="Your name"><Input required minLength={2} maxLength={150} value={values.name} onChange={(e)=>setValues({...values,name:e.target.value})}/></Field><Field label="Reply email"><Input required type="email" value={values.email} onChange={(e)=>setValues({...values,email:e.target.value})}/></Field><Field label="Subject"><Input required minLength={2} maxLength={100} value={values.subject} onChange={(e)=>setValues({...values,subject:e.target.value})}/></Field><Field label="Message" hint="At least 10 characters"><textarea className="textarea" required minLength={10} maxLength={5000} rows={6} value={values.message} onChange={(e)=>setValues({...values,message:e.target.value})}/></Field><FormError error={submit.error}/><Button disabled={!values.name.trim()||!values.email.trim()||!values.subject.trim()||values.message.trim().length<10} loading={submit.isPending}>Send to support</Button></form>}</Screen>;
}
