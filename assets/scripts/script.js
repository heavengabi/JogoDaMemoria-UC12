const btnReset = document.querySelector(".resetar");
const cards = document.querySelectorAll(".card");

let cartasViradas = []; // guarda as cartas viradas
let pontos = 0; // pontuação do jogador
let bloqueado = false; // trava os cliques enquanto verifica o par
let tentativas = 0;
//========================================================================================//

// função de virar as cartas e verificar par
cards.forEach((card) => {
  card.addEventListener("click", () => {
    if (bloqueado) return; // se tiver bloqueado, nao faz nada
    if (cartasViradas.includes(card)) return; // se clicar no mesmo card, nao faz nada

    card.classList.add("virado"); // vira o card
    cartasViradas.push(card); // guarda o card na lista

    if (cartasViradas.length === 2) {
      // so verifica quando tiver 2 cards virados
      bloqueado = true;
      tentativas++;
      document.querySelector(".jogadas").textContent = "jogadas: " + tentativas;

      const img1 = cartasViradas[0].querySelector(".back img").src; // pega a imagem do primeiro card
      const img2 = cartasViradas[1].querySelector(".back img").src; // pega a imagem do segundo card
      if (img1 === img2) {
        // se acertou as cartas ficam abertas e ganha ponto
        pontos++;
        document.querySelector(".pontos").textContent = "pontuação: " + pontos;
        cartasViradas[0].classList.add("correct"); // borda verde no 1 card
        cartasViradas[1].classList.add("correct"); // borda verde no 2 card
        cartasViradas = [];
        bloqueado = false;
      } else {
        // se errou as cartas desviram depois de 1 segundo
        setTimeout(() => {
          cartasViradas[0].classList.remove("virado");
          cartasViradas[1].classList.remove("virado");
          cartasViradas = [];
          bloqueado = false;
        }, 1000);
      }
    }
  });
});

//========================================================================================//
//funcao que eu reutilizo em dois lugares
function embaralharCards() {
  cards.forEach((card) => {
    const ordemAleatoria = Math.floor(Math.random() * 10); // numero aleatorio entre 0 e 9
    card.style.order = ordemAleatoria; // muda a ordem visual do card
    card.classList.remove("virado"); // desvira todos os cards
    card.classList.remove("correct"); // remove a borda verde
  });

  bloqueado = false;
  tentativas = 0;
  pontos = 0; // reseta a pontuação
  cartasViradas = []; // reseta as cartas viradas
  document.querySelector(".pontos").textContent = "pontuação: 0"; // reseta o texto
  document.querySelector(".jogadas").textContent = "jogadas: 0";
}

//========================================================================================//

//chama a mesma funcao em lugares diferentes 
// uma quando clica no botao de começar ou quando reinicia a pagina
//  e outra quando clica no botao de resetar
window.addEventListener("load", embaralharCards)
btnReset.addEventListener('click', embaralharCards)

