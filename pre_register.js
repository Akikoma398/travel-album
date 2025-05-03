const scriptURL = "https://script.google.com/macros/s/AKfycbwCUCvHhtk3qiC9yMIL6vVNEkZ7maKRgWmqkpM7kf2njKUOx99pFX5b_HWG44n4SkU/exec";

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
      let seconds = 10;
      message.style.color = "green";
      message.textContent = `送信が完了しました。${seconds}秒後にトップページに戻ります…`;

      const interval = setInterval(() => {
        seconds--;
        message.textContent = `送信が完了しました。${seconds}秒後にトップページに戻ります…`;
        if (seconds <= 0) {
          clearInterval(interval);
          window.location.href = "index.html";
        }
      }, 1000);
    } else {
      message.textContent = "送信に失敗しました。もう一度お試しください。";
    }
  } catch (err) {
    console.error("送信エラー:", err);
    message.textContent = "送信に失敗しました。もう一度お試しください。";
  }
});