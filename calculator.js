let buttons = Array.from(document.querySelectorAll(".btn"));
let screen = document.querySelector(".calc-screen p");
let delLastBtn = document.querySelector(".arrow");
let delAllbtn = document.querySelector(".AC");
let a = "";
let b = "";
let sign = "";
let finish = false;
let firstResult = true;

const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const action = ["-", "+", "*", "/", "%"];

// Функция для изменения размера шрифта в зависимости от длины результата
function adjustFontSize() {
  if (screen.textContent.length > 8) {
    screen.style.fontSize = "50px"; // Уменьшаем шрифт
  } else {
    screen.style.fontSize = "60px"; // Возвращаем исходный размер шрифта
  }
}

// Очистка экрана
function clearAll() {
  a = ""; 
  b = ""; 
  sign = ""; 
  finish = false; 
  screen.textContent = 0;
  adjustFontSize();
}

function count(){
  if (firstResult) {
    switch (sign) {
      case "+":
        a = +a + +b;
        break;
      case "-":
        a = +a - +b;
        break;
      case "*":
        a = a * b;
        break;
      case "/":
        if (b == "0") {
          console.log("деление на 0");
          screen.textContent = "Ошибка";
          // clearAll();
          return;
        }
        a = a / b;
        break;
      case "%":
        a = (a * b) / 100;
        break;
      default:
        return;
    }
    finish = true;
    screen.textContent = a;
    firstResult = false;
    adjustFontSize();  // Проверяем длину результата
  } else {
    screen.textContent = a;
  }
}

delAllbtn.addEventListener("click", function () {
  clearAll();
});

buttons.map((button) => {
  button.addEventListener("click", (event) => {

    if (!event.target.classList.contains("btn")) return;

    const key = event.target.textContent;

    // Проверка, чтобы нельзя было вводить больше 8 цифр
    if (a.length >= 8 && sign === "" && numbers.includes(key)) return;
    if (b.length >= 8 && sign !== "" && numbers.includes(key)) return;

    // если нажата клавиша 0-9 или .
    if (numbers.includes(key)) {
      if (b === "" && sign === "") {
        if (key === "." && a.includes(".")) {
          return;
        }
        if (a == "" && key == ".") {
          a = "0" + a;
        } else {
          a += key;
        }
        screen.textContent = a;
      } else if (a !== "" && b !== "" && finish) {
        b = key;
        finish = false;
        screen.textContent = b;
      } else {
        if (key === "." && b.includes(".")) {
          return;
        }
        if (b == "" && key == ".") {
          b = "0" + b;
        } else {
          b += key;
        }
        screen.textContent = b;
      }
      
      firstResult = true;
      return;
    }

    // если нажата клавиша + - / *
    if (action.includes(key)) {
      if (!b) {
        sign = key;
        screen.textContent = sign;
      } else {
        count();
        sign = key; // обновляем знак после вычисления
        b = ""; // сбрасываем b для новой операции
      }
      return;
    }

    // Удаление последнего элемента
    if (event.target.classList.contains("arrow")) {
      if (a && !sign && !b) {
        a = a.slice(0, -1);
        screen.textContent = a || 0;
        adjustFontSize();
        return;
      }
      if (a && sign && !b) {
        sign = "";
        screen.textContent = a;
        adjustFontSize();
        return;
      }
      if (a && sign && b) {
        b = b.slice(0, -1);
        screen.textContent = b || sign;
        adjustFontSize();
        return;
      }
    }

    // Обработка нажатия на =
    if (key === "=") {
      count();
    }
  });
});
