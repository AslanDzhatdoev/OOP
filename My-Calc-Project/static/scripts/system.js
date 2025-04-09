function addEquation() {
    const systemEquations = document.getElementById('system_equations');
    const newEquation = document.createElement('div');
    newEquation.className = 'equation-inputs';
    newEquation.innerHTML = `<input type="text" class="system_eq" placeholder="Уравнение">`;
    systemEquations.appendChild(newEquation);
}

function removeEquation() {
    const systemEquations = document.getElementById('system_equations');
    if (systemEquations.children.length > 1) {
        systemEquations.removeChild(systemEquations.lastChild);
    }
}

async function solveSystem() {
    const equations = Array.from(document.getElementsByClassName('system_eq')).map(input => input.value);
    const response = await fetch('/solve_system', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `equations=${encodeURIComponent(JSON.stringify(equations))}`
    });
    const result = await response.text();
    document.getElementById('system_result').innerText = result;
}

function clearSystem() {
    const systemInputs = document.querySelectorAll('.system_eq');
    systemInputs.forEach(input => input.value = '');
    document.getElementById('system_result').innerText = '';
}
