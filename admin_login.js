document.getElementById("adminLoginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const pw1 = document.getElementById("pw1").value;
  const pw2 = document.getElementById("pw2").value;
  const error = document.getElementById("error");

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbwCUCvHhtk3qiC9yMIL6vVNEkZ7maKRgWmqkpM7kf2njKUOx99pFX5b_HWG44n4SkU/exec?action=passwords", {
      method: "GET",
      mode: "cors"
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const passwords = await response.json();
    const adminPass1 = passwords.admin1;
    const adminPass2 = passwords.admin2;

    if (pw1 === adminPass1 && pw2 === adminPass2) {
      window.location.href = "admin.html";
    } else {
      error.textContent = "パスワードが正しくありません。";
    }
  } catch (err) {
    console.error(err);
    error.textContent = "認証中にエラーが発生しました。";
  }
});