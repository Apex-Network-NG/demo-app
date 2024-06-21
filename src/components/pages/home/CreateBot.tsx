"use client";
import { Button } from "@/components/ui/button";
import { AppService } from "@/services/auth";
import { genericError } from "@/utils";
import { ROUTES } from "@/utils/routes";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CreateBotProps {}

export const CreateBot = (props: CreateBotProps) => {
  const router = useRouter();

  const [shouldUpdateWebhook, setShouldUpdateWebhook] = useState(false);
  const [trader, setTrader] = useState<string | null>(null);

  const goToTrader = (traderId: string) => {
    router.push(`${ROUTES.HOME}/${traderId}`);
  };

  const { isPending: isCreatingBot, mutate: createBot } = useMutation({
    mutationKey: ["createBot"],
    mutationFn: () => AppService.createTradingBot(),
    onError: (error: AxiosError) => {
      genericError(error.message);
    },
    onSuccess: (data) => {
      const { id } = data.data.data.trader;

      if (data.status === 206) {
        setTrader(id);
        setShouldUpdateWebhook(true);
      } else {
        goToTrader(id);
      }
    },
  });

  const { isPending: isUpdatingWebhook, mutate: updateWebhook } = useMutation({
    mutationKey: ["updateWebhook"],
    mutationFn: () => AppService.updateBotWebhook(trader || "x"),
    onError: (error: AxiosError) => {
      genericError(error.message);
    },
    onSuccess: (data) => {
      goToTrader(trader || "x");
    },
  });

  return (
    <section className='grid gap-6'>
      <p className='text-center text-2xl font-bold'>Auth</p>

      {!shouldUpdateWebhook ? (
        <Button
          variant='default'
          onClick={() => createBot()}
          disabled={isCreatingBot}
          size='lg'
        >
          {isCreatingBot ? "creating..." : "Create Bot"}
        </Button>
      ) : (
        <Button
          variant='default'
          onClick={() => updateWebhook()}
          disabled={isUpdatingWebhook}
          size='lg'
        >
          Update Webhook
        </Button>
      )}
    </section>
  );
};
