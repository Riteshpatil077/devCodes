let set : number | string | boolean = 10;// union type

console.log(set);

let orders = ["1","2","3"];// type inference

let currOrder : string | undefined;// union type

for (let order of orders)
{
    if(order === "12")
    {
        currOrder = order;
        break;
    }
}

console.log(currOrder);