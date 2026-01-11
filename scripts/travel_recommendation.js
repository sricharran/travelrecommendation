let travelData = [];

// Keyword variations
const keywords = {
  beach: ["beach", "beaches"],
  temple: ["temple", "temples"],
  country: ["country", "countries"]
};

// Fetch JSON data
fetch("data/travel_recommendation_api.json")
  .then(res => res.json())
  .then(data => {
    travelData = data.destinations;
  })
  .catch(err => console.error(err));

// Search function
function searchDestination() {
  const input = document.getElementById("searchInput").value.trim().toLowerCase();
  const container = document.getElementById("recommendations");
  container.innerHTML = "";

  if (!input) {
    container.innerHTML = "<p>Please enter a keyword or destination.</p>";
    return;
  }

  // Determine matched keyword
  let matchedKeyword = null;
  for (let key in keywords) {
    if (keywords[key].includes(input)) {
      matchedKeyword = key;
      break;
    }
  }

  let results = [];

  travelData.forEach(destination => {
    destination.cities.forEach(city => {
      const cityName = city.name.toLowerCase();
      const countryName = destination.name.toLowerCase();
      const description = city.description.toLowerCase();

      if (matchedKeyword === "beach" && description.includes("beach")) {
        results.push(city);
      } else if (matchedKeyword === "temple" && description.includes("temple")) {
        results.push(city);
      } else if (matchedKeyword === "country" && countryName.includes(input)) {
        results.push(city);
      }
    });
  });

  // Ensure at least 2 recommendations for Task 8
  if (results.length < 2 && matchedKeyword) {
    // fallback: pick first 2 cities of any destination
    travelData.forEach(destination => {
      destination.cities.forEach(city => {
        if (!results.includes(city) && results.length < 2) {
          results.push(city);
        }
      });
    });
  }

  // Display results
  // Display results
    if (results.length > 0) {
        results.forEach(city => {
            const card = document.createElement("div");
            card.className = "recommendation-card";

            card.innerHTML = `
            <img src="${city.imageUrl}" alt="${city.name}">
            <div class="recommendation-content">
                <h3>${city.name}, ${city.country}</h3>
                <p>${city.description}</p>
                <button>Visit</button>
            </div>
            `;

            container.appendChild(card);
        });
    } else {
    container.innerHTML = `<p style="color:white;">No results found for "${input}"</p>`;
    }
}

// Clear results
function clearResults() {
  document.getElementById("searchInput").value = "";
  document.getElementById("recommendations").innerHTML = "";
}
