const postContainer = document.getElementById("postContainer");
const form = document.getElementById("commentForm");
const textArea = form.querySelector("textarea");
const btn = form.querySelector("button");
const loginSpan = document.getElementById("notLogin");
const editBtn = document.querySelectorAll(".comment__edit-btn");
const deleteBtn = document.querySelectorAll(".comment__delete-btn");
const commentUl = document.getElementById("post__comments-ul");

const editTextArea = document.querySelector(".comment__edit-textarea");
if (editTextArea) {
  const editText = editTextArea;
}
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
  deleteIcon.className = "fa-solid fa-trash-can";
  editBtn.appendChild(editIcon);
  deleteBtn.appendChild(deleteIcon);
  btnDiv.appendChild(editBtn);
  btnDiv.appendChild(deleteBtn);
  editBtn.addEventListener("click", handleEdit);
  deleteBtn.addEventListener("click", handleDelete);
  const span = document.createElement("span");
  span.innerText = `${text}`;
  newComment.appendChild(span);
  newComment.appendChild(btnDiv);
  postComments.prepend(newComment);
};

const handleEditConfirm = async (event) => {
  event.preventDefault();
  const textArea = event.target.parentNode.parentNode.childNodes[0];
  const text = textArea.value;
  const existComment = event.target.parentNode.parentNode.parentNode;
  const { commentid } = existComment.dataset;
  existComment.removeChild(existComment.childNodes[0]);
  const btnDiv = document.createElement("div");
  const editBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");
  const editIcon = document.createElement("i");
  const deleteIcon = document.createElement("i");
  btnDiv.className = "post__comment-btn";
  editIcon.className = "fa-regular fa-pen-to-square";
  deleteIcon.className = "fa-solid fa-trash-can";
  editBtn.appendChild(editIcon);
  deleteBtn.appendChild(deleteIcon);
  btnDiv.appendChild(editBtn);
  btnDiv.appendChild(deleteBtn);
  editBtn.addEventListener("click", handleEdit);
  deleteBtn.addEventListener("click", handleDelete);
  const span = document.createElement("span");
  span.innerText = text;
  existComment.appendChild(span);
  existComment.appendChild(btnDiv);
  await fetch(`/api/comment/${postid}/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text, commentid }),
  });
};

const handleTextArea = (event) => {
  const confirmBtn = document.querySelector(
    ".comment__edit-btns button:last-child"
  );
  const text = event.target.value;
  if (text.trim() === "") {
    confirmBtn.classList.remove("comment__edit-confirmBtn");
    confirmBtn.setAttribute("disabled", true);
  } else {
    confirmBtn.removeAttribute("disabled");
    confirmBtn.classList.add("comment__edit-confirmBtn");
  }
};

const paintEdit = (event) => {
  const li = event.target.parentNode.parentNode;
  const text = li.innerText;
  li.removeChild(li.childNodes[0]); // sapn 태그 삭제
  li.removeChild(li.childNodes[0]); // btn div 삭제
  const form = document.createElement("form");
  const textArea = document.createElement("textarea");
  const btnDiv = document.createElement("div");
  const cancleBtn = document.createElement("button");
  const confirmBtn = document.createElement("button");
  textArea.setAttribute("placeholder", "댓글을 수정하세요...");
  form.className = "comment__edit-form";
  textArea.className = "comment__edit-textarea";
  btnDiv.className = "comment__edit-btns";
  cancleBtn.className = "comment__edit-cancleBtn";
  confirmBtn.className = "comment__edit-confirmBtn";
  cancleBtn.innerText = "취소";
  confirmBtn.innerText = "수정";
  btnDiv.appendChild(cancleBtn);
  btnDiv.appendChild(confirmBtn);
  // confirmBtn.addEvent
  textArea.value = text;
  confirmBtn.addEventListener("click", handleEditConfirm);
  textArea.addEventListener("input", handleTextArea);
  form.appendChild(textArea);
  form.appendChild(btnDiv);
  li.appendChild(form);
};

const deletComment = (event) => {
  const commentContainer = document.querySelector(".post__comments ul");
  const li = event.target.parentNode.parentNode;
  commentContainer.removeChild(li);
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

const handleEdit = (event) => {
  paintEdit(event);
};

const handleDelete = async (event) => {
  deletComment(event);
  const li = event.target.parentNode.parentNode;
  const { commentid } = li.dataset;
  await fetch(`/api/comment/${postid}/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ commentid }),
  });
};

form.addEventListener("submit", handleSubmit);
for (let i = 0; i < deleteBtn.length; i++) {
  editBtn[i].addEventListener("click", handleEdit);
  deleteBtn[i].addEventListener("click", handleDelete);
}
