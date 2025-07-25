import Card from "../components/card";

export default function Dashboard() {
  return (
    <div className="min-h-screen w-full bg-[wheat] flex flex-col pt-20 px-4 md:px-16 selection:text-amber-600">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 text-black">
        Your Time Capsules
      </h1>
      <div className="flex flex-wrap gap-8 justify-center">
        <Card
          title="Secret Vault"
          description="This will unlock later"
          unlockTime="2025-07-30T10:00:00.000Z"
        />
        <Card
          title="Another Card"
          description="This is already unlocked!"
          unlockTime="2023-01-01T10:00:00.000Z"
        />
      </div>
    </div>
  );
}
