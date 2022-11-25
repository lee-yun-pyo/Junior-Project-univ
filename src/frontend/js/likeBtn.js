const likeBtn = document.getElementById("likeBtn");
const icon = document.getElementById("likeBtnIcon");
const likeNumber = document.getElementById("likeSpan");
const postContainer = document.getElementById("postContainer");
const loginSpan = document.getElementById("notLogin");

const likeClick = () => {
  const { postid, userid } = postContainer.dataset;
  let num = parseInt(likeNumber.innerText);
  if (icon.classList.contains("fa-regular")) {
    if (userid === undefined) {
      loginSpan.innerText = "로그인 후 이용하세요";
      // flash Message
    } else {
      icon.classList.remove("fa-regular");
      icon.classList.add("fa-solid");
      likeNumber.innerText = ++num;
      fetch(`/api/posts/${postid}/like`, {
        method: "POST",
      });
    }
  } else {
    icon.classList.remove("fa-solid");
    icon.classList.add("fa-regular");
    likeNumber.innerText = --num;
    fetch(`/api/posts/${postid}/unlike`, {
      method: "POST",
    });
  }
};

likeBtn.addEventListener("click", likeClick);
