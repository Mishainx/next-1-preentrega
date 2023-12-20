"use client";

import Button from "@/app/components/ui/Button";
import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import {
  isValidName,
  isValidSurname,
  isValidTelephone,
  isValidEmail,
  isValidPassword,
} from "@/src/utils";
import { toast } from "react-toastify";

const toastNotifyErrorForm = (error) =>
  toast(` Error al crear el usuario: ${error} inválido `, {
    hideProgressBar: true,
    autoClose: 2000,
    type: "error",
  });

const RegisterForm = () => {
  const fieldsToValidate = [
    { name: "name", validator: isValidName, errorMessage: "Nombre inválido" },
    {
      name: "surname",
      validator: isValidSurname,
      errorMessage: "Apellido inválido",
    },
    {
      name: "telephone",
      validator: isValidTelephone,
      errorMessage: "Teléfono inválido",
    },
    { name: "email", validator: isValidEmail, errorMessage: "Email inválido" },
    {
      name: "password",
      validator: isValidPassword,
      errorMessage: "Contraseña inválida",
    },
  ];

  const { createUser } = useAuthContext();
  const [values, setValues] = useState({
    name: "",
    surname: "",
    telephone: 0,
    email: "",
    password: "",
    cart: "",
    tickets: "",
    role: "",
  });

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (const field of fieldsToValidate) {
      const isValid = field.validator(values[field.name]);
      if (!isValid) {
        toastNotifyErrorForm(field.errorMessage);
        return;
      }
    }

    await createUser(values);
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md border border-amber-400">
        <h2 className="text-2xl font-bold mb-4">Registro</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-semibold mb-1">
              Nombre:
            </label>
            <input
              required
              type="text"
              id="name"
              name="name"   
              className="input-field border border-amber-400"
              value={values.name}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="surname" className="text-sm font-semibold mb-1">
              Apellido:
            </label>
            <input
              required
              type="text"
              id="surname"
              name="surname"
              className="input-field border border-amber-400"
              value={values.surname}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="telephone" className="text-sm font-semibold mb-1">
              Teléfono:
            </label>
            <input
              required
              type="number"
              id="telephone"
              name="telephone"
              className="input-field border border-amber-400"
              value={values.telephone}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-semibold mb-1">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="input-field border border-amber-400"
              value={values.email}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="password" className="text-sm font-semibold mb-1">
              Contraseña:
            </label>
            <input
              required
              type="password"
              id="password"
              name="password"
              placeholder=""
              className="input-field border border-amber-400"
              value={values.password}
              onChange={handleChange}
            />
          </div>
          <Button
            className="bg-amber-400 rounded-md p-2 text-white hover:bg-amber-500"
            type="submit"
          >
            Enviar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;