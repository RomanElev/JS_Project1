const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const bookingsDatabase = [];
const coursesDatabase = [];

app.post("/book-course", (req, res) => {
  const { userName, courseId, paymentInfo } = req.body;
  const bookingDetails = { userName, courseId, paymentInfo };
  bookingsDatabase.push(bookingDetails);
  sendConfirmationEmail(userName, courseId);
  res.status(200).send("Bokning genomförd.");
});

app.get("/user/bookings", (req, res) => {
  const userName = req.query.userName;
  const userBookings = bookingsDatabase.filter(
    (booking) => booking.userName === userName
  );
  res.status(200).json(userBookings);
});

app.post("/add-course", (req, res) => {
  const { courseTitle, courseNumber, courseDuration, courseCost } = req.body;
  const courseId = coursesDatabase.length + 1;
  const newCourse = {
    courseId,
    courseTitle,
    courseNumber,
    courseDuration,
    courseCost,
  };
  coursesDatabase.push(newCourse);
  res.status(200).send("Ny kurs tillagd.");
});

app.get("/course/bookings", (req, res) => {
  const courseId = req.query.courseId;
  const courseBookings = bookingsDatabase.filter(
    (booking) => booking.courseId === courseId
  );
  const customers = courseBookings.map((booking) => ({
    userName: booking.userName,
    email: booking.email,
    mobileNumber: booking.mobileNumber,
  }));
  res.status(200).json(customers);
});

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

function sendConfirmationEmail(userName, courseId) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "your-email@gmail.com",
      pass: "your-email-password",
    },
  });

  const mailOptions = {
    from: "your-email@gmail.com",
    to: "recipient-email@example.com",
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
