import React from 'react'
import { Card, Button, ButtonGroup } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';
import stumps from '../images/stumps.jpg'
import { useDeletePostMutation } from '../services/appApi';
import './ArticlePreview.css';

function ArticlePreview({ article, currentUserPost }) {
    const { title, content, image, _id } = article;
    const [deleteArticle, { isLoading }] = useDeletePostMutation();

    function handleDelete() {
        deleteArticle(_id);
    }

    return (
        <Card style={{ width: '25rem',boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }} className='box mt-5'>
            <Card.Img variant="top" src={image || stumps} style={{ maxHeight: 200, objectFit: "cover" }} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    <div dangerouslySetInnerHTML={{ __html: content?.substring(0, 50) + "..." }} />
                </Card.Text>
                <ButtonGroup >  
                    {/* //style={{ marginLeft: "25%"}} */}
                    <LinkContainer to={`/articles/${_id}`}>
                        <Button variant="info" className="button">View</Button>
                    </LinkContainer>
                    </ButtonGroup>
                    {currentUserPost && (
                        <>
                        <ButtonGroup>
                            <LinkContainer to={`/articles/${_id}/edit`}>
                                <Button variant="outline-primary" className="button" >
                                    Edit
                                </Button>
                            </LinkContainer>
                            </ButtonGroup>
                            <ButtonGroup>
                            <Button variant="outline-danger" className="button" onClick={handleDelete}>
                                {isLoading ? "Deleting..." : "Delete"}
                            </Button>
                            </ButtonGroup>
                        </>
                    )}
                
            </Card.Body>
        </Card>

    )
}

export default ArticlePreview