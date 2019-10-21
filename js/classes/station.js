// Configuration des messages d'informations

let infoMessages = new Map()
infoMessages.set("status", {
    html: document.getElementById("status"),
    reservation: document.getElementById("reservationForm"),
    lastAvailable: "Station en service",
    available: "Station en service",
    unavailable: "Station hors-service",
})

infoMessages.set("bikes", {
    html: document.getElementById("availableBikes"),
    reservation: document.getElementById("reservationForm"),
    lastAvailable: " vélo disponible",
    available: " vélos disponibles",
    unavailable: "Aucun vélo disponible"
})

infoMessages.set("slots", {
    html: document.getElementById("availableBikeStands"),
    reservation: document.getElementById("reservationForm"),
    lastAvailable: " emplacement libre",
    available: " emplacements libres",
    unavailable: "Aucun emplacement libre"
})

infoMessages.set("payment", {
    html: document.getElementById("availableBanking"),
    reservation: document.getElementById("reservationForm"),
    lastAvailable: "Terminal de paiement disponible",
    available: "Terminal de paiement disponible",
    unavailable: "Aucun terminal de paiement disponible"
})

// Construction de l'objet Station

class Station {
    constructor(name, status, address, availableBikes, availableBikeStands, lat, lng) {
        this.name = name;
        this.status = status === "OPEN";
        this.address = address;
        this.availableBikes = availableBikes;
        this.availableBikeStands = availableBikeStands;
        this.lat = lat;
        this.lng = lng;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        if (typeof value === "string")
            this._name = value;
    }

    get status() {
        return this._status;
    }

    set status(value) {
        if (typeof value === "string")
            this._status = value;
    }

    get address() {
        return this._address;
    }

    set address(value) {
        if (typeof value === "string")
            this._address = value;
    }

    get availableBikes() {
        return this._availableBikes;
    }

    set availableBikes(value) {
        if (typeof value === "number" && value >= 0)
            this._availableBikes = value;
    }

    get availableBikeStands() {
        return this._availableBikeStands;
    }

    set availableBikeStands(value) {
        if (typeof value === "number" && value >= 0)
            this._availableBikeStands = value;
    }

    get lat() {
        return this._lat;
    }

    set lat(value) {
        if (typeof value === "number")
            this._lat = value;
    }

    get lng() {
        return this._lng;
    }

    set lng(value) {
        if (typeof value === "number")
            this._lng = value;
    }

    setAvailability(key, value) {
        if (value < 1) {
            infoMessages.get(key).html.innerHTML = infoMessages.get(key).unavailable
            infoMessages.get(key).html.style.backgroundColor = "#c8c6ba"
            infoMessages.get(key).html.style.color = "#949494"
            infoMessages.get(key).html.style.display = "inline-block"
        }
        else if (value == 1) {
            infoMessages.get(key).html.innerHTML = infoMessages.get(key).lastAvailable
            if (key == "bikes" || key == "slots") {
                infoMessages.get(key).html.innerHTML = value + infoMessages.get(key).lastAvailable
            }
            infoMessages.get(key).html.style.backgroundColor = "#F5C179"
            infoMessages.get(key).html.style.color = "#ffffff"
            infoMessages.get(key).html.style.display = "inline-block"
            infoMessages.get(key).reservation.style.display = "block"
        }
        else if (value < 6) {
            infoMessages.get(key).html.innerHTML = infoMessages.get(key).available
            if (key == "bikes" || key == "slots") {
                infoMessages.get(key).html.innerHTML = value + infoMessages.get(key).available
            }
            infoMessages.get(key).html.style.backgroundColor = "#F5C179"
            infoMessages.get(key).html.style.color = "#ffffff"
            infoMessages.get(key).html.style.display = "inline-block"
            infoMessages.get(key).reservation.style.display = "block"
        }
        else {
            infoMessages.get(key).html.innerHTML = infoMessages.get(key).available
            if (key == "bikes" || key == "slots") {
                infoMessages.get(key).html.innerHTML = value + infoMessages.get(key).available
            }
            infoMessages.get(key).html.style.backgroundColor = "#40BD58"
            infoMessages.get(key).html.style.color = "#ffffff"
            infoMessages.get(key).html.style.display = "inline-block"
            infoMessages.get(key).reservation.style.display = "block"
        }
    }
    nameStation() {
        stationHTML.innerHTML = this.name;
    }
    statusStation() {
        this.setAvailability("status", this.status)
    }
    availableBikesStation() {
        this.setAvailability("bikes", this.availableBikes)
    }
    availableBikeStandsStation() {
        this.setAvailability("slots", this.availableBikeStands)
    }
    availableBanking() {
        this.setAvailability("payment", this.stationAvailableBanking)
    }
}