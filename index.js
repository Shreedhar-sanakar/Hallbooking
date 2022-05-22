require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

//room
const rooms = [
  {
    name: "Elite",
    seats: 150,
    amenities: "Wifi,Projection Screen,Luggage Storage, Travel Desk",
    price: 2500,
    roomId: "abc123",
    bookingDetails: [
      {
        customerName: "Savitha V",
        date: new Date("2021-11-14"),
        start: "07:00",
        end: "10:00",
        status: "Confirmed",
      },
    ],
  },
  {
    name: "Premium",
    seats: 250,
    amenities: "Front Desk,Luggage Storage, Travel Desk, Parking facitity, Wifi,AC,Projection Screen",
    price: 3500,
    roomId: "def456",
    bookingDetails: [
      {
        customerName: "Kayal",
        date: new Date("2021-11-15"),
        start: "15:00",
        end: "17:00",
        status: "Payment Pending",
      },
    ],
  },
  {
    name: "Premium Plus",
    seats: 450,
    amenities: "Front Desk,Luggage Storage, Travel Desk, Parking, Wifi, Projection Screen, AC, TV",
    price: 4500,
    roomId: "ghi789",
    bookingDetails: [
      {
        customerName: "Santhosh",
        date: new Date("2021-11-17"),
        start: "18:00",
        end: "20:00",
        status: "Payment Pending",
      },
    ],
  },
];
//common call api status
app.get("/", (req, res) => {
  res.status(200).send("Server is running successfully ");
});

//create room
app.post("/createRoom", (req, res) => {
  rooms.push({
    name: req.body.name,
    seats: req.body.seats,
    amenities: req.body.amenities,
    price: req.body.price,
    roomId: "ghi",
    bookingDetails: [{}],
  });
  res.status(200).send("Room Created");
});

//Book rooms
app.post("/bookRoom", (req, res, next) => {
  for (let i = 0; i < rooms.length; i++) {
    console.log("a");
    if (!(rooms[i].roomId === req.body.roomId)) {
      return res.status(400).send({ error: "Invalid" });
    } else {
      let booking = {
        customerName: req.body.name,
        date: new Date(req.body.date),
        start: req.body.start,
        end: req.body.end,
        status: "Confirmed",
      };
      let result = undefined;
      rooms[i].bookingDetails.forEach((book) => {
        if (
          book.date.getTime() == booking.date.getTime() &&
          book.start === booking.start
        ) {
          result = 0;
          console.log("In Booking Process");
          
        } else {
          result = 1;
          rooms[i].bookingDetails.push(booking);
          // return res.status(200).send("Booking confirmed")
        }
      });
      if (result) return res.status(200).send("Booking confirmed");
      else
        return res
          .status(400)
          .send({ error: "Please select a different time slot" });
    }
  }
});

//list customers

app.get("/listCustomer", (req, res) => {
  let customerArray = [];

  rooms.forEach((room) => {
    let customerObj = { roomName: room.name };

    room.bookingDetails.forEach((customer) => {
      customerObj.customerName = customer.customerName;
      customerObj.date = customer.date;
      customerObj.start = customer.start;
      customerObj.end = customer.end;

      customerArray.push(customerObj);
    });
  });

  res.send(customerArray);
});

//get rooms

app.get("/listRooms", (req, res) => {
  console.log("Rooms List");
  res.status(200).send(rooms);
});

app.get("/", (req, res) => {
  console.log("Server is running successfully");
});

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`Server started at port : ${port}`);
});