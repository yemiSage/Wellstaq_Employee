import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mockEmployeeApi, signIn } from './fixtures';

test('employee can sign in and navigate all five tabs', async ({page},testInfo)=>{
  await mockEmployeeApi(page);await signIn(page);
  await page.screenshot({path:testInfo.outputPath('home.png'),fullPage:true});
  for(const tab of ['Activity','Explore','Events','More','Home']){
    await page.getByRole('navigation',{name:'Main navigation'}).getByRole('link',{name:tab,exact:true}).click();
    await expect(page).toHaveURL(new RegExp(`/#/${tab.toLowerCase()}$`));
  }
  const results=await new AxeBuilder({page}).analyze();
  expect(results.violations.filter(v=>v.impact==='critical'||v.impact==='serious')).toEqual([]);
});

test('public authentication is responsive and includes the install manifest',async({page},testInfo)=>{
  await mockEmployeeApi(page);await page.goto('/#/welcome');
  await expect(page.getByRole('link',{name:'Get started'})).toBeVisible();
  await expect(page.locator('link[rel="manifest"]')).toHaveAttribute('href',/manifest/);
  await page.screenshot({path:testInfo.outputPath('welcome.png'),fullPage:true});
  await page.getByRole('link',{name:'Log in',exact:true}).click();
  await expect(page.getByRole('heading',{name:'Welcome back.'})).toBeVisible();
  await page.screenshot({path:testInfo.outputPath('login.png'),fullPage:true});
  const results=await new AxeBuilder({page}).analyze();
  expect(results.violations.filter(v=>v.impact==='critical'||v.impact==='serious')).toEqual([]);
  await page.setViewportSize({width:320,height:568});
  await expect(page.getByRole('button',{name:'Sign in',exact:true})).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
});

test('all employee detail routes render after a direct reload',async({page})=>{
  test.setTimeout(120000);await mockEmployeeApi(page);await signIn(page);
  const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));
  for(const [path,title]of [['scores','Personal scores'],['assessments','Assessments'],['priorities','My priorities'],['survey','Wellbeing survey'],['history','Check-in history'],['challenges/challenge-1','Challenge'],['events/event-1','Event details'],['posts/new','New post'],['posts/post-1','Thread'],['stories/new','New story'],['stories/story-1','A shared moment'],['clubs/club-1','Your community'],['clubs/club-1/chat','The walking club'],['movement','Movement'],['leaderboard','Leaderboard'],['profile','Profile'],['preferences','Preferences'],['security','Password & 2FA'],['sessions','Active sessions'],['support','Support'],['notifications','Notifications']]){
    await page.goto(`/#/${path}`);
    await expect(page.locator('.page-header').getByRole('heading',{name:title,exact:true})).toBeVisible();
    await expect(page.getByLabel('Loading',{exact:true})).toHaveCount(0);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
  }
  expect(errors).toEqual([]);
});

test('event RSVP sends employee identity and confirms attendance intent',async({page})=>{
  const requests=await mockEmployeeApi(page);await signIn(page);await page.goto('/#/events/event-1');
  await page.getByRole('button',{name:'Count me in'}).click();
  await expect(page.getByText('Your RSVP: accepted')).toBeVisible();
  expect(requests.find(r=>r.method==='POST'&&r.path.endsWith('/participants'))?.body).toEqual({user_id:'user-1',is_invite:false});
  expect(requests.find(r=>r.method==='PATCH'&&r.path.endsWith('/status'))?.body).toEqual({status:'accepted'});
});

test('challenge membership unlocks progress logging',async({page})=>{
  const requests=await mockEmployeeApi(page);await signIn(page);await page.goto('/#/challenges/challenge-1');
  await page.getByRole('button',{name:'Join challenge',exact:true}).click();
  await page.getByLabel('Today’s steps').fill('1200');
  await page.getByRole('button',{name:'Log progress',exact:true}).click();
  await expect(page.getByText('Progress saved. Keep going!')).toBeVisible();
  expect(requests.find(r=>r.method==='POST'&&r.path.endsWith('/progress'))?.body).toEqual({value:1200});
});

test('recovery links submit the current API schema and show success',async({page})=>{
  const requests=await mockEmployeeApi(page);await page.goto('/reset-password?token=test-reset');
  await page.getByLabel('New password',{exact:true}).fill('replacement-password');
  await page.getByLabel('Confirm password',{exact:true}).fill('replacement-password');
  await page.getByRole('button',{name:'Update password',exact:true}).click();
  await expect(page.getByRole('heading',{name:'You’re all set.'})).toBeVisible();
  expect(requests.find(r=>r.path==='/auth/reset-password')?.body).toEqual({reset_token:'test-reset',new_password:'replacement-password'});
});

test('onboarding submits four valid baseline dimensions and ranked priorities',async({page})=>{
  const requests=await mockEmployeeApi(page);await page.goto('/#/invite');
  await page.getByLabel('Invite code').fill('TEAM-INVITE');await page.getByRole('button',{name:'Next',exact:true}).click();
  await page.getByLabel('Confirmation code').fill('123456');await page.getByRole('button',{name:'Next',exact:true}).click();
  await page.getByLabel('First name').fill('Yemi');await page.getByLabel('Last name').fill('Ade');await page.getByLabel('State',{exact:true}).fill('Lagos');await page.getByLabel('Password',{exact:true}).fill('test-password');await page.getByRole('button',{name:'Next',exact:true}).click();
  for(let i=0;i<4;i++)await page.getByRole('button',{name:'Next',exact:true}).click();
  await page.getByRole('button',{name:'Reduce Stress'}).click();await page.getByRole('button',{name:'Create my account'}).click();
  await expect(page).toHaveURL(/#\/home$/);
  const payload=requests.find(r=>r.path==='/auth/register/invite')?.body;
  expect(payload?.baseline).toEqual({entries:['mood','energy','stress','work_life_balance'].map(dimension=>({dimension,level:'amazed',reason:'work'}))});
  expect(payload?.priorities).toEqual([{priority:'reduce_stress',rank:1}]);
});

test('preferences and support use documented fields',async({page})=>{
  const requests=await mockEmployeeApi(page);await signIn(page);await page.goto('/#/preferences');
  await page.getByLabel('Email notifications').uncheck();
  await expect(page.getByLabel('Email notifications')).not.toBeChecked();
  expect(requests.find(r=>r.method==='PATCH'&&r.path==='/user-settings/preferences')?.body).toEqual({email_notifications:false});
  await page.getByLabel('Appearance').selectOption('dark');await expect(page.locator('html')).toHaveAttribute('data-theme','dark');
  await page.goto('/#/support');await page.getByLabel('Subject',{exact:true}).fill('Account question');await page.getByLabel('Message',{exact:true}).fill('Please help with my account settings.');await page.getByRole('button',{name:'Send to support'}).click();
  await expect(page.getByText('Reference: ticket-1')).toBeVisible();
  expect(requests.find(r=>r.path==='/support/tickets')?.body).toMatchObject({name:'Yemi Ade',email:'yemi@wellstaq.test',subject:'Account question'});
});

test('survey waits for all five answers and submits the question keys',async({page})=>{
  const requests=await mockEmployeeApi(page);await signIn(page);await page.goto('/#/survey');
  await expect(page.getByRole('button',{name:'Submit response'})).toBeDisabled();
  for(const fieldset of await page.locator('fieldset').all())await fieldset.getByRole('button',{name:'4 of 5',exact:true}).click();
  await page.getByRole('button',{name:'Submit response'}).click();await expect(page.getByRole('heading',{name:'Thank you for sharing'})).toBeVisible();
  expect(requests.find(r=>r.path.endsWith('/wellbeing-survey/responses'))?.body).toEqual({answers:{q1:4,q2:4,q3:4,q4:4,q5:4}});
});
