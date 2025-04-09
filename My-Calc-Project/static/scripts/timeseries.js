document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('timeseries-form');
  const fileInput = document.getElementById('timeseries-file');
  const plotContainer = document.getElementById('timeseries-plot');

  if (!form || !fileInput || !plotContainer) {
    console.error("Один из элементов не найден.");
    return;
  }

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const file = fileInput.files[0];
    if (!file) {
      alert("Выберите файл.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/upload_timeseries', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        alert("Ошибка при загрузке данных.");
        return;
      }

      const json = await response.json();
      plotContainer.style.display = 'block';

      Plotly.newPlot(plotContainer, json.data, json.layout, {
        responsive: true,
        displayModeBar: false,
        showTips: false
      });

      updateAccordionHeights();
    } catch (error) {
      console.error("Ошибка при построении графика:", error);
    }
  });
});

// Вспомогательные функции
function clearOnlyTimeseriesPlot() {
  const plotContainer = document.getElementById('timeseries-plot');
  plotContainer.innerHTML = '';
  plotContainer.style.display = 'none';

  const input = document.getElementById('timeseries-file');
  if (input) input.value = '';

  updateAccordionHeights();
}

function setZoomMode() {
  Plotly.relayout('timeseries-plot', { dragmode: 'zoom' });
}

function setPanMode() {
  Plotly.relayout('timeseries-plot', { dragmode: 'pan' });
}

function resetZoom() {
  Plotly.relayout('timeseries-plot', {
    'xaxis.autorange': true,
    'yaxis.autorange': true
  });
}

function downloadPlot() {
  Plotly.downloadImage(document.getElementById('timeseries-plot'), {
    format: 'png',
    filename: 'timeseries-plot'
  });
}

let sliderVisible = true;
function toggleSlider() {
  sliderVisible = !sliderVisible;
  Plotly.relayout('timeseries-plot', {
    'xaxis.rangeslider.visible': sliderVisible
  });
}
