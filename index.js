const tecaj = 0.123;
const kontakti = [
  'Anita',
  'Ante',
  'Bruna',
  'Duje',
  'Frane',
  'Ivan',
  'Ivana',
  'Josip',
  'Kreso',
  'Luka',
  'Mate',
  'Matea'
];

let stanjeRacuna;
let transakcije = [];

const stanjeRacunaSpremljeno = localStorage.getItem('stanjeRacuna');

if(stanjeRacunaSpremljeno !== null) {
  stanjeRacuna = JSON.parse(stanjeRacunaSpremljeno);
} else {
  stanjeRacuna = 500;
}

const transakcijeSpremljeno = localStorage.getItem('transakcije');

if(transakcijeSpremljeno !== null) {
  transakcije = JSON.parse(transakcijeSpremljeno);
}

function dohvatiPoslaneTransakcije() {
  const dohvaceneTransakcije = [];

  for (const transakcija of transakcije) {
    if (transakcija.jeLiIzlazna) {
      dohvaceneTransakcije.push(transakcija);
    }
  }

  return dohvaceneTransakcije;
}

function dohvatiPrimljeneTransakcije() {
  const dohvaceneTransakcije = [];

  for (const transakcija of transakcije) {
    if (!transakcija.jeLiIzlazna) {
      dohvaceneTransakcije.push(transakcija);
    }
  }

  return dohvaceneTransakcije;
}

function preracunajIznos(iznos, valuta) {
  if (valuta === 'dc') {
    return iznos * tecaj;
  } else if (valuta === 'hrk') {
    return iznos / tecaj;
  } else {
    alert('Krivo pozvana funkcija');
  }
}

function posaljiDumpCoin(iznos, osoba) {
  if (iznos > stanjeRacuna) {
    return 'Nedovoljno stanje na racunu';
  }

  stanjeRacuna = stanjeRacuna - iznos;

  const novaTransakcija = {
    osoba: osoba,
    iznos: iznos,
    vrijemeIDatum: (new Date()).toLocaleString(),
    jeLiIzlazna: true
  };

  transakcije.push(novaTransakcija);

  return 'Uspjesno poslano' + iznos + 'DUMP Coina';
}

function zatraziDumpCoin(iznos, osoba) {
  const hoceLiOsobaPoslat = Math.floor(Math.random() * 2) === 0;

  if (!hoceLiOsobaPoslat) {
    return 'Osoba je odbila poslati' + iznos + 'DUMP Coina';
  }

  const novaTransakcija = {
    osoba: osoba,
    iznos: iznos,
    vrijemeIDatum: (new Date()).toLocaleString(),
    jeLiIzlazna: false
  };

  transakcije.push(novaTransakcija);

  return 'Uspjesno primljeno' + iznos + 'DUMP Coina';
}

function main() {
  const elementStanjaRacuna = document.querySelector('.racun-stanje');
  elementStanjaRacuna.innerHTML = stanjeRacuna + ' DC';

  const elementListeSvihTransakcija = document.querySelector('.lista-svih-transakcija');
  const elementListePoslanihTransakcija = document.querySelector('.lista-poslanih-transakcija');
  const elementListePrimljenihTransakcija = document.querySelector('.lista-primljenih-transakcija');

  let elementListeTransakcija;
  let transakcijeZaIspis;

  if(elementListeSvihTransakcija !== null){
    elementListeTransakcija = elementListeSvihTransakcija;
    transakcijeZaIspis = transakcije;
  } else if (elementListePoslanihTransakcija !== null) {
    elementListeTransakcija = elementListePoslanihTransakcija;
    transakcijeZaIspis = dohvatiPoslaneTransakcije();
  }else if (elementListePrimljenihTransakcija !== null) {
    elementListeTransakcija = elementListePrimljenihTransakcija;
    transakcijeZaIspis = dohvatiPrimljeneTransakcije();
  }

  elementListeTransakcija.innerHTML = '';

  for (let transakcija of transakcijeZaIspis) {
    let elementTransakcije = '<div class="transakcija">'
     + '<img src="slike/' + transakcija.osoba + '.png" class="transakcija-slika" />'
     + '<div>'
     + '<p class="transakcija-ime-osobe">' + transakcija.osoba + '</p>'
     + '<p class="transakcija-iznos">';

    if (transakcija.jeLiIzlazna) {
      elementTransakcije = elementTransakcije 
      + 'Poslano <span class="crveno">- ' + transakcija.iznos + ' DC</span>';
    } else {
      elementTransakcije = elementTransakcije 
      + 'Primljeno <span class="zeleno">+ ' + transakcija.iznos + ' DC</span>';
    }

    elementTransakcije = elementTransakcije
     + '</p>'
     + '</div>'
     + '<p class="transakcija-vrijeme">' + transakcija.vrijemeIDatum + '</p>'
     + '</div>';

     elementListeTransakcija.innerHTML = elementListeTransakcija.innerHTML + elementTransakcije;
  }

  const elementSelect = document.querySelector('.select');
  elementSelect.innerHTML = '';

  for (const kontakt of kontakti) {
    const noviKontakt = '<option value="' + kontakt + '">' + kontakt + '</option>';

    elementSelect.innerHTML = elementSelect.innerHTML + noviKontakt;
  }
}

main();

function promjenaInputaKuna() {
  const elementInputKune = document.querySelector('.input-kune');
  const elementInputDc = document.querySelector('.input-dc');

  const iznosUDc = preracunajIznos(elementInputKune.value, 'dc');

  elementInputDc.value = iznosUDc;
}

function promjenaInputaDc() {
  const elementInputKune = document.querySelector('.input-kune');
  const elementInputDc = document.querySelector('.input-dc');

  const iznosUKunama = preracunajIznos(elementInputDc.value, 'hrk');

  elementInputKune.value = iznosUKunama;
}

function klikBotunaPosalji() {
  const elementInputaDc = document.querySelector('.input-posalji-dc');
  const elementSelect = document.querySelector('.select');

  const poruka = posaljiDumpCoin(elementInputaDc.value, elementSelect.value);
  const elementPoruka = document.querySelector('.poruka');

  elementPoruka.innerHTML = poruka;

  main();

  localStorage.setItem('stanjeRacuna', stanjeRacuna);
  localStorage.setItem('transakcije', JSON.stringify(transakcije));
}

function klikBotunaZatrazi() {
  const elementInputaDc = document.querySelector('.input-zatrazi-dc');
  const elementSelect = document.querySelector('.select');

  const poruka = zatraziDumpCoin(elementInputaDc.value, elementSelect.value);
  const elementPoruka = document.querySelector('.poruka');

  elementPoruka.innerHTML = poruka;

  main();

  localStorage.setItem('stanjeRacuna', stanjeRacuna);
  localStorage.setItem('transakcije', JSON.stringify(transakcije));
}