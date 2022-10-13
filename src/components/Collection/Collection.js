import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './Collection.css'

function Collection() {
    return (
        <Card className="text-center mb-3 collection-card" style={{ maxWidth: '40rem' }} >
            <Card.Header>Collection Title</Card.Header>
            <div>
                <img src="https://img.poki.com/cdn-cgi/image/quality=78,width=600,height=600,fit=cover,f=auto/94945631828bfdcf32a8ad0b79978913.png" alt="" className='collection-img' />
            </div>
            <Card.Body>
                <Card.Title>Cars</Card.Title>
                <Card.Text>
                    With supporting text below as a natural lead-in to additional content.
                </Card.Text>
                <Button variant="info">Go to collection</Button>
            </Card.Body>
            <Card.Footer className="text-muted">2 days ago</Card.Footer>
        </Card>
    );
}

export default Collection;