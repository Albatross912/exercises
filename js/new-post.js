const API_URL = "http://localhost:3000/api/posts";

function submitFormAndRedirect() {
  // Perform the submitNewPost() function logic
  submitNewPost();

  // Redirect to index.html after a delay
  setTimeout(() => {
    window.location.href = "http://127.0.0.1:5500/index.html";
  }, 2000);
}
const submitNewPost = () => {
  let input = document.querySelector('input[type="file"]');
  const title = document.getElementById("form-post-title").value;
  const content = document.getElementById("form-post-content").value;
  let data = new FormData();
  data.append("post-image", input.files[0]);
  data.append("title", title);
  data.append("content", content);

  fetch(API_URL, {
    method: "POST",
    body: data,
  }).catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
    // Handle the error as needed, e.g., show an error message to the user.
  });
};
