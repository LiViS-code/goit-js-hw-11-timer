class CountdownTimer {
  #timerId = null;

  constructor({ selector, targetDate, message }) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.message = message;
  }

  updateTimer(time) {
    // ссылки на элементы интерфейса
    const timer = document.querySelector(this.selector);
    const refs = {
      days: timer.querySelector('[data-value="days"]'),
      daysLabel: timer.querySelector('[data-value="days"] + .label'),
      hours: timer.querySelector('[data-value="hours"]'),
      hoursLabel: timer.querySelector('[data-value="hours"] + .label'),
      mins: timer.querySelector('[data-value="mins"]'),
      minsLabel: timer.querySelector('[data-value="mins"] + .label'),
      secs: timer.querySelector('[data-value="secs"]'),
      secsLabel: timer.querySelector('[data-value="secs"] + .label'),
    };

    // разбить целевую дату на дни, часы, минуты, секунды
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((time % (1000 * 60)) / 1000);

    // заполнить поля соответствующими значениями
    refs.days.textContent = String(days).padStart(3, "0");

    if (days === 1) {
      refs.daysLabel.textContent = "Day";
    } else if (refs.daysLabel.textContent === "Day") {
      refs.daysLabel.textContent += "s";
    }

    refs.hours.textContent = String(hours).padStart(2, "0");

    if (hours === 1) {
      refs.hoursLabel.textContent = "Hour";
    } else if (refs.hoursLabel.textContent === "Hour") {
      refs.hoursLabel.textContent += "s";
    }

    refs.mins.textContent = String(mins).padStart(2, "0");

    if (mins === 1) {
      refs.minsLabel.textContent = "Minute";
    } else if (refs.minsLabel.textContent === "Minute") {
      refs.minsLabel.textContent += "s";
    }

    refs.secs.textContent = String(secs).padStart(2, "0");

    if (secs === 1) {
      refs.secsLabel.textContent = "Second";
    } else if (refs.secsLabel.textContent === "Second") {
      refs.secsLabel.textContent += "s";
    }
  }

  startTimer() {
    // запустить отсчет
    this.#timerId = setInterval(
      () => {
        const time = this.targetDate - Date.now();

        if (time < 0) return this.stopTimer(this.#timerId);
        return this.updateTimer(time);
      },
      250,
      this
    );
  }

  stopTimer(id) {
    // остановить таймер
    clearInterval(id);
    alert(this.message);
  }
}

const today = new Date();

// список таймеров
const myTimers = [
  {
    name: "myBDnextYear",
    selector: "#timer-1",
    targetDate: new Date(`Aug, 8, ${today.getFullYear() + 1}`),
    message: "С днем рождения!",
  },
  {
    name: "newYear",
    selector: "#timer-2",
    targetDate: new Date(`Jan, 1, ${today.getFullYear() + 1}`),
    message: "С Новым Годом!",
  },
  {
    name: "eggs",
    selector: "#timer-3",
    targetDate: Date.now() + 5 * 60 * 1000,
    message: "Яйца сварились, приятного аппетита!",
  },
];

// запустить все таймеры
myTimers.forEach((timer) => {
  let myTimer = new CountdownTimer(timer);
  let startTimer = new Promise((resolve) => resolve(myTimer.startTimer()));
  startTimer.then(console.log(`Таймер ${timer.selector} запущен`));
});
