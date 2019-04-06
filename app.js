window.addEventListener("load", () => {
  let longitude;
  let latitude;
  const location = document.querySelector(".location-timezone");
  const temperatureDescr = document.querySelector(".temperature-description");
  const temperatureDegree = document.querySelector(".temperature-degree");
  const humidityParagaph = document.querySelector('.humidity')
  const apparentTemp = document.querySelector('.apparent-temperature')
  const pressureParagraph = document.querySelector('.pressure')
  const windSpeedParagraph = document.querySelector('.wind-speed')
  const temperatureChange = document.querySelector(".degree-change");
  const unitChange = document.querySelector("#degree");

//   const toggleTemperature = (fahrenheit, temperature) => {
//       if(unitChange.textContent === "C") {
//           unitChange.textContent = "F"
//           temperatureDegree.textContent = Math.floor(fahrenheit)
//       } else {
//           unitChange.textContent = "C"
//           temperatureDegree.textContent = temperature
//       }
//     }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position);
      longitude = position.coords.longitude;
      latitude = position.coords.latitude;

      const proxy = `https://cors-anywhere.herokuapp.com/`;
      const apiKey = `29770c26ed9ca55927b3087c4d5a9952`;
      const apiCall = `${proxy}https://api.darksky.net/forecast/${apiKey}/${latitude},${longitude}?units=auto&lang=pl`;

      fetch(apiCall)
        .then(response => {
          return response.json();
        })
        .then(response => {
          console.log(response);
          const {
            temperature,
            apparentTemperature,
            humidity,
            icon,
            pressure,
            summary,
            time,
            windSpeed
          } = response.currently;

          const humidityFixed = humidity*100
          const windSpeedFixed = Math.floor(windSpeed * 18/5)
          const fahrenheit = (temperature * 9) / 5 + 32;
          console.log(fahrenheit, humidity, pressure, time, windSpeed, apparentTemperature);
          // wyswietlenie pobranych danych z API
          location.textContent = response.timezone;
          temperatureDegree.textContent = temperature;
          apparentTemp.textContent = `Temperatura odczuwalna: ${apparentTemperature}`;
          temperatureDescr.textContent = `Podsumowanie: ${summary}`;
          humidityParagaph.textContent = `Wilgotność: ${humidityFixed}%`
          pressureParagraph.textContent = `Ciśnienie: ${pressure} hPa`
          windSpeedParagraph.textContent = `Prędkość wiatru: ${windSpeedFixed}km/h`
          //   wywołanie displayIcon
          displayIcon(icon, document.querySelector(".icon"));

          temperatureChange.addEventListener("click", () => {
            if (unitChange.textContent === "C") {
              unitChange.textContent = "F";
              temperatureDegree.textContent = Math.floor(fahrenheit);
            } else {
              unitChange.textContent = "C";
              temperatureDegree.textContent = temperature;
            }
          });
        });
    });
  } else {
    // wyswietl info o błdedzie
  }

  const displayIcon = (icon, iconID) => {
    const skycons = new Skycons({ color: "#fff" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  };
});

const currentDate = new Date();
const currrentYear = currentDate.getFullYear();
document.querySelector('.copyright span').textContent = currrentYear;
