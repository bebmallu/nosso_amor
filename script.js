const senhaCorreta = "TANAJURA";

const botao = document.getElementById("botaoAbrir");
const inputSenha = document.getElementById("senha");
const mensagem = document.getElementById("mensagem");
const tempo = document.getElementById("tempo");

botao.addEventListener("click", abrirPresente);

inputSenha.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    abrirPresente();
  }
});

function abrirPresente() {
  const senhaDigitada = inputSenha.value.trim().toUpperCase();

  if (senhaDigitada !== senhaCorreta) {
    mensagem.textContent = "Senha errada meu bem 💔";
    return;
  }

  mensagem.textContent = "Abrindo seu presente... ❤️";

  window.location.href = "index2.html";
}

function atualizarContador() {
  const agora = new Date();
  const anoAtual = agora.getFullYear();

  let dataAlvo = new Date(anoAtual, 6, 11, 0, 0, 0);

  if (agora > dataAlvo) {
    dataAlvo = new Date(anoAtual + 1, 6, 11, 0, 0, 0);
  }

  const diferenca = dataAlvo - agora;

  const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferenca / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diferenca / (1000 * 60)) % 60);
  const segundos = Math.floor((diferenca / 1000) % 60);

  tempo.textContent =
    `${dias} dias, ${horas} horas, ${minutos} minutos e ${segundos} segundos`;
}

atualizarContador();
setInterval(atualizarContador, 1000);

for(let i = 0; i < fotos.length; i += 3){

    const trio = document.createElement("div");
    trio.className = "trio";

    fotos.slice(i, i + 3).forEach(foto => {

        const img = document.createElement("img");
        img.src = foto;

        trio.appendChild(img);

    });

    galeria.appendChild(trio);
}