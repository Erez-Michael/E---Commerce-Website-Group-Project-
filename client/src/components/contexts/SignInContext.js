import { createContext, useState } from "react";

export const SignInContext = createContext();

export const SignInProvider = ({ children }) => {
  const [signedIn, setSignedIn] = useState(false, "signed-in");

  const signInVerification = (email, password) => {
   
    return fetch("/sign-in", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((usersData) => {
        console.log(usersData);
        if (usersData.status === 200) {
          setSignedIn(usersData.data, "signed-in");
          
          return true;
        } else if (usersData.status === 400) {
          console.log("Unknown user");
          return false;
        }
      });
  };

  return (
    <SignInContext.Provider value={{ signInVerification, signedIn, setSignedIn }}>
      {children}
    </SignInContext.Provider>
  );
};
