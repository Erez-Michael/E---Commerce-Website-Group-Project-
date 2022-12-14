import { useContext, useEffect, useState } from "react";
import { CartContext } from "./contexts/CartContext";
import { DataContext } from "./contexts/DataContext";

import CartSummary from "./CartSummary";

import styled from "styled-components";
import { SpinnerDiamond } from "spinners-react";

const Cart = () => {
  const { items } = useContext(DataContext);
  const {
    cart,
    toggle,
    actions: { deleteItem, addItemToCart },
  } = useContext(CartContext);
  const [cartData, setCartData] = useState();
  const [quantitySelected, setQuantitySelected] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [totalData, setTotalData] = useState(0);

  // Gets cart by Id ///////////////////////////////////
  useEffect(() => {
    cart && setIsLoading(true);
    fetch(`/cart/${cart}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 400 || data.status === 500) {
          throw new Error(data.message);
        } else {
          if (data.data.products.length > 0) {
            setCartData(data.data.products);
          } else {
            setCartData(null);
          }
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [cart, toggle]);



  // Function DELETES cart item from cart
  const handleItemDelete = (id) => {
    setTotalData(0);
    deleteItem(id);
  };

  // Function DELETES cart item from cart
  const handleQuantityUpdate = (product, quantity) => {
    addItemToCart({
      product: product,
      quantity: quantity,
      cartId: cart,
    });
    setTotalData(0);
  };

  return (
    <>
      {isLoading ? (
        <Spinner>
          <SpinnerDiamond
            size={90}
            thickness={97}
            speed={102}
            color="rgba(172, 139, 57, 1)"
            secondaryColor="rgba(57, 131, 172, 1)"
          />
        </Spinner>
      ) : (
        !isLoading && (
          <Modal>
            <Container id="container">
              <Title>MY CART</Title>
              <WrapperOne>
                <FlexBoxOne>
                  <div>PRODUCTS</div>
                  <div>TOTAL</div>
                </FlexBoxOne>
                <Flex>
                  {!cartData ? (
                    <p>Your cart is empty</p>
                  ) : (
                    items !== null &&
                    cartData.map((data) => {
                      const arr = items.filter((item) => {
                        return data.product === item._id && item;
                      });
                      return (
                        <Products key={data}>
                          <ImageData id="imageData">
                            <ImageQuantity>
                              <Image src={arr[0].imageSrc} alt={arr[0].name} />
                              <Quantity>{data.quantity}</Quantity>
                            </ImageQuantity>
                            <Line>
                              <Name> {arr[0].name}</Name>
                              <Label>Company: {arr[0].companyId}</Label>
                              <Label>Category: {arr[0].category}</Label>
                              <Label>Price: {arr[0].price}</Label>
                              <Label htmlFor="quantity">Quantity:</Label>
                              <Select
                                name="quantity"
                                id="quantity"
                                onChange={(e) =>
                                  setQuantitySelected(e.target.value)
                                }
                              >
                                {Array.apply(null, Array(arr[0].numInStock))
                                  .map(function (x, i) {
                                    return i;
                                  })
                                  .map(
                                    (i) =>
                                      i > 0 &&
                                      i <= 5 && <option key={i}>{i}</option>
                                  )}
                              </Select>
                              <EditButtons>
                                <Button
                                  onClick={() => {
                                    handleQuantityUpdate(
                                      arr[0]._id,
                                      quantitySelected
                                    );
                                  }}
                                >
                                  Update Quantity
                                </Button>
                                <DeleteButton
                                  type="submit"
                                  onClick={() => {
                                    handleItemDelete(arr[0]._id);
                                  }}
                                >
                                  Delete
                                </DeleteButton>
                              </EditButtons>
                            </Line>
                          </ImageData>
                          <ItemsTotal>
                            $
                            {(Number(
                              arr[0].price.match(/[\d,.]/g).join("")
                            ).toFixed(2) * data.quantity).toFixed(2)}
                          </ItemsTotal>
                        </Products>
                      );
                    })
                  )}
                </Flex>
              </WrapperOne>
            </Container>
            <CartSummary
              setTotalData={setTotalData}
              cartData={cartData}
              items={items}
              totalData={totalData}
            />
          </Modal>
        )
      )}
    </>
  );
};

const Modal = styled.div`
  animation-duration: 0.5s;
  animation-fill-mode: both;
  animation-name: slideInRight;
  display: flex;
  margin: 5%;

  @keyframes slideInRight {
    from {
      transform: translate3d(100%, 0, 0);
      visibility: visible;
    }
  }
`;

/// HEADER ///////////////////////////

const Container = styled.div`
  background-color: hsl(0, 0%, 98%);
  padding: 3% 3% 0 3%;
  font-family: var(--font);
  width: 70vw;
  min-width: 500px;
`;
const Title = styled.div`
  padding-bottom: 5px;
  font-size: 1.3rem;
  font-weight: bold;
`;

const WrapperOne = styled.div`
  display: flex;
  flex-direction: column;
`;

// LOOPED PRODUCT RESULTS //////////////////

const Flex = styled.div`
  display: flex;
  flex-direction: column;

  p {
    font-size: 40px;
    font-weight: bold;
    /* margin-left: 300px; */
    margin-top: 100px;
    background: -webkit-linear-gradient(
      var(--color-turquoise),
      var(--color-dark-turquoise)
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Products = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  padding-bottom: 20px;
  border-bottom: hsl(0, 0%, 90%) solid 2px;
  justify-content: space-between;
`;

const Image = styled.img`
  width: 150px;
  height: 150px;
  border: hsl(0, 0%, 90%) solid 2px;
  object-fit: contain;
`;

const Quantity = styled.span`
  position: absolute;
  right: -11px;
  background-color: var(--color-turquoise);
  color: var(--color-grey);
  padding: 3px 7px;
  border-radius: 100px;
`;
const ImageQuantity = styled.div`
  position: relative;
`;

const Name = styled.div`
  font-weight: bolder;
  margin-bottom: 5px;
`;

const Label = styled.div`
  margin-bottom: 5px;
  color: gray;
`;

const Line = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: 40px;
`;
const ImageData = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const Button = styled.button`
  width: fit-content;
  height: fit-content;
  font-size: 0.8rem;
  color: black;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  margin-top: 20px;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  width: fit-content;
  height: fit-content;
  font-size: 0.8rem;
  color: black;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  margin-left: 10px;
  margin-top: 20px;
  cursor: pointer;
`;
const EditButtons = styled.div`
  display: flex;
`;

const ItemsTotal = styled.div`
  font-weight: bold;
  margin-left: 20px;
`;

const Select = styled.select`
  width: fit-content;
`;
// PRICE & TOTAL //////////////////////////

const FlexBoxOne = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: hsl(0, 0%, 90%) solid 2px;
  border-bottom: hsl(0, 0%, 90%) solid 2px;
  font-weight: bold;
  font-size: 1rem;
  align-items: center;
  padding: 10px 0;
`;
const Spinner = styled.span`
  font-size: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 150px);
`;

export default Cart;
