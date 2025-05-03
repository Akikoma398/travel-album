const scriptURL = "https://script.google.com/macros/s/AKfycbx-yJuh6KXYnXjX8odfEs0ZEGbsX4mV5BMLWkXVEobdUvNg-1myNfEi3Ku0DwKS8rme/exec";

// 現在のパスワードを取得して表示
async function loadPasswords() {
  try {
    const res = await fetch(scriptURL + "?action=passwords");
    const data = await res.json();
    document.getElementById("pw-admin1").textContent = data.admin1 || "(未設定)";
    document.getElementById("pw-admin2").textContent = data.admin2 || "(未設定)";
    document.getElementById("pw-general").textContent = data.general || "(未設定)";
  } catch (err) {
    console.error("パスワード取得エラー:", err);
  }
}

// パスワード更新
async function updatePasswords() {
  const admin1 = document.getElementById("input-admin1").value;
  const admin2 = document.getElementById("input-admin2").value;
  const general = document.getElementById("input-general").value;

  const form = new URLSearchParams();
  form.append("action", "updatePasswords"); // Add action

  if (admin1) form.append("admin1", admin1);
  if (admin2) form.append("admin2", admin2);
  if (general) form.append("general", general);

  try {
    await fetch(scriptURL, {
      method: "POST",
      body: form
    });

    alert("パスワードを更新しました！");
    loadPasswords();
  } catch (err) {
    console.error("パスワード更新エラー:", err);
    alert("パスワード更新に失敗しました");
  }
}

// ユーザー一覧を読み込む
async function loadUsers() {
  const tbody = document.getElementById("userBody");
  tbody.innerHTML = "";

  try {
    const res = await fetch(scriptURL);
    const users = await res.json();
    console.log("受信したユーザー情報:", users);

    if (users.length === 0) {
      tbody.innerHTML = "<tr><td colspan='7'>ユーザーが見つかりません</td></tr>";
      return;
    }

    users.forEach(user => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.question}</td>
        <td>${formatTimestamp(user.requestTime)}</td>
        <td>${user.status}</td>
        <td>${formatTimestamp(user.approvedTime)}</td>
        <td>
          <button class="approve-btn" onclick="toggleApproval('${user.email}', this)">
            ${user.status === "承認済み" ? "承認済み" : "承認"}
          </button>
        </td>
      `;

      tbody.appendChild(tr);
    });
  } catch (err) {
    console.error("読み込みエラー:", err);
    tbody.innerHTML = "<tr><td colspan='7'>読み込みエラー</td></tr>";
  }
}

// 承認切替処理
async function toggleApproval(email, button) {
  try {
    const res = await fetch(`${scriptURL}?action=toggle&email=${encodeURIComponent(email)}`);
    const result = await res.text();

    if (result === "APPROVED") {
      button.textContent = "承認済み";
      button.disabled = true;
    }

    loadUsers(); // 表更新
  } catch (err) {
    console.error("承認切替エラー:", err);
    alert("承認処理に失敗しました");
  }
}

// 日付整形関数（←今回のポイント）
function formatTimestamp(isoString) {
  if (!isoString || isoString === "undefined") return "";
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return ""; // 無効な日付なら空
  const y = date.getFullYear();
  const m = ("0" + (date.getMonth() + 1)).slice(-2);
  const d = ("0" + date.getDate()).slice(-2);
  const h = ("0" + date.getHours()).slice(-2);
  const min = ("0" + date.getMinutes()).slice(-2);
  const s = ("0" + date.getSeconds()).slice(-2);
  return `${y}/${m}/${d}/${h}:${min}:${s}`;
}

// 初期表示
loadUsers();
loadPasswords();