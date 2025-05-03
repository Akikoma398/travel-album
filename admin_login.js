document.getElementById('adminLoginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const pw1 = document.getElementById('pw1').value;
  const error = document.getElementById('error');

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbwp63FyjM5HCgR6qNXHiKPjlIAyLefaU_WqCpJQbdlaR8ncB9l7vlQQ6JBqaIwLeVtp/exec?action=passwords", {
      method: "GET",
      mode: "cors"
    });
    const data = await response.json();
    const adminPass1 = data.admin1;

    if (pw1 === adminPass1) {
      window.location.href = "admin.html";
    } else {
      error.textContent = "パスワードが違います。";
    }
  } catch (err) {
    error.textContent = "エラーが発生しました。もう一度お試しください。";
  }
});