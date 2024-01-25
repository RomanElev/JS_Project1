const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5500;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// En lista med bokade kurser och nya kurser för användare
const bookingsDatabase = [];
const coursesDatabase = [];

// Endpoint för att boka en kurs
app.post("/book-course", (req, res) => {
  const { userName, courseId, paymentInfo } = req.body;

  // Lagring utav bokningsinformationen i databasen
  const bookingDetails = { userName, courseId, paymentInfo };
  bookingsDatabase.push(bookingDetails);

  // Skicka bekräftelsemejl (simulerad e-post)
  sendConfirmationEmail(userName, courseId);

  res.status(200).send("Bokning genomförd.");
});

// Endpoint för att hämta användarens bokningshistorik
app.get("/user/bookings", (req, res) => {
  // Hämta bokningshistorik från databasen
  const userName = req.query.userName;
  const userBookings = bookingsDatabase.filter(
    (booking) => booking.userName === userName
  );

  res.status(200).json(userBookings);
});

// Endpoint för att lägga till ny kurs
app.post("/add-course", (req, res) => {
  const { courseTitle, courseNumber, courseDuration, courseCost } = req.body;

  // Lägga till ny kurs i databasen (simulerad lagring)
  const newCourse = { courseTitle, courseNumber, courseDuration, courseCost };
  coursesDatabase.push(newCourse);

  res.status(200).send("Ny kurs tillagd.");
});

// Endpoint för att lista kunder som har bokat en kurs
app.get("/course/bookings", (req, res) => {
  const courseId = req.query.courseId;

  // Filtrera bokningsdatabasen för att hitta bokningar för den specifika kursen
  const courseBookings = bookingsDatabase.filter(
    (booking) => booking.courseId === courseId
  );

  // Hämta kundinformation från varje bokning
  const customers = courseBookings.map((booking) => ({
    userName: booking.userName,
    email: booking.email,
    mobileNumber: booking.mobileNumber,
  }));

  res.status(200).json(customers);
});

// Bekräftelsessidan
app.get("/finalpage.html", (req, res) => {
  // Hämta den senaste bokningen (simulerat)
  const latestBooking = bookingsDatabase[bookingsDatabase.length - 1];

  // Hämta kursinformation baserat på kurs-ID från bokningen
  const courseId = latestBooking.courseId;
  const courseDetails = coursesDatabase.find(
    (course) => course.courseId === courseId
  );

  // Skicka kursinformation till bekräftelsessidan
  res.sendFile(path.join(__dirname, "finalpage.html"), {
    courseTitle: courseDetails.courseTitle,
    courseNumber: courseDetails.courseNumber,
    courseDuration: courseDetails.courseDuration,
    courseCost: courseDetails.courseCost,
  });
});

// Funktion för att skicka bekräftelsemejl
function sendConfirmationEmail(userName, courseId) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "din-email@gmail.com",
      pass: "din-email-lösenord",
    },
  });

  const mailOptions = {
    from: "din-email@gmail.com",
    to: "mottagarens-email@example.com",
    subject: "Bokningsbekräftelse",
    text: `Tack ${userName}! Du har bokat kursen med ID ${courseId}. Vi ser fram emot att träffa dig.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

app.get("/finalpage.html", (req, res) => {
  console.log("Hämta bekräftelsesida");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
