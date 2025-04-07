async function solveEquation() {
    const left_expr = document.getElementById('left_expr').value;
    const right_expr = document.getElementById('right_expr').value;
    const response = await fetch('/solve_equation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `left_expr=${encodeURIComponent(left_expr)}&right_expr=${encodeURIComponent(right_expr)}`
    });
    const result = await response.text();
    document.getElementById('equation_result').innerText = result;
}

function clearEquation() {
    document.getElementById('left_expr').value = '';
    document.getElementById('right_expr').value = '';
    document.getElementById('equation_result').innerText = '';
}
