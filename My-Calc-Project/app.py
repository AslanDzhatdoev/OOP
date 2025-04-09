from flask import Flask, render_template, request, send_file, json, jsonify
import sympy as sp
import numpy as np
import matplotlib.pyplot as plt
from io import BytesIO
import pandas as pd
import os


app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/calculate', methods=['POST'])
def calculate():
    try:
        expr = request.form['expression']
        expr = expr.replace('^', '**')
        result = sp.sympify(expr).evalf()

        # Проверим, можно ли привести к float
        try:
            result = round(float(result), 3)
        except:
            pass  # оставим как есть, если это выражение типа x + y

        return f"Результат: {result}"
    except Exception as e:
        return f"Ошибка: {str(e)}"

@app.route('/solve_equation', methods=['POST'])
def solve_equation():
    try:
        left_expr = request.form['left_expr']
        right_expr = request.form['right_expr']
        left = sp.sympify(left_expr)
        right = sp.sympify(right_expr)
        equation = sp.Eq(left, right)
        roots = sp.solve(equation, sp.symbols('x'))
        roots = [round(float(root), 3) if isinstance(root, sp.Float) else root for root in roots]
        return f"Корни уравнения: {roots}"
    except Exception as e:
        return f"Ошибка: {str(e)}"

@app.route('/solve_system', methods=['POST'])
def solve_system():
    try:
        equations = json.loads(request.form['equations'])
        variables = sp.symbols('x y z')
        sympy_eqs = []
        for eq in equations:
            if eq:
                left, right = eq.split('=')
                sympy_eqs.append(sp.Eq(sp.sympify(left), sp.sympify(right)))
        solution = sp.solve(sympy_eqs, variables)
        return f"Решение системы: {solution}"
    except Exception as e:
        return f"Ошибка: {str(e)}"

@app.route('/calculate_integral', methods=['POST'])
def calculate_integral():
    try:
        func_expr = request.form['func']
        lower_limit = request.form['lower_limit']
        upper_limit = request.form['upper_limit']
        variable = request.form['variable']

        x = sp.symbols(variable)
        func = sp.sympify(func_expr)
        integral = sp.integrate(func, (x, sp.sympify(lower_limit), sp.sympify(upper_limit)))
        antiderivative = sp.integrate(func, x)

        return f"Результат интегрирования: {integral}\nПервообразная: {antiderivative}"
    except Exception as e:
        return f"Ошибка: {str(e)}"

@app.route('/solve_diff_eq', methods=['POST'])
def solve_diff_eq():
    try:
        func_expr = request.form['func']
        order = int(request.form['order'])
        variable = request.form['variable']

        x = sp.symbols(variable)
        func = sp.sympify(func_expr)

        derivative = sp.diff(func, x, order)

        return f"Производная {order}-го порядка: {derivative}"
    except Exception as e:
        return f"Ошибка: {str(e)}"


def format_matrix(matrix):

    rows = []
    for row in matrix:
        row_str = " ".join(f"{elem:.2f}" if isinstance(elem, (float, np.floating)) else str(elem) for elem in row)
        rows.append(row_str)

    max_length = max(len(row) for row in rows)

    aligned_rows = []
    for row in rows:
        aligned_row = row.ljust(max_length)
        aligned_rows.append(aligned_row)

    return "\n".join(aligned_rows)


@app.route('/matrix_operation', methods=['POST'])
def matrix_operation():
    try:
        matrix_a = request.form['matrix_a']
        matrix_b = request.form['matrix_b']
        operation = request.form['operation']
        power = int(request.form.get('power', 1))

        A = np.array([list(map(float, row.split())) for row in matrix_a.split("\n") if row.strip()])
        B = np.array([list(map(float, row.split())) for row in matrix_b.split("\n") if row.strip()])

        if operation == 'sum':
            result = A + B
        elif operation == 'diff':
            result = A - B
        elif operation == 'multiply':
            result = np.dot(A, B)
        elif operation == 'transpose_a':
            result = A.T
        elif operation == 'transpose_b':
            result = B.T
        elif operation == 'determinant_a':
            result = np.linalg.det(A)
            return f"Определитель матрицы A: {result:.2f}"
        elif operation == 'determinant_b':
            result = np.linalg.det(B)
            return f"Определитель матрицы B: {result:.2f}"
        elif operation == 'power_a':
            result = np.linalg.matrix_power(A, power)
        elif operation == 'power_b':
            result = np.linalg.matrix_power(B, power)
        elif operation == 'inverse_a':
            result = np.linalg.inv(A)
        elif operation == 'inverse_b':
            result = np.linalg.inv(B)
        else:
            return "Неизвестная операция"


        formatted_result = format_matrix(result)
        return f"\n{formatted_result}"
    except Exception as e:
        return f"Ошибка: {str(e)}"

@app.route('/plot_graph', methods=['POST'])
def plot_graph():
    try:
        functions = request.form.getlist('func[]')
        starts = request.form.getlist('start[]')
        ends = request.form.getlist('end[]')
        steps = request.form.getlist('step[]')
        plot_type = request.form['plot_type']

        x = sp.symbols('x')

        valid_entries = []

        # Подготовка: фильтруем пустые выражения
        for i in range(len(functions)):
            func_expr = functions[i].replace('y=', '').replace('X', 'x').strip()
            if not func_expr:
                continue
            try:
                start = float(starts[i])
                end = float(ends[i])
                step = float(steps[i])
                if step <= 0:
                    return f"Шаг для функции {i + 1} должен быть положительным числом.", 400

                func = sp.sympify(func_expr)
                valid_entries.append((func_expr, func, start, end, step))
            except Exception as parse_error:
                return f"Ошибка в функции {i + 1}: {parse_error}", 400

        if not valid_entries:
            return "Нет корректных функций для построения.", 400

        # Построение графиков
        if plot_type == "single":
            plt.figure()
            for func_expr, func, start, end, step in valid_entries:
                x_vals = np.arange(start, end + step, step)
                y_vals = [func.evalf(subs={x: val}) for val in x_vals]
                plt.plot(x_vals, y_vals, label=f"y = {func_expr}")

            plt.xlabel("x")
            plt.ylabel("y")
            plt.grid(True)
            plt.legend()
            plt.axhline(0, color='black', linestyle='--', linewidth=0.8)
            plt.axvline(0, color='black', linestyle='--', linewidth=0.8)

        elif plot_type == "multiple":
            num = len(valid_entries)
            fig, axes = plt.subplots(num, 1, figsize=(6, 2 * num))
            plt.subplots_adjust(hspace=0.5)

            if num == 1:
                axes = [axes]

            for i, (func_expr, func, start, end, step) in enumerate(valid_entries):
                x_vals = np.arange(start, end + step, step)
                y_vals = [func.evalf(subs={x: val}) for val in x_vals]

                axes[i].plot(x_vals, y_vals)
                axes[i].set_title(f"y = {func_expr}")
                axes[i].set_xlabel("x")
                axes[i].set_ylabel("y")
                axes[i].grid(True)
                axes[i].axhline(0, color='black', linestyle='--', linewidth=0.8)
                axes[i].axvline(0, color='black', linestyle='--', linewidth=0.8)

        buf = BytesIO()
        plt.savefig(buf, format='png')
        plt.close()
        buf.seek(0)

        return send_file(buf, mimetype='image/png')

    except Exception as e:
        return f"Ошибка: {str(e)}", 400

@app.route('/upload_timeseries', methods=['POST'])
def upload_timeseries():
    try:
        file = request.files.get('file')
        if not file:
            return "Файл не получен", 400

        if file.filename.endswith('.csv'):
            df = pd.read_csv(file)
        elif file.filename.endswith(('.xls', '.xlsx')):
            df = pd.read_excel(file)
        else:
            return "Неверный формат файла", 400

        if df.shape[1] < 2:
            return "Файл должен содержать минимум два столбца", 400

        # ⏱️ Преобразуем первую колонку в дату и сортируем
        df.iloc[:, 0] = pd.to_datetime(df.iloc[:, 0], errors='coerce')
        df = df.sort_values(by=df.columns[0])
        x = df.iloc[:, 0]

        traces = []
        for col in df.columns[1:]:
            traces.append({
                'x': x.dt.strftime('%d %b %Y').tolist(),

                'y': df[col].tolist(),
                'type': 'scatter',
                'mode': 'lines+markers',
                'name': col
            })

        layout = {
            "xaxis": {
                "autorange": True,
                "tickangle": 90,
                "rangeslider": {"visible": True, "thickness": 1.5}
            },
            "legend": {
                "orientation": "h",
                "yanchor": "bottom",
                "y": -1,
                "xanchor": "center",
                "x": 0.5
            },
            "height": 600,
        }

        return jsonify(data=traces, layout=layout)

    except Exception as e:
        return f"Ошибка при обработке файла: {str(e)}", 500


port = int(os.environ.get('PORT', 5000))
app.run(host='0.0.0.0', port=port)