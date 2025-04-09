function clearIntegral() {
    document.getElementById('upper_limit').value = '';
    document.getElementById('integral_func').value = '';
    document.getElementById('integral_var').value = '';
    document.getElementById('lower_limit').value = '';
    document.getElementById('integral_result').innerText = '';
    document.getElementById('antiderivative_result').innerText = '';
}

async function calculateIntegral() {
    const func = document.getElementById('integral_func').value;
    const lower_limit = document.getElementById('lower_limit').value;
    const upper_limit = document.getElementById('upper_limit').value;
    const variable = document.getElementById('integral_var').value;

    const response = await fetch('/calculate_integral', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `func=${encodeURIComponent(func)}&lower_limit=${encodeURIComponent(lower_limit)}&upper_limit=${encodeURIComponent(upper_limit)}&variable=${encodeURIComponent(variable)}`
    });

    const result = await response.text();
    const [integralResult, antiderivative] = result.split('\\n');
    document.getElementById('integral_result').innerText = ` ${integralResult}`;
//    document.getElementById('antiderivative_result').innerText = `Первообразная функция: ${antiderivative}`;
}
