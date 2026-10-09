import {useState} from "react"

export function Counter()
{
      const [count, setCount] = useState<number>(0);
    return(
        <div>
            <h1>Counter</h1>
            <p>Cups Ordered : {count}</p>
            <button onClick={() => setCount((c)=> c+1)}>
                Order Cup more
            </button>
        </div>
    )
}