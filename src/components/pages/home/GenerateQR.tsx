"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AppService } from "@/services/auth";
import { genericError } from "@/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Countdown } from "./Countdown";

export const GenerateQR = () => {
  const router = useRouter();
  const { trader } = useParams<{ trader: string }>();
  const [refetchCount, setRefetchCount] = useState(0);

  if (!trader) {
    router.push("/home");
  }

  const {
    data: qrCode,
    isLoading: isLoadingQRCode,
    refetch: refetchQrCode,
  } = useQuery({
    queryKey: ["qr-code"],
    queryFn: () => AppService.getQRCode(trader || "x"),
    enabled: !!trader,
  });

  const { mutate: disconnectBot, isPending: isDisconnectingBot } = useMutation({
    mutationKey: ["disconnectBot"],
    mutationFn: () => AppService.disconnectBot(trader || "x"),
    onError: (error: AxiosError) => {
      genericError(error.message);
    },
    onSuccess: () => {
      router.push("/");
    },
  });

  const handleRefetch = () => {
    refetchQrCode();
    setRefetchCount((count) => count + 1);
  };

  return (
    <Card color='' className='h-max w-[300px] rounded-sm border-0'>
      <CardHeader className='text-center'>Scan this QR code</CardHeader>
      <CardContent className='grid justify-center gap-4'>
        {isLoadingQRCode ? (
          <Skeleton className='h-[150px] w-[150px] rounded-md' />
        ) : (
          <div className='grid gap-4'>
            <Image
              width={150}
              height={150}
              className='mx-auto rounded-md'
              src={qrCode?.qrCode || ""}
              alt='QR code'
            />

            <Countdown
              key={refetchCount}
              expiresAt={qrCode?.expiresAt}
              onFinish={() => handleRefetch()}
            />
          </div>
        )}
      </CardContent>

      {!isLoadingQRCode && (
        <CardFooter className='flex justify-center'>
          <Button
            variant='default'
            onClick={() => disconnectBot()}
            disabled={isDisconnectingBot}
          >
            Disconnect Bot
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
