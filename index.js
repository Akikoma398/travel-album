const scriptURL = "https://script.google.com/macros/s/AKfycbzAfTMKAehPcBkvIGXnVUFT9fL68IRuJmrpUhk3AjjfHOU8U4Kid8KkRffJbG1Jq2Y5/exec";

async function login() {
  const name = document.getElementById("name").value;
  const password = document.getElementById("password").value;
  const error = document.getElementById("error");

  const formData = new URLSearchParams();
  formData.append("name", name);
  formData.append("password", password);

  try {
    const res = await fetch(scriptURL, {
      method: "POST",
      body: formData
    });

    const result = await res.text();
    if (result === "OK") {
      window.location.href = "home.html";
    } else {
      error.textContent = "名前またはパスワードが正しくありません。";
    }
  } catch (err) {
    console.error("通信エラー:", err);
    error.textContent = "ログイン中にエラーが発生しました。";
  }
}