
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year'); if (yearEl) yearEl.textContent = new Date().getFullYear();
  const navToggle = document.querySelector('.nav-toggle'); const nav = document.getElementById('site-nav');
  if (navToggle && nav){ navToggle.addEventListener('click',()=>{ const open = nav.classList.toggle('open'); navToggle.setAttribute('aria-expanded', String(open)); }); }
  const slider = document.querySelector('.slider');
  if (slider){
    const slides = Array.from(slider.querySelectorAll('.slide'));
    const prevBtn = slider.querySelector('.prev'); const nextBtn = slider.querySelector('.next'); const dotsWrap = slider.querySelector('.dots');
    let idx = 0; let timer;
    function renderDots(){ dotsWrap.innerHTML=''; slides.forEach((_,i)=>{ const b=document.createElement('button'); b.setAttribute('role','tab'); b.setAttribute('aria-label','Go to slide '+(i+1)); b.setAttribute('aria-selected', String(i===idx)); b.addEventListener('click',()=>go(i)); dotsWrap.appendChild(b); }); }
    function go(n){ slides[idx].classList.remove('current'); idx=(n+slides.length)%slides.length; slides[idx].classList.add('current'); dotsWrap.querySelectorAll('button').forEach((b,i)=>b.setAttribute('aria-selected', String(i===idx))); restart(); }
    function next(){ go(idx+1);} function prev(){ go(idx-1);} function start(){ timer=setInterval(next,5000);} function stop(){ clearInterval(timer);} function restart(){ stop(); start(); }
    renderDots(); start(); nextBtn.addEventListener('click', next); prevBtn.addEventListener('click', prev); slider.addEventListener('mouseenter', stop); slider.addEventListener('mouseleave', start); document.addEventListener('visibilitychange', ()=> document.hidden ? stop() : start());
  }
  const form = document.getElementById('contactForm');
  if (form){
    form.addEventListener('submit',(e)=>{
      e.preventDefault();
      const name=form.querySelector('#name'); const email=form.querySelector('#email'); const message=form.querySelector('#message'); const agree=form.querySelector('#agree'); let ok=true;
      form.querySelectorAll('.error').forEach(el=>el.textContent='');
      if(!name.value.trim()){ ok=false; document.getElementById('err-name').textContent='Please enter your name.'; }
      const emailVal = email.value.trim();
      if(!emailVal){ ok=false; document.getElementById('err-email').textContent='Please enter your email.'; }
      else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)){ ok=false; document.getElementById('err-email').textContent='Please enter a valid email.'; }
      if(!message.value.trim()){ ok=false; document.getElementById('err-message').textContent='Please write a short message.'; }
      if(!agree.checked){ ok=false; document.getElementById('err-agree').textContent='Please accept the terms.'; }
      if(ok){ const success=form.querySelector('.form-success'); success.hidden=false; form.reset(); setTimeout(()=>{ success.hidden=true; }, 4000); }
    });
  }
});
