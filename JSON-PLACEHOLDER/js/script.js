const loadComments = () => {
  fetch("https://jsonplaceholder.typicode.com/comments")
    .then((res) => res.json())
    .then((data) => displayComments(data));
};

const displayComments = (comments) => {
  const container = document.getElementById("comments");

  comments.forEach((comment) => {
    const div = document.createElement("div");
    div.classList.add("comment");
    div.setAttribute("onclick", `getId(${comment.id})`);
    // div.setAttribute((onclick = ""));
    div.innerHTML = `
        <h3>Name: <span>${comment.name}</span></h3>
        <h3>Email: <span>${comment.email}</span></h3>
        <p>
          ${comment.body}
        </p>
    `;
    container.appendChild(div);
  });
};

const getId = (id) => {
  const idField = document.getElementById("id-number");
  idField.innerText = id;
};
