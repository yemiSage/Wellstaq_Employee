import { afterEach, describe, expect, it, vi } from 'vitest';
import { apiTransport } from './transport';
import { authApi, employeeApi } from './services';

afterEach(()=>vi.restoreAllMocks());
describe('employee wire contracts',()=>{
  it('sends the documented password-reset fields',async()=>{
    const request=vi.spyOn(apiTransport,'request').mockResolvedValue({});
    await authApi.resetPassword('reset-token','new-password');
    expect(request).toHaveBeenCalledWith('/auth/reset-password',expect.objectContaining({method:'POST',authenticated:false,body:{reset_token:'reset-token',new_password:'new-password'}}));
  });
  it('identifies the current employee when joining an event',async()=>{
    const request=vi.spyOn(apiTransport,'request').mockResolvedValue({});
    await employeeApi.joinEvent('org','event','employee');
    expect(request).toHaveBeenCalledWith('/organizations/org/events/event/participants',expect.objectContaining({body:{user_id:'employee',is_invite:false}}));
  });
  it('uses the activation endpoint for enrollment, not the sign-in challenge',async()=>{
    const request=vi.spyOn(apiTransport,'request').mockResolvedValue(undefined);
    await authApi.confirm2fa('123456');
    expect(request).toHaveBeenCalledWith('/auth/2fa/confirm',{method:'POST',body:{code:'123456'}});
  });
  it('uses the self-leave club endpoint rather than removing a member as an admin',async()=>{
    const request=vi.spyOn(apiTransport,'request').mockResolvedValue({});
    await employeeApi.clubMembership('org','club','employee',true);
    expect(request).toHaveBeenCalledWith('/organizations/org/clubs/club/members/employee/leave',{method:'DELETE'});
  });
  it('loads later liker pages before deciding whether the current employee liked a post',async()=>{
    const request=vi.spyOn(apiTransport,'request').mockResolvedValueOnce({items:[{user_id:'another'}],total:2}).mockResolvedValueOnce({items:[{user_id:'employee'}],total:2});
    await expect(employeeApi.postLikedByMe('org','post','employee')).resolves.toBe(true);
    expect(request.mock.calls[1][0]).toContain('offset=1');
  });
  it('does not present a fully failed dashboard as a successful empty summary',async()=>{
    vi.spyOn(apiTransport,'request').mockRejectedValue(new Error('offline'));
    await expect(employeeApi.home('org')).rejects.toThrow('summary is unavailable');
  });
});
