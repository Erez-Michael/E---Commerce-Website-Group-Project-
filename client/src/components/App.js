import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
import Home from "./Home";
import Cart from "./Cart";
import ItemPage from "./ItemPage";
import Confirmation from "./Confirmation";
import SignIn from "./SignIn";
import OrderHistory from "./OrderHistory";

function App() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header setEmail={setEmail} setPassword={setPassword}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn email={email} setEmail={setEmail} password={password} setPassword={setPassword}/>}/>
        <Route path="/orders/:id" element={<OrderHistory />} />
        <Route path="/confirmation/:id" element={<Confirmation />} />
        <Route path="/item/:id" element={<ItemPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="" element={<h1>404: Oops!</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
