class CountdownTimer {
  #timerId = null;

  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
  }

  updateTimer(time) {
    // ссылки на элементы интерфейса
    const refs = {
      timer: document.querySelector(this.selector),
      days: document.querySelector('[data-value="days"]'),
      daysLabel: document.querySelector('[data-value="days"] + .label'),
      hours: document.querySelector('[data-value="hours"]'),
      hoursLabel: document.querySelector('[data-value="hours"] + .label'),
      mins: document.querySelector('[data-value="mins"]'),
      minsLabel: document.querySelector('[data-value="mins"] + .label'),
      secs: document.querySelector('[data-value="secs"]'),
      secsLabel: document.querySelector('[data-value="secs"] + .label'),
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
    // запомнить текущий таймер
    const thisTimer = this;

    // запустить отсчет
    this.#timerId = setInterval(() => {
      const time = thisTimer.targetDate - Date.now();

      if (time < 0) return thisTimer.stopTimer(thisTimer.#timerId);
      return thisTimer.updateTimer(time);
    }, 1000);
  }

  stopTimer(id) {
    // остановить таймер
    clearInterval(id);
    alert("Время ожидания закончилось!");
  }
}

const today = new Date();

const myBDnextYear = {
  selector: "#timer-1",
  targetDate: new Date(`Aug, 8, ${today.getFullYear() + 1}`),
};

const myTimer = new CountdownTimer(myBDnextYear);

myTimer.startTimer();
