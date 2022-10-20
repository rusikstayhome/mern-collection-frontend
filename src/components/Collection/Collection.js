import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import './Collection.css'

function Collection({
    isLoading = true,
    id,
    title,
    description,
    topic,
    updatedAt,
    imageUrl
}) {
    const navigate = useNavigate()
    const navigateToCollection = () => {
        navigate(`/collections/${id}`);
    }

    return (
        <Card className="text-center mb-3 collection-card" style={{ maxWidth: '40rem' }} >
            <Card.Header>{isLoading ? <Skeleton /> : title}</Card.Header>
            <div>
                {imageUrl &&
                    <img src={imageUrl} alt="" className='collection-img' />
                }
            </div>
            <Card.Body>
                <Card.Title>{isLoading ? <Skeleton /> : topic}</Card.Title>
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