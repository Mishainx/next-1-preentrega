import Item from "./Item"

export default function ItemList({items}) {
    return (
        <div className="flex flex-row text-xs flex-wrap justify-center">
            {
            items?.length > 0?
            items.map((product,i)=>
                <Item key={i} product={product} />)
                :
                <p>no hay productos seleccionados</p>
            }
        </div>
    )
}
