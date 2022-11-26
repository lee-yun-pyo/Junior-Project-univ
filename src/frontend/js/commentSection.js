const postContainer = document.getElementById("postContainer");
const form = document.getElementById("commentForm");
const textArea = form.querySelector("textarea");
const btn = form.querySelector("button");
const loginSpan = document.getElementById("notLogin");
const editBtn = document.getElementById("comment__edit-btn");
const deleteBtn = document.getElementById("comment__delete-btn");

const { postid, userid } = postContainer.dataset;
if (userid === undefined) {
  textArea.placeholder = "로그인 후 이용하세요";
  textArea.setAttribute("disabled", true);
  btn.setAttribute("disabled", true);
  btn.setAttribute("style", "background-color: rgba(0,0,0,0.1);");
  // flash Message
}

const addComment = (text, commentId) => {
  const postComments = document.querySelector(".post__comments ul");
  const newComment = document.createElement("li");
  newComment.dataset.commentid = commentId;
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
  if (userid === undefined) {
    loginSpan.innerText = "로그인 후 이용하세요";
    // flash Message
  } else {
    const text = textArea.value;
    if (text.trim() === "") {
      return;
    }
    const response = await fetch(`/api/posts/${postid}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });
    if (response.status === 201) {
      const { newCommentId } = await response.json();
      addComment(text, newCommentId);
      textArea.value = "";
    }
  }
};

const handleEdit = () => {};

const handleDelete = () => {};

form.addEventListener("submit", handleSubmit);
editBtn.addEventListener("click", handleEdit);
deleteBtn.addEventListener("click", handleDelete);
