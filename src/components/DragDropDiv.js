import React, { Component, useRef } from "react";
import miscStore from "../stores/miscStore";
class DragDropDiv extends Component {
  dropRef = React.createRef();
  state = {
    dragging: false,
  };

  handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  handleMouseIn = () => {
    if (this.props.dragCursor) this.setState({ dragging: true });
  };

  onMouseUp = () => {
    if (this.props.dragCursor) this.props.handleDrop(this.props.dragCursor);
    this.setState({ dragging: false });
  };

  handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter++;
    if (
      (e.dataTransfer.items && e.dataTransfer.items.length > 0) ||
      this.props.dragCursor
    ) {
      this.setState({ dragging: true });
    }
  };
  handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter--;
    if (this.dragCounter > 0) return;
    this.setState({ dragging: false });
  };
  handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ dragging: false });
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      this.props.handleDrop(e.dataTransfer.files);
      e.dataTransfer.clearData();
      this.dragCounter = 0;
    }
  };

  componentDidMount() {
    this.dragCounter = 0;
    let div = this.dropRef.current;
    div.addEventListener("dragenter", this.handleDragIn);
    div.addEventListener("dragleave", this.handleDragOut);
    div.addEventListener("dragover", this.handleDrag);
    div.addEventListener("drop", this.handleDrop);
  }

  componentWillUnmount() {
    let div = this.dropRef.current;
    div.removeEventListener("dragenter", this.handleDragIn);
    div.removeEventListener("dragleave", this.handleDragOut);
    div.removeEventListener("dragover", this.handleDrag);
    div.removeEventListener("drop", this.handleDrop);
  }
  render() {
    return (
      <div
        onMouseUp={this.onMouseUp}
        onMouseEnter={this.handleMouseIn}
        onMouseLeave={() => {
          this.setState({ dragging: false });
        }}
        style={{
          position: "relative",
          ...this.props.style,
        }}
        ref={this.dropRef}
      >
        {this.state.dragging && (
          <div
            style={{
              border: "dashed grey 4px",
              backgroundColor: "rgba(255,255,255,.8)",
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 9999,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                right: 0,
                left: 0,
                textAlign: "center",
                color: "grey",
                fontSize: 36,
              }}
            >
              <div>drop here :)</div>
            </div>
          </div>
        )}
        {this.props.children}
      </div>
    );
  }
}
export default DragDropDiv;
