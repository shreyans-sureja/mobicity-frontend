import React, {useState, useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import {cartEmpty} from "../core/helper/cartHelper"
import {processPayment, getCard} from "../core/helper/paymentHelper"
import {createOrder} from "./helper/orderHelper"
import {isAuthenticated, signout} from "../auth/helper"

const Payment = ({
    products,
    reload = undefined,
    setReload = (f) => f,
}) => {

    const [info, setInfo] = useState({
        number : "",
        expiry : "",
        cvv : "",
        error : "",
        loading : false,
        success : false,
    });

    const {number,expiry,cvv,error,success,loading} = info;

    const userId = isAuthenticated && isAuthenticated().user.id;
    const token = isAuthenticated && isAuthenticated().token;
    
    const getSavedCard = (userId,token) =>{
        getCard(userId,token)
        .then((res) => {
            if(res.ok){
                setInfo({
                    ...info,
                    number : res.json().number,
                    expiry : res.json().expiry
                })
            }
        })
        console.log(number)
    }

    useEffect(() =>{
        getSavedCard(userId,token);
    },[])

    const getAmount = () => {
        let amount = 0;
        products.map(p => {
            amount = amount + parseInt(p.price)
        })
        return amount;
    }
 
    const handleChange = name => event => {
        setInfo({...info,error:false,[name] : event.target.value});
    }

    const onSubmit = (event) => {
        event.preventDefault();
        getCard(userId,token)
        .then((r) =>{
            console.log("HIiiiiiiii")
            console.log(r)
        })
    //     setValues({ ...values, error: false });
    //     payment({number,expiry,cvv})
    //     .then((response) => {
    //         if(response.ok){
    //             console.log("OKKKKKKKKKKKKKKKK")
    //             cartEmpty(() => {});
    //             setValues({
    //                 ...values,
    //                 number : "",
    //                 expiry : "",
    //                 cvv : "",
    //                 error : false,
    //                 success : true
    //             })                
    //         }
    //         else{
    //             console.log("NOOOOOOOOO")
    //             setValues({
    //                 ...values,
    //                 number : "",
    //                 expiry : "",
    //                 cvv : "",
    //                 error : true,
    //                 success : false
    //             })
    //         }
    //       })
    //     .catch((e) => console.log(e));
    }

    const errorMessage = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div
                        className="alert alert-danger"
                        style = {{display: error ? "" : "none"}}
                    >
                        Something went wrong.. Try again later.
                    </div>
                </div>
            </div>
        )
    }

    const successMessage = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div
                        className="alert alert-success"
                        style = {{display: success ? "" : "none"}}
                    >
                        Payment successful 
                    </div>
                </div>
            </div>
        )
    }


    const PymentForm = () => {
        return (
          <div className="row">
            <h3>Your bill is {getAmount()}</h3>
            <div className="col-md-6 offset-sm-3 text-left">
              <form>
                <div className="form-group">
                  <label className="text-light">Card Number</label>
                  <input
                    className="form-control"
                    info={number}
                    onChange={handleChange("number")}
                    type="text"
                  />
                </div>
                <div className="form-group">
                  <label className="text-light">Expiration(MM/YY)</label>
                  <input
                    className="form-control"
                    info={expiry}
                    onChange={handleChange("expiry")}
                    type="text"
                  />
                </div>
                <div className="form-group">
                  <label className="text-light">cvv</label>
                  <input
                    className="form-control"
                    info={cvv}
                    onChange={handleChange("cvv")}
                    type="password"
                  />
                </div>
                <button 
                onClick={onSubmit}
                className="btn btn-success btn-block">Submit</button>
              </form>
            </div>
          </div>
        );
      };



    return(
        <div>
            {successMessage()}
            {errorMessage()}
            {PymentForm()}
            <p className="text-white text-center">
                {JSON.stringify(info)}
            </p>
        </div>
    )
}

export default Payment;
