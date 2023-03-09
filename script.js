// Write your JavaScript code here!
const {
    addDestinationInfo,
    validateInput,
    formSubmission,
    myFetch,
    pickPlanet,
} = require('./scriptHelper')

window.addEventListener("load", function() {
    document.getElementById("faultyItems")?.setAttribute("style", "visibility: hidden;")
    let form = document.querySelector("form");
    form.addEventListener("submit", event =>{
        //TO DO
        event.preventDefault();

        let list = document.getElementById("faultyItems")
        let pilotNameInput = document.querySelector("input[name=pilotName");
        let coPilotNameInput = document.querySelector("input[name=copilotName");
        let fuelLevelInput = document.querySelector("input[name=fuelLevel");
        let cargoMassInput = document.querySelector("input[name=cargoMass");
        try {
            formSubmission(document,list,pilotNameInput.value,coPilotNameInput.value,fuelLevelInput.value,cargoMassInput.value);
        } catch (error) {
            alert(error);
        }
    });


    // Set listedPlanetsResponse equal to the value returned by calling myFetch()
    myFetch().then(function (result) {
        let pickedPlanet = pickPlanet(result);
        console.log(pickedPlanet)
        // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
        addDestinationInfo(document,pickedPlanet.name,pickedPlanet.diameter,pickedPlanet.star,pickedPlanet.distance,pickedPlanet.moons,pickedPlanet.image);
    })
   
});