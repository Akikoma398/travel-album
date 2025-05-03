async function login() {
  const name = document.getElementById("name").value.trim();
  const password = document.getElementById("password").value.trim();
  const error = document.getElementById("error");

  if (!name || !password) {
    error.textContent = "名前とパスワードを入力してください。";
    return;
  }

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbzAfTMKAehPcBkvIGXnVUFT9fL68IRuJmrpUhk3AjjfHOU8U4Kid8KkRffJbG1Jq2Y5/exec");
    const data = await response.json();

    const correctPassword = data.password; // スプレッドシートのB1の値
    const allowedNames = data.names;       // B2〜B21の名前リスト

    if (password === correctPassword && allowedNames.includes(name)) {
      window.location.href = "home.html";
    } else {
      error.textContent = "名前またはパスワードが間違っています。";
    }
  } catch (err) {
    console.error(err);
    error.textContent = "ログイン中にエラーが発生しました。";
  }
}