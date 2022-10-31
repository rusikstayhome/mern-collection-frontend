import React from 'react'
import { useLocation } from 'react-router-dom';
import Item from '../../components/Item/Item';
import { Container, Row, Col } from 'react-bootstrap';

const SearchResult = () => {
  const { state } = useLocation();

  console.log(state)
  return (
    <Container>
      {state.length
        ? <Row>

          {state.map((obj, index) =>
            <Col className='col-12 col-sm-4'
              key={index}
            >
              <Item
                isLoading={false}
                id={obj._id}
                name={obj.name}
                likes={obj.likes}
                collectionId={obj.parentCollection?._id}
                tags={obj.tags}
                userId={obj.user._id}
                imageUrl={obj.imageUrl}
              />
            </Col>
          )}

        </Row>
        : 'Items not found'
      }
    </Container>
  )
}

export default SearchResult