// admin.js

// デフォルト値がlocalStorageに無い場合にセット
if (!localStorage.getItem("generalPassword")) {
    localStorage.setItem("generalPassword", "awajikana2025");
  }
  
  // 表示更新
  document.getElementById("currentPassword").textContent = localStorage.getItem("generalPassword");
  
  // 変更処理
  document.getElementById("changePasswordForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const newPass = document.getElementById("newPassword").value;
    localStorage.setItem("generalPassword", newPass);
    document.getElementById("currentPassword").textContent = newPass;
    document.getElementById("changeMessage").textContent = "パスワードを変更しました";
  });