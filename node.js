import express from "express";
import bodyParser from "body-parser";
import path from "path";

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
  const courseId = coursesDatabase.push({
    courseId: coursesDatabase.length + 1,
    courseTitle,
    courseNumber,
    courseDuration,
    courseCost,
  });
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
  const courseId = bookingsDatabase[bookingsDatabase.length - 1]?.courseId;
  const courseDetails = coursesDatabase.find(
    (course) => course.courseId === courseId
  );
  res.sendFile(path.join(__dirname, "finalpage.html"), { ...courseDetails });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
