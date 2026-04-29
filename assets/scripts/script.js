const btnReset = document.querySelector(".resetar");
const btnEmbaralhar = document.querySelector(".embaralhar");
const cards = document.querySelectorAll(".card");

let cartasViradas = []; // guarda as cartas viradas
let pontos = 0;         // pontuação do jogador
let bloqueado = false;  // trava os cliques enquanto verifica o par

//========================================================================================//

// função de virar as cartas e verificar par
cards.forEach((card) => {
  card.addEventListener("click", () => {
    if (bloqueado) return;                    // se tiver bloqueado, nao faz nada
    if (cartasViradas.includes(card)) return; // se clicar no mesmo card, nao faz nada

    card.classList.add("virado");        // vira o card
    cartasViradas.push(card);            // guarda o card na lista

    if (cartasViradas.length === 2) {    // so verifica quando tiver 2 cards virados
      bloqueado = true;

      const img1 = cartasViradas[0].querySelector(".back img").src; // pega a imagem do 1º card
      const img2 = cartasViradas[1].querySelector(".back img").src; // pega a imagem do 2º card

      if (img1 === img2) {
        // acertou! as cartas ficam abertas e ganha ponto
        pontos++;
        document.querySelector(".pontos").textContent = "pontuação: " + pontos;
        cartasViradas[0].classList.add("correct"); // borda verde no 1º card
        cartasViradas[1].classList.add("correct"); // borda verde no 2º card
        cartasViradas = [];
        bloqueado = false;
      } else {
        // errou! as cartas desviram depois de 1 segundo
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

// função de embaralhar
function embaralhar(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const e = Math.floor(Math.random() * (i + 1));
    [array[i], array[e]] = [array[e], array[i]]; // troca os elementos de lugar
  }
  return array;
}

btnEmbaralhar.addEventListener("click", () => {
  cards.forEach((card) => {
    const ordemAleatoria = Math.floor(Math.random() * 10); // numero aleatorio entre 0 e 9
    card.style.order = ordemAleatoria; // muda a ordem visual do card
    card.classList.remove("virado");   // desvira todos os cards
    card.classList.remove("correct");  // remove a borda verde
  });

  pontos = 0;         // reseta a pontuação
  cartasViradas = []; // reseta as cartas viradas
  document.querySelector(".pontos").textContent = "pontuação: 0"; // reseta o texto
});