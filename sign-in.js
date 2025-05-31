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
    seats: (params.get("seats") || "").split(","),
    vegMeals: parseInt(params.get("veg")) || 0,
    nonVegMeals: parseInt(params.get("nonVeg")) || 0,
    specialMeals: parseInt(params.get("special")) || 0,
  };

  flightData.totalPassengers = flightData.adults + flightData.children + flightData.seniors + flightData.infants;
  flightData.totalMeals = flightData.vegMeals + flightData.nonVegMeals + flightData.specialMeals;

  console.log("Flight + Passenger Data:", flightData);

const submitBtn = document.getElementById("submitBtn");

if (submitBtn) {
  submitBtn.addEventListener("click", function () {
    const usernameInput = document.getElementById("username").value.trim();
    const passwordInput = document.getElementById("password").value.trim();

    const currentParams = new URLSearchParams(window.location.search);
    const queryString = currentParams.toString();

    if (usernameInput === "username" && passwordInput === "username") {
      window.location.href = "user.html?" + queryString;
    } else if (usernameInput === "executive" && passwordInput === "executive") {
      window.location.href = "executive.html?" + queryString;
    } else {
      alert("Invalid username or password.");
    }
  });
}

});
