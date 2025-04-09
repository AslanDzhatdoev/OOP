function addEquation() {
  const systemEquations = document.getElementById('system_equations');
  const newEquation = document.createElement('div');
  newEquation.className = 'input-group';
  newEquation.innerHTML = `<input type="text" class="system_eq" placeholder="Уравнение">`;
  systemEquations.appendChild(newEquation);

  // ⬇️ Плавное обновление max-height при добавлении контента
  const accordionItem = systemEquations.closest('.accordion-item');
  const body = accordionItem?.querySelector('.accordion-body');

  if (accordionItem?.classList.contains('open') && body) {
    body.style.maxHeight = "none"; // сбрасываем временно
    const fullHeight = body.scrollHeight + "px";
    body.style.maxHeight = fullHeight;
  }
}
window.addEventListener('resize', () => {
  const openItems = document.querySelectorAll('.accordion-item.open');
  openItems.forEach(item => {
    const body = item.querySelector('.accordion-body');
    if (body) {
      body.style.maxHeight = body.scrollHeight + "px";
    }
  });
});
