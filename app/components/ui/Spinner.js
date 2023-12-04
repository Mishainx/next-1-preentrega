import spinner from "@/public/assets/icons/spinner-icon.svg"
import Image from "next/image"
import mate from "@/public/assets/products/mate-venga.png"


export default function Spinner() {
    return (
      <div className="h-96 flex flex-col justify-center items-center">
        <div className="w-52 relative p-5">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Image src={spinner} width={50} height={50} className="animate-spin" />
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Image src={mate} alt="Mate y Venga Logo" width={30} height={30} className="text-gray-800"/>
          </div>
        </div>
        <p className="font-bold text-xs">Mate y venga</p>
      </div>
    );
  }