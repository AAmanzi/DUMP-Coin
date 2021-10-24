const tecaj = 0.123
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
]

let stanjeRacuna = 500
const transakcije = [
  {
    osoba: 'Ante',
    iznos: 10.25,
    vrijemeIDatum: '23/10/2021, 22:56:55',
    jeLiIzlazna: false
  },
  {
    osoba: 'Kreso',
    iznos: 4.45,
    vrijemeIDatum: '23/10/2021, 10:23:34',
    jeLiIzlazna: true
  }
];

function dohvatiPoslaneTransakcije() {
  const dohvaceneTransakcije = []

  for (const transakcija of transakcije) {
    if (transakcija.jeLiIzlazna) {
      dohvaceneTransakcije.push(transakcija)
    }
  }

  return dohvaceneTransakcije
}

function dohvatiPrimljeneTransakcije() {
  const dohvaceneTransakcije = []

  for (const transakcija of transakcije) {
    if (!transakcija.jeLiIzlazna) {
      dohvaceneTransakcije.push(transakcija)
    }
  }

  return dohvaceneTransakcije
}

function preracunajIznos (iznos, valuta) {
  if (valuta === 'hrk') {
    return iznos * tecaj
  } else if (valuta === 'dc') {
    return iznos / tecaj
  } else {
    console.log('Krivo pozvana funkcija')
  }
}

function posaljiDumpCoin (iznos, osoba) {
  if (iznos > stanjeRacuna) {
    return 'Nedovoljno stanje na racunu'
  }

  stanjeRacuna -= iznos

  const novaTransakcija = {
    osoba: osoba,
    iznos: iznos,
    vrijemeIDatum: (new Date()).toLocaleString(),
    jeLiIzlazna: true
  }

  transakcije.push(novaTransakcija)

  return 'Uspjesno poslano' + iznos + 'DUMP Coina'
}

function zatraziDumpCoin (iznos, osoba) {
  const hoceLiOsobaPoslat = Math.floor(Math.random() * 2) === 0

  if (!hoceLiOsobaPoslat) {
    return 'Osoba je odbila poslati' + iznos + 'DUMP Coina'
  }

  const novaTransakcija = {
    osoba: osoba,
    iznos: iznos,
    vrijemeIDatum: (new Date()).toLocaleString(),
    jeLiIzlazna: false
  }

  transakcije.push(novaTransakcija)

  return 'Uspjesno primljeno' + iznos + 'DUMP Coina'
}
