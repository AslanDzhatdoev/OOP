document.getElementById('timeseries-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const fileInput = document.getElementById('timeseries-file');
    const plotContainer = document.getElementById('timeseries-plot');
    plotContainer.innerHTML = ''; // очищаем предыдущий график

    if (!fileInput.files.length) {
        alert("Выберите файл.");
        return;
    }

    const formData = new FormData();
    formData.append('file', fileInput.files[0]);

    const response = await fetch('/upload_timeseries', {
        method: 'POST',
        body: formData
    });

    if (response.ok) {
        const json = await response.json();
        plotContainer.style.display = 'block';
        Plotly.newPlot(plotContainer, json.data, json.layout);
    } else {
        alert('Ошибка при построении графика');
    }
});
function clearOnlyTimeseriesPlot() {
    const plotContainer = document.getElementById('timeseries-plot');
    const fileInput = document.getElementById('timeseries-file');

    if (plotContainer) {
    plotContainer.innerHTML = '';           // очищаем график
    plotContainer.style.display = 'block';  // поле остаётся видимым
    plotContainer.style.height = '500px';   // сохраняем высоту
    }

    if (fileInput) {
    fileInput.value = '';                   // очищаем input[type="file"]
    }
}
