import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/auth/auth-context';
import { employeeApi } from '@/api/services';

export function Appearance() {
  const {user,status}=useAuth();
  const query=useQuery({queryKey:['preferences',user?.id],queryFn:employeeApi.preferences,enabled:status==='authenticated'});
  useEffect(()=>{document.documentElement.dataset.theme=status==='authenticated'&&query.data?.theme==='dark'?'dark':'light';return()=>{delete document.documentElement.dataset.theme;};},[query.data?.theme,status]);
  return null;
}
