window.addEventListener("scroll", function () {
  const header = document.getElementById("header");
  if (header) {
    if (window.scrollY > 10) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const loadingOverlay = document.getElementById("loadingOverlay");
  const content = document.querySelector(".content");
  const sidebar = document.getElementById("sidebar");
  const iframeContainer = document.getElementById("Iframe");

  if (sidebar) sidebar.classList.remove("open");
  if (iframeContainer) iframeContainer.style.display = "none";

  setTimeout(function () {
    if (loadingOverlay) loadingOverlay.style.display = "none";
    if (content) content.style.display = "flex";
    document.body.classList.remove("loading");
  }, 2000);

  document.body.classList.add("loading");

  window.toggleSidebar = function () {
    if (!sidebar) return;
    if (sidebar.classList.contains("open")) {
      sidebar.classList.remove("open");
      sidebar.classList.add("closing");
      sidebar.addEventListener("animationend", function handler() {
        sidebar.classList.remove("closing");
        sidebar.removeEventListener("animationend", handler);
      });
    } else {
      sidebar.classList.add("open");
    }
  };

  window.toggleDropdown = function () {
    const dropdown = document.getElementById("dropdownContent");
    if (dropdown) dropdown.classList.toggle("show");
  };

  window.toggleIframe = function () {
    if (!iframeContainer) return;
    iframeContainer.style.display = (iframeContainer.style.display === "block") ? "none" : "block";
  };

  const params = new URLSearchParams(window.location.search);
  const flightData = {
    tripType: params.get("tripType"),
    from: params.get("from"),
    to: params.get("to"),
    departureDate: params.get("departureDate"),
    returnDate: params.get("returnDate"),
    time: params.get("time"),
    stops: params.get("stops"),
    fareType: params.get("fareType"),
    price: params.get("price"),
    adults: parseInt(params.get("adults")) || 0,
    children: parseInt(params.get("children")) || 0,
    seniors: parseInt(params.get("seniors")) || 0,
    infants: parseInt(params.get("infants")) || 0,
  };
  flightData.passengerCount =
    flightData.adults +
    flightData.children +
    flightData.seniors +
    flightData.infants;

  const seatsContainer = document.getElementById("seatsContainer");
  const infoText = document.getElementById("infoText");
  const confirmBtn = document.getElementById("confirmBtn");

  const topRows = 3;
  const bottomRows = 3;
  const colsPerSide = 3;
  const totalSeats = (topRows + bottomRows) * colsPerSide * 2;
  const takenSeats = new Set();

  while (takenSeats.size < 15) {
    takenSeats.add(Math.floor(Math.random() * totalSeats) + 1);
  }

  const selectedSeats = new Set();
  let seatNumber = 1;

  function createSeatElement(number) {
    const seat = document.createElement("div");
    seat.classList.add("seat");
    seat.textContent = number;
    if (takenSeats.has(number)) seat.classList.add("taken");

    seat.addEventListener("click", () => {
      if (seat.classList.contains("taken")) return;

      if (seat.classList.contains("selected")) {
        seat.classList.remove("selected");
        selectedSeats.delete(number);
      } else {
        if (selectedSeats.size < flightData.passengerCount) {
          seat.classList.add("selected");
          selectedSeats.add(number);
        } else {
          alert(`You can only select ${flightData.passengerCount} seats.`);
        }
      }

      infoText.textContent = `Selected Seats: ${[...selectedSeats].join(", ") || "None"}`;
    });

    return seat;
  }

  function createSeatRow() {
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("seat-row");

    for (let i = 0; i < colsPerSide; i++) {
      rowDiv.appendChild(createSeatElement(seatNumber++));
    }

    const aisle = document.createElement("div");
    aisle.classList.add("aisle");
    rowDiv.appendChild(aisle);

    for (let i = 0; i < colsPerSide; i++) {
      rowDiv.appendChild(createSeatElement(seatNumber++));
    }

    return rowDiv;
  }

  for (let i = 0; i < topRows; i++) {
    seatsContainer.appendChild(createSeatRow());
  }

  const aisleGap = document.createElement("div");
  aisleGap.style.height = "20px";
  seatsContainer.appendChild(aisleGap);

  for (let i = 0; i < bottomRows; i++) {
    seatsContainer.appendChild(createSeatRow());
  }

 confirmBtn.addEventListener("click", () => {
  if (selectedSeats.size !== flightData.passengerCount) {
    alert(`Please select exactly ${flightData.passengerCount} seats.`);
    return;
  }

  localStorage.setItem("selectedSeats", JSON.stringify([...selectedSeats]));
  localStorage.setItem("flightData", JSON.stringify(flightData));

  alert(`Seats confirmed: ${[...selectedSeats].join(", ")}`);
  goToNextStep();
});

  window.goToNextStep = function () {
    const step1 = document.getElementById("step1");
    const step2 = document.getElementById("step2");
    const progress = document.getElementById("progressFill");

    if (step1 && step2) {
      step1.classList.remove("active");

      setTimeout(() => {
        step1.style.display = "none";
        step2.style.display = "block";
        void step2.offsetWidth;
        step2.classList.add("active");
      }, 600);
    }

    if (progress) {
      progress.style.width = "96%";
    }
  };

  window.submitMeals = function () {
  const veg = parseInt(document.getElementById("vegMeal").value) || 0;
  const nonVeg = parseInt(document.getElementById("nonVegMeal").value) || 0;
  const special = parseInt(document.getElementById("specialMeal").value) || 0;
  const total = veg + nonVeg + special;

  const flightData = JSON.parse(localStorage.getItem("flightData"));
  const passengerCount = flightData.passengerCount;

  const error = document.getElementById("mealError");

  if (total > passengerCount) {
    error.textContent = `❌ You cannot assign more than ${passengerCount} meals.`;
    error.style.display = "block";
    return;
  }

  error.style.display = "none";
  localStorage.setItem("mealSelection", JSON.stringify({ veg, nonVeg, special }));
  alert("✅ Meals confirmed!");
  finishBooking();
};


  window.updateMealTotal = function () {
  const veg = parseInt(document.getElementById("vegMeal").value) || 0;
  const nonVeg = parseInt(document.getElementById("nonVegMeal").value) || 0;
  const special = parseInt(document.getElementById("specialMeal").value) || 0;
  const total = veg + nonVeg + special;

  const passengerCount = JSON.parse(localStorage.getItem("flightData")).passengerCount;

  if (total > passengerCount) {
    alert(`❌ Total meals cannot exceed ${passengerCount}`);
  }

};

  function finishBooking() {
  alert("⚠️ Please sign in or sign up to finish booking.");

  const flightData = JSON.parse(localStorage.getItem("flightData"));
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  const mealSelection = JSON.parse(localStorage.getItem("mealSelection"));

  const params = new URLSearchParams();

  for (const key in flightData) {
    if (flightData.hasOwnProperty(key)) {
      params.append(key, flightData[key]);
    }
  }

  params.append("seats", selectedSeats.join(","));

  for (const key in mealSelection) {
    if (mealSelection.hasOwnProperty(key)) {
      params.append(key, mealSelection[key]);
    }
  }

  window.location.href = "sign-in.html?" + params.toString();
}

});
