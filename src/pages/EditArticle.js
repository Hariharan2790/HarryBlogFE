import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useUpdatePostMutation } from "../services/appApi";
import Eth from "../images/cricket.jpg";
import "./NewArticle.css";
import { useSelector } from "react-redux";
import { ContentState, convertFromHTML, convertToRaw } from "draft-js";
import draftjsToHtml from "draftjs-to-html";
import "../pages/SingleArticlePage.css";

function EditArticle() {
  const { id } = useParams();
  const posts = useSelector((state) => state.posts);
  const postToEdit = posts.find((post) => post._id == id);
  const [updateArticle, { isLoading, isSuccess }] = useUpdatePostMutation();

  const [title, setTitle] = useState(postToEdit.title);
  const [url] = useState(postToEdit.image);

  const contentDataState = ContentState.createFromBlockArray(
    convertFromHTML(postToEdit.content)
  );
  const editorDataState = EditorState.createWithContent(contentDataState);
  const [editorState, setEditorState] = useState(editorDataState);
  const navigate = useNavigate();
  //converting the text into html

  function handleUpdate(e) {
    e.preventDefault();
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const content = draftjsToHtml(rawContentState);

    if (!title || !content) {
      return alert("Title and Content required");
    }
    updateArticle({ id, title, content });
  }
  function handleEditorChange(state) {
    setEditorState(state);
  }

  if (isLoading) {
    return (
      <div className="py-4">
        <h1 className="text-center">Updating your article</h1>
      </div>
    );
  }
  if (isSuccess) {
    setTimeout(() => {
      navigate("/");
    }, 1500);
    return (
      <div>
        <h1 className="text-center">Article updated successfully</h1>
      </div>
    );
  }

  return (
    <Container>
      <Row>
        <Col md={7}>
          <Form onSubmit={handleUpdate}>
            <h1 className="text-center">Edit Article</h1>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Editor
              stripPastedStyles={true}
              editorState={editorState}
              onEditorStateChange={handleEditorChange}
              wrapperClassName="wrapper mb-4"
              editorClassName="editor"
              toolbarClassName="toolbar"
            />
            <Form.Select className="mb-4">
              <option>Select Category</option>
              <option value="phones">Phones</option>
              <option value="block">BlockChain</option>
              <option value="computers">Computers</option>
              <option value="others">Others</option>
            </Form.Select>
            <Button variant="primary" type="submit">
              Update article
            </Button>
          </Form>
        </Col>
        <Col
          md={5}
          className="d-flex justify-content-center align-items-center imageupload"
        >
          <img
            src={url}
            style={{
              width: "100%",
              minheight: "80vh",
              objectFit: "cover",
              marginBottom: "56%",
              borderRadius: "10px",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            }}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default EditArticle;
