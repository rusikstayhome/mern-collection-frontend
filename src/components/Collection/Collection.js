import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { fetchRemoveCollection } from '../../redux/slices/collections'

import './Collection.css'

function Collection({
    isLoading = true,
    id,
    title,
    description,
    topic,
    updatedAt,
    imageUrl,
    userId
}) {
    const dispatch = useDispatch()
    const { auth } = useSelector(state => state);
    const isUserLoading = auth.status === 'loading'

    const navigate = useNavigate()
    const navigateToCollection = () => {
        navigate(`/collections/${id}`);
    }

    const onClickRemove = () => {
        if (window.confirm('Are you sure that you want to delete the collection?')) {
            dispatch(fetchRemoveCollection(id))
        }

    }

    return (
        <Card className="text-center mb-3 collection-card" style={{ maxWidth: '40rem' }} >
            <Card.Header>{isLoading ? <Skeleton /> : title}
                <div className='collection-icons'>
                    <i class="bi bi-trash-fill me-2 text-danger"
                        onClick={onClickRemove}
                    ></i>
                    <i class="bi bi-pen-fill text-warning"></i>
                </div>
            </Card.Header>
            <div>
                {imageUrl &&
                    <img src={imageUrl} alt="" className='collection-img' />
                }
            </div>
            <Card.Body>
                <Card.Title>{isLoading ? <Skeleton /> : topic}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Ruslan Orlov</Card.Subtitle>
                <Card.Text>
                    {isLoading ? <Skeleton count={4} /> : description}
                </Card.Text>
                <Button variant="info"
                    onClick={navigateToCollection}
                >Go to collection</Button>
            </Card.Body>
            <Card.Footer className="text-muted">{isLoading ? <Skeleton /> : updatedAt}</Card.Footer>
        </Card >
    );
}

export default Collection;