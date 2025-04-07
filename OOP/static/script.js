function matrixClearOperation() {
            document.getElementById('matrix_a').value = '';
            document.getElementById('matrix_b').value = '';
            document.getElementById('matrix_power').value = '';
            document.getElementById('matrix_result').innerText = '';
        }
        function clearGraph() {
        // Очищаем изображение графика
        document.getElementById('graph_image').src = '';

        // Очищаем поля ввода функций
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
            </div>
        `;

        // Сбрасываем счетчик функций
        functionCount = 1;
    }
        function clearSystem() {
            // Очищаем все input с классом 'system_eq'
            const systemInputs = document.querySelectorAll('.system_eq');
            systemInputs.forEach(input => {
                input.value = '';
            });
        
            // Очищаем результат
            document.getElementById('system_result').innerText = '';
        }
        // Функции для работы с калькулятором
        function addToExpression(value) {
            const expr = document.getElementById('expression');
            expr.value += value;
        }

        function clearExpression() {
            document.getElementById('expression').value = '';
            document.getElementById('calc_result').innerText = '';
        }

        async function calculate() {
            const expression = document.getElementById('expression').value;
            const response = await fetch('/calculate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `expression=${encodeURIComponent(expression)}`
            });
            const result = await response.text();
            document.getElementById('calc_result').innerText = result;
        }

        // Функции для решения уравнений
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
            const [integralResult, antiderivative] = result.split('\n');
            document.getElementById('integral_result').innerText = `Результат интегрирования: ${integralResult}`;
            document.getElementById('antiderivative_result').innerText = `Первообразная функция: ${antiderivative}`;
        }
        // Функции для интегрирования
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
            document.getElementById('integral_result').innerText = result;
        }

        // Функции для дифференциальных уравнений
        async function solveDiffEq() {
            const func = document.getElementById('diff_func').value;
            const order = document.getElementById('diff_order').value;

            const response = await fetch('/solve_diff_eq', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `func=${encodeURIComponent(func)}&order=${encodeURIComponent(order)}`
            });
            const result = await response.text();
            document.getElementById('diff_eq_result').innerText = result;
        }

        function clearDiffEq() {
            document.getElementById('diff_func').value = '';
            document.getElementById('diff_order').value = '';
            document.getElementById('diff_eq_result').innerText = '';
        }

        // Функция для отображения/скрытия поля ввода степени
    function togglePowerInput() {
        const operation = document.getElementById('matrix_operation').value;
        const powerInput = document.getElementById('power_input');
        if (operation === 'power_a' || operation === 'power_b') {
            powerInput.style.display = 'block';
        } else {
            powerInput.style.display = 'none';
        }
    }

    // Функции для работы с матрицами
        function togglePowerInput() {
            const operation = document.getElementById('matrix_operation').value;
            const powerInput = document.getElementById('power_input');
            if (operation === 'power_a' || operation === 'power_b') {
                powerInput.style.display = 'block';
            } else {
                powerInput.style.display = 'none';
            }
        }

        async function matrixOperation() {
            const matrix_a = document.getElementById('matrix_a').value;
            const matrix_b = document.getElementById('matrix_b').value;
            const operation = document.getElementById('matrix_operation').value;
            const power = document.getElementById('matrix_power')?.value || 1; // По умолчанию степень 1

            const response = await fetch('/matrix_operation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `matrix_a=${encodeURIComponent(matrix_a)}&matrix_b=${encodeURIComponent(matrix_b)}&operation=${encodeURIComponent(operation)}&power=${encodeURIComponent(power)}`
            });
            const result = await response.text();
            document.getElementById('matrix_result').innerText = `Результат:\n${result}`;
        }

        // Функции для системы уравнений
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

        // Функции для работы с графиками
        let functionCount = 1;

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
                </div>
            `;
            functionInputs.appendChild(newFunctionGroup);
            functionCount++;
        }

        function removeFunction() {
            const functionInputs = document.getElementById('function_inputs');
            if (functionCount > 1) {
                functionInputs.removeChild(functionInputs.lastChild);
                functionCount--;
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
            } else {
                const error = await response.text();
                alert(error);
            }
        }
document.getElementById('timeseries-form').addEventListener('submit', async function(e) {
            e.preventDefault();

            const formData = new FormData();
            const fileInput = document.getElementById('timeseries-file');
            formData.append('file', fileInput.files[0]);
            formData.append('plot_type', 'single');

            const response = await fetch('/upload_timeseries', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const json = await response.json();
                const plotContainer = document.getElementById('timeseries-plot');
                Plotly.react(plotContainer, json.data, json.layout);
            } else {
                const errorText = await response.text();
                alert(errorText);
            }
        });