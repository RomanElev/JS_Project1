let coursesData = [
  {
    title: "Webbutveckling med HTML, CSS och JavaScript",
    number: "1",
    duration: "8 veckor",
    location: "Distans",
    date: "2024-02-01",
  },
  {
    title: "React.js - Grundläggande och Avancerade Koncept",
    number: "2",
    duration: "10 veckor",
    location: "Klassrum",
    date: "2024-02-15",
  },
  {
    title: "Mobilapplikationsutveckling med React Native",
    number: "3",
    duration: "12 veckor",
    location: "Distans/Klassrum",
    date: "2024-03-01",
  },
];

//import { coursesData } from "./courses.js";

const renderCourses = () => {
  const coursesContainer = document.getElementById("courses");

  coursesContainer.innerHTML = "";

  coursesData.forEach((course) => {
    const courseElement = createCourseElement(course);
    coursesContainer.appendChild(courseElement);
  });
};

const createCourseElement = (course) => {
  const courseElement = document.createElement("div");
  courseElement.classList.add("course");
  courseElement.innerHTML = `
    <h2>${course.title}</h2>
    <p>Kursnummer: ${course.number}</p>
    <p>Antal dagar: ${course.duration}</p>
    <p>Tillgänglig som: ${course.location}</p>
    <p>${course.title}</p>
    <p>Datum: ${course.date}</p>
    <a href="booking.html?title=${encodeURIComponent(
      course.title
    )}">Detaljer och bokning</a>
  `;
  return courseElement;
};

document.addEventListener("click", (event) => {
  if (event.target.id === "adminButton") {
    redirectToAdminPage();
  }
});

function redirectToAdminPage() {
  window.location.href = "./Ny kurs/addkurs.html";
}

document.addEventListener("DOMContentLoaded", renderCourses);

export { coursesData, renderCourses };
