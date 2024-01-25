const urlParams = new URLSearchParams(window.location.search);
const courseTitle = urlParams.get("courseTitle");
const courseNumber = urlParams.get("courseNumber");
const courseDuration = urlParams.get("courseDuration");
const courseCost = urlParams.get("courseCost");

document.getElementById("courseTitle").innerText = courseTitle;
document.getElementById("courseNumber").innerText = courseNumber;
document.getElementById("courseDuration").innerText = courseDuration;
document.getElementById("courseCost").innerText = courseCost;
