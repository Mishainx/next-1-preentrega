import Menu from "./Menu"
import Logo from "../Logo"

const Header = () => {

    return (
        <header className="w-full bg-amber-400">
            <div className="container m-auto py-3 flex justify-between items-center">
            <Logo/>
            <Menu/>
            </div>
        </header>
    )
}

export default Header
