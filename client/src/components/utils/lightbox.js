import React, { Component } from "react";
import Carousel, { Modal, ModalGateway } from "react-images";

class ImageLightBox extends Component {
  state = {
    lightboxIsOpen: true,
    currentImage: this.props.pos,
    images: [],
  };

  static getDerivedStateFromProps(props, state) {
    if (props.images) {
      const images = [];
      props.images.forEach((element) => {
        images.push({ src: `${element}` });
      });
      return (state = {
        images,
      });
    }
    return false;
  }

  gotoPrevious = () => {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  };

  gotoNext = () => {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  };

  closeLightbox = () => {
    this.props.onclose();
  };

  render() {
    console.log(this.state.currentImage);
    console.log(this.state.images);
    console.log(this.state.lightboxIsOpen);

    return (
      <ModalGateway>
        {this.state.lightboxIsOpen ? (
          <Modal onClose={this.closeLightbox}>
            <Carousel
              views={this.state.images}
              currentIndex={this.state.currentImage}
              onClickPrev={() => this.gotoPrevious()}
              onClickNext={() => this.gotoNext()}
              onClose={() => this.closeLightbox()}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    );
  }
}

export default ImageLightBox;
