const adminPass1 = "adminkeyA"; // パスワード1（自由に設定OK）
const adminPass2 = "adminkeyB"; // パスワード2（自由に設定OK）

document.getElementById("adminLoginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const pw1 = document.getElementById("pw1").value;
  const pw2 = document.getElementById("pw2").value;
  const error = document.getElementById("error");

  if (pw1 === adminPass1 && pw2 === adminPass2) {
    window.location.href = "admin.html";
  } else {
    error.textContent = "パスワードが正しくありません。";
  }
});