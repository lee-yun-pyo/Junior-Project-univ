const postContainer = document.getElementById("postContainer");
const form = document.getElementById("commentForm");
const textArea = form.querySelector("textarea");
const btn = form.querySelector("button");

const handleSubmit = (event) => {
  event.preventDefault();
  const { postid } = postContainer.dataset;
  const text = textArea.value;
  fetch(`/api/posts/${postid}/comment`, {
    method: "POST",
    body: {
      text,
    },
  });
};

form.addEventListener("submit", handleSubmit);
