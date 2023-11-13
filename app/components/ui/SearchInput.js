"use client"

import zoomIcon from "@/public/assets/icons/zoom-icon.svg"
import Image from "next/image"

const SearchInput = () => {


    return (
        <div className="flex ml-auto px-7 ">
            <Image
            src={zoomIcon}
            width={25}
            height={25}
            >

            </Image>
            <input type="search"
            placeholder="Buscar producto"
            className="border-2 border-amber-400 m-2 text-xs m-"
            >
            </input>

        </div>

        
    )
}

export default SearchInput