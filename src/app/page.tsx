import Icon from "@/components/core/Icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Card color="" className="w-[300px] h-max rounded-sm border-0">
        <CardHeader className="text-center">
          Scan this QR code
        </CardHeader>
        <CardContent className="grid gap-4 justify-center">
            <Image
              width={150}
              height={150}
              src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=HelloWorld"
              alt="QR code"
          />
          
          <Button
            variant="ghost"
            className="flex gap-2 items-center w-full"
          >
            Refresh 
            <Icon name="refresh-ccw" size={16} />
          </Button>
                </CardContent>
      </Card>
    </main>
  );
}
