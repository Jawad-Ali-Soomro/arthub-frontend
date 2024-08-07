import React, { useState, useEffect } from "react";

const CountdownTimer = ({ endBidDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(endBidDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      const totalh = Math.floor(difference / (1000 * 60 * 60));
      const remainingm = Math.floor((difference / 1000 / 60) % 60);
      const remainings = Math.floor((difference / 1000) % 60);

      timeLeft = {
        h: totalh,
        m: remainingm,
        s: remainings,
      };
    } else {
      timeLeft = {
        h: 0,
        m: 0,
        s: 0,
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span key={interval}>
        {timeLeft[interval]}
        {interval}{" "}
      </span>
    );
  });

  return (
    <div>
      {timerComponents.length ? timerComponents : <span>Time's up!</span>}
    </div>
  );
};

export default CountdownTimer;
