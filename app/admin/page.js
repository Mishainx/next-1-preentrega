import AdminPanel from "../components/adminPanel/AdminPanel";

export const generateMetadata = async () => {
  return {
      title: 'Admin',
      description: "Página admin",
    }
  }

export default function Admin() {

  return (
    <main className="w-full h-screen flex justify-center items-center">
      <AdminPanel/>
    </main>
  )
}
