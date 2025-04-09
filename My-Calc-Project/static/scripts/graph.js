let functionCount = 1;

function clearGraph() {
    document.getElementById('graph_image').src = '';
    const functionInputs = document.getElementById('function_inputs');
    functionInputs.innerHTML = `
        <div class="function-group">
            <label>Функция:</label>
            <input type="text" name="func[]" placeholder="y = x**2">
            <div class="input-group">
                <label>Начальная точка (x):</label>
                <input type="number" name="start[]" placeholder="-10" step="0.1">
            </div>
            <div class="input-group">
                <label>Конечная точка (x):</label>
                <input type="number" name="end[]" placeholder="10" step="0.1">
            </div>
            <div class="input-group">
                <label>Шаг:</label>
                <input type="number" name="step[]" placeholder="0.1" step="0.01" min="0.01">
            </div>
        </div>`;
    functionCount = 1;
    updateAccordionHeights();
}

function addFunction() {
    const functionInputs = document.getElementById('function_inputs');
    const newFunctionGroup = document.createElement('div');
    newFunctionGroup.className = 'function-group';
    newFunctionGroup.innerHTML = `
        <label>Функция:</label>
        <input type="text" name="func[]" placeholder="y = x**2">
        <div class="input-group">
            <label>Начальная точка (x):</label>
            <input type="number" name="start[]" placeholder="-10" step="0.1">
        </div>
        <div class="input-group">
            <label>Конечная точка (x):</label>
            <input type="number" name="end[]" placeholder="10" step="0.1">
        </div>
        <div class="input-group">
            <label>Шаг:</label>
            <input type="number" name="step[]" placeholder="0.1" step="0.01" min="0.01">
        </div>`;
    functionInputs.appendChild(newFunctionGroup);
    functionCount++;
    updateAccordionHeights();
}

function removeFunction() {
    const functionInputs = document.getElementById('function_inputs');
    if (functionCount > 1) {
        functionInputs.removeChild(functionInputs.lastChild);
        functionCount--;
        updateAccordionHeights();
    }
}

async function plotGraph(plotType) {
    const functions = Array.from(document.querySelectorAll('input[name="func[]"]')).map(input => input.value);
    const starts = Array.from(document.querySelectorAll('input[name="start[]"]')).map(input => input.value);
    const ends = Array.from(document.querySelectorAll('input[name="end[]"]')).map(input => input.value);
    const steps = Array.from(document.querySelectorAll('input[name="step[]"]')).map(input => input.value);

    const response = await fetch('/plot_graph', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `func[]=${functions.map(encodeURIComponent).join('&func[]=')}&start[]=${starts.map(encodeURIComponent).join('&start[]=')}&end[]=${ends.map(encodeURIComponent).join('&end[]=')}&step[]=${steps.map(encodeURIComponent).join('&step[]=')}&plot_type=${plotType}`
    });

    if (response.ok) {
        const imageBlob = await response.blob();
        const imageUrl = URL.createObjectURL(imageBlob);
        document.getElementById('graph_image').src = imageUrl;
        updateAccordionHeights();
    } else {
        const error = await response.text();
        alert(error);
    }
}

function updateAccordionHeights() {
    document.querySelectorAll('.accordion-item.open .accordion-body').forEach(body => {
        body.style.maxHeight = body.scrollHeight + "px";
    });
}
