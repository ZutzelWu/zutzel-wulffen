const worksEl=document.getElementById("works"),frameEl=document.getElementById("previewFrame"),metaEl=document.getElementById("previewMeta");
function setPreview(p){
  document.querySelectorAll(".work").forEach(w=>w.classList.remove("hot"));
  frameEl.innerHTML='<img alt="'+p.title+'" src="'+p.images[0]+'">';
  const img=frameEl.querySelector("img");
  requestAnimationFrame(()=>img.classList.add("show"));
  const n=p.images.length;
  metaEl.innerHTML='<p class="pm-cat">'+p.cat+' · '+p.year+'</p><p class="pm-count">'+n+(n===1?' Arbeit':' Arbeiten')+'</p>';
}
let current=0,projects=[];
function openProject(i){
  current=i;const p=projects[i];
  document.getElementById("pTitle").textContent=p.title;
  document.getElementById("pIntro").textContent=p.desc;
  document.getElementById("pMeta").innerHTML=
    '<div><dt>Jahr</dt><dd>'+p.year+'</dd></div>'+
    '<div><dt>Rolle</dt><dd>'+p.role+'</dd></div>'+
    '<div><dt>Kategorie</dt><dd>'+p.cat+'</dd></div>';
  document.getElementById("pGallery").innerHTML=p.images.map(src=>'<figure class="shot"><img loading="lazy" alt="'+p.title+'" src="'+src+'"></figure>').join("");
  const prev=projects[(i-1+projects.length)%projects.length],next=projects[(i+1)%projects.length];
  document.getElementById("prevTtl").textContent=prev.title;
  document.getElementById("nextTtl").textContent=next.title;
  show("project");window.scrollTo(0,0);
}
document.getElementById("prevBtn").onclick=()=>openProject((current-1+projects.length)%projects.length);
document.getElementById("nextBtn").onclick=()=>openProject((current+1)%projects.length);
document.getElementById("backBtn").onclick=()=>{show("index");setNav("index");};
document.getElementById("impressumLink").onclick=()=>{show("impressum");setNav("impressum");window.scrollTo(0,0);};
function show(name){document.querySelectorAll(".view").forEach(v=>v.classList.remove("active"));document.getElementById("view-"+name).classList.add("active");}
function setNav(name){document.querySelectorAll("nav button").forEach(b=>b.classList.toggle("on",b.dataset.nav===name));}
document.querySelectorAll("nav button").forEach(b=>{b.onclick=()=>{const n=b.dataset.nav;show(n);setNav(n);window.scrollTo(0,0);};});
const logo=document.getElementById("logo");
logo.onclick=()=>{show("index");setNav("index");window.scrollTo(0,0);};
logo.onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();logo.click();}};
async function loadProjects(){
  const res=await fetch("assets/data/projects.json");
  projects=await res.json();
  projects.forEach((p,i)=>{
    const li=document.createElement("li"),btn=document.createElement("button");
    btn.className="work";btn.setAttribute("aria-label",p.title+", "+p.cat);
    btn.innerHTML='<span class="ttl">'+p.title+'</span><span class="cat">'+p.cat+'</span>';
    btn.addEventListener("mouseenter",()=>setPreview(p));
    btn.addEventListener("focus",()=>setPreview(p));
    btn.addEventListener("click",()=>openProject(i));
    li.appendChild(btn);worksEl.appendChild(li);
  });
}
loadProjects();
