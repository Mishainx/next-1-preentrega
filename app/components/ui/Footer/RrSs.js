import Image from "next/image"
import whatsAppIcon from "@/public/assets/icons/whatsapp-icon.svg"
import instagramIcon from "@/public/assets/icons/instagram-icon.svg"

const RrSs = () => {

    return (

        <section className="flex flex-row text-white gap-1">
            <Image
            src={whatsAppIcon}
            width={25}
            height={25}
            className="bg-amber-600 w-9 cursor-pointer  p-2 rounded-full hover:bg-slate-100 transition-colors duration-300"
            >
            </Image>
            <Image
            src={instagramIcon}
            width={25}
            className="bg-amber-600 w-9 cursor-pointer p-2 rounded-full hover:bg-slate-100 transition-colors duration-3"
            />

        </section>
    )
}

export default RrSs