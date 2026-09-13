import type { Page } from '@playwright/test';

export const employee={user_id:'user-1',email:'yemi@wellstaq.test',first_name:'Yemi',last_name:'Ade',role:'employee',organization_id:'org-1',branch_id:'branch-1',department_id:null,location:'Lagos',phone_number:null,status:'active',permissions:[],avatar_url:null,two_fa_enabled:false,two_fa_method:null};
const event={id:'event-1',title:'Mindful reset',description:'Take a moment to breathe with your team.',image_url:null,start_date:'2099-09-22',end_date:null,time:'10:00:00',status:'upcoming',organization_id:'org-1',branch_id:'branch-1',participant_count:3};
const challenge={id:'challenge-1',name:'A little more movement',description:'Take a walk every day.',image_url:null,start_date:'2026-01-01',end_date:'2099-12-31',status:'active',metric_type:'steps',target_type:'cumulative',target_value:5000,participant_count:4};
const post={id:'post-1',user_id:'user-1',organization_id:'org-1',content:'A little walk made a big difference today.',media_url:null,media_type:null,like_count:2,comment_count:0,share_count:0,created_at:'2026-09-11T09:00:00Z'};
const club={id:'club-1',name:'The walking club',description:'A shared step toward a better day.',image_url:null,privacy:'public',category:'Movement',member_count:3,is_member:true,leader_id:'other',branch_id:'branch-1'};
const pageOf=(items:unknown[])=>({items,total:items.length,offset:0,limit:20});

export async function mockEmployeeApi(page:Page){
  const requests:{path:string;method:string;body:Record<string,unknown>}[]=[];
  let joined=false;let challengeJoined=false;let liked=false;
  let preferences={email_notifications:true,push_notifications:false,challenge_reminders:true,public_profile:false,show_activity:false,theme:'light'};
  await page.route('**/*',async route=>{
    const url=new URL(route.request().url());
    if(url.hostname!=='wellstaq-api-production.up.railway.app'&&!url.pathname.startsWith('/api/'))return route.continue();
    const path=url.pathname.replace(/^\/api/,'');const method=route.request().method();const body=route.request().postDataJSON() as Record<string,unknown>??{};
    requests.push({path,method,body});
    const ok=(json:unknown)=>route.fulfill({json});
    if(path==='/auth/login'||path==='/auth/2fa/verify'||path==='/auth/register/invite')return ok({access_token:'test-access',refresh_token:'test-refresh'});
    if(path==='/auth/me')return ok(employee);
    if(path==='/auth/invite/otp/verify')return ok({invite_verification_token:'verified-invite'});
    if(path==='/auth/2fa/setup')return ok({method:'email'});
    if(path==='/auth/2fa/confirm'){return route.fulfill({status:204});}
    if(path==='/auth/sessions')return ok({items:[{id:'session-1',device_name:'Test browser',ip_address:'127.0.0.1',location_label:'Local fixture',last_seen_at:'2026-09-11T10:00:00Z',created_at:'2026-09-11T10:00:00Z',is_current:false}]});
    if(path==='/user-settings/preferences'){if(method==='PATCH')preferences={...preferences,...body};return ok(preferences);}
    if(path==='/user-settings/profile')return ok({id:'user-1',first_name:'Yemi',last_name:'Ade',email:employee.email,avatar_url:null,country:'Nigeria',state:'Lagos',...body});
    if(path==='/support/tickets')return ok({accepted:true,ticket_id:'ticket-1',status:'open'});
    if(path==='/wellbeing/scores/me')return ok({items:[{dimension_id:'mood',score:'84',period:'September'}]});
    if(path==='/wellbeing/dimensions')return ok({items:[{id:'mood',name:'Mood'}]});
    if(path==='/wellbeing/baselines/me')return ok({items:[{id:'baseline-1',dimension:'mood',level:'amazed',reason:'work',recorded_at:'2026-09-11T10:00:00Z'}]});
    if(path==='/wellbeing/assessments/me')return ok({items:[]});
    if(path==='/categories')return ok({items:[{id:'mental',name:'Mental wellbeing',badge_color:null}]});
    if(path==='/engagement/priorities')return ok({items:[{id:'priority-1',priority:'reduce_stress',rank:1}]});
    if(path==='/engagement/checkins/streak')return ok({current_streak_days:5,checked_in_today:false});
    if(path==='/engagement/checkins')return ok(method==='GET'?pageOf([{id:'checkin-1',mood:'good',energy_level:'good',stress_level:'tired',notes:'A busy day',checkin_date:'2026-09-11',checked_in_at:'2026-09-11T10:00:00Z'}]):{id:'checkin-2'});
    if(path==='/notifications/unread-count')return ok({unread_count:1});
    if(path==='/notifications')return ok(pageOf([{id:'notice-1',body:'Your next event is coming up.',notification_type:'event',image_url:null,is_read:false,created_at:'2026-09-11T10:00:00Z'}]));
    if(path.endsWith('/wellbeing-survey/open-window'))return ok({window_id:'survey-1',window_start:'2026-09-01',window_end:'2099-09-30',already_responded:false,questions:Array.from({length:5},(_,i)=>({question_key:`q${i+1}`,question_text:`I feel supported in area ${i+1}.`}))});
    if(path.endsWith('/events'))return ok(pageOf([event]));
    if(path.endsWith('/events/event-1'))return ok(event);
    if(path.endsWith('/events/event-1/participants')){if(method==='POST'){joined=true;return ok({event_id:'event-1',user_id:body.user_id,message:'Joined'});}return ok(pageOf(joined?[{user_id:'user-1',first_name:'Yemi',last_name:'Ade',status:'accepted',attended:false}]:[]));}
    if(path.endsWith('/challenges'))return ok(pageOf([challenge]));
    if(path.endsWith('/challenges/challenge-1'))return ok(challenge);
    if(path.endsWith('/challenges/challenge-1/join')){challengeJoined=method==='POST';return ok({});}
    if(path.endsWith('/progress/me'))return challengeJoined?ok({challenge_id:'challenge-1',user_id:'user-1',target_type:'cumulative',target_value:'5000',current_value:'1200',percent_complete:'24',completed_at:null,days_remaining:5,daily_entries:[],days_met_target:null,days_logged:1}):route.fulfill({status:404,json:{detail:'Not joined'}});
    if(path.endsWith('/posts')||path.endsWith('/posts/saved'))return ok(pageOf([post]));
    if(path.endsWith('/posts/post-1'))return ok(post);
    if(path.endsWith('/posts/post-1/likes'))return ok(pageOf(liked?[{user_id:'user-1',first_name:'Yemi',last_name:'Ade'}]:[]));
    if(path.endsWith('/posts/post-1/like')){liked=method==='POST';return ok({});}
    if(path.endsWith('/comments'))return ok(pageOf([]));
    if(path.endsWith('/stories/story-1'))return ok({id:'story-1',user_id:'user-1',media_url:'/assets/figma/event-mindful.jpeg',media_type:'image',created_at:'2026-09-11T10:00:00Z'});
    if(path.endsWith('/stories'))return ok(pageOf([]));
    if(path.endsWith('/clubs'))return ok(pageOf([club]));
    if(path.endsWith('/clubs/club-1'))return ok(club);
    if(path.endsWith('/clubs/club-1/members'))return ok(pageOf([{id:'user-1',first_name:'Yemi',last_name:'Ade'}]));
    if(path.endsWith('/members'))return ok(pageOf([{id:'user-1',first_name:'Yemi',last_name:'Ade',email:employee.email,avatar_url:null,status:'active',role_id:null,branch_id:'branch-1'}]));
    if(path.endsWith('/messages'))return ok(pageOf([{id:'message-1',user_id:'user-1',content:'Hello, everyone!',created_at:'2026-09-11T10:00:00Z'}]));
    if(path.endsWith('/activities/me'))return ok(pageOf([]));
    if(path.endsWith('/activity-log/trend'))return ok({metric_type:'steps',granularity:'daily',points:[{period:'2026-09-11',value:'1200'}]});
    if(path.includes('/leaderboard/'))return ok({items:[{user_id:'user-1',first_name:'Yemi',last_name:'Ade',value:'1200',rank:1}]});
    if(method!=='GET')return ok({ok:true});
    return route.fulfill({status:404,json:{detail:`Missing test fixture: ${path}`}});
  });
  return requests;
}

export async function signIn(page:Page){
  await page.goto('/#/login');
  await page.getByLabel('Email Address').fill(employee.email);
  await page.locator('input[name="password"]').fill('test-password');
  await page.getByRole('button',{name:'Sign in',exact:true}).click();
  await page.getByRole('heading',{name:'Hello, Yemi. Today’s summary.'}).waitFor();
}
