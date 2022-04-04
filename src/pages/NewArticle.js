import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useCreatePostMutation } from '../services/appApi';
import Eth from '../images/cricket.jpg';
import "./NewArticle.css";


function NewArticle() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [uploadingImg, setUploadingImg] = useState(false);
  const [createPost, { isLoading, isSuccess }] = useCreatePostMutation();
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const navigate = useNavigate();
  //converting the text into html
  function handlePublish(e) {
    e.preventDefault();
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const content = draftToHtml(rawContentState);
    if (!title || !image || !content) {
      return alert("Title,Content and Image are required");
    }
    //create the article
    createPost({ title, content, image: url });
  }
  function handleEditorChange(state) {
    setEditorState(state);
  }

  //upload Image
  function uploadImage(e) {
    e.preventDefault();
    if (!image) return;
    setUrl('');
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'bloghari');
    setUploadingImg(true);
    fetch('https://api.cloudinary.com/v1_1/dmhpy7qoj/image/upload', {
      method: "POST",
      body: data,
    }).then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUploadingImg(false);
        setUrl(data.url);
      }).catch(err => {
        setUploadingImg(false);
        console.log(err);
      })


  }
  function handleImageValidation(e) {
    const file = e.target.files[0];
    if (file.size > 1048576) {
      setImage(null);
      return alert("File size is too big, please choose image 1mb or less");
    } else {
      setImage(file);
    }
  }
  if (isLoading) {
    return (
      <div className="py-4">
        <h1 className="text-center">Creating your article</h1>
      </div>
    )
  }
  if (isSuccess) {
    setTimeout(() => {
      navigate("/");
    }, 1500)
    return (
      <div>
        <h1 className="text-center">Article created successfully</h1>
      </div>
    )
  }


  return (
    <Container>
      <Row>
        <Col md={7}>
          <Form onSubmit={handlePublish}>
            <h1 className="text-center">New Article</h1>
            <Form.Group className="mb-3" >
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Your title"
                value={title}
                onChange={(e) => setTitle(e.target.value)} />
            </Form.Group>
            <Editor stripPastedStyles={true}
              editorState={editorState}
              onEditorStateChange={handleEditorChange}
              wrapperClassName="wrapper mb-4"
              editorClassName="editor"
              toolbarClassName='toolbar' />
            <Form.Select>
              <option>Select Category</option>
              <option value="phones">Phones</option>
              <option value="cricket">Cricket</option>
              <option value="computers">Computers</option>
              <option value="others">Others</option>
            </Form.Select>
            <div >
              {!url && <p className="alert alert-info">Please upload an image before publishing</p>}
            </div>
            <div className="my-4">
              <input type="file" onChange={handleImageValidation} accept="image/png , image/jpeg" />
              <Button onClick={uploadImage} disabled={uploadingImg || !image}>
                Upload
              </Button>
            </div>
            <Button variant="primary" type="submit" disabled={uploadingImg || !url}>
              Create article
            </Button>
          </Form>
        </Col>
        <Col md={5} className="d-flex justify-content-center align-items-center imageupload">
          {uploadingImg && (
            <div className="text-center">
              <Spinner animation="border" role="status" />
              <br />
              <p className="py-2" >Uploading Image</p>
            </div>
          )}
          <div>
            {!url && !uploadingImg && <img src={Eth} style={{ width: '100%', minheight: '80vh', objectFit: 'cover',borderRadius:"10px", marginBottom:"56%",boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }} />}
          </div>
          {url && <img src={url} style={{ width: '100%', minheight: '80vh', objectFit: 'cover', borderRadius:"10px",marginBottom:"45%",boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }} />}
        </Col>
      </Row>
    </Container>
  )
}

export default NewArticle