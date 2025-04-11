const Car = require("../domain/car");
const ParkingAttendant = require("../domain/parking-attendant");
const ParkingLot = require("../domain/parking-lot");
const ParkingTicket = require("../domain/parking-ticket");

describe("ParkingLot", () => {
    it("should make a ticket with format 'TICKET-FOR-{CAR_PLATE}' when there are cars parked", () => {
        const capacityParkingLot = 2
        const parkingLot = new ParkingLot(capacityParkingLot)

        const car = new Car("B 1234 ABC");

        const result = parkingLot.park(car);
        const expectedResult = new ParkingTicket(`TICKET-FOR-${car.plate}`)

        expect(result.ticketNumber).toBe(expectedResult.ticketNumber);
    });

    it("should return 'Sorry, the vehicle is not valid' if the vehicle is not car", () => {
        const capacityParkingLot = 1;
        const parkingLot = new ParkingLot(capacityParkingLot);

        const car1 = "B 444 B"
        const result = parkingLot.park(car1);
        const expectedResult = "Sorry, the vehicle is not valid"
        expect(result).toBe(expectedResult);
    });

    it("should return 'Sorry, the car is already in the parking area' if the vehicle is not car", () => {
        const capacityParkingLot = 1;
        const parkingLot = new ParkingLot(capacityParkingLot);

        const car1 = new Car("B 444 B")
        parkingLot.park(car1);
        const result = parkingLot.park(car1);
        const expectedResult = "Sorry, the car is already in the parking area"
        expect(result).toBe(expectedResult);
    });

    it("should return 'Sorry, the parking lot is full' if the parking lot is full", () => {
        const capacityParkingLot = 1;
        const parkingLot = new ParkingLot(capacityParkingLot);

        const car = new Car("B 111 ABC");
        const car1 = new Car("B 222 ABC");

        const parkingTicket = new ParkingTicket(`TICKET-FOR-${car.plate}`)

        parkingLot.park(car);
        parkingLot.park(car1);

        const result = parkingLot.park(car1);
        const expectResult = "Sorry, the parking lot is full";

        expect(result).toBe(expectResult);
    });

    it('should call notify to all attendant function when parking lot is full', () => {
        const capacityParkingLot = 1;
        const parkingLot = new ParkingLot(capacityParkingLot);

        const car1 = new Car("B 444 B")
        const mockAttendant = {
            notifyLotFullListener: jest.fn(),
        }

        parkingLot.subscribe(mockAttendant);

        parkingLot.park(car1);

        expect(mockAttendant.notifyLotFullListener).toHaveBeenCalled();
    });

    it('should call notify to all attendant function when parking lot is avail', () => {
        const capacityParkingLot = 1;
        const parkingLot = new ParkingLot(capacityParkingLot);

        const car1 = new Car("B 444 B")
        const mockAttendant = {
            notifyLotFullListener: jest.fn(),
            notifyLotAvailListener: jest.fn(),
        }

        parkingLot.subscribe(mockAttendant);

        const ticket = parkingLot.park(car1);
        parkingLot.unpark(ticket);

        expect(mockAttendant.notifyLotAvailListener).toHaveBeenCalled();
    });
});
