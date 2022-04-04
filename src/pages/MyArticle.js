import React from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import ArticlePreview from '../components/ArticlePreview';
import { useGetAllUserPostsQuery } from '../services/appApi';

function MyArticle() {
  const { data: myArticles, isLoading, isError } = useGetAllUserPostsQuery();

  if (isError) {
    return (
    <div>
      <h1 className="text-center">An error has occurred!</h1>
    </div>
    )
  }
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <Spinner animation="border" />
      </div>
    )
  }

  if (myArticles.length === 0) {
    return (
      <div className="py-4">
        <h1 className="text-center">You don't have any articles</h1>
        <h4 className="text-center">Kindly create your new articles by clicking create post</h4>
      </div>
    )
  }

  return (
    <Container>
      <h1 className="text-center">My Articles</h1>
      <Row>
        <Col md={9} className="d-flex justify-content-center flex-wrap gap-4">
          {myArticles.map((article, index) => (
          <ArticlePreview key={index} article={article} currentUserPost={true}/>
          ))}
        </Col>
      </Row>
    </Container>
  )
}

export default MyArticle