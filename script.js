// デフォルトパスワード
const defaultGeneralPassword = "awajikana2025";

// localStorageから取れなければ初期値を使う
let generalPassword = localStorage.getItem("generalPassword") || defaultGeneralPassword;

// フォーム送信時にチェック
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const enteredPassword = document.getElementById("passwordInput").value;
  const errorMessage = document.getElementById("errorMessage");

  const currentPassword = localStorage.getItem("generalPassword") || defaultGeneralPassword;

  if (enteredPassword === currentPassword) {
    window.location.href = "home.html";
  } else if (enteredPassword === "adminonly2025") {
    window.location.href = "admin.html";
  } else {
    errorMessage.textContent = "パスワードが違います";
  }
});