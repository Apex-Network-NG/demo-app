import { CreateBot } from "@/components/pages/home/CreateBot";

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      {/* Create Bot */}
      <CreateBot />
    </main>
  );
}
