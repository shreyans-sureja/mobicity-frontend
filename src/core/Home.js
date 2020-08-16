import React, {useState, useEffect} from 'react'
import {getProducts} from "./helper/coreapicalls"

export default function Home(){
    const [products, setProducts] = useState([])
    const [error, setError] = useState(false)

    const loadAllProducts = () => {
        getProducts()
        .then(data => {
            if(data.error){
                setError(data.error)
                console.log(console.error())
            }
            else{
                setProducts(data);
            }
        })
    }

    useEffect(() => {
        loadAllProducts();
    }, [])

    return (
        <din>
            <h1>Home component</h1>
            <div className="row">
                {products.map( (product,index) => {
                    return(
                        <div key={index}>
                            <h1>{product.name}</h1>
                        </div>
                    )
                })}
            </div>
        </din>
    )
}