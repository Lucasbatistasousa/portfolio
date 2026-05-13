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
