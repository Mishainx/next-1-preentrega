import RrSs from "./RrSs"
import Logo from "../Logo"

const Footer = () => {

    return (
        <footer className="w-full bg-amber-400 bottom-0 flex flex-col items-center justify-center text-xs">
            <div className="w-full flex flex-row justify-between px-5 py-1">
                <Logo/>
                <RrSs/>
            </div>
            <div className="bg-amber-600 w-full text-center">
                <p>Copyright @FerRivero</p>
            </div>
        </footer>
    )
}

export default Footer