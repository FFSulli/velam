// Construction de l'objet User

class User {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.reservation = null;
    }
    get firstName() {
        return this._firstName;
    }
    set firstName(value) {
        if (typeof value === "string") {
            this._firstName = value;
            localStorage.setItem("userFirstName", value);
        }
    }
    get lastName() {
        return this._lastName;
    }
    set lastName(value) {
        if (typeof value === "string") {
            this._lastName = value;
            localStorage.setItem("userLastName", value);
        }
    }
}