import Image from "next/image"
import whatsAppIcon from "@/public/assets/icons/whatsapp-icon.svg"
import instagramIcon from "@/public/assets/icons/instagram-icon.svg"

const RrSs = () => {

    return (

        <section className="flex flex-row text-white gap-1">
            <Image
            alt="whatsapp icon"
            src={whatsAppIcon}
            width={25}
            height={25}
            className=" w-9 cursor-pointer  p-2 rounded-full hover:invert"
            >
            </Image>
            <Image
            alt="instagram icon"
            src={instagramIcon}
            width={25}
            className="w-9 cursor-pointer  p-2 rounded-full hover:invert"
            />

        </section>
    )
}

export default RrSs