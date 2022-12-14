import { useEffect, useState } from "react";
import styled from "styled-components";
import * as ThemifyIcons from "react-icons/tfi";

import Checkout from "./checkout/Checkout";

const CartSummary = ({setTotalData, totalData, cartData, items }) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (cartData && items) {
          cartData.forEach((data) => {
            items.forEach((item) => {
              const roundNum = Number(item.price.replace(/[^0-9.-]+/g, ""));
              if (data.product === item._id) {
                setTotalData((totalData) => totalData + roundNum * data.quantity);
              }
            });
          });
        }
      }, [cartData]);

    return (
      <Summary id="summary">
      <SummaryDetails>
        <Title>SUMMARY</Title>
        <Input>
          <InputText placeholder="PROMO code!"></InputText>
          <button>APPLY</button>
        </Input>
        <CartDiv>
          <CalculatedTotal>
            <div>Subtotal</div>
            <div>${totalData.toFixed(2)}</div>
          </CalculatedTotal>
          <CalculatedTotal id="shipping">
            <div>
              <>Shipping <Ground>(ground) </Ground></>
              <ThemifyIcons.TfiInfoAlt size={12} />
            </div>
            <div>
              ${(totalData * (1 + 0.05) - totalData).toFixed(2)}
            </div>
          </CalculatedTotal>
          <CalculatedTotal>
            <div>
              <>Sales Tax <ThemifyIcons.TfiInfoAlt size={12} /></>
            </div>
            <div>
              ${(totalData * (1 + 0.15025) - totalData).toFixed(2)}
            </div>
          </CalculatedTotal>
        </CartDiv>
          <Estimate>
            <div>Estimated Total</div>
            <div>${(totalData * (1 + 0.20025)).toFixed(2)}</div>
          </Estimate>
        <ButtonTwo
          onClick={() => {
            setOpen(true);
          }}
        >
          CHECKOUT
        </ButtonTwo>
        {cartData && (
          <Checkout
            cartData={cartData}
            open={open}
            setOpen={setOpen}
            items={items}
          />
        )}
      </SummaryDetails>
    </Summary>
    )
};

/// HEADER ///////////////////////////

const Title = styled.div`
  padding-bottom: 5px;
  font-size: 1.3rem;
  font-weight: bold;
`;


// SUMMARY /////////////////////////////////

const Summary = styled.div`
  padding: 3%;
  font-size: 1rem;
  background-color: hsl(0, 0%, 93%);
  font-family: var(--font);
  width: 30vw;
  min-width:200px;
`;

const SummaryDetails = styled.div`

  > div {
    border-bottom: black solid 2px;
  }
  p {
    padding-top: 20px;
    margin-bottom: 20px;
    padding: 20px 0px 5px 0px;
    font-size: 1rem;
    font-weight: bold;
    color: black;
  }
`;
const InputText=styled.input`
width:100%;
`
const Input = styled.form`
  display: flex;
  flex-direction: row;
  border-bottom: black solid 2px;
  padding: 7px 0px;


  button {
    font-size: 0.8rem;
    color: whitesmoke;
    background-color: black;
    font-weight: bold;
    padding: 2px 20px;
    cursor: pointer;
  }
`;

const CartDiv = styled.div`
  padding: 20px 0;
`;

const CalculatedTotal = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
`;

const Ground=styled.span`
font-size: 0.7rem;
`

const Estimate = styled.div`
  padding: 10px 0px;
  display: flex;
  justify-content: space-between;
`;

const ButtonTwo = styled.button`
  font-size: 15px;
  color: whitesmoke;
  background-color: black;
  font-weight: bold;
  padding: 8px 20px;
  height: 35px;
  margin-top: 40px;
  cursor: pointer;
`;
export default CartSummary;