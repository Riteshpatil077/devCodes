let value: string | any  | number = 10;
 
if(typeof value === "number")
{
    console.log(value.toFixed(2));
}
else{
    
    console.log(value.toUpperCase());
}

function print(value: string | number) {
    if (typeof value === "number") {
        console.log(value.toFixed(2));
    } else {
        console.log(value.toUpperCase());
    }
}
