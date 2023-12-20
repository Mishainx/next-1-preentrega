"use client"

import Button from "@/app/components/ui/Button"
import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import {isValidName,isValidSurname,isValidTelephone,isValidEmail, isValidPassword} from "@/src/utils";
import { toast } from "react-toastify";


const toastNotifyError = () => toast('Error al crear el usuario', { hideProgressBar: true, autoClose: 2000, type: 'error' })
const toastNotifyErrorForm= (error) => toast( ` Error al crear el usuario: ${error} inválido ` , { hideProgressBar: true, autoClose: 2000, type: 'error' })

const RegisterForm = () =>{

    const fieldsToValidate = [
        { name: "name", validator: isValidName, errorMessage: "Nombre inválido" },
        { name: "surname", validator: isValidSurname, errorMessage: "Apellido inválido" },
        { name: "telephone", validator: isValidTelephone, errorMessage: "Teléfono inválido" },
        { name: "email", validator: isValidEmail, errorMessage: "Email inválido" },
        { name: "password", validator: isValidPassword, errorMessage: "Contraseña inválida" },
      ];

    const { createUser } = useAuthContext();
    const [values, setValues] = useState({
      name: "",  
      surname: "",
      telephone: 0,
      email: "",
      password: "",
      cart: "",
      tickets:"",
      role:""
    });

    const handleChange = (e) => {
        setValues({
          ...values,
          [e.target.name]: e.target.value,
        });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
            // Validaciones
    for (const field of fieldsToValidate) {
        const isValid = field.validator(values[field.name]);
        if (!isValid) {
          toastNotifyErrorForm(field.errorMessage)
          return;
        }
      }

      await createUser(values)



      }; 

    return(
        <div className="h-90 py-8 flex justify-center">
            <form className="flex flex-col  p-5 justify-center items-center border-amber-400 border-2 gap-2 text-xs"
            onSubmit={handleSubmit}
            >
                <input 
                    required
                    type="text" 
                    name="name" 
                    placeholder="Nombre" 
                    className="h-5 border-2 border-amber-400"
                    value={values.name}
                    onChange={handleChange}

                />
                <input 
                    required
                    type="text" 
                    name="surname" 
                    placeholder="Apellido" 
                    className="h-5 border-2 border-amber-400"
                    value={values.surname}
                    onChange={handleChange}
                />
                <input 
                    required
                    type="number" 
                    name="telephone" 
                    placeholder="Telefono" 
                    className="h-5 border-2 border-amber-400"
                    value={values.telephone}
                    onChange={handleChange}
                />
                <input
                    type='email'
                    placeholder="Email"
                    name="email"
                    className="h-5 border-2 border-amber-400"
                    value={values.email}
                    onChange={handleChange}
                 />
                <input 
                    required
                    type='password'
                    placeholder="Contraseña"
                    name="password"
                    className="h-5 border-2 border-amber-400"
                    value={values.password}
                    onChange={handleChange}
                    />
                <Button
                className="bg-amber-400 rounded-md p-1 text-xs hover:text-white"
                type="submit"
                >
                    Enviar
                </Button>
            </form>
        </div>
    )
}

export default RegisterForm