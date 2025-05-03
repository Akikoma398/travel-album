document.getElementById("adminLoginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const pw1 = document.getElementById("pw1").value;
  const error = document.getElementById("error");

  if (pw1 === "398530893") {
    window.location.href = "admin.html";
  } else {
    error.textContent = "パスワードが正しくありません。";
  }
});