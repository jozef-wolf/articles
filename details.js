//js for details
const id = new URLSearchParams(window.location.search).get("id");
const container = document.querySelector(".details");

const renderDetails = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts/" + id);
  const post = await res.json();
  console.log(post);

  const template = `<div>
  <h1>${post.title}</h1><p>${post.body}</p></div>`;

  container.innerHTML = template;
};

window.addEventListener("DOMContentLoaded", () => renderDetails());
