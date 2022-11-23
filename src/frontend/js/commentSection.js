const postContainer = document.getElementById("postContainer");
const form = document.getElementById("commentForm");
const textArea = form.querySelector("textarea");
const btn = form.querySelector("button");

const handleSubmit = (event) => {
  event.preventDefault();
  const { postid } = postContainer.dataset;
  const text = textArea.value;
  if (text.trim() === "") {
    return;
  }
  fetch(`/api/posts/${postid}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
};

form.addEventListener("submit", handleSubmit);
