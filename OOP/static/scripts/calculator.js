function addToExpression(value) {
    const expr = document.getElementById('expression');
    expr.value += value;
}

async function calculate() {
    const input = document.getElementById('expression');
    const expression = input.value; // без autoMultiply

    const response = await fetch('/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `expression=${encodeURIComponent(expression)}`
    });

    const result = await response.text();
    document.getElementById('calc_result').innerText = result;
}

function clearExpression() {
    document.getElementById('expression').value = '';
    document.getElementById('calc_result').innerText = '';
}
