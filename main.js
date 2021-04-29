const postContainer = document.querySelector(".container__posts");
const asideContainer = document.querySelector(".container__weather");
//create render function

const renderPosts = async () => {
  let urlPosts = `
https://jsonplaceholder.typicode.com/posts?_sort=title
`;
  const res = await fetch(urlPosts); //wait till we get the data (response object) back (response is stored in const).
  const posts = await res.json(); //json takes the response object and parses the data into js object.
  console.log(posts);

  let templatePosts = "";
  posts.forEach((post) => {
    //cirlce through posts and fire a callback function for each post. Each time we fire callback fn we get access.
    templatePosts += `
    <div class='post'>
    <h2 class='title'>${post.title}</h2>
    <p class='article'>${post.body.slice(0, 200)}</p>
    <a href="/details.html?id=${post.id}">read more..</a>
    </div>`;
  });
  postContainer.innerHTML = templatePosts;
};
//wait till DOM content is loaded, then fire a function.
window.addEventListener("DOMContentLoaded", () => renderPosts());

// Get location data
function showPosition() {
  navigator.geolocation.getCurrentPosition(showMap);
}

function showMap(position) {
  var lat = position.coords.latitude;
  var long = position.coords.longitude;
  console.log(lat, long);

  //render weather
  const renderWeather = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=b9c60fdee21abc84b0d8ef6f3ec39b79`;
    const res = await fetch(url);
    const weater = await res.json();
    console.log(weater);

    function convertToC(kelvin) {
      let celsius = kelvin - 273.15;
      return celsius;
    }

    let celsiusTemp = convertToC(weater.main.temp).toFixed(1);
    let pic = weater.weather[0].icon;
    let icon = `http://openweathermap.org/img/wn/${pic}.png`;

    //get the today data
    // let today = new Date();

    // let date =
    //   today.getFullYear() +
    //   "-" +
    //   (today.getMonth() + 1) +
    //   "-" +
    //   today.getDate();
    // let time = today.getHours() + ":" + today.getMinutes();
    //${date}</br>${time}

    function formatDate(dateObject) {
      const parts = {
        date: dateObject.getDate(),
        month: dateObject.getMonth() + 1,
        year: dateObject.getFullYear(),
        hour: dateObject.getHours() % 12 || 12,
        minute: dateObject.getMinutes().toString().padStart(2, "0"),
        amOrPm: dateObject.getHours() < 12 ? "AM" : "PM",
      };
      console.log(parts);
      return `${parts.date}/${parts.month}/${parts.year} ${parts.hour}:${parts.minute} ${parts.amOrPm}`;
    }

    const myDate = new Date();
    const myDateFormatted = formatDate(myDate);
    console.log(myDateFormatted);

    let template = "";
    template += `
      <div class='container__weather--title'>WEATHER</div>
      <h2 class='container__weather--city'>${weater.name}, ${weater.sys.country}</h2>
      <div class='container__weather--date'>${myDateFormatted}</div>
      <div class='container__weather--icon'><img src='${icon}'></img></div>
      <ul class='container__weather--info'>
      <li>${weater.weather[0].description}</li>
        <li><i class="fas fa-thermometer-three-quarters"></i>${celsiusTemp} °C</li>
        <li><i class="fas fa-tint"></i>Humidity: ${weater.main.humidity}%</li>
        <li>Pressure: ${weater.main.pressure} hPa</li>
      </ul>
    `;

    asideContainer.innerHTML = template;
  };

  renderWeather();

  //wait till DOM content is loaded, then fire a function.
  window.addEventListener("DOMContentLoaded", () => renderWeather());
}

showPosition();
