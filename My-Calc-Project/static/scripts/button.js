document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll("button");

  buttons.forEach(button => {
    // Мобильные касания
    button.addEventListener("touchstart", () => {
      button.classList.add("touched");
      setTimeout(() => {
        button.classList.remove("touched");
      }, 200); // эффект исчезает через 0.2 сек
    });

    // Мышь для ПК (если хочешь одинаковый эффект)
    button.addEventListener("mousedown", () => {
      button.classList.add("touched");
      setTimeout(() => {
        button.classList.remove("touched");
      }, 200);
    });
  });
});
