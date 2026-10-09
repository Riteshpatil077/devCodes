let response: any = "42";

let numbericLength: number =(response as string).length;// type assertion

type Book = {
    name: string;
};

let bookString= `{"name":"The Great Gatsby"}`;
let bookObject = JSON.parse(bookString) as Book;// type assertion

console.log(bookObject);

const inputElement = document.getElementById("input") as HTMLInputElement;// type assertion

try{

}
catch(error)
{
    if(error instanceof Error)
    {
        console.log(error.message);
    }
    console.log(error);
}


const data:unknown = "cheese";
const strData: string = data as string;