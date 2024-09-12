fetch("./lang1.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    data.forEach((branch) => {
      const card = document.createElement("div");
      card.className = "card";

      const surnamesHTML = branch.Surnames.map(
        (surname) => `
        <div class="surname-node">
          <strong id='surName'>Surname:</strong> ${surname}
          <div><strong>Deity:</strong> ${branch.Deity}</div>
          <div><strong>Gotra:</strong> ${branch.Gotra}</div>
        </div>`
      ).join("");

      const cardContent = `
        <div class="deity-name" tabindex="0" role="button">${branch.Gotra}</div>
        <div class="details">
          ${surnamesHTML}
        </div>
      `;

      card.innerHTML = cardContent;

      card.querySelector(".deity-name").addEventListener("click", (event) => {
        // Close any other open cards
        document.querySelectorAll(".card.open").forEach((openCard) => {
          if (openCard !== card) {
            openCard.classList.remove("open");
          }
        });

        // Toggle the clicked card
        card.classList.toggle("open");

        // Prevent event bubbling
        event.stopPropagation();
      });

      // Add keyboard event listener for accessibility
      card.querySelector(".deity-name").addEventListener("keypress", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          // Simulate click on Enter or Space
          card.querySelector(".deity-name").click();
          event.preventDefault();
        }
      });

      cardContainer.appendChild(card);
    });
  })
  .catch((error) => console.error("Fetch error:", error));
