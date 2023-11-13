'use client'
import Button from "./Button"

const Form = ({ handleAuth }) => {

    return (
        <div className="h-90 py-8 flex justify-center">
            <form className="h-24 flex flex-col  px-5 justify-center items-center border-amber-400 border-2 gap-2 text-xs">
                <input type='text' placeholder="usuario" className="h-5 border-2 border-amber-400" />
                <input type='password' placeholder="contraseña" className="h-5 border-2 border-amber-400" />
                <Button
                    className="bg-amber-400 rounded-md p-1 text-xs hover:text-white"
                    onClick={() => handleAuth()}
                >
                    Enviar
                </Button>
            </form>
        </div>
    )
}

export default Form
