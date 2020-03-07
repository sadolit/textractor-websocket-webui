import React from "react";
import VirtualList from "react-tiny-virtual-list";
import "./MessagesList.css";
import FlipMove from "react-flip-move";
import { Flipper, Flipped } from "react-flip-toolkit";
import { Panel } from "pivotal-ui/react/panels";

String.prototype.hashCode = function() {
  var hash = 0,
    i,
    chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr = this.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

class MessagesList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const data = this.props.data;
    const firstElement = data.messagesList.join();

    const items = [...Array(data.length()).keys()].map(i => (
      //TODO: if first elelemtn add class (or toggle class)
      <Flipped key={i} flipId={data.getReverse(i).hashCode()}>
        <div className="message shadow">{data.getReverse(i)}</div>
      </Flipped>
    ));
    return (
      <div className="messagesList">
        <h1>Messages</h1>
        <div className="messagesListContainer">
          <Flipper
            flipKey={firstElement ? firstElement.hashCode() : "".hashCode()}
          >
            {items}
          </Flipper>
        </div>
      </div>
    );
  }
}

export default MessagesList;
