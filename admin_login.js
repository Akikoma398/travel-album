document.getElementById("adminLoginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const pw1 = document.getElementById("pw1").value;
  const error = document.getElementById("error");

  try {
    const spreadsheetId = "自作サイト";
    const sheetName = "パスワード";
    const response = await fetch(`https://script.google.com/macros/s/AKfycbz2F1gQCtgrKqZQc15qhZKRMxzsNXljD51Wb0piPF9NSEz8Yz8QILf-5KUdxqi3zWYc/exec?action=passwords&spreadsheetId=${encodeURIComponent(spreadsheetId)}&sheetName=${encodeURIComponent(sheetName)}`);
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