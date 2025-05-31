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
});

document.addEventListener('DOMContentLoaded', function () {
    new Typed('#typed', {
        strings: [
            "Fly Beyond Limits — Always Safe, Always Affordable, Reliable.",
            "Book. Manage. Fly — Everything You Need, All in One Platform.",
            "Welcome Aboard Syndicate Airways — Sit Back, Relax, and Enjoy!"
        ],
      typeSpeed: 80,
      backSpeed: 80,
      backDelay: 1000,
      loop: true,
      showCursor: true,
      cursorChar: '|',
      smartBackspace: true
    });
  });

  const airports = [
  { name: "Delhi (DEL)", city: "delhi", lat: 28.5562, lon: 77.1000 },
  { name: "Mumbai (BOM)", city: "mumbai", lat: 19.0896, lon: 72.8656 },
  { name: "Bengaluru (BLR)", city: "bengaluru", lat: 13.1986, lon: 77.7066 },
  { name: "Hyderabad (HYD)", city: "hyderabad", lat: 17.2403, lon: 78.4294 },
  { name: "Chennai (MAA)", city: "chennai", lat: 12.9941, lon: 80.1709 },
  { name: "Kolkata (CCU)", city: "kolkata", lat: 22.6547, lon: 88.4467 },
  { name: "Ahmedabad (AMD)", city: "ahmedabad", lat: 23.0727, lon: 72.6347 },
  { name: "Pune (PNQ)", city: "pune", lat: 18.5822, lon: 73.9197 },
  { name: "Goa (GOI)", city: "goa", lat: 15.3800, lon: 73.8310 },
  { name: "Lucknow (LKO)", city: "lucknow", lat: 26.7618, lon: 80.8893 },
  { name: "Jaipur (JAI)", city: "jaipur", lat: 26.8242, lon: 75.8025 },
  { name: "Amritsar (ATQ)", city: "amritsar", lat: 31.7096, lon: 74.7997 },
  { name: "Indore (IDR)", city: "indore", lat: 22.7216, lon: 75.8011 },
  { name: "Chandigarh (IXC)", city: "chandigarh", lat: 30.6735, lon: 76.7885 },
  { name: "Nagpur (NAG)", city: "nagpur", lat: 21.0922, lon: 79.0472 },
  { name: "Kochi (COK)", city: "kochi", lat: 10.1556, lon: 76.3911 },
  { name: "Patna (PAT)", city: "patna", lat: 25.5913, lon: 85.0870 },
  { name: "Varanasi (VNS)", city: "varanasi", lat: 25.4524, lon: 82.8593 },
  { name: "Thiruvananthapuram (TRV)", city: "thiruvananthapuram", lat: 8.4821, lon: 76.9201 },
  { name: "Srinagar (SXR)", city: "srinagar", lat: 33.9871, lon: 74.7742 },
  { name: "Bhopal (BHO)", city: "bhopal", lat: 23.2879, lon: 77.3370 },
  { name: "Ranchi (IXR)", city: "ranchi", lat: 23.3144, lon: 85.3219 },
  { name: "Raipur (RPR)", city: "raipur", lat: 21.1804, lon: 81.7380 },
  { name: "Dehradun (DED)", city: "dehradun", lat: 30.1897, lon: 78.1803 },
  { name: "Imphal (IMF)", city: "imphal", lat: 24.7600, lon: 93.8967 },
  { name: "Agartala (IXA)", city: "agartala", lat: 23.8869, lon: 91.2404 },
  { name: "Guwahati (GAU)", city: "guwahati", lat: 26.1061, lon: 91.5859 },
  { name: "Jodhpur (JDH)", city: "jodhpur", lat: 26.2511, lon: 73.0489 },
  { name: "Udaipur (UDR)", city: "udaipur", lat: 24.6177, lon: 73.8961 }
];

  
  
  function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
  
  function getAndFillLocation(input, suggestionBox) {
    if (!navigator.geolocation) {
      alert("Geolocation not supported.");
      return;
    }
  
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
  
        let minDist = Infinity;
        let nearest = airports[0].name;
  
        airports.forEach(a => {
          const dist = getDistance(latitude, longitude, a.lat, a.lon);
          if (dist < minDist) {
            minDist = dist;
            nearest = a.name;
          }
        });
  
        input.value = nearest;
        suggestionBox.innerHTML = "";
      },
      () => alert("Could not access your location.")
    );
  }
  
  
  function filterSuggestions(input) {
    const val = input.value.toLowerCase();
    const listId = input.id + "-suggestions";
    const suggestionBox = document.getElementById(listId);
  
    document.querySelectorAll(".suggestions").forEach(box => {
      if (box !== suggestionBox) {
        box.innerHTML = "";
        box.classList.remove("visible");
      }
    });
  
    suggestionBox.innerHTML = "";
    suggestionBox.classList.add("visible");
  
    const useLoc = document.createElement("li");
    useLoc.textContent = "Use My Location";
    useLoc.classList.add("use-location");
    useLoc.onclick = () => getAndFillLocation(input, suggestionBox);
    suggestionBox.appendChild(useLoc);
  
    const filtered = val === ""
      ? airports.map(a => a.name)
      : airports.map(a => a.name).filter(name => name.toLowerCase().includes(val));
  
    filtered.forEach(city => {
      const li = document.createElement("li");
      li.textContent = city;
      li.onclick = () => {
        input.value = city;
        suggestionBox.innerHTML = "";
        suggestionBox.classList.remove("visible");
      };
      suggestionBox.appendChild(li);
    });
  }
  
  
  function useMyLocation(inputId) {
    const input = document.getElementById(inputId);
    const suggestionBox = document.getElementById(inputId + "-suggestions");
    getAndFillLocation(input, suggestionBox);
  }
  
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".input-block")) {
      document.querySelectorAll(".suggestions").forEach(list => list.innerHTML = "");
    }
  });
  
  const input = document.getElementById('passengerInput');
const panel = document.getElementById('passengerPanel');

const adult = document.getElementById('adultCount');
const child = document.getElementById('childCount');
const senior = document.getElementById('seniorCount');
const infant = document.getElementById('infantCount');

function updatePassengerTotal() {
  const total =
    parseInt(adult.value || 0) +
    parseInt(child.value || 0) +
    parseInt(senior.value || 0) +
    parseInt(infant.value || 0);
  input.value = total + " Passenger" + (total !== 1 ? "s" : "");
}

input.addEventListener('click', (e) => {
  panel.style.display = 'block';
  e.stopPropagation();
});

panel.addEventListener('click', (e) => {
  e.stopPropagation();
});

document.addEventListener('click', () => {
  panel.style.display = 'none';
});

[adult, child, senior, infant].forEach(field => {
  field.addEventListener('input', updatePassengerTotal);
});

updatePassengerTotal();

function toggleReturnDate() {
  const isRoundTrip = document.getElementById('roundtrip').checked;
  const returnInput = document.getElementById('returnDate');
  const returnBlock = document.getElementById('returnDateBlock');

  if (isRoundTrip) {
    returnInput.disabled = false;
    returnInput.style.opacity = "1";
    returnInput.style.pointerEvents = "auto";
    returnBlock.style.display = "block";
  } else {
    returnInput.disabled = true;
    returnInput.style.opacity = "0.5";
    returnInput.style.pointerEvents = "none";
    returnBlock.style.display = "block";
  }
}
  
  document.addEventListener("DOMContentLoaded", function () {
    toggleReturnDate();
  
    document.getElementById('oneway').addEventListener('change', toggleReturnDate);
    document.getElementById('roundtrip').addEventListener('change', toggleReturnDate);
  });
  

  function scrollCarousel(direction) {
  const carousel = document.getElementById('carousel');
  const scrollAmount = carousel.querySelector('.carousel-item').offsetWidth + 16;
  carousel.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
}

function searchFlights() {
    const tripType = document.getElementById("roundtrip").checked ? "round" : "oneway";
    const from = document.getElementById("from").value.trim();
    const to = document.getElementById("to").value.trim();
    const departureDate = document.querySelector(".calender1").value;
    const returnDate = document.getElementById("returnDate").value;
    const today = new Date().toISOString().split("T")[0];

    if (!from || !to) {
      alert("Please fill both 'From' and 'To' fields.");
      return;
    }

    if (from.toLowerCase() === to.toLowerCase()) {
      alert("'From' and 'To' locations cannot be the same.");
      return;
    }

    if (!departureDate) {
      alert("Please select a departure date.");
      return;
    }

    if (departureDate < today) {
      alert("Departure date cannot be before today's date.");
      return;
    }

    if (tripType === "round") {
      if (!returnDate) {
        alert("Please select a return date.");
        return;
      }
      if (returnDate < departureDate) {
        alert("Return date cannot be before departure date.");
        return;
      }
    }

    const adults = document.getElementById("adultCount").value;
    const children = document.getElementById("childCount").value;
    const seniors = document.getElementById("seniorCount").value;
    const infants = document.getElementById("infantCount").value;

    const currency = document.querySelector(".currency-select-bro").value;

    const params = new URLSearchParams({
      tripType,
      from,
      to,
      departureDate,
      ...(tripType === "round" && { returnDate }),
      adults,
      children,
      seniors,
      infants,
      purpose,
      currency
    });

    window.location.href = `search.html?${params.toString()}`;
  }

  document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);

  const tripType = urlParams.get("tripType");
  const from = urlParams.get("from");
  const to = urlParams.get("to");
  const departureDate = urlParams.get("departureDate");
  const returnDate = urlParams.get("returnDate");
  const adults = urlParams.get("adults");
  const children = urlParams.get("children");
  const seniors = urlParams.get("seniors");
  const infants = urlParams.get("infants");
  const currency = urlParams.get("currency");
  const purpose = urlParams.get("purpose");

  if (tripType === "round") {
    document.getElementById("roundtrip").checked = true;
    document.getElementById("returnDateBlock").style.display = "block";
  } else {
    document.getElementById("oneway").checked = true;
    document.getElementById("returnDateBlock").style.display = "none";
  }

  if (from) document.getElementById("from").value = from;
  if (to) document.getElementById("to").value = to;

  if (departureDate) document.querySelector(".calender1").value = departureDate;
  if (returnDate) document.getElementById("returnDate").value = returnDate;

  if (adults) document.getElementById("adultCount").value = adults;
  if (children) document.getElementById("childCount").value = children;
  if (seniors) document.getElementById("seniorCount").value = seniors;
  if (infants) document.getElementById("infantCount").value = infants;

  const passInput = document.getElementById("passengerInput");
  passInput.value = `Adults: ${adults || 0}, Children: ${children || 0}, Seniors: ${seniors || 0}, Infants: ${infants || 0}`;

  if (purpose) {
    const purposeSelect = document.getElementById("purpose");
    for (const option of purposeSelect.options) {
      if (option.text === purpose) {
        option.selected = true;
        break;
      }
    }
  }

  if (currency) {
    const currencySelect = document.querySelector(".currency-select-bro");
    for (const option of currencySelect.options) {
      if (option.value === currency || option.text.includes(currency)) {
        option.selected = true;
        break;
      }
    }
  }

  const carouselItems = document.querySelectorAll(".carousel-item");

  carouselItems.forEach(item => {
    item.addEventListener("click", () => {
      const city = item.textContent.trim();
      document.getElementById("to").value = city;
    });
  });
});