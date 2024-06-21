"use client";
import { Button } from "@/components/ui/button";
import { useCountDown } from "@/hooks/useCountdown";
import { getTimeLeft } from "@/utils";

interface CountDownProps {
  expiresAt?: string;
  onFinish: () => void;
}

export const Countdown = (props: CountDownProps) => {
  const countdown = useCountDown(getTimeLeft(props.expiresAt), () =>
    props.onFinish()
  );

  return (
    <Button
      variant='ghost'
      size='sm'
      onClick={() => props.onFinish()}
      className='text-center text-sm text-gray-500'
    >
      Expires in {Math.max(0, Math.round(countdown / 1000))}s
    </Button>
  );
};
