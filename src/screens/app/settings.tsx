import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useAuth } from '@/auth/auth-context';
import { authApi, employeeApi } from '@/api/services';
import { Screen, QueryState, FormError } from '@/components/screen';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Field, Input } from '@/components/ui/field';
import { EmptyState } from '@/components/ui/states';

const toggles = [
  ['email_notifications', 'Email notifications', 'Updates sent to your inbox'],
  ['push_notifications', 'Push notifications', 'Updates on your registered mobile devices'],
  ['challenge_reminders', 'Challenge reminders', 'A nudge to keep your habits going'],
  ['public_profile', 'Public profile', 'Let colleagues discover your profile'],
  ['show_activity', 'Share activity', 'Make your activity visible to colleagues'],
] as const;

export function PreferencesScreen() {
  const {user}=useAuth();const client=useQueryClient();
  const query=useQuery({queryKey:['preferences',user?.id],queryFn:employeeApi.preferences});
  const save=useMutation({mutationFn:employeeApi.updatePreferences,
    onMutate:(patch)=>{void client.cancelQueries({queryKey:['preferences',user?.id]});const previous=client.getQueryData<Awaited<ReturnType<typeof employeeApi.preferences>>>(['preferences',user?.id]);if(previous)client.setQueryData(['preferences',user?.id],{...previous,...patch});return {previous};},
    onError:(_error,_patch,context)=>{if(context?.previous)client.setQueryData(['preferences',user?.id],context.previous);},
    onSuccess:()=>toast.success('Preferences saved.'),
    onSettled:()=>client.invalidateQueries({queryKey:['preferences']})});
  return <Screen title="Preferences"><h1 className="page-title">Make yourself<br/>comfortable.</h1><p className="page-lead">Choose your notifications and what you share.</p><QueryState query={query}>{toggles.map(([key,label,hint])=><label className="preference-row" key={key}><span className="!block"><strong>{label}</strong><small className="mt-1 block text-xs text-muted">{hint}</small></span><input type="checkbox" checked={Boolean(query.data?.[key])} disabled={save.isPending} onChange={(e)=>save.mutate({[key]:e.target.checked})}/></label>)}<Field label="Appearance"><select className="select" value={String(query.data?.theme??'light')} disabled={save.isPending} onChange={(e)=>save.mutate({theme:e.target.value as 'light'|'dark'})}><option value="light">Light</option><option value="dark">Dark</option></select></Field><FormError error={save.error}/></QueryState></Screen>;
}

export function SecurityScreen() {
  const {user,refreshMe}=useAuth();const [password,setPassword]=useState('');const [newPassword,setNewPassword]=useState('');const [confirmation,setConfirmation]=useState('');
  const [method,setMethod]=useState<'totp'|'email'|'sms'>('totp');const [phone,setPhone]=useState('');const [code,setCode]=useState('');const [disablePassword,setDisablePassword]=useState('');
  const change=useMutation({mutationFn:()=>employeeApi.changePassword({current_password:password,new_password:newPassword}),onSuccess:()=>{setPassword('');setNewPassword('');setConfirmation('');toast.success('Password updated.');}});
  const setup=useMutation({mutationFn:()=>authApi.setup2fa({method,...(method==='sms'?{phone_number:phone}:{})})});
  const confirm=useMutation({mutationFn:()=>authApi.confirm2fa(code),onSuccess:async()=>{await refreshMe();setup.reset();setCode('');toast.success('Two-factor authentication is active.');}});
  const disable=useMutation({mutationFn:()=>authApi.disable2fa(disablePassword),onSuccess:async()=>{await refreshMe();setDisablePassword('');toast.success('Two-factor authentication disabled.');}});
  return <Screen title="Password & 2FA"><h1 className="page-title">Your space.<br/>Kept secure.</h1><Card className="content-card"><h2>Change password</h2><form className="list-stack" onSubmit={(e)=>{e.preventDefault();change.mutate();}}><Field label="Current password"><Input type="password" autoComplete="current-password" required value={password} onChange={(e)=>setPassword(e.target.value)}/></Field><Field label="New password" hint="At least 8 characters"><Input type="password" autoComplete="new-password" required minLength={8} value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}/></Field><Field label="Confirm new password" error={confirmation&&confirmation!==newPassword?'Passwords don’t match':undefined}><Input type="password" autoComplete="new-password" required value={confirmation} onChange={(e)=>setConfirmation(e.target.value)}/></Field><FormError error={change.error}/><Button disabled={newPassword.length<8||confirmation!==newPassword} loading={change.isPending}>Change password</Button></form></Card><Card className="content-card"><h2>Two-factor authentication</h2><p>Add an extra layer of protection when signing in.</p>{user?.twoFactorEnabled?<><span className="chip">Active · {user.twoFactorMethod}</span><form className="list-stack" onSubmit={(e)=>{e.preventDefault();disable.mutate();}}><Field label="Confirm your password to disable 2FA"><Input required type="password" autoComplete="current-password" value={disablePassword} onChange={(e)=>setDisablePassword(e.target.value)}/></Field><FormError error={disable.error}/><Button variant="secondary" loading={disable.isPending}>Disable two-factor authentication</Button></form></>:setup.isSuccess?<><p>{setup.data.method==='totp'?'Add this setup key to your authenticator app, then enter its current code.':'Enter the code sent to your email or phone.'}</p>{setup.data.totp_secret&&<code className="break-all rounded-xl bg-canvas p-4 text-sm select-all">{setup.data.totp_secret}</code>}<form className="list-stack" onSubmit={(e)=>{e.preventDefault();confirm.mutate();}}><Field label="Verification code"><Input required pattern="[0-9]{6,8}" inputMode="numeric" autoComplete="one-time-code" maxLength={8} value={code} onChange={(e)=>setCode(e.target.value.replace(/\D/g,''))}/></Field><FormError error={confirm.error}/><Button loading={confirm.isPending}>Activate two-factor authentication</Button><Button type="button" variant="ghost" onClick={()=>{setup.reset();confirm.reset();}}>Use a different method</Button></form></>:<form className="list-stack" onSubmit={(e)=>{e.preventDefault();setup.mutate();}}><Field label="Verification method"><select className="select" value={method} onChange={(e)=>setMethod(e.target.value as typeof method)}><option value="totp">Authenticator app</option><option value="email">Email</option><option value="sms">Text message</option></select></Field>{method==='sms'&&<Field label="Phone number" hint="Include your country code"><Input type="tel" required value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="+234…"/></Field>}<FormError error={setup.error}/><Button loading={setup.isPending}>Set up two-factor authentication</Button></form>}</Card></Screen>;
}

export function SessionsScreen() {
  const {user,signOut}=useAuth();const client=useQueryClient();const [selected,setSelected]=useState<string|null>(null);
  const query=useQuery({queryKey:['sessions',user?.id],queryFn:authApi.sessions});
  const revoke=useMutation({mutationFn:(id:string)=>authApi.revokeSession(id),onSuccess:async(_data,id)=>{const current=query.data?.items.find(item=>item.id===id)?.is_current;setSelected(null);if(current)await signOut();else await client.invalidateQueries({queryKey:['sessions']});toast.success('Session signed out.');}});
  return <Screen title="Active sessions"><h1 className="page-title">Where you’re signed in.</h1><p className="page-lead">Sign out any device you don’t recognize.</p><QueryState query={query}>{query.data?.items.length?query.data.items.map(item=><Card className="content-card" key={item.id}><h2>{item.device_name??'Browser session'}</h2>{item.is_current&&<span className="chip">This device</span>}<p>{item.location_label??'Location unavailable'}<br/>{item.ip_address??''}</p><small>Last seen {new Date(item.last_seen_at).toLocaleString()}</small>{selected===item.id?<div className="list-stack"><p>Sign out this {item.is_current?'current ':''}session?</p><Button variant="danger" loading={revoke.isPending} onClick={()=>revoke.mutate(item.id)}>Confirm sign out</Button><Button variant="ghost" onClick={()=>setSelected(null)}>Keep session</Button></div>:<Button variant="secondary" onClick={()=>setSelected(item.id)}>Sign out this device</Button>}</Card>):<EmptyState title="No sessions to review" body="Your signed-in devices will appear here."/>}<FormError error={revoke.error}/></QueryState></Screen>;
}
