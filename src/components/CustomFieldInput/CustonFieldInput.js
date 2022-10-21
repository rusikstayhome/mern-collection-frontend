import React from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'

const CustonFieldInput = () => {
    return (
        <Row className="mb-2">
            <Col>
                <Form.Control
                    placeholder="Property"
                />
            </Col>
            <Col>
                <Form.Control
                    placeholder="Value"

                />
            </Col>
            <Col>
                <Button type="submit">Add</Button>
            </Col>
        </Row>
    )
}

export default CustonFieldInput