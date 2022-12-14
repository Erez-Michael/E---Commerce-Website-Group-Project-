import { createContext, useReducer, useState, useEffect } from "react";
//Import Cookies library
import Cookies from "js-cookie";

export const CartContext = createContext();

// Reducer function ///////////////////////////////////////
const initialState = {
  product: null,
  quantity: null,
  cartId: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case "add-item-to-cart": {
      return {
        product: action.product,
        quantity: action.quantity,
        cartId: action.cartId,
        userId: action.userId
      };
    }
    default:
      throw new Error(`Unrecognized action: ${action.type}`);
  }
};

export const CartProvider = ({ children }) => {
  const [toggle, setToggle] = useState(false);

  const [state, dispatch] = useReducer(reducer, initialState);
  // Get saved cookies if already exists in browser
  const [cart, setCart] = useState(Cookies.get("cartId"));

  // Function to create new cart
  const createNewCart = () => {
    return fetch("/cart", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    })
      .then((res) => res.json())
      .then((data) => {
        // Set cookies for new cart if does not already exist
        Cookies.set("cartId", `${data.data.insertedId}`, { expires: 7 });
        setCart(Cookies.get("cartId"));

        return data.data.insertedId;
      })
      .catch((error) => {
        console.log(error);
        return;
      });
  };

  // Function to add item to cart
  const addItemToCart = (data) => {
    dispatch({
      type: "add-item-to-cart",
      ...data,
    });
  };

  // Function to remove Cart from database
  const deleteCart = () => {
    fetch(`/cart/${cart}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        Cookies.remove("cartId");
        setCart(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // PATCH Cart content in server
  useEffect(() => {
    state.cartId &&
      fetch(`/cart/${state.cartId}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          quantity: state.quantity,
          product: state.product,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setToggle(!toggle);
        })
        .catch((error) => {
          window.alert(error);
        });
  }, [state]);

  // PATCH  DELETE Cart item in server

  const deleteItem = (id) => {
    console.log(id);
    cart &&
      fetch(`/remove-product-cart/${cart}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          product: id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setToggle(!toggle);
        })
        .catch((error) => {
          console.log(error);
        });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        toggle,
        actions: {
          addItemToCart,
          createNewCart,
          deleteItem,
          deleteCart,
        },
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
