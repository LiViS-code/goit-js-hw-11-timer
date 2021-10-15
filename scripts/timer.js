class CountdownTimer {
  #timerId = null;

  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
  }

  updateTimer(time) {
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

    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((time % (1000 * 60)) / 1000);

    refs.days.textContent = days;
    if (days === 1) {
      refs.daysLabel.textContent = "Day";
    } else {
      refs.daysLabel.textContent = "Days";
    }

    refs.hours.textContent = hours;
    if (hours === 1) {
      refs.hoursLabel.textContent = "Hour";
    } else {
      refs.hoursLabel.textContent = "Hours";
    }

    refs.mins.textContent = mins;
    if (mins === 1) {
      refs.minsLabel.textContent = "Minute";
    } else {
      refs.minsLabel.textContent = "Minutes";
    }

    refs.secs.textContent = secs;
    if (secs === 1) {
      refs.secsLabel.textContent = "Second";
    } else {
      refs.secsLabel.textContent = "Seconds";
    }
  }

  startTimer() {
    const thisTimer = this;
    this.#timerId = setInterval(() => {
      const time = thisTimer.targetDate - Date.now();
      if (time < 0) return thisTimer.stopTimer(thisTimer.#timerId);
      return thisTimer.updateTimer(time);
    }, 1000);
  }

  stopTimer(id) {
    clearInterval(id);
    alert("Время ожидания закончилось!");
  }
}

const myTimer = new CountdownTimer({
  selector: "#timer-1",
  targetDate: Date.now() + 68000,
});

myTimer.startTimer();
