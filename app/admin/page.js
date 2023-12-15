"use client"

import AdminPanel from "../components/adminPanel/AdminPanel";
import { useAuthContext } from "../components/context/AuthContext";
import { Suspense } from "react";

export default function Admin() {
  const { logout } = useAuthContext();


  return (
    <main className="w-full  h-screen flex flex-col justify-center items-center">
      <Suspense fallback={<p>cargando...</p>}>
        <AdminPanel/>
        <button onClick={()=>logout()}>logout</button>
      </Suspense>
    </main>
  )
}
