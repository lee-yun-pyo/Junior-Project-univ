const postContainer = document.getElementById("postContainer");
const form = document.getElementById("commentForm");
const textArea = form.querySelector("textarea");
const btn = form.querySelector("button");

const addComment = (text) => {
  const postComments = document.querySelector(".post__comments ul");
  const newComment = document.createElement("li");
  newComment.className = "post__comment";
  const span = document.createElement("span");
  span.innerText = `${text}`;
  newComment.appendChild(span);
  postComments.prepend(newComment);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const { postid } = postContainer.dataset;
  const text = textArea.value;
  if (text.trim() === "") {
    return;
  }
  const { status } = await fetch(`/api/posts/${postid}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  textArea.value = "";
  if (status === 201) {
    addComment(text);
  }
};

form.addEventListener("submit", handleSubmit);
