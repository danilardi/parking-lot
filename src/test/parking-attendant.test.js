const Car = require("../domain/car");
const ParkingAttendant = require("../domain/parking-attendant");
const ParkingLot = require("../domain/parking-lot");

describe('ParkingAttendant', () => {
    it('should make a ticket with format "TICKET-FOR-{CAR_PLATE}" when there is a car parked', () => {
        const capacityParkingLot = 2;
        const parkingLot = new ParkingLot(capacityParkingLot);
        const car = new Car("B 111 B");
        const parkingAttendant = new ParkingAttendant([parkingLot]);

        const resultTicket = parkingAttendant.park(car);
        const expectedResultTicket = `TICKET-FOR-${car.plate}`;

        expect(resultTicket.ticketNumber).toBe(expectedResultTicket);
    });

    it('should be able to park in multiple parking lot', () => {
        const capacityParkingLot1 = 1;
        const capacityParkingLot2 = 1;
        const parkingLot1 = new ParkingLot(capacityParkingLot1);
        const parkingLot2 = new ParkingLot(capacityParkingLot2);
        const parkingLotList = [parkingLot1, parkingLot2]
        const parkingAttendant = new ParkingAttendant(parkingLotList);

        const car1 = new Car("B 111 B");
        const car2 = new Car("B 222 B");

        const parkingTicketFromAttendantCar1 = parkingAttendant.park(car1);
        const parkingTicketFromAttendantCar2 = parkingAttendant.park(car2);

        const expectedParkingTicketFromAttendantCar1 = `TICKET-FOR-${car1.plate}`;
        const expectedParkingTicketFromAttendantCar2 = `TICKET-FOR-${car2.plate}`;

        expect(parkingTicketFromAttendantCar1.ticketNumber).toBe(expectedParkingTicketFromAttendantCar1);
        expect(parkingTicketFromAttendantCar2.ticketNumber).toBe(expectedParkingTicketFromAttendantCar2);
    });

    it('should be able to unpark from multiple parking lot', () => {
        const capacityParkingLot1 = 1;
        const capacityParkingLot2 = 1;
        const parkingLot1 = new ParkingLot(capacityParkingLot1);
        const parkingLot2 = new ParkingLot(capacityParkingLot2);
        const parkingLotList = [parkingLot1, parkingLot2]
        const parkingAttendant = new ParkingAttendant(parkingLotList);

        const car1 = new Car("B 111 B");
        const car2 = new Car("B 222 B");

        const parkingTicketFromAttendantCar1 = parkingAttendant.park(car1);
        const parkingTicketFromAttendantCar2 = parkingAttendant.park(car2);

        const resultUnparkCar1 = parkingAttendant.unpark(parkingTicketFromAttendantCar1)
        const resultUnparkCar2 = parkingAttendant.unpark(parkingTicketFromAttendantCar2)

        const expectedResultUnparkCar1 = car1.plate;
        const expectedResultUnparkCar2 = car2.plate;

        expect(resultUnparkCar1.plate).toBe(expectedResultUnparkCar1);
        expect(resultUnparkCar2.plate).toBe(expectedResultUnparkCar2);
    });

    it('should return "Sorry, no parking available" when the parking is full', () => {
        const capacityParkingLot1 = 1;
        const capacityParkingLot2 = 1;
        const parkingLot1 = new ParkingLot(capacityParkingLot1);
        const parkingLot2 = new ParkingLot(capacityParkingLot2);
        const parkingLotList = [parkingLot1, parkingLot2]
        const parkingAttendant = new ParkingAttendant(parkingLotList);

        const car1 = new Car("B 111 B");
        const car2 = new Car("B 222 B");
        const car3 = new Car("B 333 B");

        parkingAttendant.park(car1);
        parkingAttendant.park(car2);
        const result = parkingAttendant.park(car3);
        const expectedResult = `Sorry, no parking available`;

        expect(result).toBe(expectedResult);
    });

    it('should return "Sorry, the car is already in the parking area" when the same car tries to park again', () => {
        const capacityParkingLot1 = 1;
        const capacityParkingLot2 = 1;
        const parkingLot1 = new ParkingLot(capacityParkingLot1);
        const parkingLot2 = new ParkingLot(capacityParkingLot2);
        const parkingLotList = [parkingLot1, parkingLot2]
        const parkingAttendant = new ParkingAttendant(parkingLotList);

        const car1 = new Car("B 111 B");
        const car2 = new Car("B 111 B");

        parkingAttendant.park(car1);
        const result = parkingAttendant.park(car2);

        const expectedResult = `Sorry, the car is already in the parking area`;

        expect(result).toBe(expectedResult);
    });

    it('should return "Your ticket is not valid" when your ticket is not valid', () => {
        const capacityParkingLot1 = 1;
        const capacityParkingLot2 = 1;
        const parkingLot1 = new ParkingLot(capacityParkingLot1);
        const parkingLot2 = new ParkingLot(capacityParkingLot2);
        const parkingLotList = [parkingLot1, parkingLot2]
        const parkingAttendant = new ParkingAttendant(parkingLotList);

        const result = parkingAttendant.unpark("hahahah")

        const expectedResult = "Your ticket is not valid";

        expect(result).toBe(expectedResult);
    });

    it('should run notify function when parking lot is full', () => {
        const capacityParkingLot = 1;
        const parkingLot = new ParkingLot(capacityParkingLot, "Parking Lot 1");

        const car1 = new Car("B 444 B")
        const parkingLotList = [parkingLot];

        const parkingAttendant = new ParkingAttendant(parkingLotList, "attendant 1");

        parkingAttendant.notifyLotFullListener = jest.fn();

        parkingAttendant.park(car1);
        
        expect(parkingAttendant.notifyLotFullListener).toHaveBeenCalled();
    });

    it('should run notify function when parking lot is avail', () => {
        const capacityParkingLot = 1;
        const parkingLot = new ParkingLot(capacityParkingLot, "Parking Lot 1");

        const car1 = new Car("B 444 B")

        const parkingLotList = [parkingLot];

        const parkingAttendant = new ParkingAttendant(parkingLotList, "attendant 1");

        parkingAttendant.notifyLotAvailListener = jest.fn();

        const ticket = parkingAttendant.park(car1);

        parkingAttendant.unpark(ticket);

        expect(parkingAttendant.notifyLotAvailListener).toHaveBeenCalled();
    });

});
