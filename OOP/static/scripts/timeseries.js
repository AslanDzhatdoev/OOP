document.getElementById('timeseries-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const formData = new FormData();
    const fileInput = document.getElementById('timeseries-file');
    if (!fileInput.files.length) {
        alert("Выберите файл.");
        return;
    }

    formData.append('file', fileInput.files[0]);

    const response = await fetch('/upload_timeseries', {
        method: 'POST',
        body: formData
    });

    if (response.ok) {
        const json = await response.json();
        const plotContainer = document.getElementById('timeseries-plot');
        plotContainer.style.display = 'block';
        Plotly.newPlot(plotContainer, json.data, json.layout);
    } else {
        alert('Ошибка при построении графика');
    }
});
function clearTimeseriesPlot() {
    const plotContainer = document.getElementById('timeseries-plot');
    plotContainer.innerHTML = '';
    plotContainer.style.display = 'none';
    document.getElementById('timeseries-file').value = '';
}