// Construction de l'objet Reservation

class Reservation {
    constructor(stationName, duration, bookedStationHTML, bookedTimerHTML) {
        this.stationName = stationName;
        this.duration = duration;
        this.timer = this.startTimer(bookedTimerHTML);
        bookedStationHTML.innerHTML = stationName;
    }
    get stationName() {
        return this._stationName;
    }
    set stationName(value) {
        if (typeof value === "string")
            this._stationName = value;
    }
    startTimer(bookedTimerHTML) {
        let self = this;
        return setInterval(function () {
            minutes = parseInt(self.duration / 60, 10);
            seconds = parseInt(self.duration % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            bookedTimerHTML.textContent = minutes + " minute(s) et " + seconds + " seconde(s)";

            if (self.duration - 1 > 0) {
                self.duration--
            } else {
                confirmedReservationTitle.innerHTML = "Réservation expirée"
                confirmedReservationMessage.textContent = "Merci d'effectuer une nouvelle réservation."
                cancelReservationButton.textContent = "Nouvelle réservation"
            }
        }, 1000);
    }
    clearTimer() {
        clearInterval(this.timer);
    }
}