// Write your helper functions here!
require("isomorphic-fetch");

function addDestinationInfo(
  document,
  name,
  diameter,
  star,
  distance,
  moons,
  imageUrl
) {
    document.getElementById("missionTarget").innerHTML = `
    <h2>Mission Destination</h2>
    <ol>
        <li>Name: ${name}</li>
        <li>Diameter: ${diameter}</li>
        <li>Star: ${star}</li>
        <li>Distance from Earth: ${distance}</li>
        <li>Number of Moons: ${moons}</li>
      </ol>
      <img src="${imageUrl}">`;
  // Here is the HTML formatting for our mission target div.
  /*
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: </li>
                    <li>Diameter: </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: </li>
                    <li>Number of Moons: </li>
                </ol>
                <img src="">
   */
}

/**
 * @returns {"Empty" | "Not a Number" | "Is a Number"}
 */
function validateInput(testInput) {
  if (testInput === "") {
    return "Empty";
  } else if (isNaN(testInput)) {
    return "Not a Number";
  } else {
    return "Is a Number";
  }
}

/**
 * @param {HTMLDocument} document
 * @param {HTMLElement} list
 * @param {string} pilot
 * @param {string} copilot
 * @param {string} fuelLevel
 * @param {string} cargoLevel
 */
function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
  const headerElement = document.getElementById("launchStatus");
  const [pilotElement, copilotElement, fuelLevelElement, cargoLevelElement] = list.querySelectorAll("li");

  let readyForLaunch = true;

    /** @type {string[]} */
  let errors = [];

  let pilotValidation = validateInput(pilot);
  if (pilotValidation !== "Not a Number") {
    errors.push(`Pilot is ${pilotValidation}`);
  } else {
    pilotElement.textContent = `Pilot ${pilot} is ready for launch`;
  }

  let copilotValidation = validateInput(copilot);
  if (copilotValidation !== "Not a Number") {
    errors.push(`Copilot is ${copilotValidation}`);
  } else {
    copilotElement.textContent = `Co-pilot ${copilot} is ready for launch`;
  }

  let fuelLevelValidation = validateInput(fuelLevel);
  if (fuelLevelValidation !== "Is a Number") {
    errors.push(`Fuel Level is ${fuelLevelValidation}`);
  } else if (parseInt(fuelLevel) < 10000) {
    fuelLevelElement.textContent = "Fuel level too low for launch";
    readyForLaunch = false;
  } else {
    fuelLevelElement.textContent = "Fuel level high enough for launch";
  }
    
  let cargoLevelValidation = validateInput(cargoLevel);
  if (cargoLevelValidation !== "Is a Number") {
    errors.push(`Cargo Level is ${cargoLevelValidation}`);
  } else if (parseInt(cargoLevel) > 10000) {
    cargoLevelElement.textContent = "Cargo mass too heavy for launch";
    readyForLaunch = false;
  } else {
    cargoLevelElement.textContent = "Cargo mass low enough for launch";
  }
    
  if (errors.length) {
    throw "The following error(s) occurred:\n" + errors.join("\n");
  }

  if (readyForLaunch) {
    headerElement.textContent = "Shuttle is Ready for Launch";
    headerElement.setAttribute("style","color: rgb(65, 159, 106);")
  } else {
    headerElement.textContent = "Shuttle Not Ready for Launch";
    headerElement.setAttribute("style","color: rgb(199, 37, 78);")
  }

  list.setAttribute("style", "visibility: visible;")
}

async function myFetch() {
  // Browser needs HTTPS for fetch
  let url = "https://handlers.education.launchcode.org/static/planets.json";
  if (process && process.env && process.env.NODE_ENV === "test") {
    // Test fails if using HTTPS because certificate is expired, so if we're testing, use HTTP
    url = "http://handlers.education.launchcode.org/static/planets.json";
  }
  let response = await fetch(url);
  let planetsReturned = await response.json();

  return planetsReturned;
}

function pickPlanet(planets) {
    return planets[Math.floor(Math.random()*planets.length)];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;
