// ▼ パスワード表示と変更（共通・管理者）
if (!localStorage.getItem("generalPassword")) {
  localStorage.setItem("generalPassword", "keion2025");
}
document.getElementById("currentPassword").textContent = localStorage.getItem("generalPassword");

document.getElementById("changePasswordForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const newPass = document.getElementById("newPassword").value;
  localStorage.setItem("generalPassword", newPass);
  document.getElementById("currentPassword").textContent = newPass;
  document.getElementById("changeMessage").textContent = "パスワードを変更しました";
});

if (!localStorage.getItem("adminPassword1")) {
  localStorage.setItem("adminPassword1", "adminkeyA");
}
if (!localStorage.getItem("adminPassword2")) {
  localStorage.setItem("adminPassword2", "adminkeyB");
}
document.getElementById("adminPw1").textContent = localStorage.getItem("adminPassword1");
document.getElementById("adminPw2").textContent = localStorage.getItem("adminPassword2");

document.getElementById("changeAdminPasswordForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const newPw1 = document.getElementById("newAdminPw1").value;
  const newPw2 = document.getElementById("newAdminPw2").value;
  localStorage.setItem("adminPassword1", newPw1);
  localStorage.setItem("adminPassword2", newPw2);
  document.getElementById("adminPw1").textContent = newPw1;
  document.getElementById("adminPw2").textContent = newPw2;
  document.getElementById("adminChangeMessage").textContent = "管理者パスワードを変更しました";
});

// ▼ GAS連携部分（一覧取得＋承認）
const scriptURL = "https://script.google.com/macros/s/AKfycbzmecNuTNOhiV5adNnRtBDXl3Ax6jnojrL0jXdwurCWKc-CGkRstCZX_TrQoectHmz8/exec";

async function loadUsers() {
  const tbody = document.getElementById("userBody");
  tbody.innerHTML = "";

  try {
    const res = await fetch(scriptURL);
    const users = await res.json();

    if (users.length === 0) {
      tbody.innerHTML = "<tr><td colspan='3'>未承認のユーザーはありません</td></tr>";
      return;
    }

    users.forEach(user => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td><button class="approve-btn" onclick="approveUser('${user.email}')">承認</button></td>
      `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    console.error("読み込みエラー:", err);
    tbody.innerHTML = "<tr><td colspan='3'>読み込みエラー</td></tr>";
  }
}

async function approveUser(email) {
  const res = await fetch(`${scriptURL}?email=${encodeURIComponent(email)}`);
  const text = await res.text();
  if (text === "OK") {
    alert("承認しました！");
    loadUsers();
  } else {
    alert("承認に失敗しました。");
  }
}

loadUsers();