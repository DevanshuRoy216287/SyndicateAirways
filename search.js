window.addEventListener("scroll", function () {
  const header = document.getElementById("header");
  if (window.scrollY > 10) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const loadingOverlay = document.getElementById('loadingOverlay');
  const content = document.querySelector('.content');
  const sidebar = document.getElementById('sidebar');
  const surveyButton = document.getElementById('surveyButton');
  const iframeContainer = document.getElementById('Iframe');

  if (sidebar) sidebar.classList.remove('open');
  if (iframeContainer) iframeContainer.style.display = 'none';

  setTimeout(function () {
    loadingOverlay.style.display = 'none';
    content.style.display = 'flex';
    document.body.classList.remove('loading');
  }, 2000);

  document.body.classList.add('loading');

  window.toggleSidebar = function () {
    if (sidebar.classList.contains('open')) {
      sidebar.classList.remove('open');
      sidebar.classList.add('closing');
      sidebar.addEventListener('animationend', function handler() {
        sidebar.classList.remove('closing');
        sidebar.removeEventListener('animationend', handler);
      });
    } else {
      sidebar.classList.add('open');
    }
  };

  window.toggleDropdown = function () {
    document.getElementById('dropdownContent').classList.toggle('show');
  };

  window.toggleIframe = function () {
    iframeContainer.style.display = (iframeContainer.style.display === 'block') ? 'none' : 'block';
  };

const urlParams = new URLSearchParams(window.location.search);

const tripType = urlParams.get("tripType");
const from = urlParams.get("from");
const to = urlParams.get("to");
const departureDate = urlParams.get("departureDate");
const returnDate = urlParams.get("returnDate");
const currency = urlParams.get("currency");

const adults = parseInt(urlParams.get("adults")) || 0;
const children = parseInt(urlParams.get("children")) || 0;
const infants = parseInt(urlParams.get("infants")) || 0;
const seniors = parseInt(urlParams.get("seniors")) || 0;

const passengerCount = adults + children + infants + seniors;

document.getElementById("tripTypeDisplay").textContent = tripType === "round" ? "Round Trip" : "One Way";
document.getElementById("fromDisplay").textContent = from;
document.getElementById("toDisplay").textContent = to;
document.getElementById("departureDisplay").textContent = departureDate;
document.getElementById("currencyDisplay").textContent = currency;

if (tripType === "round" && returnDate) {
  document.getElementById("returnDisplay").textContent = returnDate;
} else {
  document.getElementById("returnDateBlock").style.display = "none";
}

document.getElementById("passengerDisplay").textContent =
  `Adults: ${adults}, Children: ${children}, Seniors: ${seniors}, Infants: ${infants}`;

document.getElementById("changeBtn").addEventListener("click", function () {
  const params = new URLSearchParams(window.location.search);
  window.location.href = "index.html?" + params.toString();
});

const flightResults = document.getElementById("flightResults");
const template = document.getElementById("flightCardTemplate");
const sortDropdown = document.getElementById("sortOptions");

let allFlights = [];
let currentlyExpandedCard = null;

function getRandomTime() {
  const hour = Math.floor(Math.random() * 24).toString().padStart(2, "0");
  const minute = Math.floor(Math.random() * 60).toString().padStart(2, "0");
  return `${hour}:${minute}`;
}

function getRandomStops() {
  return Math.random() < 0.5 ? "non-stop" : "1 stop";
}

function timeToMinutes(timeStr) {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 60 + minutes;
}

function createFlightData(id, fromCity, toCity) {
  const time = getRandomTime();
  const stops = getRandomStops();
  const basePrice = 7000 + Math.floor(Math.random() * 2000);
  const execPrice = basePrice + 500;

  return {
    id,
    from: fromCity,
    to: toCity,
    time,
    stops,
    basePrice,
    execPrice
  };
}

function renderFlights(flightList, departureDate, adults, children, infants, seniors) {
  const passengerCount = adults + children + infants + seniors;
  flightResults.innerHTML = "";
  currentlyExpandedCard = null;

  flightList.forEach(flight => {
    const clone = template.content.cloneNode(true);


    clone.querySelector(".from").textContent = flight.from;
    clone.querySelector(".to").textContent = flight.to;
    clone.querySelector(".time").textContent = flight.time;
    clone.querySelector(".flight-stops").textContent = flight.stops;

    clone.querySelectorAll(".price").forEach(el => el.textContent = flight.basePrice);
    clone.querySelector(".price2").textContent = flight.execPrice;

    const cardElem = clone.querySelector(".flight-card");
    cardElem.dataset.cardId = flight.id;

    cardElem.addEventListener("click", () => {
      if (currentlyExpandedCard && currentlyExpandedCard !== cardElem) {
        currentlyExpandedCard.classList.remove("expanded");
      }
      cardElem.classList.toggle("expanded");
      currentlyExpandedCard = cardElem.classList.contains("expanded") ? cardElem : null;
    });

    cardElem.querySelectorAll(".bookBtn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();

        const fareType = btn.dataset.fare;
        const price = fareType === "Saver" ? flight.basePrice : flight.execPrice;

        const params = new URLSearchParams({
          tripType: tripType,
          from: flight.from,
          to: flight.to,
          departureDate: departureDate,
          returnDate: returnDate,
          time: flight.time,
          stops: flight.stops,
          fareType: fareType,
          price: price,
          adults: adults,
          children: children,
          infants: infants,
          seniors: seniors,
          passengerCount: passengerCount
        });


        window.location.href = `book-fare.html?${params.toString()}`;
      });
    });

    flightResults.appendChild(clone);
  });
}

for (let i = 1; i <= 6; i++) {
  allFlights.push(createFlightData(i, from, to));
}

renderFlights(allFlights, departureDate, adults, children, infants, seniors);


  sortDropdown.addEventListener("change", () => {
    const selected = sortDropdown.value;
    const sorted = [...allFlights];

    if (selected === "lowestPrice") {
      sorted.sort((a, b) => a.basePrice - b.basePrice);
    } else if (selected === "earliest") {
      sorted.sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time));
    } else if (selected === "latest") {
      sorted.sort((a, b) => timeToMinutes(b.time) - timeToMinutes(a.time));
    }

    renderFlights(sorted);
  });

  const sortBtn = document.getElementById("sortButton");
  const sortMenu = document.getElementById("sortOptions");

  sortBtn.addEventListener("click", () => {
    sortMenu.classList.toggle("hidden");
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".sort-container")) {
      sortMenu.classList.add("hidden");
    }
  });

  sortMenu.addEventListener("click", (e) => {
    const selected = e.target.dataset.sort;
    const sorted = [...allFlights];

    if (selected === "lowestPrice") {
      sorted.sort((a, b) => a.basePrice - b.basePrice);
    } else if (selected === "earliest") {
      sorted.sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time));
    } else if (selected === "latest") {
      sorted.sort((a, b) => timeToMinutes(b.time) - timeToMinutes(a.time));
    }

    renderFlights(sorted);
    sortMenu.classList.add("hidden");
  });

  generateCards();
});
