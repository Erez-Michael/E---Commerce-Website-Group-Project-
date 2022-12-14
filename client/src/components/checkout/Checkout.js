import { Dialog } from "@material-ui/core";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
import { CartContext } from "../contexts/CartContext";
import { SignInContext } from "../contexts/SignInContext";
import styled from "styled-components";

const Checkout = ({ open, setOpen,cartData }) => {
  const { signedIn } = useContext(SignInContext);
  const [formData, setFormData] = useState({cart: cartData, userId: signedIn._id});
  const { actions: {deleteCart} } = useContext(CartContext);
  
  const navigate = useNavigate();

  const formSubmit = (e) => {
    e.preventDefault();

    fetch("/order", {
        method: "POST",
        headers: {
            "Accept" : "application/json",
            "Content-Type" : "application/json",
        },
        body: JSON.stringify({order : formData})
    })
    .then(res => res.json())
    .then((data) => {
        if(data.status === 400){
            throw new Error(data.message);
        } else {
            deleteCart();
            navigate(`/confirmation/${data.data.insertedId}`);
        }
    })
    .catch(error => window.alert(error));
  }

  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg">
    <Wrapper>
      <CheckoutForm setFormData={setFormData} formSubmit={formSubmit} formData={formData}/>
    </Wrapper>
    </Dialog>
  );
};

const Wrapper = styled.div`
  display: flex;
  font-family: var(--font);
`;

export default Checkout;
