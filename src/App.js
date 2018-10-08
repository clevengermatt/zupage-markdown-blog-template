import React, { Component } from "react";
import "./App.css";
import zupage from "zupage";
import { Container } from "semantic-ui-react";
const ReactMarkdown = require("react-markdown");

class App extends Component {
  state = {
    author: {},
    body: "",
    colorPalette: [],
    date: "",
    images: []
  };

  async componentDidMount() {
    const postResponse = await zupage.getCurrentPost();

    const date = new Date(
      postResponse.published_time * 1000
    ).toLocaleDateString("en-US");

    this.setState({
      author: postResponse.creator,
      body: this.formatBody(postResponse.body, postResponse.images),
      colorPalette: postResponse.page.color_palette,
      date: date,
      images: postResponse.images
    });
  }

  formatBody = (body, images) => {
    let newBody = body;
    let index = 0;
    images.forEach(function(image) {
      let strReplace = "{image_" + index + "}";
      newBody = newBody.replace(strReplace, "![fit](" + image.url + ")");
      index++;
    });

    return newBody;
  };

  render() {
    const { body, colorPalette, images } = this.state;

    return (
      <div className="Template">
        <Container text>
          <ReactMarkdown source={body} />
        </Container>
      </div>
    );
  }
}

export default App;
