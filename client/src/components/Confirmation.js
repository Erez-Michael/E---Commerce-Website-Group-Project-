import { useEffect, useState, useContext } from "react";
import { DataContext } from "./contexts/DataContext";
import { useParams } from "react-router-dom";

import Item from "./assets/Item";

import styled from "styled-components";
import { SpinnerDiamond } from 'spinners-react';

const Confirmation = () =>{
    // ID is item id received from checkout
    const id = useParams().id;
    const { items } = useContext(DataContext);

    const[order, setOrder] = useState();

    useEffect(() => {
        fetch(`/order/${id}`)
        .then(res => res.json())
        .then(data => setOrder(data.data))
        .catch((err) => console.log(err));
    },[id])

    if (!order) {
        return (
          <Spinner>
            <SpinnerDiamond size={90} thickness={97} speed={102} color="rgba(172, 139, 57, 1)" secondaryColor="rgba(57, 131, 172, 1)" />
          </Spinner>
        );
      } else {
    return (
    <Wrapper>
      <Header>
    <Title>Order placed successfully</Title>
    <SubTitle>The following items are on their way to you:</SubTitle>
    </Header>
        <ConfirmationWrapper id="items">
            {order && items && order.cart.map((product) => {
                const arr = items.filter(item => item._id === product.product && item);

                return arr.map(i => <ItemWrapper><Item key={i._id} item={i} /></ItemWrapper>);
            })}
        </ConfirmationWrapper>
    </Wrapper>
    )
}
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-family: var(--font);
    padding: 25px 50px;
    margin-top: 5vh;
`

const Header = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin-bottom: 5vh;
`
const ConfirmationWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
`
const ItemWrapper=styled.div`
min-width: 200px;
max-width: 300px;
`

const Title = styled.div`
  color: var(--color-dark-grey);
  font-weight: 400;
  text-align: left;
  margin-bottom: 15px;
  font-size: 1.5rem;

`;
const SubTitle = styled.div`
  color: var(--color-dark-grey);
  font-weight: 400;
  text-align: left;
  margin-bottom: 15px;
  font-size: 1.2rem;
`;
const Spinner = styled.span`
  font-size: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 150px);
`;
export default Confirmation;