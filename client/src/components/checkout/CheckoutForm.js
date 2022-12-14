import styled from "styled-components";
import Countries from "./Countries";

const CheckoutForm = ({ formData, setFormData, formSubmit }) => {
  const handleChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

    return (
        <PaymentForm onSubmit={(e) => formSubmit(e)}>
        <Title>Contact Information</Title>
        <Line>
          <Input type="text" placeholder="First name" id="fname" onChange={(e) => handleChange(e.target.id, e.target.value)}/>
          <Input type="text" placeholder="Last name" id="lname" onChange={(e) => handleChange(e.target.id, e.target.value)}/>
          <Input type="text" placeholder="Phone" id="phone" onChange={(e) => handleChange(e.target.id, e.target.value)}/>
        </Line>
        <Title>Shipping Details</Title>
        <Input type="text" placeholder="Address" id="address" onChange={(e) => handleChange(e.target.id, e.target.value)}/>
        <Input type="text" placeholder="Apartment, suite, etc. (optional)" id="apt" onChange={(e) => handleChange(e.target.id, e.target.value)}/>
        <Line>
          <Input type="text" placeholder="City" id="city" onChange={(e) => handleChange(e.target.id, e.target.value)}/>
          <Input type="text" placeholder="Province" id="province" onChange={(e) => handleChange(e.target.id, e.target.value)}/>
          <Input type="text" placeholder="Postal Code" id="postalcode" onChange={(e) => handleChange(e.target.id, e.target.value)}/>
        </Line>
        <Countries />
        <Title>Payment Info</Title>
        <Line>
          <Input type="text" placeholder="Credit Card" id="creditCard" onChange={(e) => handleChange(e.target.id, e.target.value)}/>
          <Input type="text" placeholder="Expiration" id="exp" onChange={(e) => handleChange(e.target.id, e.target.value)}/>
          <Input type="text" placeholder="SVC" id="svc" onChange={(e) => handleChange(e.target.id, e.target.value)}/>
        </Line>
        <Button>Check Out Order</Button>
      </PaymentForm>
    )
}

const PaymentForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0px 20px 20px 20px;
  border-right: 0.5px solid var(--color-grey);
  background-color: var(--color-light-grey);
`;
const Title = styled.p`
  font-size: 22px;
  padding: 10px 0px;
  color: var(--color-dark-grey);
`;
const Line = styled.div`
  display: flex;
`;
const Input = styled.input`
  padding: 10px;
  margin-right: 5px;
  margin-bottom: 5px;
  border-radius: 5px;
  border: 1px solid var(--color-medium-grey);
  color: var(--color-grey);
`;
const Button = styled.button`
  margin-top: 10px;
  font-size: 22px;
  color: var(--color-dark-grey);
  border: none;
  border-radius: 10px;
  background-color: var(--color-turquoise);

  &:hover {
    background-color: var(--color-dark-turquoise);
    color: var(--color-light-grey);
  }
`
export default CheckoutForm;