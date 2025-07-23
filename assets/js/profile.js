// /assets/js/profile.js

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

// Your Firebase config
const firebaseConfig = {
  // your config here
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get ?user=username from URL
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get("user");

if (!username) {
  document.body.innerHTML = "<p>User not specified.</p>";
  throw new Error("Username missing");
}

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

  // Load comments if public
  if (data.commentPermission !== "disabled") {
    loadComments(username);
  }

  // Add placeholder sections for smooth anchor scrolling
  const sections = [
    "bulletin", "characters", "worlds", "hoard",
    "stories", "art", "designs", "comments"
  ];
  const main = document.querySelector(".profile-main");

  sections.forEach(id => {
    if (!document.getElementById(id)) {
      const section = document.createElement("section");
      section.id = id;
      section.innerHTML = `<h3>${id.charAt(0).toUpperCase() + id.slice(1)}</h3><p>Loading or not available.</p>`;
      main.appendChild(section);
    }
  });
}

// Load comment data from Firestore
async function loadComments(username) {
  const q = query(collection(db, "comments"), where("recipient", "==", username));
  const querySnapshot = await getDocs(q);
  const container = document.getElementById("comment-list");

  if (querySnapshot.empty) {
    container.innerHTML = "<p>No comments yet.</p>";
    return;
  }

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

// Enable smooth scrolling for sidebar nav
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".profile-sidebar a[href^='#']").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
});

loadUserProfile();
