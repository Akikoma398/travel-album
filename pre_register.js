const scriptURL = "https://script.google.com/macros/s/AKfycbwp63FyjM5HCgR6qNXHiKPjlIAyLefaU_WqCpJQbdlaR8ncB9l7vlQQ6JBqaIwLeVtp/exec";

document.getElementById("registerForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const question = document.getElementById("question").value.trim();
  const message = document.getElementById("message");

  if (!name || !email || !question) {
    message.textContent = "全ての項目を入力してください。";
    return;
  }

  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("question", question);

  try {
    const response = await fetch(scriptURL, {
      method: "POST",
      body: formData
    });

    const text = await response.text();

    if (text === "OK") {
      window.location.href = "waiting.html";
    } else {
      message.textContent = "送信に失敗しました。もう一度お試しください。";
    }
  } catch (err) {
    console.error("送信エラー:", err);
    message.textContent = "送信に失敗しました。もう一度お試しください。";
  }
});