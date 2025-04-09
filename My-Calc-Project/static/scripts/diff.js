async function solveDiffEq() {
    const func = document.getElementById('diff_func').value;
    const order = document.getElementById('diff_order').value;
    const variable = document.getElementById('diff_variable').value;

    const response = await fetch('/solve_diff_eq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `func=${encodeURIComponent(func)}&order=${encodeURIComponent(order)}&variable=${encodeURIComponent(variable)}`
    });

    const result = await response.text();
    document.getElementById('diff_eq_result').innerText = result;
}

function clearDiffEq() {
    document.getElementById('diff_func').value = '';
    document.getElementById('diff_order').value = '';
    document.getElementById('diff_variable').value = '';
    document.getElementById('diff_eq_result').innerText = '';
}

