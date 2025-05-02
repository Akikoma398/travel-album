const scriptURL = "https://script.google.com/macros/s/AKfycbzJTmXjCwcyJRI4SXygTpCN18Y5fPAeqSMqg5az2HGwR2CvMxlkiTyw316wPgzDcEbx/exec";

// ① 現在のパスワードを取得して表示
async function loadPasswords() {
  try {
    const res = await fetch(scriptURL + "?action=passwords");
    const data = await res.json();
    document.getElementById("pw-admin1").textContent = data.admin1;
    document.getElementById("pw-admin2").textContent = data.admin2;
    document.getElementById("pw-general").textContent = data.general;
  } catch (err) {
    console.error("パスワード取得エラー:", err);
  }
}

// ② 新しいパスワードを送信して更新
async function updatePasswords() {
  const admin1 = document.getElementById("input-admin1").value;
  const admin2 = document.getElementById("input-admin2").value;
  const general = document.getElementById("input-general").value;

  const form = new URLSearchParams();
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

// ③ ユーザー一覧を読み込む
async function loadUsers() {
  const tbody = document.getElementById("userBody");
  tbody.innerHTML = "";

  try {
    const res = await fetch(scriptURL);
    const users = await res.json();

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
        <td>${user.requestTime}</td>
        <td>${user.status}</td>
        <td>${user.approvedTime}</td>
        <td>
          <button class="approve-btn" onclick="toggleApproval('${user.email}', this)">
            ${user.status === "承認済み" ? "承認を取り消す" : "承認"}
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

// ④ 承認状態を切り替える
async function toggleApproval(email, button) {
  try {
    const res = await fetch(`${scriptURL}?email=${encodeURIComponent(email)}`);
    const result = await res.text();

    if (result === "APPROVED") {
      button.textContent = "承認を取り消す";
    } else if (result === "UNAPPROVED") {
      button.textContent = "承認";
    }

    loadUsers(); // 表の再読み込み
  } catch (err) {
    console.error("承認切替エラー:", err);
    alert("承認処理に失敗しました");
  }
}

// 初期読み込み
loadUsers();
loadPasswords();