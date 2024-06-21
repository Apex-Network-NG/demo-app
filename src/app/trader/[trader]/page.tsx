import { GenerateQR } from "@/components/pages/home/GenerateQR";

export default function HomePage() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <GenerateQR />
    </main>
  );
}
