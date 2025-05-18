import { useState, useEffect } from "react";

function Countdown() {
  const [countdown, setCountdown] = useState(null);
  const hours = countdown * 24;
  const minutes = hours * 60;
  const seconds = minutes * 60;
  const secondsInDay = 86400;

  useEffect(() => {
    if (countdown === null) return;

    const interval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prevCountdown - 1 / secondsInDay;
      });
    }, 1000);

    // Cleanup the interval when component unmounts or countdown resets
    return () => clearInterval(interval);
  }, [countdown]);

  function handleDateChange(e) {
    const date = new Date(e.target.value);
    const today = new Date();
    const timeDiff = date.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    setCountdown(daysDiff);
  }

  return (
    <>
      {countdown === null ? (
        <h2>
          Set a countdown for your next trip{" "}
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
            {Math.floor(countdown)} days or {Math.floor(hours)} hours or{" "}
            {Math.floor(minutes)} minutes or {Math.floor(seconds)} seconds
          </p>
        </h2>
      )}
    </>
  );
}

export default Countdown;
