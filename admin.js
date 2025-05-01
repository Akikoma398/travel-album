const scriptURL = "https://script.google.com/macros/s/AKfycbxN3nz8_tt9Ap0tguv01l3yf6mCXj2muLTlwwC1fbegt2VwWKDDwDW8YCBuxT1ryiS8/exec";

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

async function toggleApproval(email, button) {
  try {
    const res = await fetch(`${scriptURL}?email=${encodeURIComponent(email)}`);
    const result = await res.text();

    if (result === "APPROVED") {
      button.textContent = "承認を取り消す";
    } else if (result === "UNAPPROVED") {
      button.textContent = "承認";
    }

    loadUsers(); // 表を再読み込み
  } catch (err) {
    console.error("承認切替エラー:", err);
    alert("承認処理に失敗しました");
  }
}

loadUsers();