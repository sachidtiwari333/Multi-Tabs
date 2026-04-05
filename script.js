const form = document.getElementById("tab-form");
const siteName = document.getElementById("site-name");
const siteUrl = document.getElementById("site-url");
const postsDiv = document.getElementById("posts");
const showUrl = document.getElementById("show-url");
const showName = document.getElementById("show-name");
const showLogo = document.getElementById("show-logo");

// Load posts when page opens
window.onload = function () {
  const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
  displayPosts(savedPosts);
};

// Handle submit
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const siteNameValue = siteName.value.trim();
  const siteUrlValue = siteUrl.value.trim();

  let posts = JSON.parse(localStorage.getItem("posts")) || [];

  posts.push({ name: siteNameValue, url: siteUrlValue });

  localStorage.setItem("posts", JSON.stringify(posts));

  siteName.value = "";
  siteUrl.value = "";

  displayPosts(posts);
});

// Display posts
function displayPosts(posts) {
  postsDiv.innerHTML = ""; // clear old content

  posts.forEach((post) => {
    const div = document.createElement("div");

    const link = document.createElement("a");
    link.href = post.url;
    link.target = "_blank";

    const img = document.createElement("img");
    img.src = `https://www.google.com/s2/favicons?domain=${post.url}&sz=32`;
    img.alt = post.name;

    const title = document.createElement("p");
    title.textContent = post.name;
   img.style.cssText = `
        width: 36px; 
        height: 36px; 
        border-radius: 6px; 
        margin-right: 12px; 
        vertical-align: middle;
        box-shadow: 0 2px 6px rgba(255,255,255,0.1); /* lighter shadow for dark bg */
    `;

    title.style.cssText = `
        display: block; 
        font-size: 18px; 
        font-weight: 500; 
        color: #f0f0f0; /* light text for dark background */
        text-decoration: none;
        transition: color 0.2s ease;
    `;

    div.style.cssText = `
        background-color: #2a2a2a; /* dark card background */
        padding: 12px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 8px;
        transition: background-color 0.2s ease;
    `;

div.onmouseover = () => div.style.backgroundColor = "#3a3a3a";
div.onmouseout = () => div.style.backgroundColor = "#2a2a2a";
    link.appendChild(img);
    div.appendChild(link);
    div.appendChild(title);

    postsDiv.appendChild(div);
  });
}
function clearAll() {
    localStorage.clear();      // remove all stored posts
    displayPosts([]);          // clear the UI
}