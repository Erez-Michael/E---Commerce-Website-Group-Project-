import { useEffect, useState } from "react";
import styled from "styled-components";

const Filter = ({ items, companies, setFilteredItems }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [selectedCompany, setSelectedCompany] = useState("");

  // Set filtered items based on category selected
  useEffect(() => {
    if (selectedCategory !== "") {
      const filtered = items?.filter(
        (item) => item.category === selectedCategory
      );
      setFilteredItems(filtered);
    }
  }, [selectedCategory]);

  useEffect(() => {
    // Do not set filtered items if price is set to 0
    if (selectedPrice === 0) {
      return;
    }

    // Set filtered items based on price range selected
    if (selectedPrice <= 25) {
      const filtered = items?.filter(
        (item) => Number(item.price.replace(/[^0-9.-]+/g, "")) <= 25
      );
      setFilteredItems(filtered);
    } else if (selectedPrice > 25 && selectedPrice <= 100) {
      const filtered = items?.filter(
        (item) =>
          Number(item.price.replace(/[^0-9.-]+/g, "")) > 25 &&
          Number(item.price.replace(/[^0-9.-]+/g, "")) <= 100
      );
      setFilteredItems(filtered);
    } else if (selectedPrice > 100) {
      const filtered = items?.filter(
        (item) => Number(item.price.replace(/[^0-9.-]+/g, "")) > 100
      );
      setFilteredItems(filtered);
    }
  }, [selectedPrice]);

  // Set filtered items based on company selected
  useEffect(() => {
    if (selectedCompany !== "") {
      const filtered = items?.filter(
        (item) => item.companyId === selectedCompany
      );
      setFilteredItems(filtered);
    }
  }, [selectedCompany]);

  // Finding all item categories
  const itemCategory = items.map((item) => {
    return item.category;
  });

  // Created new set - filtering out duplicates
  const newItemCategorySet = new Set(itemCategory);
  const newItemCategoryArray = [...newItemCategorySet];

  // Method to reset all filters selected
  const resetFilters = () => {
    setFilteredItems(items);
    setSelectedCategory("");
    setSelectedPrice(0);
  };

  return (
    <Wrapper>
      {!items ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <Title>Categories</Title>
          {/* map returning filtered selected category */}
          {newItemCategoryArray.map((item, index) => {
            return (
              <Button
                key={index}
                onClick={() => {
                  setSelectedPrice(0);
                  setSelectedCategory(item);
                  setSelectedCompany("");
                }}
              >
                {item}
              </Button>
            );
          })}

          <Title>Prices</Title>
          <Button
            onClick={() => {
              setSelectedCategory("");
              setSelectedPrice(1);
              setSelectedCompany("");
            }}
          >
            Under $25
          </Button>
          <Button
            onClick={() => {
              setSelectedCategory("");
              setSelectedPrice(26);
              setSelectedCompany("");
            }}
          >
            $25 - $100
          </Button>
          <Button
            onClick={() => {
              setSelectedCategory("");
              setSelectedPrice(101);
              setSelectedCompany("");
            }}
          >
            $100 and Up
          </Button>

          <Title>Companies</Title>
          <Select
            onChange={(e) => {
              setSelectedCategory("");
              setSelectedPrice(0);
              setSelectedCompany(Number(e.target.selectedOptions[0].accessKey));
            }}
          >
            {companies &&
              companies.map((company) => (
                <option key={company._id} accessKey={company._id}>
                  {company.name}
                </option>
              ))}
          </Select>

          <Reset onClick={() => resetFilters()}>Reset Filters</Reset>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  color: var(--color-dark-grey);
  padding: 0px 10px 10px calc(3vw - 15px);
  font-family: var(--font);
`;
const Button = styled.button`
  display: flex;
  align-items: start;
  border: none;
  background-color: white;
  color: var(--color-dark-grey);
  font-size: 1rem;
  padding: 5px 5px 5px 15px;
  cursor: pointer;

  &:hover {
    border-radius: 15px;
    background-color: var(--color-turquoise);
  }

  &.active {
    background-color: var(--color-turquoise);
  }
`;

const Title = styled.p`
  margin: 10px 15px;
  font-weight: bold;
`;

const Reset = styled.button`
  margin: 10px 0;
  display: flex;
  align-items: start;
  border: none;
  border-radius: 15px;
  background-color: var(--color-dark-turquoise);
  color: white;
  font-size: 1rem;
  padding: 5px 5px 5px 15px;
  cursor: pointer;

  &:hover {
    border-radius: 15px;
    background-color: var(--color-turquoise);
    color: var(--color-dark-grey);
  }
`;
const Select = styled.select`
cursor: pointer;
`
export default Filter;
