import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { SignInContext } from "./contexts/SignInContext";
import { DataContext } from "./contexts/DataContext";
import { SpinnerDiamond } from "spinners-react";

const OrderHistory = () => {
  const { items } = useContext(DataContext);
  const { signedIn } = useContext(SignInContext);
  const [userOrders, setUserOrders] = useState("");
  const [orders, setOrders] = useState("");

  useEffect(() => {
    signedIn &&
      fetch(`/userOrder/${signedIn._id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 400 || data.status === 500) {
            throw new Error(data.message);
          } else {
            setUserOrders(data.data);
          }
        })
        .catch((error) => {
          throw error;
        });
  }, []);

  useEffect(() => {
    userOrders && items &&
    userOrders.forEach((order) => {
      const tempArr = order.cart.map((product) => {
        return items.filter((item) => {
          return item._id === product.product &&  {...item};
        }).map((filtered) => { return {...filtered, product: product.product, quantity: product.quantity}});
      });

      console.log(tempArr);

      setOrders(orders => [...orders, ...tempArr]);
    })
  }, [userOrders, items])

  if (!signedIn || !userOrders || !items) {
    return (
      <Spinner>
        <SpinnerDiamond
          size={90}
          thickness={97}
          speed={102}
          color="rgba(172, 139, 57, 1)"
          secondaryColor="rgba(57, 131, 172, 1)"
        />
      </Spinner>
    );
  } else {
    return (
      <Body>
        <Title>Hello {signedIn.firstName}</Title>
        <Details>
          <Line>
            <Label>Name</Label>
            <span>
              {signedIn.firstName} {signedIn.lastName}
            </span>
          </Line>
          <Line>
            <Label>Email</Label>
            <span>{signedIn.email}</span>
          </Line>
          <Line>
            <Label>Phone Number</Label>
            <span>{signedIn.phone}</span>
          </Line>
          <Line>
            <Label>Shipping Address</Label>
            <span>
              {" "}
              {signedIn.apt}, {signedIn.address}, {signedIn.city},{" "}
              {signedIn.postalcode}, {signedIn.province}
            </span>
          </Line>
        </Details>
        <Title>Your previous orders</Title>
        <OrderDetails>
          {orders &&
            orders.map((order) => {
              return (
                <ItemWrapper key={order[0].product}>
                  <Name>{order[0].name}</Name>
                  <ImageQuantity>
                    <img src={order[0].imageSrc} alt={order[0].name} />
                    <Quantity>{order[0].quantity}</Quantity>
                  </ImageQuantity>
                </ItemWrapper>
              );
            })}
        </OrderDetails>
      </Body>
    );
  }
};

const Body = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  font-family: var(--font);
  background-color: white;
  margin: 0 3%;
`;
const Details = styled.div`
  box-shadow: 0 0 20px 5px var(--color-grey);
  border-radius: 10px;
  padding: 20px;
  margin: calc(5% - 20px) auto 5% auto;
  max-width: 50%;
  min-width: 500px;
`;
const Title = styled.div`
  color: var(--color-dark-grey);
  font-weight: 600;
  text-align: left;
  padding-bottom: 15px;
  font-size: 1.2rem;
`;
const Line = styled.div`
  display: flex;
  text-align: left;
  align-items: baseline;
`;
const Label = styled.span`
  font-weight: bold;
  width: 100px;
  padding: 5px 0;
  align-items: baseline;
`;
const OrderDetails = styled.div`
  box-shadow: 0 0 20px 5px var(--color-grey);
  border-radius: 10px;
  padding: 20px;
  margin: calc(5% - 20px) auto 5% auto;
  display: flex;
  flex-wrap: wrap;
`;
const ItemWrapper = styled.span`
  border-radius: 5%;
  background-color: var(--color-light-grey);
  width: 300px;
  padding: 20px 60px;
  margin: 10px;
`;
const Name = styled.span`
  font-weight: bold;
  padding: 5px 0;
  align-items: baseline;
  text-align: center;
  margin-bottom: 10px;
`;
const Quantity = styled.span`
  position: absolute;
  right: -12px;
  background-color: var(--color-turquoise);
  color: var(--color-grey);
  padding: 3px 7px;
  border-radius: 100px;
`;
const ImageQuantity = styled.div`
  position: relative;
`;

const Spinner = styled.span`
  font-size: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 150px);
`;
export default OrderHistory;
