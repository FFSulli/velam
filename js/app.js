let map;
let stations = [];
let markers = [];
let selected;

let slides = ["../assets/images/slide1.svg", "../assets/images/slide2.svg", "../assets/images/slide3.svg", "../assets/images/slide4.svg"];
let slideshowTitles = ["Bienvenue sur Velam", "Choisissez une station", "Remplissez vos informations", "Récupérez votre vélo"];
let slideshowTexts = ["Découvrez la ville d'Amiens en réservant un vélo dans l'une de nos 26 stations.", "Sur la carte ci-dessous, cliquez sur un des marqueurs pour sélectionner la station de votre choix.", "Remplissez le formulaire de réservation, signez, votre réservation est effectuée !<p>Attention, vous ne pouvez effectuer qu'une seule réservation à la fois.</p>", "Une fois la réservation confirmée, vous avez 20 minutes pour récupérer votre vélo.<p>En cas d'imprévu, vous pouvez annuler la réservation à l'aide du bouton d'annulation prévu à cet effet.</p>"];

let slideshow = new Slider("slideshow", slides, slideshowTitles, slideshowTexts);
let user = new User(localStorage.getItem("userFirstName"), localStorage.getItem("userLastName"));

if (sessionStorage.getItem("reservationTime")) {
    let timer = 1200 - (Date.now() - sessionStorage.getItem("reservationTime")) / 1000;
    user.reservation = new Reservation(sessionStorage.getItem("reservationStation"), timer, bookedStation, bookedTimer)
    reservationSuccess.style.display = "block";
    reservationSection.style.display = "none";
}

signatureCanvas = new Canvas();
signatureCanvas.eventCanvas();

function initMap() {
    let map = new GoogleMap(49.893418, 2.293238, 15).map;
    let red = "../assets/icons/red.svg";
    let orange = "../assets/icons/orange.svg";
    let green = "../assets/icons/green.svg";

    fetchData().then(data => {
        for (i = 0; i < data.length; i++) {
            let station_data = data[i]
            let station = new Station(station_data.name, station_data.status, station_data.address, station_data.available_bikes, station_data.available_bike_stands, station_data.position.lat, station_data.position.lng)
            stations.push(station);

            let location = new google.maps.LatLng(station.lat, station.lng);
            let marker;

            if (station.availableBikes == 0) {
                marker = new google.maps.Marker({
                    position: location,
                    icon: red,
                    label: {
                        text: station.availableBikes.toString(),
                        color: "#ffffff"
                    },
                    map: map
                });
            } else if (station.availableBikes <= 5) {
                marker = new google.maps.Marker({
                    position: location,
                    icon: orange,
                    label: {
                        text: station.availableBikes.toString(),
                        color: "#ffffff"
                    },
                    map: map
                });
            } else {
                marker = new google.maps.Marker({
                    position: location,
                    icon: green,
                    label: {
                        text: station.availableBikes.toString(),
                        color: "#ffffff"
                    },
                    map: map
                })
            }
            markers.push(marker);
        }
        markers.forEach(function (marker, index) {
            marker.addListener('click', (function () {
                let station = stations[index];
                station.nameStation();
                station.statusStation();
                station.availableBikesStation();
                station.availableBikeStandsStation();
                station.availableBanking();
                selected = index;

                reservationDefault.style.display = "none";
                reservationSelected.style.display = "block";

                handleReservation();

            }))
        })
    })
}

