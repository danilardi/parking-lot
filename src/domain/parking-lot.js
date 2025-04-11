const Car = require("./car");
const ParkingTicket = require("./parking-ticket");

class ParkingLot {
    #dataCars;

    constructor(capacity, parkingLotName = "") {
        this.capacity = capacity;
        this.parkingLotName = parkingLotName
        this.#dataCars = {};
        this.observer = [];
    }

    park(car) {
        if (!car instanceof Car) {
            return "Sorry, the vehicle is not valid";
        }
        if (this.isCarAlreadyParked(car)) {
            return "Sorry, the car is already in the parking area";
        }
        if (Object.keys(this.#dataCars).length < this.capacity) {
            const parkingTiket = new ParkingTicket(`TICKET-FOR-${car?.plate}`);
            this.#dataCars[parkingTiket.ticketNumber] = car;
            if (this.isLotFull()) {
                this.notifyParkingLotIsFullToAttendant();
            }
            return parkingTiket;
        }
        return "Sorry, the parking lot is full";
    }

    unpark(ticket) {
        const car = this.#dataCars[ticket.ticketNumber];
        if (car) {
            if(this.isLotFull()) {
                this.notifyParkingLotIsAvailToAttendant();
            } 
            delete this.#dataCars[ticket.ticketNumber];
            return car;
        }
        return "Your ticket is not valid";
    }

    isLotFull() {
        return Object.keys(this.#dataCars).length == this.capacity;
    }

    isCarAlreadyParked(car) {
        return Object.values(this.#dataCars).some(dataCar => dataCar.plate === car.plate);
    }

    subscribe(attendant) {
        this.observer.push(attendant);
    }

    unsubscribe(attendant) {
        this.observer = this.observer.filter(observer => observer !== attendant);
    }

    notifyParkingLotIsFullToAttendant() {
        this.observer.forEach(attendant => attendant.notifyLotFullListener(this));
    }

    notifyParkingLotIsAvailToAttendant() {
        this.observer.forEach(attendant => attendant.notifyLotAvailListener(this));
    }
}

module.exports = ParkingLot