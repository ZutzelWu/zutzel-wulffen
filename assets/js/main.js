const worksEl=document.getElementById("works");
/* Farbpunkte im Grid-Hover: exakt die Verlauffarben der Hero-Grafik
   (vormals .logo .mark-Gradient), rotierend nach Projekt-Index zugeordnet —
   keine neuen Farben erfunden. */
const RAINBOW=["#799899","#9EC090","#D2A36C","#CF5762","#8C4587","#A1748B","#F2CD55","#CED1D2","#B35549","#B55037","#CDA58B","#97948D"];
let current=0,projects=[];
function openProject(i){
  current=i;const p=projects[i];
  document.getElementById("pTitle").textContent=p.title;
  document.getElementById("pIntro").textContent=p.desc;
  document.getElementById("pProblem").innerHTML=p.problemstellung?'<h3>Problemstellung</h3><p>'+p.problemstellung+'</p>':'';
  document.getElementById("pProzess").innerHTML=(p.prozess&&p.prozess.length)?'<h3>Prozess</h3><ol>'+p.prozess.map(step=>'<li>'+step+'</li>').join('')+'</ol>':'';
  document.getElementById("pErgebnis").innerHTML=p.ergebnis?'<h3>Ergebnis</h3><p>'+p.ergebnis+'</p>':'';
  document.getElementById("pMeta").innerHTML=
    '<div><dt>Jahr</dt><dd>'+p.year+'</dd></div>'+
    '<div><dt>Rolle</dt><dd>'+p.role+'</dd></div>'+
    '<div><dt>Kategorie</dt><dd>'+p.cat+'</dd></div>';
  document.getElementById("pGallery").innerHTML=p.images.map((src,idx)=>{const alt=p.images.length>1?p.title+", Ansicht "+(idx+1)+"/"+p.images.length:p.title;return '<figure class="shot"><img loading="lazy" alt="'+alt+'" src="'+src+'"></figure>';}).join("");
  const prev=projects[(i-1+projects.length)%projects.length],next=projects[(i+1)%projects.length];
  document.getElementById("prevTtl").textContent=prev.title;
  document.getElementById("nextTtl").textContent=next.title;
  show("project");window.scrollTo(0,0);
}
document.getElementById("prevBtn").onclick=()=>openProject((current-1+projects.length)%projects.length);
document.getElementById("nextBtn").onclick=()=>openProject((current+1)%projects.length);
document.getElementById("backBtn").onclick=()=>{show("projekte");setNav("projekte");};
document.getElementById("impressumLink").onclick=()=>{show("impressum");setNav("impressum");window.scrollTo(0,0);};
document.getElementById("heroLink").onclick=()=>{show("projekte");setNav("projekte");window.scrollTo(0,0);};
document.getElementById("ctaKontakt").onclick=()=>{show("kontakt");setNav("kontakt");window.scrollTo(0,0);};
function show(name){document.querySelectorAll(".view").forEach(v=>v.classList.remove("active"));document.getElementById("view-"+name).classList.add("active");document.getElementById("impressumLink").hidden=name!=="kontakt";}
function setNav(name){document.querySelectorAll("nav button").forEach(b=>b.classList.toggle("on",b.dataset.nav===name));}
document.querySelectorAll("nav button").forEach(b=>{b.onclick=()=>{const n=b.dataset.nav;show(n);setNav(n);window.scrollTo(0,0);};});
const logo=document.getElementById("logo");
logo.onclick=()=>{show("index");setNav("index");window.scrollTo(0,0);};
logo.onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();logo.click();}};
async function loadProjects(){
  const res=await fetch("assets/data/projects.json");
  projects=await res.json();
  projects.forEach((p,i)=>{
    const btn=document.createElement("button");
    btn.type="button";
    btn.className="tile"+(p.highlight?" tile-highlight":"");
    btn.setAttribute("aria-label",p.title+", "+p.cat+", "+p.year);
    btn.innerHTML=
      '<img loading="lazy" alt="" src="'+p.images[0]+'">'+
      '<span class="tile-overlay">'+
        '<span class="tile-title">'+p.title+'</span>'+
        '<span class="tile-meta"><span class="tile-dot" style="background:'+RAINBOW[i%RAINBOW.length]+'"></span>'+p.cat+' · '+p.year+'</span>'+
      '</span>';
    btn.addEventListener("click",()=>openProject(i));
    worksEl.appendChild(btn);
  });
}
loadProjects();
