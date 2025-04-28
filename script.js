const adminPassword = "adminonly2025";
const generalPassword = "awajikana2025"; // 完全固定

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const enteredPassword = document.getElementById("passwordInput").value;
  const errorMessage = document.getElementById("errorMessage");

  if (enteredPassword === generalPassword) {
    window.location.href = "home.html";
  } else if (enteredPassword === adminPassword) {
    window.location.href = "admin.html";
  } else {
    errorMessage.textContent = "パスワードが違います";
  }
});