const likeBtn = document.getElementById("likeBtn");
const icon = document.getElementById("likeBtnIcon");
const likeNumber = document.getElementById("likeSpan");

const likeClick = () => {
  const { id } = postContainer.dataset;
  console.log(id);
  let num = parseInt(likeNumber.innerText);
  if (icon.classList.contains("fa-regular")) {
    icon.classList.remove("fa-regular");
    icon.classList.add("fa-solid");
    likeNumber.innerText = ++num;
    fetch(`/api/posts/${id}/like`, {
      method: "POST",
    });
  } else {
    icon.classList.remove("fa-solid");
    icon.classList.add("fa-regular");
    likeNumber.innerText = --num;
    fetch(`/api/posts/${id}/unlike`, {
      method: "POST",
    });
  }
};

// const handleEnded = () => {
//   const { id } = postContainer.dataset;
//   console.log(id);
//   fetch(`/api/posts/${id}/like`, {
//     method: "POST",
//   });
// };

likeBtn.addEventListener("click", likeClick);
