import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';
import '../components/MainArticle.css';

function MainArticle({ article }) {
    const { title, image, content, _id } = article;
    return (
        <>
        <Row className="pb-4">
            <Col md={12} className="main-article_image-container">
                <img src={image} style={{width:"100%",
                 maxHeight: 500, objectFit:'cover', 
                 borderRadius:"10px",
                 boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                 }} />
            </Col>
        </Row>
        <Row>
            <Col md={12} className="text-center">
                <h2>{title}</h2> 
                <div dangerouslySetInnerHTML={{ __html: content?.substring(0, 200) }} />
                <LinkContainer to={`/articles/${_id}`}>
                    <Button variant="info">Read More</Button>
                </LinkContainer>
            </Col>
        </Row>
        </>
    )
}

export default MainArticle