import React from 'react'
import { useGetOnePostQuery } from '../services/appApi';
import {useParams} from 'react-router-dom';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import '../pages/SingleArticlePage.css';

function SingleArticlePage() {
  const {id} = useParams();
  const {isLoading, data: article, isError} = useGetOnePostQuery(id);

  if (isError) {
    return (<div>
      <h1 className="text-center">An error has occurred!</h1>
    </div>
    );
  }
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <Spinner animation="border" />
      </div>
    )
  }
  
  return (
    <Container className="singlepage">
      <Row>
        <Col  md={8} style={{margin : "0 auto"}}>
          <img className="imageupload" src={article.image} style={{width : "100%", height : "400px", objectFit: 'cover',boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",borderRadius: "10px"}} />
          <h1 className="text-center">{article.title}</h1>
          <p>By {article.creator.name}</p>
          <p>Category: {article.category}</p>
          <div dangerouslySetInnerHTML={{__html: article.content}} />
        </Col>
      </Row>
    </Container>
  )
}

export default SingleArticlePage