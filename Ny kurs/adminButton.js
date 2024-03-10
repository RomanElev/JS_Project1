import { coursesData, renderCourses } from "./main.js";

document.addEventListener("DOMContentLoaded", () => {
  const adminButton = document.getElementById("adminButton");
  const addCourseForm = document.getElementById("addCourseForm");

  adminButton.addEventListener("click", () => {
    window.location.href = "./main.html";
  });

  if (addCourseForm) {
    addCourseForm.addEventListener("submit", (event) => {
      event.preventDefault();
      addCourse();
      window.location.href = "./main.html";
    });
  }
});

function addCourse() {
  const newCourse = {
    title: getValue("courseTitle"),
    number: getValue("courseNumber"),
    duration: getValue("courseDuration"),
    location: getValue("courseLocation"),
    date: getValue("courseDate"),
  };

  coursesData.push(newCourse);

  renderCourses();
}

function getValue(elementId) {
  return document.getElementById(elementId).value;
}
