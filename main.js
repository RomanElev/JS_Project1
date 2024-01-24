const coursesData = [
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

// Funktion för att testa mina kurser.
function renderCourses() {
  const coursesContainer = document.getElementById("courses");

  coursesData.forEach((course) => {
    const courseElement = createCourseElement(course);
    coursesContainer.appendChild(courseElement);
  });
}

// Beskriver mina kurser har for att testa mig. Ist for att skriva i html.
function createCourseElement(course) {
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
}

window.onload = renderCourses;
