
// home.js
const deadline = new Date(Date.now() + 10*24*60*60*1000);
const pad = n=>String(n).padStart(2,'0');
function updateCountdown(){
  const now=new Date(); let diff=Math.max(0, deadline-now);
  const d=Math.floor(diff/86400000); diff-=d*86400000;
  const h=Math.floor(diff/3600000); diff-=h*3600000;
  const m=Math.floor(diff/60000); diff-=m*60000;
  const s=Math.floor(diff/1000);
  const text=(d>0?`${d}d `:'')+`${pad(h)}:${pad(m)}:${pad(s)}`;
  const el=document.querySelector('[data-countdown]'); if(el) el.textContent=text;
}
setInterval(updateCountdown,1000); updateCountdown();

document.addEventListener('click',e=>{
  const fav=e.target.closest('.fav-btn');
  if(fav){ fav.classList.toggle('is-fav'); fav.setAttribute('aria-pressed', fav.classList.contains('is-fav')?'true':'false'); }
  const dock=e.target.closest('.dock-btn');
  if(dock){ document.querySelectorAll('.dock-btn').forEach(b=>b.classList.remove('active')); dock.classList.add('active'); }
});
// chips
const chips=document.querySelectorAll('.chip');
chips.forEach(ch=>ch.addEventListener('click',()=>{
  chips.forEach(c=>c.classList.remove('active')); ch.classList.add('active');
  const cat=ch.dataset.filter;
  document.querySelectorAll('[data-card]').forEach(card=>{
    card.style.display = (cat==='all' || card.dataset.card===cat)?'':'none';
  });
}));
// parallax
const px=document.querySelector('.has-parallax');
if(px){ window.addEventListener('scroll',()=>{ px.style.transform=`translateY(${window.scrollY*0.05}px)`; }, {passive:true}); }
