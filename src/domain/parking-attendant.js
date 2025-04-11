const Car = require("./car");

class ParkingAttendant {
    constructor(parkingLotList = [], name = "") {
        this.name = name;
        this.parkingLotList = parkingLotList;
        this.availParkingLots = parkingLotList;
        parkingLotList.forEach(parkingLot => parkingLot.subscribe(this));
    }

    park(car) {
        if (this.parkingLotList.some(parkingLot => parkingLot.isCarAlreadyParked(car))) {
            return "Sorry, the car is already in the parking area";
        }
        if (this.availParkingLots.length > 0) {
            return this.availParkingLots[0].park(car);
        }
        return "Sorry, no parking available";
    }

    unpark(ticket) {
        for (const parkingLot of this.parkingLotList) {
            const car = parkingLot.unpark(ticket);
            if (car instanceof Car) {
                return car;
            }
        }
        return "Your ticket is not valid";
    }

    notifyLotFullListener(parkingLot) {
        this.availParkingLots = this.availParkingLots.filter(parkingLotItem => parkingLotItem !== parkingLot);
    }

    notifyLotAvailListener(parkingLot) {
        this.availParkingLots.push(parkingLot)
    }
}

module.exports = ParkingAttendant