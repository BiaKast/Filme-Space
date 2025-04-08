// app/details/page.tsx
'use client'
import { Suspense } from "react";
import dynamic from "next/dynamic";

const DetailsClient = dynamic(() => import("../../components/DetailsClient"), {
  ssr: false,
});

export default function DetailsPage() {
  return (
    <Suspense fallback={<div className="text-white p-10">Carregando detalhes do filme...</div>}>
      <DetailsClient />
    </Suspense>
  );
}
