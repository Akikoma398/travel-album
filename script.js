// 管理者用固定パスワード
const adminPassword = "adminonly2025";

// localStorageからパスワードを取る。ただし取得失敗時は初期値で固定
let generalPassword = localStorage.getItem("generalPassword");
if (!generalPassword) {
  generalPassword = "awajikana2025";
  localStorage.setItem("generalPassword", generalPassword); // 初回なら自動で保存しておく
}

// ログインフォーム送信時の処理
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const enteredPassword = document.getElementById("passwordInput").value;
  const errorMessage = document.getElementById("errorMessage");

  const currentPassword = localStorage.getItem("generalPassword") || "awajikana2025";

  if (enteredPassword === currentPassword) {
    window.location.href = "home.html";
  } else if (enteredPassword === adminPassword) {
    window.location.href = "admin.html";
  } else {
    errorMessage.textContent = "パスワードが違います";
  }
});