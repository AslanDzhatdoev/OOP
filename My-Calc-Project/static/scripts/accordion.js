header.addEventListener("click", () => {
  item.classList.toggle("open");

  if (item.classList.contains("open")) {
    body.style.maxHeight = body.scrollHeight + "px";
  } else {
    body.style.maxHeight = "0px";
  }
});
