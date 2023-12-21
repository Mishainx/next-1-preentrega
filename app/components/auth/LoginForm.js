"use client";
import { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";  

const LoginForm = () => {
  const router = useRouter();
  const { user, loginUser } = useAuthContext();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const tutu = await loginUser(values);
      console.log (tutu)


    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
    }
  };

  return (
    <div className="w-screen h-screen z-10 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-amber-400 py-4 px-6 rounded-xl max-w-md w-full"
      >
        <h2 className="text-white mb-4 text-center text-2xl font-bold">Login</h2>
        <input
          type="email"
          value={values.email}
          required
          placeholder="Tu email"
          className="p-2 rounded w-full border border-white block my-4"
          name="email"
          onChange={handleChange}
        />
        <input
          type="password"
          value={values.password}
          required
          placeholder="Tu password"
          className="p-2 rounded w-full border border-white block my-4"
          name="password"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-white text-amber-400 py-2 px-4 rounded-md mr-4 hover:text-black"
        >
          Ingresar
        </button>
        <Link href="/users/register">
          <a className="bg-white text-amber-400 py-2 px-4 rounded-md hover:text-black">
            Registrarse
          </a>
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;
