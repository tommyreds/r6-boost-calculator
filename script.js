// funzione per gestire 'l'apertura' della card
document.getElementById('card').addEventListener('click', function(event) {
    event.stopPropagation();
    if (!this.classList.contains('card-active')) {
        this.classList.add('card-active');
        this.classList.add('preCardText-disable');
    }
});

// funzione per gestire il bottone 'x' di chiusura
document.getElementById('closeBtn').addEventListener('click', function(event) {
    event.stopPropagation();
    document.getElementById('card').classList.remove('card-active');
});

// event listener per i bottoni
document.getElementById('calculateBtn').addEventListener('click', calculate);
document.getElementById('cancelBtn').addEventListener('click', clearAll);

function calculate() {
    let currentRank = parseInt(document.getElementById("currentRank").value);
    let desiredRank = parseInt(document.getElementById("desiredRank").value);
    let mmrPerGame = parseInt(document.getElementById("mmrPerGame").value);


    // Verifica che il rank desiderato e il rank attuale non sia vuoto
    if (currentRank == 0 || desiredRank == 0) {
        document.getElementById("gamesResult").innerHTML = "Error: invalid data.";
        document.getElementById("priceResult").innerHTML = null;
        return;
    }

    // Verifica che il rank desiderato non sia inferiore al rank attuale
    if (desiredRank <= currentRank) {
        document.getElementById("gamesResult").innerHTML = "Error: the desired rank must be higher than the actual rank.";
        document.getElementById("priceResult").innerHTML = null;
        return;
    }

    // Verifica che mmrPerGame sia un numero valido e maggiore di 0
    if ((isNaN(mmrPerGame) || mmrPerGame <= 0) || 120 < mmrPerGame) {
        document.getElementById("gamesResult").innerHTML = "Error: MMR per game invalid number.";
        document.getElementById("priceResult").innerHTML = null;
        return;
    }

    // Calcoliamo la differenza di MMR tra il rank attuale e il rank desiderato
    let mmrDifference = desiredRank - currentRank;


    // Calcoliamo il numero di partite necessarie e arrotondiamo per eccesso
    let gamesRequired = Math.ceil(mmrDifference / mmrPerGame);

    // Calcoliamo il prezzo e arrotondiamo per eccesso
    let price = Math.ceil(gamesRequired * 1.5);

    // Visualizziamo il risultato
    document.getElementById("gamesResult").innerHTML = `Total games: ${gamesRequired}`;
    document.getElementById("priceResult").innerHTML = `Price: € ${price}`;
}

function clearAll() {
    // Resetta i risultati visualizzati
    document.getElementById("gamesResult").innerHTML = null;
    document.getElementById("priceResult").innerHTML = null;

    // Resetta il valore della select "currentRank"
    document.getElementById("currentRank").selectedIndex = 0;

    // Resetta il valore della select "desiredRank"
    document.getElementById("desiredRank").selectedIndex = 0;

    // Resetta il valore dell'input "mmrPerGame"
    document.getElementById("mmrPerGame").value = "";
}
