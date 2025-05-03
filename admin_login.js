document.getElementById("adminLoginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const pw1 = document.getElementById("pw1").value;
  const error = document.getElementById("error");

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbzGRJOCTRuH9ZEouSJXBGdwdr_o33cO3iwivBqouBJM_ZNd0AN1GGET4QwtQSFTDozt/exec?action=passwords");
    const passwords = await response.json();
    const adminPass1 = passwords.admin1;

    if (pw1 === adminPass1) {
      window.location.href = "admin.html";
    } else {
      error.textContent = "パスワードが正しくありません。";
    }
  } catch (err) {
    console.error(err);
    error.textContent = "認証中にエラーが発生しました。";
  }
});