document.getElementById('adminLoginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const pw1 = document.getElementById('pw1');
  const pw2 = document.getElementById('pw2');
  const error = document.getElementById('error');

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbwp63FyjM5HCgR6qNXHiKPjlIAyLefaU_WqCpJQbdlaR8ncB9l7vlQQ6JBqaIwLeVtp/exec", {
      method: "GET",
      mode: "cors"
    });
    const data = await response.json();
    const adminPass1 = data.admin1;
    const adminPass2 = data.admin2;

    // Set the input values for testing
    pw1.value = adminPass1;
    pw2.value = adminPass2;

    // Skip login for this test
    error.textContent = "読み込みテスト：パスワードが自動表示されました。";
  } catch (err) {
    error.textContent = "エラーが発生しました。もう一度お試しください。";
  }
});