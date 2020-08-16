import React from 'react'
import ImageHelper from "./helper/ImageHelper"
import {Redirect} from 'react-router-dom'

const isAuthenticated = false;

const Card = ({
    product,
    addtoCart = true,
    removeFromCart = false
}) => {

    const cardTitle = product ? product.name : "mobile";
    const cardDescription = product ? product.description : "Default description";
    const cardPrice = product ? product.price : "NA";

    const addToCart = () => {
        if (isAuthenticated){
            console.log("Added to cart");
        }
        else{
            console.log("Login Please!");
        }
    };

    const getAredirect = redirect => {
        if (redirect){
            return <Redirect to="cart"/>
        }
    }

    const showAddtoCart = addToCart => {
        return(
            addToCart && (
             <button
                onClick={addToCart}
                className="btn btn-block btn-outline-success mt-2 mb-2">
                Add to Cart
              </button>
            )
        )
    }

    const shoeRemoveFromCart = removeFromCart => {
        return(
            removeFromCart && (
                <button
                onClick={() => {
                    console.log("product removed from cart");
                }}
                className="btn btn-block btn-outline-danger mt-2 mb-2">
                Remove from cart
              </button>
            )
        )
    };

    return (
      <div className="card text-white bg-dark border border-info ">
        <div className="card-header lead">{cardTitle}</div>
        <div className="card-body">
          <ImageHelper product={product}/>
          <p className="lead bg-success font-weight-normal text-wrap">
            {cardDescription}
          </p>
    <p className="btn btn-success rounded  btn-sm px-4">$ {cardPrice}</p>
          <div className="row">
            <div className="col-12">
              {showAddtoCart(addToCart)}
            </div>
            <div className="col-12">
                {shoeRemoveFromCart(removeFromCart)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default Card;