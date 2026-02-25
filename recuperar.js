const form = document.getElementById("recoveryForm");
const feedback = document.getElementById("feedback");
form.addEventListener("submit", function(e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  feedback.classList.remove("success", "error");
  if (email === "") {
    feedback.textContent = "Digite um email válido.";
    feedback.classList.add("error");
    return;
  }
  setTimeout(() => {
    feedback.textContent = "Link de recuperação enviado para seu email!";
    feedback.classList.add("success");
    form.reset();
  }, 800);
});