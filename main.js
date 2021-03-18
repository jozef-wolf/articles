const container = document.querySelector(".container__posts");

//create render function

const renderPosts = async () => {
  let uri = `                                    
https://jsonplaceholder.typicode.com/posts?_sort=title
`;
  const res = await fetch(uri); //wait till we get the data (response object) back (response is stored in const).
  const posts = await res.json(); //json takes the response object and parses the data into js object.
  console.log(posts);

  let template = "";
  posts.forEach((post) => {
    //cirlce through posts and fire a callback function for each post. Each time we fire callback fn we get access.
    template += `
    <div class='post'>
    <h2 class='title'>${post.title}</h2>
    <p class='article'>${post.body.slice(0, 200)}</p>
    <a href="https://jozef-wolf.github.io/details?id=${post.id}">read more..</a>
    </div>`;
  });
  container.innerHTML = template;
};

//wait till DOM content is loaded, then fire a function.

window.addEventListener("DOMContentLoaded", () => renderPosts());
