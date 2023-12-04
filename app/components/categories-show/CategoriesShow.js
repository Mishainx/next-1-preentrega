import Image from "next/image";
import dbz from "@/public/assets/categories-show/categories-show-dbz.png/";
import disney from "@/public/assets/categories-show/categories-show-disney.png/";
import pokemon from "@/public/assets/categories-show/categories-show-pokemon.png/";
import Link from "next/link";

export default async function CategoriesShow() {
  return (
    <section className="flex flex-col sm:flex-row justify-between w-full p-10 space-y-4 sm:space-y-0">
      <Link href="/products/pokemon">
        <div className="category relative flex-1 group">
          <Image
            src={pokemon}
            layout="responsive"
            maxWidth={300}
            width={300}
            height={200}
            className="relative top-0 transition-opacity duration-300"
          />
          <div className="overlay absolute top-0 left-0 right-0 bottom-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-50"></div>
          <div className="details absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <h2 className="text-white text-center text-2xl uppercase font-light mb-2">Pokémon</h2>
            <div className="line bg-amber-400 h-1 w-16 mb-2"></div>
          </div>
        </div>
      </Link>

      <Link href="/products/disney">
        <div className="category relative flex-1 group">
          <Image
            src={disney}
            layout="responsive"
            width={300}
            height={200}
            className="relative top-0 transition-opacity duration-300"
          />
          <div className="overlay absolute top-0 left-0 right-0 bottom-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-50"></div>
          <div className="details absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <h2 className="text-white text-center text-2xl uppercase font-light mb-2">Disney</h2>
            <div className="line bg-amber-400 h-1 w-16 mb-2"></div>
          </div>
        </div>
      </Link>

      <Link href="/products/dbz">
        <div className="category relative flex-1 group">
          <Image
            src={dbz}
            layout="responsive"
            width={300}
            height={200}
            className="relative top-0 transition-opacity duration-300"
          />
          <div className="overlay absolute top-0 left-0 right-0 bottom-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-50"></div>
          <div className="details absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <h2 className="text-white text-center text-2xl uppercase font-light mb-2">DBZ</h2>
            <div className="line bg-amber-400 h-1 w-16 mb-2"></div>
          </div>
        </div>
      </Link>
    </section>
  );
}
