  import React, { useState} from "react";

  interface OrderFormProps{
    onSubmit(oder:{name:string; cups:number}):void;
  }

  export function OrderForm({onSubmit}: OrderFormProps)
  {
    const [name, setName] = useState<string>("Masala Chai");
    const [cups, setCups] = useState<number>(1);

    function handleSubmit(e:React.FormEvent<HTMLFormElement>)
    {
      e.preventDefault();
      onSubmit({name, cups}); 
    }

    return <form onSubmit={handleSubmit}>
      <label>Chai Name</label>
      <input value={name}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}/>

<label>Cups Numbers</label>
      <input
      type="number"
      value={name}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}/>

      <button type="submit">Order</button>
    </form>
  }