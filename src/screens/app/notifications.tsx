import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Notification } from 'iconsax-react';
import { useAuth } from '@/auth/auth-context';
import { employeeApi } from '@/api/services';
import { Screen, QueryState, FormError, Pagination } from '@/components/screen';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/states';

export function NotificationsScreen(){
  const {user}=useAuth();const client=useQueryClient();const [offset,setOffset]=useState(0);
  const query=useQuery({queryKey:['notifications',user?.id,offset],queryFn:()=>employeeApi.notificationPage(offset),refetchInterval:60000});
  const read=useMutation({mutationFn:(id?:string)=>id?employeeApi.markNotificationRead(id):employeeApi.markAllRead(),onSuccess:()=>{void client.invalidateQueries({queryKey:['notifications']});void client.invalidateQueries({queryKey:['home']});}});
  return <Screen title="Notifications"><div className="section-heading"><h1 className="page-title">Your latest updates.</h1></div>{query.data?.items.some(item=>!item.is_read)&&<Button variant="secondary" loading={read.isPending} onClick={()=>read.mutate(undefined)}>Mark all as read</Button>}<FormError error={read.error}/><QueryState query={query}>{query.data?.items.length?<div className="notification-list">{query.data.items.map(item=><button key={item.id} className={`notification-item ${item.is_read?'':'unread'}`} disabled={read.isPending} onClick={()=>{if(!item.is_read)read.mutate(item.id);}}><span>{item.image_url?<img src={item.image_url} alt=""/>:<Notification size="20" color="currentColor"/>}</span><span><strong>{item.body}</strong><small>{new Date(item.created_at).toLocaleString()}{!item.is_read?' · Unread':''}</small></span></button>)}</div>:<EmptyState title="All caught up" body="Your challenge, event, and community updates will appear here."/>}<Pagination offset={offset} total={query.data?.total??0} onChange={setOffset}/></QueryState></Screen>;
}
