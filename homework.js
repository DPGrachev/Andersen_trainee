const firstTask = () => {
  const value = prompt('Введите число, которое хотите перевести', 100);
  const numeralSystem = prompt('Введите систему счисления от 2 до 36',10);

  try {
    if (!Number(value)){
      throw new Error();
    }

    console.log(parseInt(value).toString(numeralSystem));
  } catch {
    console.log("Некорректный ввод!");
  }
}

const secondTask = () => {
  const value1 = Number(prompt('Введите первое число', 10));

  try {
    if (!value1){
      throw new Error();
    }

    const value2 = Number(prompt('Введите второе число', 10));

    if (!value2){
      throw new Error();
    }

    const sum = value1 + value2;
    const quotient = Number.isInteger(value1/value2) ? value1/value2 : (value1/value2).toFixed(2);

    console.log(`Ответ: ${sum},${quotient}`);
  } catch {
    console.log("Некорректный ввод!");
  }
}

document.querySelector('.task-1').addEventListener('click', firstTask);
document.querySelector('.task-2').addEventListener('click', secondTask);
