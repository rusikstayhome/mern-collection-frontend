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
    updatedAt
}) {
    return (
        <Card className="text-center mb-3 collection-card" style={{ maxWidth: '40rem' }} >
            <Card.Header>{isLoading ? <Skeleton /> : title}</Card.Header>
            <div>
                <img src="https://img.poki.com/cdn-cgi/image/quality=78,width=600,height=600,fit=cover,f=auto/94945631828bfdcf32a8ad0b79978913.png" alt="" className='collection-img' />
            </div>
            <Card.Body>
                <Card.Title>{isLoading ? <Skeleton /> : topic}</Card.Title>
                <Card.Text>
                    {isLoading ? <Skeleton count={4} /> : description}
                </Card.Text>
                <Button variant="info">Go to collection</Button>
            </Card.Body>
            <Card.Footer className="text-muted">{isLoading ? <Skeleton /> : updatedAt}</Card.Footer>
        </Card>
    );
}

export default Collection;