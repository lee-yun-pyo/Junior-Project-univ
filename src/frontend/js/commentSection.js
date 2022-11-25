const postContainer = document.getElementById("postContainer");
const form = document.getElementById("commentForm");
const textArea = form.querySelector("textarea");
const btn = form.querySelector("button");

const addComment = (text) => {
  const postComments = document.querySelector(".post__comments ul");
  const newComment = document.createElement("li");
  const btnDiv = document.createElement("div");
  const editBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");
  const editIcon = document.createElement("i");
  const deleteIcon = document.createElement("i");
  newComment.className = "post__comment";
  btnDiv.className = "post__comment-btn";
  editIcon.className = "fa-regular fa-pen-to-square";
  deleteBtn.className = "fa-solid fa-trash-can";
  editBtn.appendChild(editIcon);
  deleteBtn.appendChild(deleteIcon);
  btnDiv.appendChild(editBtn);
  btnDiv.appendChild(deleteBtn);
  const span = document.createElement("span");
  span.innerText = `${text}`;
  newComment.appendChild(span);
  newComment.appendChild(btnDiv);
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
