import { useEffect, useState } from "react";

export const useCountDown = (expiresAt: number, onEnd: () => void) => {
  const [timeLeft, setTimeLeft] = useState(expiresAt);

  useEffect(() => {
    if (timeLeft <= 0) {
      onEnd();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1000);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, onEnd]);

  return timeLeft;
};
