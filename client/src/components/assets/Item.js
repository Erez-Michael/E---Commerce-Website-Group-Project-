import styled from "styled-components";
import { Link } from "react-router-dom";

const Item = ({ item }) => {
  return (
    <ItemContainer id="itemContainer" to={`/item/${item._id}`}>
      <Image src={item.imageSrc} alt="Product" />
      <TextWrapper>
        {item.numInStock >= 1 ? (
          <Price>{item.price}</Price>
        ) : (
          <OutOfStock>Out of Stock</OutOfStock>
        )}
        <Name>{item.name}</Name>
      </TextWrapper>
    </ItemContainer>
  );
};

const ItemContainer = styled(Link)`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 8px 0px var(--color-grey);
  border-radius: 10px;
  padding: 20px;
  min-width: 200px;
  height: 300px;
  font-family: var(--font);
`;

const Image = styled.img`
    border-radius: 10px;
    margin: auto;
    -webkit-align-items: end;
    -webkit-box-align: end;
    -ms-flex-align: end;
    align-items: end;
    max-height: 60%;
`;

const OutOfStock = styled.p`
  color: red;
  font-style: italic;
  margin-bottom: 20px;
`;
const Price = styled.div`
  font-size: 1rem;
  color: var(--color-dark-grey);
  font-style: italic;
  margin-bottom: 20px;
`;

const Name = styled.div`
  color: var(--color-dark-grey);
  text-align: center;
  color: var(--color-dark-grey);
  height: 2.5rem;
  -webkit-line-clamp: 2;
  line-height: 1.25rem;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  display: block;
  display: -webkit-box;
  font-size: 1rem;
`;

const TextWrapper = styled.div`
  text-align: center;
  margin-top: 20px;
`;

export default Item;
