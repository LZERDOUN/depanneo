document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Connexion réussie") {
          document.getElementById("message").innerText = "Connexion réussie";
        } else {
          document.getElementById("message").innerText = data.message;
        }
      })
      .catch((error) => {
        console.error("Erreur:", error);
      });
  });
