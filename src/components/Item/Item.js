import React from 'react'
import { Button, Card } from 'react-bootstrap'

import './Item.css'

const Item = () => {
    return (
        <Card style={{ maxWidth: '20rem' }} className='mb-3 item-card'>
            <div>
                <img src="https://img.poki.com/cdn-cgi/image/quality=78,width=600,height=600,fit=cover,f=auto/94945631828bfdcf32a8ad0b79978913.png" alt="" className='item-img' />
            </div>
            <Card.Body>
                <Card.Title>Item Name</Card.Title>
                <Card.Text>
                    Some quick example text
                </Card.Text>
                <Button variant="info">Go to collection</Button>
            </Card.Body>
        </Card>
    )
}

export default Item