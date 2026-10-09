
import type {Chai} from '../type';
import {ChaiCard} from './ChaiCard';

interface ChaiListProps{
    items: Chai[];
}
export function ChaiList({items}:ChaiListProps)
{
    return(
        <div>
            <h1>Chai List</h1>
            {items.map((chai) =>
            <ChaiCard key={chai.id}
        name={chai.name}
        price={chai.price}
        isSpecial={chai.price  > 100}></ChaiCard>)}
        </div>
    )
}