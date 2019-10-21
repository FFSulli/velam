// Déclaration des variables

let stationHTML = document.getElementById("stationName");
let displayMap = document.getElementById("map")
let reservationContainer = document.getElementById("reservationContainer");
let reservationDefault = document.getElementById("reservationDefault");
let reservationSelected = document.getElementById("reservationSelected");
let reservationSection = document.getElementById("reservationSection");
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let submitReservationButton = document.getElementById("submitReservationButton");
let reservationSuccess = document.getElementById("reservationSuccess");
let bookedStation = document.getElementById("bookedStation");
let bookedTimer = document.getElementById('bookedTimer');
let confirmedReservationTitle = document.getElementById("confirmedReservationTitle");
let confirmedReservationMessage = document.getElementById("confirmedReservationMessage");
let cancelReservationButton = document.getElementById("cancelReservationButton");
let minutes = 0;
let seconds = 0;

// Récupération des données via l'application JC DECAUX

const fetchData = async function () {
    let dataURL = "https://api.jcdecaux.com/vls/v1/stations?contract=amiens&apiKey=4cb8707fc70c97865d22d1324513f8e6464ed37b";

    try {
        let response = await fetch(dataURL)
        if (response.ok) {
            return response.json()
        }
        else {
            console.error('Retour du serveur : ', response.status)
        }
    } catch (e) {
        console.log(e);
    }
}

// Gestion de la réservation

function buttonStatus() {

    let checkInput = document.getElementsByClassName("checkInput");

    if (stations[selected].availableBikes == "0") {
        submitReservationButton.disabled = true;
    } else {
        submitReservationButton.disabled = false;
    }

    for (j = 0; j < checkInput.length; j++) {
        if (checkInput[j].value === "") {
            submitReservationButton.disabled = true;
        }
        else {
            submitReservationButton.disabled = false;
        }
    }
}

function handleReservation() {

    submitReservationButton.onclick = function () {
        marker = markers[selected];
        station = stations[selected];

        user.firstName = firstName.value;
        user.lastName = lastName.value;

        reservationSection.style.display = "none";
        reservationSuccess.style.display = "block";

        sessionStorage.setItem("reservationTime", Date.now());
        sessionStorage.setItem("reservationStation", station.name);

        user.reservation = new Reservation(station.name, 1200, bookedStation, bookedTimer)
    };
}

cancelReservationButton.onclick = function () {
    sessionStorage.clear();
    user.reservation.clearTimer();

    reservationSuccess.style.display = "none";
    firstName.value = "";
    lastName.value = "";
    reservationSection.style.display = "block";
    signatureCanvas.clearCanvas();
}

