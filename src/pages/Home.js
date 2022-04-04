import React from 'react';
import { Container, Row, Col, Spinner, ListGroup } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import ArticlePreview from '../components/ArticlePreview';
import Footer from '../components/Footer';
import MainArticle from '../components/MainArticle';
import { useGetAllPostsQuery } from "../services/appApi";
import './Home.css';

function Home() {
  const { data: articles, isLoading, isError } = useGetAllPostsQuery();
  const sidebarArticles = articles?.slice(0, 4) || [];

  if (isError) {
    return (<div>
      <h1 className="text-center">An error has occurred!</h1>
    </div>
    );
  }
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center py-5 ">
        <Spinner animation="border" />
      </div>
    )
  }




  return (
    <Container>
      <div className="banner">
        <h1 className="banner_title text-center">Harry Blogs</h1>
      </div>
      <Row>
        <MainArticle article={articles[articles.length - 1]} />
        <Col md={9} className="blog-main d-flex pb-4 flex-wrap gap-4">
          {articles.map((article, index) => (
             <ArticlePreview article={article} key={index} />
            
          ))}
        </Col>
        <Col md={3} className="blog-sidebar py-4">
          <ListGroup variant="flush">
            <h2>Latest Articles</h2>

            {sidebarArticles.map((article, index) => (
              <LinkContainer to={`/articles/${article._id}`} key={index} >
              <ListGroup.Item>{article.title}</ListGroup.Item>
              </LinkContainer>
              
            ))}
          </ListGroup>

        </Col>
      </Row>
      <Footer/>
    </Container>
  )
}

export default Home