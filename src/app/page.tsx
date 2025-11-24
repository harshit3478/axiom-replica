import { TokenBoard } from "@/components/features/TokenTable/TokenBoard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="z-10 w-full items-center justify-between font-mono text-sm">
        <h1 className="text-2xl font-bold mb-6">Pulse</h1>
        <TokenBoard />
      </div>
    </main>
  );
}
