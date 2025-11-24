// ====== ELEMENTOS PRINCIPAIS ======
const splash = document.getElementById("splash");
const welcomeScreen = document.getElementById("welcome-screen");
const loginScreen = document.getElementById("login-screen");
const appScreen = document.getElementById("app-screen");

const loginNome = document.getElementById("login-nome");
const loginEmail = document.getElementById("login-email");
const loginObjetivo = document.getElementById("login-objetivo");
const loginFoto = document.getElementById("login-foto");
const loginBio = document.getElementById("login-bio");

const linhaSelect = document.getElementById("linhaSelect");
const entradaSelect = document.getElementById("entradaSelect");
const saidaSelect = document.getElementById("saidaSelect");
const routeStatus = document.getElementById("routeStatus");

const cardContainer = document.getElementById("card-container");
const statusMatch = document.getElementById("statusMatch");

const tabSwipe = document.getElementById("tab-swipe");
const tabChat = document.getElementById("tab-chat");
const tabProfile = document.getElementById("tab-profile");

const chatList = document.getElementById("chat-list");
const chatScreen = document.getElementById("chat-screen");
const chatWithName = document.getElementById("chatWithName");
const chatMessages = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");

const profileBox = document.getElementById("profile-box");
const topUser = document.getElementById("top-user");
const topSubtitle = document.getElementById("top-subtitle");

let linhas = {};
let currentUser = null;
let userRoute = null;
let currentPeople = [];
let currentIndex = 0;
let currentChatKey = null;

// ====== PERFIS FALSOS PARA TESTE ======
const allPeople = [
  {
    id: "julia",
    name: "Júlia",
    idade: 23,
    objetivo: "Paquera",
    line: "Metrô - Linha 4-Amarela",
    entrada: "Luz",
    saida: "Pinheiros",
    bio: "Indo pra facul, amo café e música.",
    image: "https://randomuser.me/api/portraits/women/68.jpg"
  },
  {
    id: "carlos",
    name: "Carlos",
    idade: 28,
    objetivo: "Networking",
    line: "CPTM - Linha 9-Esmeralda",
    entrada: "Osasco",
    saida: "Pinheiros",
    bio: "TI e startups, sempre online.",
    image: "https://randomuser.me/api/portraits/men/44.jpg"
  },
  {
    id: "bia",
    name: "Beatriz",
    idade: 24,
    objetivo: "Tudo",
    line: "Metrô - Linha 1-Azul",
    entrada: "Vila Mariana",
    saida: "Sé",
    bio: "Séries, livros e boas conversas.",
    image: "https://randomuser.me/api/portraits/women/52.jpg"
  }
];

// ====== SPLASH ======
setTimeout(() => {
  if (splash) splash.style.display = "none";
}, 2500);

// ====== TROCA DE TELAS ======
function showWelcome(){
  welcomeScreen.classList.add("active");
  loginScreen.classList.remove("active");
  appScreen.classList.remove("active");
}

function showLogin(){
  welcomeScreen.classList.remove("active");
  loginScreen.classList.add("active");
  appScreen.classList.remove("active");
}

function showApp(){
  welcomeScreen.classList.remove("active");
  loginScreen.classList.remove("active");
  appScreen.classList.add("active");
}

// ====== LOGIN ======
function login(){
  const nome = loginNome.value.trim();
  const email = loginEmail.value.trim();
  const objetivo = loginObjetivo.value;
  const foto = loginFoto.value.trim();
  const bio = loginBio.value.trim();

  if(!nome || !email){
    alert("Preencha nome e email.");
    return;
  }

  currentUser = { nome, email, objetivo, foto, bio };
  localStorage.setItem("nextstopUser", JSON.stringify(currentUser));

  renderTopUser();
  renderProfileBox();
  showApp();
  initApp();
}

// ====== LOGOUT ======
function logout(){
  localStorage.removeItem("nextstopUser");
  localStorage.removeItem("nextstopRoute");
  location.reload();
}

// ====== PEGAR ESTAÇÕES DO JSON ======
fetch("estacoes.json")
  .then(res => res.json())
  .then(data => {
    linhas = data;
    populateLines();
  });

// ====== PREENCHER LINHAS ======
function populateLines(){
  linhaSelect.innerHTML = "<option value=''>Selecione a linha</option>";

  Object.keys(linhas).forEach(linha =>{
    const op = document.createElement("option");
    op.value = linha;
    op.textContent = linha;
    linhaSelect.appendChild(op);
  });
}

// ====== ATUALIZAR ESTAÇÕES ======
linhaSelect.addEventListener("change", ()=>{
  entradaSelect.innerHTML = "<option value=''>Entrada</option>";
  saidaSelect.innerHTML = "<option value=''>Saída</option>";

  const estacoes = linhas[linhaSelect.value] || [];

  estacoes.forEach(est => {
    const e1 = document.createElement("option");
    e1.value = est;
    e1.textContent = est;
    entradaSelect.appendChild(e1);

    const e2 = document.createElement("option");
    e2.value = est;
    e2.textContent = est;
    saidaSelect.appendChild(e2);
  });
});
