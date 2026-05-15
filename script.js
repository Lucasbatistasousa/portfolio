// CURSOR
const cur = document.getElementById("cur"),
    cr = document.getElementById("cr") || document.getElementById("cur2");
let mx = 0,
    my = 0,
    cx = 0,
    cy = 0;
const cur2 = document.getElementById("cur2");
document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    cur.style.left = mx + "px";
    cur.style.top = my + "px";
});
(function a() {
    cx += (mx - cx) * 0.16;
    cy += (my - cy) * 0.16;
    cur2.style.left = cx + "px";
    cur2.style.top = cy + "px";
    requestAnimationFrame(a);
})();
document
    .querySelectorAll("a,button,.scard,.pcard,.tcard,.spill")
    .forEach((el) => {
        el.addEventListener("mouseenter", () => document.body.classList.add("hov"));
        el.addEventListener("mouseleave", () =>
            document.body.classList.remove("hov"),
        );
    });

// SCROLL
const prog = document.getElementById("prog"),
    nb = document.getElementById("nb");
window.addEventListener("scroll", () => {
    prog.style.width =
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100 +
        "%";
    nb.classList.toggle("slim", window.scrollY > 80);
});

// REVEAL
const io = new IntersectionObserver(
    (e) => {
        e.forEach((x) => {
            if (x.isIntersecting) {
                x.target.classList.add("in");
                io.unobserve(x.target);
            }
        });
    },
    { threshold: 0.1 },
);
document.querySelectorAll(".rev").forEach((el) => io.observe(el));

// 3D TILT
const c3 = document.getElementById("c3"),
    w3 = c3 && c3.parentElement;
if (w3) {
    w3.addEventListener("mousemove", (e) => {
        const r = w3.getBoundingClientRect(),
            x = (e.clientX - r.left) / r.width - 0.5,
            y = (e.clientY - r.top) / r.height - 0.5;
        c3.style.transform = `rotateX(${y * -13}deg) rotateY(${x * 18}deg)`;
    });
    w3.addEventListener(
        "mouseleave",
        () => (c3.style.transform = "rotateX(4deg) rotateY(-10deg)"),
    );
}

// MOBILE MENU
let mo = false;
function tm() {
    mo = !mo;
    document.getElementById("mm").classList.toggle("open", mo);
    const s = document.querySelectorAll(".hbtn span");
    if (mo) {
        s[0].style.transform = "translateY(6.5px) rotate(45deg)";
        s[1].style.opacity = "0";
        s[2].style.transform = "translateY(-6.5px) rotate(-45deg)";
    } else {
        s.forEach((x) => {
            x.style.transform = "";
            x.style.opacity = "";
        });
    }
}
function cm() {
    mo = false;
    document.getElementById("mm").classList.remove("open");
    document.querySelectorAll(".hbtn span").forEach((x) => {
        x.style.transform = "";
        x.style.opacity = "";
    });
}

// FORM
function sf(e) {
    e.preventDefault();
    
    const b = e.target.querySelector("button[type=submit]");
    const t = document.getElementById("toast");
    
    // Feedback imediato
    b.textContent = "Enviando...";
    b.disabled = true;

    // Envio para o e-mail
    emailjs.sendForm('service_a5a77ks', 'template_1kvp7im', e.target)
        .then(() => {
            // Sucesso: Executa sua lógica de reset e toast
            e.target.reset();
            b.textContent = "Mensagem Enviada! ✅";
            
            if(t) {
                t.style.display = "flex";
                setTimeout(() => (t.style.display = "none"), 4000);
            }

            // Volta o botão ao normal depois de um tempo
            setTimeout(() => {
                b.textContent = "Enviar Mensagem →";
                b.disabled = false;
            }, 3000);

        }, (error) => {
            // Erro: Avisa o usuário que falhou
            console.log('Falha no envio:', error);
            alert("Erro ao enviar mensagem. Tente novamente.");
            b.textContent = "Erro ao enviar ❌";
            b.disabled = false;
        });
}

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach((a) =>
    a.addEventListener("click", (e) => {
        e.preventDefault();
        document
            .querySelector(a.getAttribute("href"))
            ?.scrollIntoView({ behavior: "smooth" });
    }),
);


// ================================================================
// LGPD — Gestão de Consentimento de Cookies
// ================================================================

// ── 1. Carregar preferências salvas
function getConsent(){
  try{ return JSON.parse(localStorage.getItem('lgpdConsent'))||null }
  catch(e){ return null }
}
function saveConsent(prefs){
  localStorage.setItem('lgpdConsent', JSON.stringify({...prefs, ts: Date.now()}));
}

// ── 2. Ativar Google Analytics 4 (substitua G-XXXXXXXXXX pelo seu ID real)
function loadGA(){
  if(document.getElementById('ga-script')) return;
  const s=document.createElement('script');
  s.id='ga-script';s.async=true;
  s.src='https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
  document.head.appendChild(s);
  window.dataLayer=window.dataLayer||[];
  function gtag(){dataLayer.push(arguments)}
  window.gtag=gtag;
  gtag('js',new Date());
  gtag('config','G-XXXXXXXXXX',{anonymize_ip:true});
  console.info('[LGPD] Google Analytics ativado com consentimento.');
}

// ── 3. Ativar Facebook Pixel (substitua 000000000000000 pelo seu Pixel ID real)
function loadPixel(){
  if(window.fbq) return;
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
  fbq('init','000000000000000');
  fbq('track','PageView');
  console.info('[LGPD] Facebook Pixel ativado com consentimento.');
}

// ── 4. Aplicar preferências de cookies
function applyConsent(prefs){
  if(prefs.analytics) loadGA();
  if(prefs.marketing) loadPixel();
}

// ── 5. Ações dos botões do banner
function acceptAllCookies(){
  const prefs={essential:true,analytics:true,marketing:true};
  saveConsent(prefs);
  applyConsent(prefs);
  hideBanner();
}
function denyAllCookies(){
  const prefs={essential:true,analytics:false,marketing:false};
  saveConsent(prefs);
  hideBanner();
}
function saveCustomCookies(){
  const prefs={
    essential:true,
    analytics:document.getElementById('ck_analytics')?.checked||false,
    marketing:document.getElementById('ck_marketing')?.checked||false
  };
  saveConsent(prefs);
  applyConsent(prefs);
  hideBanner();
}
function hideBanner(){
  const b=document.getElementById('cookieBanner');
  b.style.transform='translateY(100%)';
  setTimeout(()=>b.style.display='none',460);
}

// ── 6. Exibir banner ou aplicar prefs salvas
function initConsent(){
  const saved=getConsent();
  if(saved){
    // Já consentiu antes — aplica silenciosamente
    applyConsent(saved);
  } else {
    // Primeira visita — exibe banner após 1.2s
    setTimeout(()=>document.getElementById('cookieBanner').classList.add('show'), 1200);
  }
}

// ── 7. Modal de Política de Privacidade
function openPriv(e){
  if(e)e.preventDefault();
  document.getElementById('privModal').classList.add('open');
  document.body.style.overflow='hidden';
}
function closePriv(){
  document.getElementById('privModal').classList.remove('open');
  document.body.style.overflow='';
}
function closePrivOnBg(e){
  if(e.target===document.getElementById('privModal')) closePriv();
}
document.addEventListener('keydown',e=>{ if(e.key==='Escape') closePriv(); });

// ── 8. Inicializar
initConsent();