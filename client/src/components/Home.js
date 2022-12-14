import { useContext, useEffect, useState } from "react";
import { DataContext } from "./contexts/DataContext";

import Item from "./assets/Item";
import Filter from "./assets/Filter";

import styled from "styled-components";
import ReactPaginate from "react-paginate";
import { 	SpinnerDiamond } from 'spinners-react';

const Home = () => {
  const { items, companies } = useContext(DataContext);

  // Set array to contain items which have been filtered
  const [filteredItems, setFilteredItems] = useState("");

  // Initial render contains all items
  useEffect(() => {
    setFilteredItems(items);
  }, [items]);

  // item offset is used by react-paginate to determine starting item id.
  const [itemOffset, setItemOffset] = useState(0);

  // Set 51 items per page
  const itemsPerPage = 51;
  // End offset will determine which item to end page display at.
  const endOffset = itemOffset + itemsPerPage;

  const currentItems = filteredItems?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredItems?.length / itemsPerPage);

  //Function to change pages
  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % filteredItems.length;
    setItemOffset(newOffset);
  };

  if (!filteredItems) {
    return (
      <Spinner>
        <SpinnerDiamond size={90} thickness={97} speed={102} color="rgba(172, 139, 57, 1)" secondaryColor="rgba(57, 131, 172, 1)" />
      </Spinner>
    );
  } else {
    return (
      <Wrapper>
        <Filter
          items={items}
          companies={companies}
          setFilteredItems={setFilteredItems}
        />
        <HomeContainer>
          <Grid>
            {currentItems.map((item) => {
              return <Item key={item._id} item={item} />;
            })}
          </Grid>
          <Pagination
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
          />
        </HomeContainer>
      </Wrapper>
    );
  }
};

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 40px;
`;

const HomeContainer = styled.div`
  display: flex;
  width: 100%;
  min-width: 800px;
  margin: 0 3%;
  flex-direction: column;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(100px, 1fr));
  gap: 2vw;
  margin-bottom: 20px;
  margin-top: 10px;
`;

const Pagination = styled(ReactPaginate)`
  li {
    display: inline-block;
    border: 1px solid rgb(224, 224, 224);
    color: #000;
    cursor: pointer;
    margin: 5px 3px;
    border-radius: 5px;
  }

  li > a {
    padding: 5px;
    outline: none;
  }

  li:active {
    background: var(--color-turquoise);
    outline: none;
  }
`;

const Spinner = styled.span`
  font-size: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 150px);
`;
export default Home;
