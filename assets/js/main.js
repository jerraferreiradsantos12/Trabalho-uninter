// main.js

// ==========================
// Função utilitária: rolagem suave
// ==========================
const scrollSmooth = (selector) => {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({ behavior: "smooth" });
    }
};

// ==========================
// Rolagem suave para links do menu
// ==========================
const menuLinks = document.querySelectorAll("nav ul li a");
menuLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = link.getAttribute("href");
        scrollSmooth(target);
    });
});

// ==========================
// Botão "Saiba Mais"
// ==========================
const btnSaibaMais = document.getElementById("btnSaibaMais");
if (btnSaibaMais) {
    btnSaibaMais.addEventListener("click", () => scrollSmooth(".highlights"));
}

// ==========================
// Botão Tema Claro/Escuro
// ==========================
const btnTema = document.getElementById("btnTema");
if (btnTema) {
    btnTema.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        btnTema.textContent = document.body.classList.contains("dark-mode")
            ? "☀️ Tema Claro"
            : "🌙 Tema Escuro";
    });
}

// ==========================
// Validação e envio do formulário
// ==========================
const form = document.querySelector("form");
if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nome = document.getElementById("nome");
        const email = document.getElementById("email");
        const mensagem = document.getElementById("mensagem");

        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());

        // Reset de bordas
        [nome, email, mensagem].forEach(f => f.style.borderColor = "#ccc");

        if (!nome.value.trim() || !email.value.trim() || !mensagem.value.trim()) {
            alert("Por favor, preencha todos os campos!");
            if (!nome.value.trim()) nome.style.borderColor = "red";
            if (!email.value.trim()) email.style.borderColor = "red";
            if (!mensagem.value.trim()) mensagem.style.borderColor = "red";
        } else if (!emailValido) {
            alert("Por favor, informe um e-mail válido!");
            email.style.borderColor = "red";
        } else {
            alert("Mensagem enviada com sucesso!");
            form.reset();
        }
    });
}

// ==========================
// Tilt e animação dos cards
// ==========================
const cards = document.querySelectorAll(".card");
cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * 8; // graus
        const rotateY = ((x - centerX) / centerX) * 8; // graus

        card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    });
});

// ==========================
// Animar cards quando aparecem na tela
// ==========================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("card-animate");
        }
    });
}, { threshold: 0.3 });

cards.forEach(card => observer.observe(card));
