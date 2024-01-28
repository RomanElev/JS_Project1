const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// lista med bokningar
const bookingsDatabase = [];
const coursesDatabase = [];

// kurs bokning
app.post("/book-course", (req, res) => {
  const { userName, courseId, paymentInfo } = req.body;

  const bookingDetails = { userName, courseId, paymentInfo };
  bookingsDatabase.push(bookingDetails);

  // bekr mejl
  sendConfirmationEmail(userName, courseId);

  res.status(200).send("Bokning genomförd.");
});

// tidigare bokningаr?
app.get("/user/bookings", (req, res) => {
  // Hämta bokningshistorik från databasen
  const userName = req.query.userName;
  const userBookings = bookingsDatabase.filter(
    (booking) => booking.userName === userName
  );

  res.status(200).json(userBookings);
});

// ny kurs
app.post("/add-course", (req, res) => {
  const { courseTitle, courseNumber, courseDuration, courseCost } = req.body;

  const newCourse = { courseTitle, courseNumber, courseDuration, courseCost };
  coursesDatabase.push(newCourse);

  res.status(200).send("Ny kurs tillagd.");
});

// bokningar?
app.get("/course/bookings", (req, res) => {
  const courseId = req.query.courseId;

  const courseBookings = bookingsDatabase.filter(
    (booking) => booking.courseId === courseId
  );

  // info om bokningar
  const customers = courseBookings.map((booking) => ({
    userName: booking.userName,
    email: booking.email,
    mobileNumber: booking.mobileNumber,
  }));

  res.status(200).json(customers);
});

// Bekräftelsessidan
app.get("/finalpage.html", (req, res) => {
  const latestBooking = bookingsDatabase[bookingsDatabase.length - 1];
  const courseId = latestBooking.courseId;
  const courseDetails = coursesDatabase.find(
    (course) => course.courseId === courseId
  );

  res.sendFile(path.join(__dirname, "finalpage.html"), {
    courseTitle: courseDetails.courseTitle,
    courseNumber: courseDetails.courseNumber,
    courseDuration: courseDetails.courseDuration,
    courseCost: courseDetails.courseCost,
  });
});

// mail
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
