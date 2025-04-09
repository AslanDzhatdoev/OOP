function autoMultiply(expr) {
  // Обрабатываем только безопасные места
  const functions = ['sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'sqrt', 'log', 'ln', 'abs', 'exp'];
  const funcPattern = `(${functions.join('|')})`;

  // Добавим * между числом и переменной/скобкой/функцией: 2x → 2*x, 3sin → 3*sin
  expr = expr.replace(/(\d)([a-zA-Z(])/g, '$1*$2');

  // Добавим * между переменной и переменной/функцией/скобкой: xsin → x*sin, xy → x*y
  expr = expr.replace(/([a-zA-Z])(?=[a-zA-Z(])/g, '$1*');

  // Убираем * перед функциями (оставляем слитно, например sin(x) — это одно целое)
  expr = expr.replace(new RegExp(`\\*(${funcPattern})\\*`, 'g'), '*$1');
  expr = expr.replace(new RegExp(`\\*(${funcPattern})(?=\\()`, 'g'), '*$1');

  // Фикс лишней звёздочки перед скобкой, например sin*(x) → sin(x)
  expr = expr.replace(new RegExp(`(${funcPattern})\\*\\(`, 'g'), '$1(');

  return expr;
}
