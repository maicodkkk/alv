// Coloque aqui o número do agente com DDI e DDD, só números. Ex.: "5511999999999"
const WHATSAPP = "";

const CARS = [
  { id:"noier", marca:"ALPHAVISION", modelo:"Noier Edition", categoria:"hipercarros", preco:18900000, img:"assets/noier.jpg", motor:"V16 8.0 quad-turbo", potencia:"1.600 cv", aceleracao:"2,4 s", velmax:"420 km/h", ano:"2024", linha:"Uma linha contínua, do nariz à lanterna.", desc:"A Noier é a declaração da casa: proporção baixa, superfície calma e uma mecânica que não pede desculpas." },
  { id:"nyx", marca:"ALPHAVISION", modelo:"NYX Concept", categoria:"hipercarros", preco:5500000, img:"assets/nyx.jpg", motor:"V8 4.0 biturbo", potencia:"900 cv", aceleracao:"2,7 s", velmax:"350 km/h", ano:"2025", linha:"Facetas de performance, nada de ornamento.", desc:"O NYX nasce do estudo da luz sobre a carroceria. Menos volume, mais intenção." },
  { id:"xull", marca:"ALPHAVISION", modelo:"Xull Track", categoria:"superesportivos", preco:28900000, img:"assets/xull.jpg", motor:"V12 6.5 aspirado", potencia:"830 cv", aceleracao:"2,6 s", velmax:"360 km/h", ano:"2023", linha:"Carroceria artesanal para a pista. Sem teto de ambição.", desc:"O Xull é a casa em modo de circuito: asa, carbono à vista e um habitáculo desenhado em volta do piloto." },
  { id:"chiron", marca:"BUGATTI", modelo:"Chiron Pur Sport", categoria:"hipercarros", preco:18900000, img:"assets/chiron.jpg", motor:"W16 8.0L Quad-Turbo", potencia:"1.500 cv", aceleracao:"2,3 s", velmax:"350 km/h", ano:"2021", linha:"Curva antes da reta.", desc:"Versão focada em curvas, com suspensão mais rígida e aerodinâmica revisada para a pista." },
  { id:"veneno", marca:"LAMBORGHINI", modelo:"Veneno Roadster", categoria:"hipercarros", preco:28900000, img:"assets/veneno.jpg", motor:"V12 6.5L Aspirado", potencia:"750 cv", aceleracao:"2,9 s", velmax:"355 km/h", ano:"2014", linha:"Aberto ao vento. Uma série que não se repete.", desc:"Unidades extremamente limitadas: desenho de conceito de corrida com engenharia de rua." },
  { id:"sf90", marca:"FERRARI", modelo:"SF90 Stradale", categoria:"superesportivos", preco:9500000, img:"assets/detalhe.jpg", motor:"V8 4.0L Biturbo Híbrido", potencia:"1.000 cv", aceleracao:"2,5 s", velmax:"340 km/h", ano:"2020", linha:"Combustão e silêncio elétrico, no mesmo eixo.", desc:"Híbrido plug-in: motor a combustão e três motores elétricos, tração integral." },
  { id:"svj", marca:"LAMBORGHINI", modelo:"Aventador SVJ", categoria:"superesportivos", preco:12300000, img:"assets/svj.jpg", motor:"V12 6.5L Aspirado", potencia:"770 cv", aceleracao:"2,8 s", velmax:"350 km/h", ano:"2019", linha:"Aerodinâmica ativa. Aderência sem discurso.", desc:"Recordista de pista, com aerodinâmica ativa ALA 2.0." },
  { id:"huayra", marca:"PAGANI", modelo:"Huayra BC", categoria:"hipercarros", preco:22000000, img:"assets/huayra.jpg", motor:"V12 6.0L Biturbo AMG", potencia:"750 cv", aceleracao:"2,8 s", velmax:"383 km/h", ano:"2016", linha:"Ofício à mão. Carbono como joia.", desc:"Fibra de carbono artesanal e aerodinâmica ativa. Série raríssima." }
];

const brl = (n) => n.toLocaleString("pt-BR", { style:"currency", currency:"BRL", maximumFractionDigits:0 });
const KEY = "alphavision-html-cart";
let items = [];
try { items = JSON.parse(localStorage.getItem(KEY)) || []; } catch { items = []; }

function setDrawer(on) {
  document.getElementById("drawer")?.classList.toggle("open", on);
  const veil = document.getElementById("veil");
  if (veil) veil.hidden = !on;
}

function persist() {
  localStorage.setItem(KEY, JSON.stringify(items));
  paintCart();
}

function paintCart() {
  const n = items.reduce((s, i) => s + i.qtd, 0);
  document.querySelectorAll("[data-count]").forEach((el) => {
    el.textContent = n ? "Reserva " + n : "Reserva";
  });
  const list = document.getElementById("cart-list");
  const sub = document.getElementById("cart-sub");
  const tax = document.getElementById("cart-tax");
  const tot = document.getElementById("cart-tot");
  if (!list) return;
  if (!items.length) {
    list.innerHTML = '<p class="empty">A reserva está vazia. A coleção espera.</p>';
  } else {
    list.innerHTML = items.map((i) => `
      <article class="reserve-item">
        <img src="${i.img}" alt="">
        <div>
          <h3>${i.nome}</h3>
          <p class="muted">${brl(i.preco)} · ${i.qtd}×</p>
          <button class="nav-btn" type="button" data-remove="${i.id}">Retirar</button>
        </div>
      </article>`).join("");
  }
  const subtotal = items.reduce((s, i) => s + i.preco * i.qtd, 0);
  const taxa = Math.round(subtotal * 0.03);
  if (sub) sub.textContent = brl(subtotal);
  if (tax) tax.textContent = brl(taxa);
  if (tot) tot.textContent = brl(subtotal + taxa);
}

function addItem(car, qtd) {
  const nome = car.marca + " " + car.modelo;
  const found = items.find((i) => i.id === car.id);
  if (found) found.qtd += qtd;
  else items.push({ id: car.id, nome, preco: car.preco, img: car.img, qtd });
  persist();
  setDrawer(true);
}

function wireChrome() {
  const menu = document.getElementById("menu");
  const drawer = document.getElementById("drawer");
  document.getElementById("open-menu")?.addEventListener("click", () => menu.hidden = false);
  document.getElementById("close-menu")?.addEventListener("click", () => menu.hidden = true);
  document.getElementById("open-cart")?.addEventListener("click", () => setDrawer(true));
  document.getElementById("close-cart")?.addEventListener("click", () => setDrawer(false));
  document.getElementById("veil")?.addEventListener("click", () => setDrawer(false));
  document.getElementById("cart-go")?.addEventListener("click", () => {
    if (!items.length) return;
    const subtotal = items.reduce((s, i) => s + i.preco * i.qtd, 0);
    const taxa = Math.round(subtotal * 0.03);
    const linhas = items.map((i) => `• ${i.nome} × ${i.qtd} — ${brl(i.preco * i.qtd)}`).join("\n");
    const texto = encodeURIComponent(`Olá, equipe AlphaVision.\n\nQuero confirmar esta reserva:\n${linhas}\n\nTotal: ${brl(subtotal + taxa)}`);
    window.open("https://wa.me/" + WHATSAPP + "?text=" + texto, "_blank", "noopener");
  });
  document.getElementById("cart-list")?.addEventListener("click", (e) => {
    const id = e.target.getAttribute?.("data-remove");
    if (!id) return;
    items = items.filter((i) => i.id !== id);
    persist();
  });
  const onScroll = () => document.querySelector(".nav")?.classList.toggle("is-solid", window.scrollY > 24);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  paintCart();
}

function bootColecao() {
  const stage = document.getElementById("stage");
  const grid = document.getElementById("grid");
  const filters = document.getElementById("filters");
  if (!stage || !grid) return;
  const palco = CARS.slice(0, 5);
  let slide = 0;
  let filtro = "all";
  const qty = {};

  function drawStage() {
    stage.innerHTML = palco.map((car, i) => `
      <article class="slide ${i === slide ? "on" : ""}">
        <img src="${car.img}" alt="">
        <div class="hero-shade"></div>
        <div class="slide-copy">
          <p class="kicker">${car.marca}</p>
          <h1 class="display">${car.modelo}</h1>
          <p class="lede">${car.linha}</p>
          <div class="hero-actions"><button class="pill" type="button" data-open="${car.id}">Descobrir</button></div>
        </div>
      </article>`).join("") + `<div class="dots">${palco.map((c, i) => `<button type="button" aria-label="${c.modelo}" ${i===slide?'aria-current="true"':""} data-go="${i}"><i></i></button>`).join("")}</div>`;
  }

  function drawGrid() {
    const list = CARS.filter((c) => filtro === "all" || c.categoria === filtro);
    grid.innerHTML = list.map((car) => {
      const n = qty[car.id] || 1;
      return `<article class="model" id="${car.id}">
        <img src="${car.img}" alt="${car.marca} ${car.modelo}">
        <p class="kicker" style="margin-top:16px">${car.categoria === "hipercarros" ? "Hipercarro" : "Superesportivo"}</p>
        <h3>${car.modelo}</h3>
        <p class="line">${car.linha}</p>
        <p class="price">${brl(car.preco)}</p>
        <div class="card-actions">
          <button class="pill" type="button" data-open="${car.id}">Descobrir</button>
          <div class="qty"><button type="button" data-qty="${car.id}" data-d="-1">−</button><span>${n}</span><button type="button" data-qty="${car.id}" data-d="1">+</button></div>
          <button class="pill ghost" type="button" data-add="${car.id}">Reservar</button>
        </div>
      </article>`;
    }).join("");
  }

  filters.innerHTML = [["all","Todos"],["hipercarros","Hipercarros"],["superesportivos","Superesportivos"]].map(([id, label]) =>
    `<button class="pill ghost" type="button" aria-pressed="${filtro===id}" data-filter="${id}">${label}</button>`).join("");

  function openModal(id) {
    const car = CARS.find((c) => c.id === id);
    if (!car) return;
    const root = document.getElementById("modal-root");
    root.innerHTML = `<div class="modal-back" data-close="1"><article class="modal" role="dialog">
      <img class="cover" src="${car.img}" alt="">
      <div class="modal-body">
        <p class="kicker">${car.marca}</p>
        <h2 class="display" style="font-size:40px">${car.modelo}</h2>
        <p class="prose">${car.desc}</p>
        <div class="modal-specs">
          <div><span class="kicker">Motor</span><strong>${car.motor}</strong></div>
          <div><span class="kicker">Potência</span><strong>${car.potencia}</strong></div>
          <div><span class="kicker">0–100</span><strong>${car.aceleracao}</strong></div>
          <div><span class="kicker">Velocidade</span><strong>${car.velmax}</strong></div>
          <div><span class="kicker">Ano</span><strong>${car.ano}</strong></div>
          <div><span class="kicker">Preço</span><strong>${brl(car.preco)}</strong></div>
        </div>
        <div class="card-actions">
          <button class="pill ghost" type="button" data-close="1">Fechar</button>
          <button class="pill" type="button" data-add="${car.id}">Reservar</button>
        </div>
      </div>
    </article></div>`;
    root.onclick = (e) => {
      if (e.target.getAttribute("data-close") || e.target.classList.contains("modal-back")) root.innerHTML = "";
      const add = e.target.getAttribute("data-add");
      if (add) { addItem(CARS.find((c)=>c.id===add), 1); root.innerHTML = ""; }
    };
  }

  document.getElementById("colecao").addEventListener("click", (e) => {
    const t = e.target.closest("button");
    if (!t) return;
    if (t.dataset.go != null) { slide = Number(t.dataset.go); drawStage(); }
    if (t.dataset.filter) {
      filtro = t.dataset.filter;
      filters.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", b.dataset.filter === filtro));
      drawGrid();
    }
    if (t.dataset.open) openModal(t.dataset.open);
    if (t.dataset.qty) {
      const id = t.dataset.qty;
      qty[id] = Math.max(1, (qty[id] || 1) + Number(t.dataset.d));
      drawGrid();
    }
    if (t.dataset.add) addItem(CARS.find((c) => c.id === t.dataset.add), qty[t.dataset.add] || 1);
  });

  drawStage();
  drawGrid();
  setInterval(() => { slide = (slide + 1) % palco.length; drawStage(); }, 6000);
  if (location.hash) {
    const el = document.getElementById(location.hash.slice(1));
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

function bootFinance() {
  const sel = document.getElementById("veiculo");
  if (!sel) return;
  const credito = document.getElementById("credito");
  const box = document.getElementById("custom-box");
  const lbl = document.getElementById("credito-lbl");
  let meses = 60;
  let lance = 0;
  function tick() {
    const custom = sel.value === "custom";
    box.hidden = !custom;
    const base = custom ? Number(credito.value) : Number(sel.value);
    if (lbl) lbl.textContent = "Crédito sob medida — " + brl(base);
    const embutido = base * lance;
    const parcela = ((base - embutido) * 1.1) / meses;
    document.getElementById("parcela").textContent = brl(parcela);
    document.getElementById("res-cred").textContent = brl(base);
    document.getElementById("res-lance").textContent = brl(embutido);
    document.getElementById("pedir").onclick = () => {
      const nome = sel.options[sel.selectedIndex].text.split("—")[0].trim();
      const texto = encodeURIComponent(`Olá, equipe AlphaVision. Simulei uma carta.\n\n• Plano: ${nome}\n• Crédito: ${brl(base)}\n• Prazo: ${meses} meses\n• Lance: ${lance * 100}%\n• Parcela: ${brl(parcela)} / mês`);
      window.open("https://wa.me/" + WHATSAPP + "?text=" + texto, "_blank", "noopener");
    };
  }
  sel.onchange = tick;
  credito.oninput = tick;
  document.getElementById("m60").onclick = () => { meses = 60; document.getElementById("m60").setAttribute("aria-pressed","true"); document.getElementById("m100").setAttribute("aria-pressed","false"); tick(); };
  document.getElementById("m100").onclick = () => { meses = 100; document.getElementById("m100").setAttribute("aria-pressed","true"); document.getElementById("m60").setAttribute("aria-pressed","false"); tick(); };
  document.getElementById("lance").onchange = (e) => { lance = Number(e.target.value); tick(); };
  tick();
}


function bootBanner() {
  const box = document.getElementById("banner");
  if (!box) return;
  const slides = [...box.querySelectorAll(".hs")];
  const dots = box.querySelector(".hs-dots");
  let i = 0, timer;
  dots.innerHTML = slides.map((_, n) => `<button type="button" aria-label="Banner ${n + 1}" data-n="${n}"></button>`).join("");
  function show(n) {
    i = (n + slides.length) % slides.length;
    slides.forEach((s, k) => s.classList.toggle("on", k === i));
    dots.querySelectorAll("button").forEach((b, k) => b.setAttribute("aria-current", k === i));
  }
  function play() { clearInterval(timer); timer = setInterval(() => show(i + 1), 7000); }
  box.querySelector(".prev").onclick = () => { show(i - 1); play(); };
  box.querySelector(".next").onclick = () => { show(i + 1); play(); };
  dots.onclick = (e) => { if (e.target.dataset.n) { show(Number(e.target.dataset.n)); play(); } };
  show(0); play();
}

function bootCards() {
  document.querySelectorAll(".model").forEach((card) => {
    const id = (card.querySelector("a")?.getAttribute("href") || "").split("#")[1];
    const car = CARS.find((c) => c.id === id);
    if (!car) return;
    card.insertAdjacentHTML("beforeend", `<div class="smart"><div><span>Potência</span><b>${car.potencia}</b></div><div><span>0–100 km/h</span><b>${car.aceleracao}</b></div><div><span>Velocidade</span><b>${car.velmax}</b></div><div><span>Preço</span><b>${brl(car.preco)}</b></div></div>`);
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--ry", ((e.clientX - r.left) / r.width - 0.5) * 8 + "deg");
      card.style.setProperty("--rx", (0.5 - (e.clientY - r.top) / r.height) * 8 + "deg");
    });
    card.addEventListener("mouseleave", () => { card.style.setProperty("--rx", "0deg"); card.style.setProperty("--ry", "0deg"); });
  });
}

function bootColab() {
  const btn = document.getElementById("c-enviar");
  if (!btn) return;
  btn.onclick = () => {
    const v = (id) => document.getElementById(id).value.trim();
    const texto = encodeURIComponent(`Olá, equipe AlphaVision.\n\nQuero propor uma parceria:\n• Nome: ${v("c-nome")}\n• Marca: ${v("c-marca")}\n• Tipo: ${v("c-tipo")}\n• Mensagem: ${v("c-msg")}`);
    window.open("https://wa.me/" + WHATSAPP + "?text=" + texto, "_blank", "noopener");
  };
}

document.addEventListener("DOMContentLoaded", () => {
  wireChrome();
  bootColecao();
  bootFinance();
  bootBanner();
  bootCards();
  bootColab();
});
