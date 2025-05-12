"use client";

import DashboardEthicRadar from "./DashboardEthicRadar";
import Image from "next/image"; // Se stai usando Next.js

export default function HomeDashboard() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-white">
      <div className="mb-8 text-center">
        <Image
          src="/ethi-call-logo.png"
          alt="ETHI-Call Logo"
          width={150}
          height={150}
        />
        <h1 className="text-3xl font-bold mt-4">Dashboard ETHI-Call</h1>
      </div>
      <div className="w-full max-w-4xl">
        <DashboardEthicRadar />
      </div>
    </div>
  );
}
