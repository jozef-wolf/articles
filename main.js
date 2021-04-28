const postContainer = document.querySelector(".container__posts");
const asideContainer = document.querySelector(".container__weather");
//create render function

const renderPosts = async () => {
  let url = `
https://jsonplaceholder.typicode.com/posts?_sort=title
`;
  const res = await fetch(url); //wait till we get the data (response object) back (response is stored in const).

  const posts = await res.json(); //json takes the response object and parses the data into js object.
  console.log(posts);

  let template = "";
  posts.forEach((post) => {
    //cirlce through posts and fire a callback function for each post. Each time we fire callback fn we get access.
    template += `
    <div class='post'>
    <h2 class='title'>${post.title}</h2>
    <p class='article'>${post.body.slice(0, 200)}</p>
    <a href="/details.html?id=${post.id}">read more..</a>
    </div>`;
  });
  postContainer.innerHTML = template;
};
//wait till DOM content is loaded, then fire a function.
window.addEventListener("DOMContentLoaded", () => renderPosts());

function showPosition() {
  navigator.geolocation.getCurrentPosition(showMap);
}

function showMap(position) {
  // Get location data
  var lat = position.coords.latitude;
  var long = position.coords.longitude;
  console.log(lat, long);

  const renderWeather = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=b9c60fdee21abc84b0d8ef6f3ec39b79`;
    const res = await fetch(url);
    const weater = await res.json();
    console.log(weater);

    let template = "";
    function convertToC(kelvin) {
      let celsius = kelvin - 273.15;
      return celsius;
    }

    let celsiusTemp = convertToC(weater.main.temp).toFixed(1);
    let pic = weater.weather[0].icon;
    let icon = `http://openweathermap.org/img/wn/${pic}.png`;

    let today = new Date();

    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    let time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    template += `
      <div class='container__weather--title'>WEATHER</div>
      <h2 class='container__weather--city'>${weater.name}, ${weater.sys.country}</h2>
      <div class='container__weather--date'>${date}</br>${time}</div>
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
