import { useState, useContext, useEffect } from "react";
import { DataContext } from "../contexts/DataContext";
import styled from "styled-components";
import Item from "./Item";
import ReactPaginate from "react-paginate";

const SimilarItems = ({ category, displayedItem }) => {
  const { items } = useContext(DataContext);
  const [itemsInCategory, setItemsInCategory] = useState();

  useEffect(() => {
    setItemsInCategory(() => {
      return (
        items &&
        items.filter((item) => {
          return (
            item.category === category && item._id !== displayedItem._id && item
          );
        })
      );
    });
  }, [items, category, displayedItem._id]);

  // item offset is used by react-paginate to determine starting item id.
  const [itemOffset, setItemOffset] = useState(0);

  // Set 51 items per page
  const itemsPerPage = 3;
  // End offset will determine which item to end page display at.
  const endOffset = itemOffset + itemsPerPage;

  const currentItems = itemsInCategory?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(itemsInCategory?.length / itemsPerPage);

  //Function to change pages
  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % itemsInCategory.length;
    setItemOffset(newOffset);
  };

  return (
    <Wrapper>
      {currentItems && currentItems.length !== 0 ? (
        <>
          <Title>Related Products in {category}</Title>
          <Grid>
            {currentItems.map((currentItem) => {
              return <Item key={currentItem._id} item={currentItem} />;
            })}
          </Grid>
          <Pagination
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
          />
        </>
      ) : <Title>No Related Products in {category}</Title>
      }
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  border-top: 1px solid var(--color-medium-grey);
  padding: 10px;
  min-width: 700px;
`;
const Title = styled.div`
  color: var(--color-dark-grey);
  font-weight: 400;
  text-align: left;
  font-size: 1.2rem;
  margin: 5px;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(100px, 1fr));
  gap: 2vw;
  margin: 15px 0px;
`;
const Pagination = styled(ReactPaginate)`
  align-self: center;
  margin: 20px 0;
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
export default SimilarItems;
