const loginPassword = "keion2025";
const scriptURL = "https://script.google.com/macros/s/AKfycbwCUCvHhtk3qiC9yMIL6vVNEkZ7maKRgWmqkpM7kf2njKUOx99pFX5b_HWG44n4SkU/exec";

document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const error = document.getElementById("error");

  if (!email || !password) {
    error.textContent = "すべて入力してください。";
    return;
  }

  if (password !== loginPassword) {
    error.textContent = "パスワードが違います。";
    return;
  }

  try {
    const res = await fetch(`${scriptURL}?email=${encodeURIComponent(email)}`);
    const text = await res.text();

    if (text === "OK") {
      window.location.href = "home.html";
    } else {
      error.textContent = "このメールアドレスはまだ承認されていません。";
    }
  } catch (err) {
    error.textContent = "通信エラーが発生しました。";
    console.error(err);
  }
});