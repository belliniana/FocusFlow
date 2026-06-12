const timer =
    document.getElementById("timer");

const progressCircle =
    document.getElementById(
        "progressCircle"
    );

const startBtn =
    document.getElementById(
        "startBtn"
    );

const pauseBtn =
    document.getElementById(
        "pauseBtn"
    );

const resetBtn =
    document.getElementById(
        "resetBtn"
    );

const sessionsElement =
    document.getElementById(
        "sessions"
    );

const modeButtons =
    document.querySelectorAll(
        ".mode-btn"
    );

let totalTime = 1500;
let currentTime = totalTime;
let interval = null;

let sessions =
    Number(
        localStorage.getItem(
            "focusSessions"
        )
    ) || 0;

sessionsElement.textContent =
    sessions;

function updateDisplay() {

    const minutes =
        Math.floor(
            currentTime / 60
        );

    const seconds =
        currentTime % 60;

    timer.textContent =
        `${String(minutes)
            .padStart(2, "0")}
    :
    ${String(seconds)
            .padStart(2, "0")}`;

    const progress =
        currentTime / totalTime;

    progressCircle.style
        .strokeDashoffset =
        754 - (754 * progress);

}

function startTimer() {

    if (interval) return;

    interval =
        setInterval(() => {

            currentTime--;

            updateDisplay();

            if (currentTime <= 0) {

                clearInterval(
                    interval
                );

                interval = null;

                sessions++;

                localStorage.setItem(
                    "focusSessions",
                    sessions
                );

                sessionsElement
                    .textContent =
                    sessions;

                tocarSom();

                alert(
                    "Sessão concluída!"
                );

            }

        }, 1000);

}

function pauseTimer() {

    clearInterval(
        interval
    );

    interval = null;

}

function resetTimer() {

    pauseTimer();

    currentTime =
        totalTime;

    updateDisplay();

}

function tocarSom() {

    const audio =
        new Audio(
            "https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"
        );

    audio.play();

}

modeButtons.forEach(btn => {

    btn.addEventListener(
        "click",
        () => {

            modeButtons.forEach(
                b => b.classList.remove(
                    "active"
                )
            );

            btn.classList.add(
                "active"
            );

            totalTime =
                Number(
                    btn.dataset.time
                ) * 60;

            currentTime =
                totalTime;

            updateDisplay();

        });

});

startBtn.addEventListener(
    "click",
    startTimer
);

pauseBtn.addEventListener(
    "click",
    pauseTimer
);

resetBtn.addEventListener(
    "click",
    resetTimer
);

updateDisplay();