const postContainer = document.querySelector(".container__posts");
const asideContainer = document.querySelector(".container__aside");
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

const renderWeather = async () => {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=Sopot&appid=b9c60fdee21abc84b0d8ef6f3ec39b79`;
  const res = await fetch(url);
  const wheater = await res.json();
  console.log(wheater);

  let template = "";
  function convertToC(kelvin) {
    let celsius = kelvin - 273.15;
    return celsius;
  }
  let celsiusTemp = convertToC(wheater.main.temp).toFixed(1);
  let celsiusFeel = convertToC(wheater.main.feels_like).toFixed(2);
  //cirlce through posts and fire a callback function for each post. Each time we fire callback fn we get access.
  template += `
    <div class='weather'>
      <h2 class='weather__city'>${wheater.name}</h2>
      <ul class='weather__city--info'>
        <li>${celsiusTemp} C</li>
         <li>${celsiusFeel} C</li>
        <li>${wheater.main.humidity}</li>
        <li>${wheater.main.pressure}</li>
      </ul>
    </div>`;

  asideContainer.innerHTML = template;
};
//wait till DOM content is loaded, then fire a function.
window.addEventListener("DOMContentLoaded", () => renderPosts());
window.addEventListener("DOMContentLoaded", () => renderWeather());
