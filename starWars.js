let baseURL = 'https://swapi.co/api/';
let requestURLS = [
    'people/1/',
    'planets/1/',
    'vehicles/4/'
];

let personObj = {};
let planetObj = {};
let vehicleObj = {};
let currentObj = {};

function loadData() {

    let i;
    for (i = 0; i < requestURLS.length; i++) {
        let request = new XMLHttpRequest();
        request.open('GET', baseURL + requestURLS[i]);
        request.responseType = 'json';
        request.send();

        if (i === 0) {
            request.onload = function() {
                loadPerson(request);
            };

        } else if (i === 1) {
            request.onload = function() {
                loadPlanet(request);

            }
        } else if(i === 2) {
            request.onload = function() {
                loadVehicle(request);

            }
        }

    }
}
function deleteCard() {
    if (currentObj.name === 'Luke Skywalker') {
        document.getElementById('personCard').innerHTML = "";
        $('#myModal').modal('hide');
    } else if (currentObj.name === 'Tatooine') {
        document.getElementById('planetCard').innerHTML = "";
        $('#myModal').modal('hide');
    } else if (currentObj.name === 'Sand Crawler') {
        document.getElementById('vehicleCard').innerHTML = "";
        $('#myModal').modal('hide');

    }

}
function getHeight(data) {
    let x = (data.height * 0.032808).toFixed(1);
    return x.split(".")[0] +
           "<span style='font-size: 11px'>ft.</span>" + " " +
           x.split(".")[1] +
           "<span style='font-size: 11px'>in.</span>"
}

function formatKey(objKey) {
    return (objKey.charAt(0).toUpperCase() + objKey.slice(1)).replace(/_/g, " ");
}
function loadModal(id) {
    document.getElementById('tbody').innerHTML = "";
    let tbody = document.getElementById('tbody');

    let newObj;
    if (id === 'personBtn') {
        newObj = personObj;
        document.getElementById("modalImg").src = "images/luke-skywalker.jpg";
    } else if (id === 'planetBtn') {
         newObj = planetObj;
        document.getElementById("modalImg").src = "images/Tatooine.jpg";
    } else if (id === 'vehicleBtn') {
         newObj = vehicleObj;
        document.getElementById("modalImg").src = "images/Sandcrawler.png";
    }

    for (let [key, value] of Object.entries(newObj)) {

        let tr = "<tr style='font-family: Avenir'>";
        if (key === 'films' || key === 'species' || key === 'vehicles' || key === 'starships'||  key === 'residents') {
            key = '';
            value = '';
        } else {
            tr += "<td style='font-weight: bold; padding-right: 2rem' align='left'>" + formatKey(key) + "</td>" + "<td align='left'>" + value + "</td></tr>";
        }
        tbody.innerHTML += tr;
    }
    currentObj = newObj;
    return currentObj;
}

function loadPerson(request) {
    const data = request.response;
    let x = (data.height * 0.032808).toFixed(1);

    document.getElementById("personName").innerHTML = data.name;
    document.getElementById("height").innerHTML = getHeight(data);
    document.getElementById("hairColor").innerHTML = data.hair_color.toUpperCase();
    document.getElementById("eyeColor").innerHTML = data.eye_color.toUpperCase() + " <span style='font-size: 11px'>eyes</span>";
    document.getElementById("birthYear").innerHTML = data.birth_year;
    document.getElementById("weight").innerHTML = data.mass + "<span style='font-size: 11px'>mass</span>";

    personObj = data;
    return personObj;
}

function loadPlanet(request) {
    const data = request.response;

    document.getElementById("planetName").innerHTML = data.name;
    document.getElementById("climate").innerHTML = data.climate;
    document.getElementById("population").innerHTML = data.population;
    document.getElementById("gravity").innerHTML = data.gravity;
    document.getElementById("rotationPeriod").innerHTML = data.rotation_period;
    document.getElementById("orbitalPeriod").innerHTML = data.orbital_period;

    planetObj = data;
    return planetObj;
}

function loadVehicle(request) {
    const data = request.response;

    document.getElementById("vehicleName").innerHTML = data.name;
    document.getElementById("cost").innerHTML = data.cost_in_credits;
    document.getElementById("passengerCapacity").innerHTML = data.passengers + " <span style='font-size: 11px'>MAX CAPACITY</span>";
    document.getElementById("manufacturer").innerHTML = data.manufacturer;
    document.getElementById("speed").innerHTML = data.max_atmosphering_speed + "<span style='font-size: 11px'>MPH</span>";

    vehicleObj = data;
    return vehicleObj;
}
