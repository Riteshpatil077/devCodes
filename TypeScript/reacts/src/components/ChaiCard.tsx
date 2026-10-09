interface ChaiCardProps{
    name: string;
    price: number;
    isSpecial?: boolean;
}  // shape of the props object defined

export function ChaiCard({ name, price,isSpecial=false} : ChaiCardProps)
{
        return (
            <article>
                <h2>{name} {isSpecial && <span>❤️</span>}</h2>
                <p>{price}</p>  
            </article>
        )
}