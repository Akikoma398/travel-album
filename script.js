// script.js

const adminPassword = "adminonly2025"; // 管理者専用パスワード

// localStorageから現在の一般パスワードを取得（なければ初期値）
let generalPassword = localStorage.getItem("generalPassword") || "awajikana2025";

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const enteredPassword = document.getElementById("passwordInput").value;
  const errorMessage = document.getElementById("errorMessage");

  generalPassword = localStorage.getItem("generalPassword"); // 毎回取得（変更対応）

  if (enteredPassword === generalPassword) {
    window.location.href = "home.html"; // 🔥 一般パスワード成功時 → home.htmlへ変更！
  } else if (enteredPassword === adminPassword) {
    window.location.href = "admin.html"; // 管理者パスワードならadminページ
  } else {
    errorMessage.textContent = "パスワードが違います"; // 間違えた場合
  }
});