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
        const capacityParkingLot2 = 3;
        const capacityParkingLot3 = 2;
        const parkingLot1 = new ParkingLot(capacityParkingLot1);
        const parkingLot2 = new ParkingLot(capacityParkingLot2);
        const parkingLot3 = new ParkingLot(capacityParkingLot3);
        const parkingLotList = [parkingLot1, parkingLot2, parkingLot3]
        const parkingAttendant = new ParkingAttendant(parkingLotList);

        const car1 = new Car("B 111 B");
        const car2 = new Car("B 222 B");
        const car3 = new Car("B 333 B");

        const parkingTicketFromAttendantCar1 = parkingAttendant.park(car1);
        const parkingTicketFromAttendantCar2 = parkingAttendant.park(car2);
        const parkingTicketFromAttendantCar3 = parkingAttendant.park(car3);

        const expectedParkingTicketFromAttendantCar1 = `TICKET-FOR-${car1.plate}`;
        const expectedParkingTicketFromAttendantCar2 = `TICKET-FOR-${car2.plate}`;
        const expectedParkingTicketFromAttendantCar3 = `TICKET-FOR-${car3.plate}`;

        expect(parkingTicketFromAttendantCar1.ticketNumber).toBe(expectedParkingTicketFromAttendantCar1);
        expect(parkingTicketFromAttendantCar2.ticketNumber).toBe(expectedParkingTicketFromAttendantCar2);
        expect(parkingTicketFromAttendantCar3.ticketNumber).toBe(expectedParkingTicketFromAttendantCar3);
    });

    it('should be able to unpark from multiple parking lot', () => {
        const capacityParkingLot1 = 1;
        const capacityParkingLot2 = 3;
        const capacityParkingLot3 = 2;
        const parkingLot1 = new ParkingLot(capacityParkingLot1);
        const parkingLot2 = new ParkingLot(capacityParkingLot2);
        const parkingLot3 = new ParkingLot(capacityParkingLot3);
        const parkingLotList = [parkingLot1, parkingLot2, parkingLot3]
        const parkingAttendant = new ParkingAttendant(parkingLotList);

        const car1 = new Car("B 111 B");
        const car2 = new Car("B 222 B");
        const car3 = new Car("B 333 B");
        const car4 = new Car("B 444 B");

        const parkingTicketFromAttendantCar1 = parkingAttendant.park(car1);
        const parkingTicketFromAttendantCar2 = parkingAttendant.park(car2);
        const parkingTicketFromAttendantCar3 = parkingAttendant.park(car3);
        const parkingTicketFromAttendantCar4 = parkingAttendant.park(car4);

        const resultUnparkCar3 = parkingAttendant.unpark(parkingTicketFromAttendantCar3)
        const resultUnparkCar1 = parkingAttendant.unpark(parkingTicketFromAttendantCar1)
        const resultUnparkCar2 = parkingAttendant.unpark(parkingTicketFromAttendantCar2)
        const resultUnparkCar4 = parkingAttendant.unpark(parkingTicketFromAttendantCar4)

        const expectedResultUnparkCar1 = car1.plate;
        const expectedResultUnparkCar2 = car2.plate;
        const expectedResultUnparkCar3 = car3.plate;
        const expectedResultUnparkCar4 = car4.plate;

        expect(resultUnparkCar3.plate).toBe(expectedResultUnparkCar3);
        expect(resultUnparkCar1.plate).toBe(expectedResultUnparkCar1);
        expect(resultUnparkCar2.plate).toBe(expectedResultUnparkCar2);
        expect(resultUnparkCar4.plate).toBe(expectedResultUnparkCar4);
    });

    it('should return "Sorry, no parking available" when the parking is full', () => {
        const capacityParkingLot1 = 1;
        const capacityParkingLot2 = 1;
        const capacityParkingLot3 = 1;
        const parkingLot1 = new ParkingLot(capacityParkingLot1);
        const parkingLot2 = new ParkingLot(capacityParkingLot2);
        const parkingLot3 = new ParkingLot(capacityParkingLot3);
        const parkingLotList = [parkingLot1, parkingLot2, parkingLot3]
        const parkingAttendant = new ParkingAttendant(parkingLotList);

        const car1 = new Car("B 111 B");
        const car2 = new Car("B 222 B");
        const car3 = new Car("B 333 B");
        const car4 = new Car("B 444 B");

        const parkingTicketFromAttendantCar1 = parkingAttendant.park(car1);
        const parkingTicketFromAttendantCar2 = parkingAttendant.park(car2);
        const parkingTicketFromAttendantCar3 = parkingAttendant.park(car3);
        const parkingTicketFromAttendantCar4 = parkingAttendant.park(car4);

        const expectedParkingTicketFromAttendantCar1 = `TICKET-FOR-${car1.plate}`;
        const expectedParkingTicketFromAttendantCar2 = `TICKET-FOR-${car2.plate}`;
        const expectedParkingTicketFromAttendantCar3 = `TICKET-FOR-${car3.plate}`;
        const expectedParkingTicketFromAttendantCar4 = `Sorry, no parking available`;

        expect(parkingTicketFromAttendantCar1.ticketNumber).toBe(expectedParkingTicketFromAttendantCar1);
        expect(parkingTicketFromAttendantCar2.ticketNumber).toBe(expectedParkingTicketFromAttendantCar2);
        expect(parkingTicketFromAttendantCar3.ticketNumber).toBe(expectedParkingTicketFromAttendantCar3);
        expect(parkingTicketFromAttendantCar4).toBe(expectedParkingTicketFromAttendantCar4);
    });

    it('should return "Sorry, the car is already in the parking area" when the same car tries to park again', () => {
        const capacityParkingLot1 = 1;
        const capacityParkingLot2 = 3;
        const capacityParkingLot3 = 2;
        const parkingLot1 = new ParkingLot(capacityParkingLot1);
        const parkingLot2 = new ParkingLot(capacityParkingLot2);
        const parkingLot3 = new ParkingLot(capacityParkingLot3);
        const parkingLotList = [parkingLot1, parkingLot2, parkingLot3]
        const parkingAttendant = new ParkingAttendant(parkingLotList);

        const car1 = new Car("B 111 B");
        const car2 = new Car("B 222 B");
        const car3 = new Car("B 333 B");
        const car4 = new Car("B 444 B");
        const car5 = new Car("B 111 B");

        const parkingTicketFromAttendantCar1 = parkingAttendant.park(car1);
        const parkingTicketFromAttendantCar2 = parkingAttendant.park(car2);
        const parkingTicketFromAttendantCar3 = parkingAttendant.park(car3);
        const parkingTicketFromAttendantCar4 = parkingAttendant.park(car4);
        const parkingTicketFromAttendantCar5 = parkingAttendant.park(car5);

        const expectedParkingTicketFromAttendantCar1 = `TICKET-FOR-${car1.plate}`;
        const expectedParkingTicketFromAttendantCar2 = `TICKET-FOR-${car2.plate}`;
        const expectedParkingTicketFromAttendantCar3 = `TICKET-FOR-${car3.plate}`;
        const expectedParkingTicketFromAttendantCar4 = `TICKET-FOR-${car4.plate}`;
        const expectedParkingTicketFromAttendantCar5 = `Sorry, the car is already in the parking area`;

        expect(parkingTicketFromAttendantCar1.ticketNumber).toBe(expectedParkingTicketFromAttendantCar1);
        expect(parkingTicketFromAttendantCar2.ticketNumber).toBe(expectedParkingTicketFromAttendantCar2);
        expect(parkingTicketFromAttendantCar3.ticketNumber).toBe(expectedParkingTicketFromAttendantCar3);
        expect(parkingTicketFromAttendantCar4.ticketNumber).toBe(expectedParkingTicketFromAttendantCar4);
        expect(parkingTicketFromAttendantCar5).toBe(expectedParkingTicketFromAttendantCar5);
    });

    it('should return "Your ticket is not valid" when your ticket is not valid', () => {
        const capacityParkingLot1 = 1;
        const capacityParkingLot2 = 3;
        const capacityParkingLot3 = 2;
        const parkingLot1 = new ParkingLot(capacityParkingLot1);
        const parkingLot2 = new ParkingLot(capacityParkingLot2);
        const parkingLot3 = new ParkingLot(capacityParkingLot3);
        const parkingLotList = [parkingLot1, parkingLot2, parkingLot3]
        const parkingAttendant = new ParkingAttendant(parkingLotList);

        const car1 = new Car("B 111 B");
        const car2 = new Car("B 222 B");
        const car3 = new Car("B 333 B");
        const car4 = new Car("B 444 B");

        const parkingTicketFromAttendantCar1 = parkingAttendant.park(car1);
        const parkingTicketFromAttendantCar2 = parkingAttendant.park(car2);
        const parkingTicketFromAttendantCar3 = parkingAttendant.park(car3);
        const parkingTicketFromAttendantCar4 = parkingAttendant.park(car4);

        const resultUnparkCar3 = parkingAttendant.unpark(parkingTicketFromAttendantCar3)
        const resultUnparkCar1 = parkingAttendant.unpark(parkingTicketFromAttendantCar1)
        const resultUnparkCar2 = parkingAttendant.unpark(parkingTicketFromAttendantCar2)
        const resultUnparkCar4 = parkingAttendant.unpark(parkingTicketFromAttendantCar4)

        const expectedResultUnparkCar1 = car1.plate;
        const expectedResultUnparkCar2 = car2.plate;
        const expectedResultUnparkCar3 = car3.plate;
        const expectedResultUnparkCar4 = car4.plate;

        expect(resultUnparkCar3.plate).toBe(expectedResultUnparkCar3);
        expect(resultUnparkCar1.plate).toBe(expectedResultUnparkCar1);
        expect(resultUnparkCar2.plate).toBe(expectedResultUnparkCar2);
        expect(resultUnparkCar4.plate).toBe(expectedResultUnparkCar4);
    });

    it('should run notify function when parking lot is full', () => {
        const capacityParkingLot = 2;
        const capacityParkingLot2 = 3;
        const capacityParkingLot3 = 2;
        const parkingLot = new ParkingLot(capacityParkingLot, "Parking Lot 1");
        const parkingLot2 = new ParkingLot(capacityParkingLot2, "Parking Lot 2");
        const parkingLot3 = new ParkingLot(capacityParkingLot3, "Parking Lot 3");

        const car1 = new Car("B 444 B")
        const car2 = new Car("B 222 B")
        const car3 = new Car("B 333 B")
        const car4 = new Car("B 111 B")
        const car5 = new Car("B 111 B")

        const parkingLotList = [parkingLot, parkingLot2];
        const parkingLotList2 = [parkingLot, parkingLot3];

        const parkingAttendant = new ParkingAttendant(parkingLotList, "attendant 1");
        const parkingAttendant2 = new ParkingAttendant(parkingLotList2, "attendant 2");

        const parkingTicketFromAttendantCar1 = parkingAttendant.park(car1);
        const parkingTicketFromAttendantCar2 = parkingAttendant.park(car2);
        const parkingTicketFromAttendantCar3 = parkingAttendant.park(car3);
        const parkingTicketFromAttendantCar4 = parkingAttendant.park(car4);
        
        expect(parkingAttendant.notifyLotFullListener()).toHaveBeenCalled();
    });

});
