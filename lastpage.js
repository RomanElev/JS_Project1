document.addEventListener("DOMContentLoaded", () => {
  // Hämta kursparametrar från URL:en
  const urlParams = new URLSearchParams(window.location.search);
  const courseTitle = urlParams.get("courseTitle");
  const courseNumber = urlParams.get("courseNumber");
  const courseDuration = urlParams.get("courseDuration");
  const courseLocation = urlParams.get("courseLocation");
  const courseDate = urlParams.get("courseDate");

  // Visa kursinformation på bekräftelsesidan
  displayCourseInformation(
    courseTitle,
    courseNumber,
    courseDuration,
    courseLocation,
    courseDate
  );
});

const displayCourseInformation = (title, number, duration, location, date) => {
  const confirmationDetails = document.getElementById("confirmation-details");

  const courseDetailsElement = document.createElement("div");
  courseDetailsElement.innerHTML = `
    <h2>Kursinformation:</h2>
    <p><strong>Kurstitel:</strong> ${title}</p>
    <p><strong>Kursnummer:</strong> ${number}</p>
    <p><strong>Varaktighet:</strong> ${duration}</p>
    <p><strong>Plats:</strong> ${location}</p>
    <p><strong>Datum:</strong> ${date}</p>
  `;

  confirmationDetails.appendChild(courseDetailsElement);
};
