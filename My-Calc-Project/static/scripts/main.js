document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".accordion-item");
  const storageKey = "openSections";

  // Получаем список открытых секций из localStorage
  let openStates;
  const raw = localStorage.getItem(storageKey);

  try {
    openStates = raw ? JSON.parse(raw) : [];
  } catch {
    openStates = [];
  }

  items.forEach((item) => {
    const key = item.dataset.key;
    const body = item.querySelector(".accordion-body");

    // ВСЕ СЕКЦИИ СНАЧАЛА ЗАКРЫТЫ
    body.style.maxHeight = "0px";
    item.classList.remove("open");

    // Открываем только те, которые были открыты ранее
    if (openStates.includes(key)) {
      item.classList.add("open");
      body.style.maxHeight = body.scrollHeight + "px";
    }

    // Клик по заголовку
    const header = item.querySelector(".accordion-header");
    header.addEventListener("click", () => {
      item.classList.toggle("open");

      if (item.classList.contains("open")) {
        body.style.maxHeight = body.scrollHeight + "px";
        openStates.push(key);
      } else {
        body.style.maxHeight = "0px";
        openStates = openStates.filter(k => k !== key);
      }

      // Удаляем дубликаты и сохраняем
      localStorage.setItem(storageKey, JSON.stringify([...new Set(openStates)]));
    });
  });
});


  function clearAllSections() {
  document.querySelectorAll('.accordion-item').forEach(section => {
    const key = section.dataset.key;

    // ⏩ Временные ряды — особая очистка
    if (key === 'timeseries') {
      clearOnlyTimeseriesPlot();
      return;
    }

    // Общая очистка для остальных секций
    section.querySelectorAll('input, textarea').forEach(el => {
      if (el.type === 'file') el.value = '';
      else el.value = '';
    });

    section.querySelectorAll('.result').forEach(result => {
      result.innerHTML = '';
    });

    section.querySelectorAll('img').forEach(img => {
      img.src = '';
      img.style.display = 'none'; // ⬅️ чтобы не отображался битый значок
    });
  });
}



setTimeout(() => {
  clearAllSections();
  localStorage.setItem("initialClearDone", "true");
}, 1);

function updateAccordionHeights() {
  document.querySelectorAll('.accordion-item.open .accordion-body').forEach(body => {
    // Устанавливаем высоту равной scrollHeight
    body.style.maxHeight = body.scrollHeight + "px";
  });
}


const scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
});

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


// Открытие модального окна при клике на график
document.addEventListener("DOMContentLoaded", () => {
  const graphImage = document.getElementById("graph_image");
  const modal = document.getElementById("graphModal");
  const modalImg = document.getElementById("modalGraphImage");

  if (graphImage) {
    graphImage.addEventListener("click", () => {
      if (graphImage.src) {
        modal.style.display = "block";
        modalImg.src = graphImage.src;
      }
    });
  }

  // Закрытие при клике вне изображения
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeGraphModal();
    }
  });
});

function closeGraphModal() {
  document.getElementById("graphModal").style.display = "none";
}





function openHelpModal() {
  document.getElementById('helpModal').style.display = 'flex';
}

function closeHelpModal() {
  document.getElementById('helpModal').style.display = 'none';
}
