import './App.css'
import {ChaiCard} from './components/ChaiCard'
import { Counter } from './components/Counter'
import type {Chai} from './type';
import {ChaiList} from './components/ChaiList';
import { OrderForm } from './components/OrderForm';

const menu: Chai[] =[
  {id:1, name: "Masala Chai", price: 50, ishot: true},
  {id:2, name: "Adrak Chai", price: 60, ishot: true},
  {id:3, name: "Elaichi Chai", price: 70, ishot: true},
]
function App() {


  return (
    <>
      <div>
        <h1>React with TypeScript</h1>
        <ChaiCard name="HeadPhone" price= {500}/>
        <ChaiCard name="Mobile" price= {1000} isSpecial={true}/>
        <Counter/>
       </div>
       <div>
        <ChaiList items={menu}/>
       </div>

       <div>
        <OrderForm onSubmit={(order) => console.log("placed",order,name,order.cups)}/>
       </div>
       </>
  )
}

export default App
