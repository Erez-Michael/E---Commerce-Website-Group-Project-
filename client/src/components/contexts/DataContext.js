import { createContext, useState, useEffect } from "react";

export const DataContext = createContext();

// CONTEXT to provide all product metadata (item  & company information)
export const DataProvider = ({ children }) => {
  const [items, setItems] = useState(null);
  const [companies, setCompanies] = useState(null);

  useEffect(() => {
    // Gets all items from database ///////////////////////////////////
    fetch("/items")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 400 || data.status === 500) {
          throw new Error(data.message);
        } else {
          setItems(data.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });

    // Gets all companies from database ///////////////////////////////////
    fetch("/companies")
      .then((res) => res.json())
      .then((data) => {
        if (data.status >= 400) {
          throw new Error(data.message);
        } else {
          setCompanies(data.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

    return (
        <DataContext.Provider value={{items, companies}}>
            {children}
        </DataContext.Provider>
    )
}