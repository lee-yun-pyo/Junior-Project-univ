const postContainer = document.getElementById("postContainer");

const viewsController = () => {
  const { postid } = postContainer.dataset;
  fetch(`/api/posts/${postid}/views`, {
    method: "POST",
  });
};

window.addEventListener("load", viewsController);
