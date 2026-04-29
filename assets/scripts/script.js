
//função pa virar as cartas
const cards = document.querySelectorAll('.card')

cards.forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('virado');
  });
});