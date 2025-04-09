let allOpen = false;

function toggleAllAccordions() {
  const items = document.querySelectorAll('.accordion-item');

  items.forEach(item => {
    const body = item.querySelector('.accordion-body');
    if (allOpen) {
      item.classList.remove('open');
      body.style.maxHeight = '0px';
    } else {
      item.classList.add('open');
      body.style.maxHeight = body.scrollHeight + "px";
    }
  });

  allOpen = !allOpen;

  // обновим localStorage
  const openKeys = [];
  document.querySelectorAll('.accordion-item').forEach((item) => {
    if (item.classList.contains('open')) {
      openKeys.push(item.dataset.key);
    }
  });
  localStorage.setItem("openedDetails", JSON.stringify(openKeys));
}
