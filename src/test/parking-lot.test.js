const Car = require("../domain/car");
const ParkingLot = require("../domain/parking-lot");
const ParkingTicket = require("../domain/parking-ticket");

describe("ParkingLot", () => {
    it("should make a ticket with format 'TICKET-FOR-{CAR_PLATE}' when there are cars parked", () => {
        const capacityParkingLot = 2
        const parkingLot = new ParkingLot(capacityParkingLot)

        const car = new Car("B 1234 ABC");
        const parkingTicket = new ParkingTicket(`TICKET-FOR-${car.plate}`)

        parkingLot.park(car);

        const result = parkingLot.dataCar[parkingTicket.ticketNumber];
        const expectResult = car.plate;

        expect(result).toBe(expectResult);
    });

    it("should return 'Sorry, the parking lot is full' if the parking lot is full", () => {
        const capacityParkingLot = 2;
        const parkingLot = new ParkingLot(capacityParkingLot);

        const car = new Car("B 111 ABC");
        const car1 = new Car("B 222 ABC");
        const car2 = new Car("B 333 ABC");

        const parkingTicket = new ParkingTicket(`TICKET-FOR-${car.plate}`)

        parkingLot.park(car);
        parkingLot.park(car1);

        const result = parkingLot.park(car2);
        const expectResult = "Sorry, the parking lot is full";

        expect(result).toBe(expectResult);
    });
});
