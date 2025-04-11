const Car = require("./src/domain/car");
const ParkingAttendant = require("./src/domain/parking-attendant");
const ParkingLot = require("./src/domain/parking-lot");

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

console.log(parkingAttendant.unpark(parkingTicketFromAttendantCar1));

// const parkingTicketFromAttendantCar5 = parkingAttendant.park(car5);

// console.log(parkingTicketFromAttendantCar1);
// console.log(parkingTicketFromAttendantCar2);
// console.log(parkingTicketFromAttendantCar3);
// console.log(parkingTicketFromAttendantCar4);
// console.log(parkingTicketFromAttendantCar5);

// console.log(parkingAttendant.unpark(parkingTicketFromAttendantCar3))
// console.log(parkingAttendant.unpark(parkingTicketFromAttendantCar1))
// console.log(parkingAttendant.unpark(parkingTicketFromAttendantCar2))
// console.log(parkingAttendant.unpark(parkingTicketFromAttendantCar4))
// console.log(parkingAttendant.unpark(parkingTicketFromAttendantCar1))












