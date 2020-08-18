import React, {useState, useEffect} from 'react'
import Base from "./core/Base"
import "../src/styles.css"
import Card from "./core/Card"


export default function Alert(
    success = undefined,
    error = undefined,
    setSuccess = (f) => f
){

    const successChecker = () =>{
        if (success === true){
            successMessage()
        }
        else{
            errorMessage()
        }
    }

    const successMessage = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div
                        className="alert alert-success"
                        style = {{display: success ? "" : "none"}}
                    >
                        Payment successful. 
                    </div>
                </div>
            </div>
        )
    }

    const errorMessage = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div
                        className="alert alert-danger"
                        style = {{display: error ? "" : "none"}}
                    >
                        Payment failed, Please try again!. 
                    </div>
                </div>
            </div>
        )
    }

    return (
        <Base title="Alert page" description="Welcome to Mobicity">
            {successChecker()}
        </Base>
    )
}