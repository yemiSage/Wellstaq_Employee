import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { BrandLogo } from '@/components/brand-logo';
import { InstallPromptSheet } from '@/components/install-prompt-sheet';
import { useAuth } from '@/auth/auth-context';

// Matches the CSS transition durations on .welcome-art/.welcome-scene so the
// blur has time to read before the route actually changes underneath it.
const EXIT_MS = 280;

export function WelcomeScreen(){
  const {status}=useAuth();const reduced=useReducedMotion();
  const navigate=useNavigate();
  const [leavingTo,setLeavingTo]=useState<string|null>(null);
  if(status==='authenticated')return <Navigate to="/home" replace/>;
  const go=(to:string)=>{
    if(reduced){navigate(to);return;}
    setLeavingTo(to);
    setTimeout(()=>navigate(to),EXIT_MS);
  };
  return <main className={`welcome-scene${leavingTo?' is-leaving':''}`}><div className={`welcome-art${leavingTo?' is-leaving':''}`} aria-hidden="true"/><div className="welcome-scrim" aria-hidden="true"/><BrandLogo className="welcome-logo"/><motion.div className="welcome-heading" initial={reduced?false:{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:.6}}><h1>Beyond<span className="sr-only"> the everyday.</span></h1></motion.div>
    {/* Sits behind .welcome-art (z-index -2 vs the art's -1) so the photo's
        top fade lets it show through only faintly, while "Beyond" (above, in
        its own motion.div) is unaffected by this stacking and stays in front. */}
    <p className="welcome-heading-back" aria-hidden="true">the everyday.</p>
    <div className="welcome-actions"><p>Your wellbeing. Your people.<br/>One small step at a time.</p><button type="button" className="welcome-primary" disabled={Boolean(leavingTo)} onClick={()=>go('/invite')}>Get started</button><button type="button" className="welcome-secondary" disabled={Boolean(leavingTo)} onClick={()=>go('/login')}>Log in</button></div><InstallPromptSheet/></main>;
}
