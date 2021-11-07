function promjenaInputa() {
  const elementInput = document.querySelector('.input');
  const elementParagraf = document.querySelector('.paragraf');

  elementParagraf.innerHTML = elementInput.value;
}

let broj = 0;

function klikBotuna() {
  broj = broj + 1;

  const elementParagrafDva = document.querySelector('.paragraf-2');

  elementParagrafDva.innerHTML = broj;
}