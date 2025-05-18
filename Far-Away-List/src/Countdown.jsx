import { useState, useEffect } from "react";

function Countdown() {
  const [targetDate, setTargetDate] = useState(null);
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    if (!targetDate) return;

    const interval = setInterval(() => {
      const now = new Date();
      const diff = new Date(targetDate) - now;

      if (diff <= 0) {
        clearInterval(interval);
        setRemainingTime(0);
      } else {
        setRemainingTime(diff);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  function handleDateChange(e) {
    setTargetDate(e.target.value);
  }

  function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);

    const days = Math.floor(totalSeconds / (24 * 3600));
    const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return { days, hours, minutes, seconds };
  }

  const { days, hours, minutes, seconds } = formatTime(remainingTime);

  return (
    <>
      {!targetDate ? (
        <h2>
          Set a countdown for your next trip:{" "}
          <input
            type="date"
            onBlur={handleDateChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleDateChange(e);
            }}
          />
        </h2>
      ) : (
        <h2>
          Countdown ⏳<p>Time until the next trip:</p>
          <p>
            {days} days | {hours} hours | {minutes} minutes | {seconds} seconds
          </p>
        </h2>
      )}
    </>
  );
}

export default Countdown;
