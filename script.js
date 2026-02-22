// Typing Effect
const words = ["Software Developer","Python Developer","Web Developer"];
let i=0,j=0,deleting=false;
const typing=document.querySelector(".typing");

function type(){
    const word=words[i];
    if(!deleting){
        typing.textContent=word.slice(0,++j);
        if(j===word.length){ deleting=true; setTimeout(type,1000); return;}
    }else{
        typing.textContent=word.slice(0,--j);
        if(j===0){ deleting=false; i=(i+1)%words.length;}
    }
    setTimeout(type,deleting?60:120);
}
type();

// Scroll Reveal
const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
    });
});
document.querySelectorAll(".hidden").forEach(el=>observer.observe(el));

// Theme Toggle
document.getElementById("themeToggle").onclick=()=>{
    document.body.classList.toggle("light");
};

// Simple Particles
const canvas=document.getElementById("particles");
const ctx=canvas.getContext("2d");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let particles=[];
for(let k=0;k<60;k++){
    particles.push({
        x:Math.random()*canvas.width,
        y:Math.random()*canvas.height,
        r:Math.random()*2,
        d:Math.random()*1
    });
}

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle="rgba(56,189,248,0.7)";
    particles.forEach(p=>{
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fill();
        p.y+=p.d;
        if(p.y>canvas.height) p.y=0;
    });
    requestAnimationFrame(draw);
}

draw();
<script src="https://cdn.jsdelivr.net/npm/emailjs-com@2/dist/email.min.js"></script>


(function(){
  emailjs.init("YOUR_PUBLIC_KEY");
})();

document.getElementById("contact-form").addEventListener("submit", function(event) {
  event.preventDefault();

  emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", this)
    .then(function() {
      alert("Message sent successfully!");
    }, function(error) {
      alert("Failed to send message.");
    });
});
