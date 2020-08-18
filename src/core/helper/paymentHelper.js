import {API} from "../../backend"

export const getCard = (userId,token) => {
    return fetch(`${API}cards/${userId}/${token}/`, {
        method: "POST",
      })
      .then((response) =>{
        return response.json()
      })
      .catch(err => console.log(err))
}

export const processPayment = (userId,token,paymentInfo) => {

  const formData = new FormData();

  for (const name in paymentInfo) {
    console.log(paymentInfo[name]);
    formData.append(name, paymentInfo[name]);
  }

  return fetch(`${API}cards/pay/${userId}/${token}/`, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      console.log("SUCCESS", response);
      return response;
    })
    .catch((err) => console.log(err));
};