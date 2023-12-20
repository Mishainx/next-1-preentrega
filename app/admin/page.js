"use client"

import AdminPanel from "../components/adminPanel/AdminPanel";
import { Suspense } from "react";

export default function Admin() {

  return (
    <main className="w-full  h-screen flex flex-col justify-center items-center">
      <Suspense fallback={<p>cargando...</p>}>
        <AdminPanel/>
      </Suspense>
    </main>
  )
}
