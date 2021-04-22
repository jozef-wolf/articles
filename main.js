const postContainer = document.querySelector(".container__posts");
const asideContainer = document.querySelector(".container__aside");
//create render function

const renderPosts = async () => {
  let url = `                                    
https://jsonplaceholder.typicode.com/posts?_sort=title
`;
  const res = await fetch(url); //wait till we get the data (response object) back (response is stored in const).
  console.log(res);
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
  console.log(res);
  const wheater = await res.json();
  console.log(wheater);

  let template = "";

  //cirlce through posts and fire a callback function for each post. Each time we fire callback fn we get access.
  console.log(wheater);
  template += `
    <div>
      <h2>City: ${wheater.name}</h2>
      <ul>
        <li>${wheater.main.temp}</li>
        <li>${wheater.main.humidity}</li>
        <li>${wheater.main.pressure}</li>
        <li>${wheater.rain}</li>
      </ul>
    </div>`;

  asideContainer.innerHTML = template;
};
//wait till DOM content is loaded, then fire a function.
window.addEventListener("DOMContentLoaded", () => renderPosts());
window.addEventListener("DOMContentLoaded", () => renderWeather());
