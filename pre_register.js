async function updatePasswords() {
  const admin1 = document.getElementById("input-admin1").value;
  const admin2 = document.getElementById("input-admin2").value;
  const general = document.getElementById("input-general").value;

  const form = new URLSearchParams();
  form.append("action", "update-passwords");
  if (admin1) form.append("admin1", admin1);
  if (admin2) form.append("admin2", admin2);
  if (general) form.append("general", general);

  try {
    const res = await fetch(scriptURL, {
      method: "POST",
      body: form
    });

    const result = await res.text();
    if (result === "OK") {
      alert("パスワードを更新しました！");
      loadPasswords();
    } else {
      alert("更新に失敗しました: " + result);
    }
  } catch (err) {
    console.error("パスワード更新エラー:", err);
    alert("パスワード更新に失敗しました");
  }
}