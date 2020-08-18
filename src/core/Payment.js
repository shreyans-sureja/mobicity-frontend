import React, {useState, useEffect, createRef} from 'react'
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
        name : "",
        remember : "no",
        error : "",
        loading : false,
        success : false,
    });

    const {number,expiry,cvv,name,remember,error,success,loading} = info;

    const handleChange = name => event => {
        setInfo({...info,
            error:false,[name] : 
            event.target.value});
    }

    const changeCheckbox = name => event =>{
        if(info.remember == "yes"){
            setInfo({...info,remember : "no"});
        }
        else{
            setInfo({...info,remember :"yes"})
        }
    }

    const userId = isAuthenticated && isAuthenticated().user.id;
    const token = isAuthenticated && isAuthenticated().token;
    
    const getSavedCard = (userId,token) =>{
        getCard(userId,token)
        .then((res) => { 
            console.log(res['card'])
            const storedCard = res['card']
            let number = ""
            let expiry = ""
            let name = ""

            if("name" in storedCard){
                name = storedCard['name']
            }
            if("number" in storedCard){
                number = storedCard['number']
            }
            if("expiry_month" in storedCard && "expiry_year" in storedCard){
                expiry = String(storedCard['expiry_month'] + "/" + storedCard['expiry_year'])
            }            
            setInfo({number,expiry,name})
    
        })
        console.log(info.name)
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

    const onSubmit = (event) => {
        event.preventDefault();
        setInfo({loading : true})
        const paymentData = {
            "cardNum" : info.number,
            "expiry" : info.expiry,
            "cvv" : info.cvv,
            "name" : info.name,
            "amount" : getAmount(),
            "remember" : info.remember
        }
        processPayment(userId,token,paymentData)
        .then((response) =>{
            if(!response.ok){
                console.log("Payment failed!!")
                alert("payment failed")
            }
            else{
                console.log("Payment Success!")
                setInfo({...info,
                    success : true,
                    loading : false
                })
                let product_names = ""
                products.forEach(function(item){
                    product_names += item.name + ", "
                });
                const orderData = {
                    products : product_names,
                    transaction_id : "",
                    amount : getAmount()
                }

                console.log("DATAAAAAAAAA")
                console.log(orderData)

                createOrder(userId,token,orderData)
                .then(response => {
                    console.log(response)
                })
                .catch(e => {
                    console.log(e)
                })
                cartEmpty(() => {
                    console.log("Cart is emptyed out!")
                })
                setReload(!reload)
                alert("payment success")
            }
        })
        .catch()
    }

    const PymentForm = () => {
        return (
          <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
              <form>
                <div className="form-group">
                  <label className="text-light">Card Number</label>
                  <input
                    className="form-control"
                    info ={number}
                    onChange={handleChange("number")}
                    value = {number}
                    type="text"
                  />
                </div>
                <div className="form-group">
                  <label className="text-light">Expiration(MM/YY)</label>
                  <input
                    className="form-control"
                    info={expiry}
                    onChange={handleChange("expiry")}
                    value = {expiry}
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
                <div className="form-group">
                  <label className="text-light">Holder's name</label>
                  <input
                    className="form-control"
                    info = {name}
                    value = {name}
                    onChange={handleChange("name")}
                    type="text"
                  />
                </div>
                <div className="form-check">
                    <input className="form-check-input" 
                    type="checkbox"
                    info = {remember}
                    onChange = {changeCheckbox("remember")} 
                    value="" 
                    id="defaultCheck1" />
                    <label className="form-check-label"> Remeber this card</label>
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
           <h3>Your bill is {getAmount()}</h3>
           {PymentForm()}
            <p className="text-white text-center">
                {JSON.stringify(info)}
            </p>
       </div>
   )
}

export default Payment;
