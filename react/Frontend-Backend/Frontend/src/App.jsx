import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

// function App() {
//   const [jokes, setJokes] = useState([])

//   useEffect(() => {
//     axios.get('/api/jokes')
//       .then((response) => {
//         setJokes(response.data)
//       })
//       .catch((error) => {
//         console.log("Error Occur at fetch jokes :: ", error)
//       })
//   }, []);


//   return (
//     <div className='flex flex-col items-center justify-center mt-5'>
//       <h1 className='w-full text-3xl bg-green-500 font-bold underline text-center p-5'>FrontEnd & Backend Project</h1>
//       <p>JOKES: {jokes.length}</p>
//       {
//         jokes.map((joke, index) => (

//           <div key={joke.id}>
//             <h3>{joke.title}</h3>
//             <p>{joke.content}</p>
//           </div>
//         ))
//       }
//     </div>
//   )
// }


function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  //fetch product using axios with async await
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get('/api/products')
        console.log("fetching product", response.data);
        setProducts(response.data);
      } catch (error) {
        console.log("Error Occur at fetch product :: ", error)
        setError(error);
        setLoading(false);
      }

    })()

  }, []);


  if (error) {
    return <div>Error Occur at fetch product :: {error}</div>
  }

  return (
    <div className='flex flex-col items-center justify-center mt-5'>
      <h1 className='w-full text-3xl bg-green-500 font-bold underline text-center p-5'>FrontEnd & Backend Project</h1>
      <p>PRODUCTS: {products.length}</p>
      {
        products.map((product, index) => (

          <div key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.price}</p>
          </div>
        ))
      }
    </div>
  )
}



export default App
