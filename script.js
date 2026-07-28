// ============================================================
// SUNNY KUMAR PORTFOLIO — shared behavior
// ============================================================

// Live "station" local time (Gurugram, IST)
function tickClock(){
  const el = document.getElementById('stationTime');
  if(!el) return;
  const now = new Date();
  const opts = { hour:'2-digit', minute:'2-digit', second:'2-digit', hour12:false, timeZone:'Asia/Kolkata' };
  el.textContent = now.toLocaleTimeString('en-GB', opts) + ' IST';
}
setInterval(tickClock, 1000);
tickClock();

// Mobile nav toggle and active-link highlighting now live in navbar.js,
// since they're wired up at the same time the nav markup is injected.

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  },{threshold:0.15});
  revealEls.forEach(el=>io.observe(el));
} else {
  revealEls.forEach(el=>el.classList.add('in'));
}

// Generate animated contour-line background (isobar-like)
function buildContourField(){
  const container = document.getElementById('contourField');
  if(!container) return;
  const w = 1600, h = 1000;
  const rows = 9;
  let svg = `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">`;
  for(let i=0;i<rows;i++){
    const baseY = (h/rows)*i + 40;
    const amp = 22 + (i%3)*10;
    const freq = 0.006 + (i%4)*0.0015;
    let d = `M -100 ${baseY}`;
    for(let x=-100;x<=w+300;x+=40){
      const y = baseY + Math.sin(x*freq + i)*amp;
      d += ` L ${x} ${y.toFixed(1)}`;
    }
    const animate = i % 2 === 0 ? 'animate' : '';
    svg += `<path class="contour-line ${animate}" d="${d}" style="animation-duration:${34+i*3}s; animation-direction:${i%2? 'reverse':'normal'};" />`;
  }
  svg += `</svg>`;
  container.innerHTML = svg;
}
buildContourField();
