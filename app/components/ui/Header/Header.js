import Menu from "./Menu"
import Logo from "../Logo"

const Header = () => {

    return (
        return (
            <header className="w-full bg-amber-400">
              <div className="container mx-auto py-3 md:py-4 flex justify-between items-center">
            <Logo/>
            <Menu/>
            </div>
        </header>
    )
}

export default Header
