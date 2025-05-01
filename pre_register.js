document.getElementById("registerForm").addEventListener("submit", async function (e) {
    e.preventDefault();
  
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const question = document.getElementById("question").value.trim();
    const message = document.getElementById("message");
  
    if (!name || !email || !question) {
      message.textContent = "すべての項目を入力してください。";
      return;
    }
  
    const scriptURL = "https://script.google.com/macros/s/AKfycbxMceZfl1p4-phd-WaDcc6-RXPg3MzXDPe6IrJ86Ehauf8wJBkcz3rlFBH-h4k5hntY/exec";
  
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("question", question);
  
    try {
      await fetch(scriptURL, { method: "POST", body: formData });
      window.location.href = "waiting.html";
    } catch (error) {
      message.textContent = "送信に失敗しました。もう一度お試しください。";
      console.error("Error!", error.message);
    }
  });