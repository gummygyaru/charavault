import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  // your config here
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get username from URL
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get("user");

if (!username) {
  document.body.innerHTML = "<p>User not specified.</p>";
  throw new Error("Username missing");
}

const sections = {
  echoes: "Echoes",
  characters: "Characters",
  worlds: "Worlds",
  hoard: "Your Hoard",
  stories: "Stories",
  art: "Art",
  designs: "Designs",
  comments: "Comments"
};

async function loadUserProfile() {
  const userRef = doc(db, "users", username);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    document.body.innerHTML = "<p>User not found.</p>";
    return;
  }

  const data = userSnap.data();

  document.getElementById("username").textContent = `@${username}`;
  document.getElementById("user-html").innerHTML = data.profileHTML || "<p>No profile content.</p>";

  // Populate sidebar links dynamically
  const sidebar = document.querySelector(".profile-sidebar ul");
  sidebar.innerHTML = "";

  for (let id in sections) {
    const li = document.createElement("li");
    li.innerHTML = `<a href="#" data-section="${id}">${sections[id]}</a>`;
    sidebar.appendChild(li);
  }

  // Load default section (Echoes)
  loadSection("echoes");

  // Sidebar navigation
  document.querySelectorAll(".profile-sidebar a").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const sectionId = e.target.dataset.section;
      loadSection(sectionId);
    });
  });

  // Load comments if public
  if (data.commentPermission !== "disabled") {
    loadComments(username);
  }
}

// Load section content dynamically
async function loadSection(sectionId) {
  const container = document.querySelector(".profile-main");
  container.innerHTML = `<div class="loading">Loading ${sections[sectionId]}...</div>`;

  let html = "";

  switch (sectionId) {
    case "echoes":
      html = `<h2>Echoes</h2><p>This is where your updates or bulletins will go.</p>`;
      break;

    case "characters":
      html = `<h2>Your Characters</h2><p>Characters linked to this user.</p>`;
      break;

    case "worlds":
      html = `<h2>Worlds</h2><p>Worlds this user is a part of.</p>`;
      break;

    case "hoard":
      html = `<h2>Your Hoard</h2><p>Favorites and treasured items.</p>`;
      break;

    case "stories":
      html = `<h2>Stories</h2><p>Written works by this user.</p>`;
      break;

    case "art":
      html = `<h2>Credited Art</h2><p>All art credited to this user.</p>`;
      break;

    case "designs":
      html = `<h2>Credited Designs</h2><p>All character designs credited to this user.</p>`;
      break;

    case "comments":
      html = `<h2>Comments</h2><div id="comment-list"><p>Loading comments...</p></div>`;
      break;

    default:
      html = `<h2>Not Found</h2><p>Unknown section: ${sectionId}</p>`;
  }

  container.innerHTML = html;

  // Load comment data if needed
  if (sectionId === "comments") {
    await loadComments(username);
  }
}

// Load comment data
async function loadComments(username) {
  const q = query(collection(db, "comments"), where("recipient", "==", username));
  const querySnapshot = await getDocs(q);
  const container = document.getElementById("comment-list");

  if (!container) return;

  if (querySnapshot.empty) {
    container.innerHTML = "<p>No comments yet.</p>";
    return;
  }

  container.innerHTML = "";

  querySnapshot.forEach(doc => {
    const c = doc.data();
    const el = document.createElement("div");
    el.className = "comment";
    el.innerHTML = `
      <strong>@${c.author}</strong>
      <p>${c.text}</p>
    `;
    container.appendChild(el);
  });
}

loadUserProfile();
