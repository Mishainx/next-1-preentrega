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
      await loginUser(values);


    } catch (error) {
    }
  };

  useEffect(() => {
    if (user.logged) {
      if(user.role=="admin"){
        router.push('/admin'); 
      }
      else{
        router.push('/'); 
      }
    }
  }, [user, router]);

  return (
    <div className="flex justify-center items-center w-screen h-screen z-10">
      <form
        onSubmit={handleSubmit}
        className="bg-amber-400 py-4 px-4 sm:px-6 rounded-xl w-full max-w-md mx-2 sm:mx-0"
      >
        <h2 className="text-2xl font-bold text-center text-white mb-4">Login</h2>
        <input
          type="email"
          value={values.email}
          required
          placeholder="Tu email"
          className="p-2 rounded w-full border border-white block mb-2"
          name="email"
          onChange={handleChange}
        />
        <input
          type="password"
          value={values.password}
          required
          placeholder="Tu password"
          className="p-2 rounded w-full border border-white block mb-2"
          name="password"
          onChange={handleChange}
        />
        <div className="flex flex-col gap-2 mb-2">
          <button
            type="submit"
            className="bg-white text-amber-400 py-2 px-4 rounded-md hover:text-black w-full"
          >
            Ingresar
          </button>
          <Link href="/users/register">
            <a className="bg-white text-amber-400 py-2 px-4 rounded-md hover:text-black w-full text-center">
              Registrarse
            </a>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;