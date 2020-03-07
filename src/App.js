import React from "react";
import "./App.css";
import WsSettings from "./WsSettings";
import WebSocketWrapper from "./WebSocketWrapper";
import Messages from "./Messages";
import MessagesList from "./MessagesList";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.onUrlChange = this.onUrlChange.bind(this);
    this.onConnect = this.onConnect.bind(this);
    this.onDisconnect = this.onDisconnect.bind(this);
    this.onSocketDisconnect = this.onSocketDisconnect.bind(this);
    this.onMessage = this.onMessage.bind(this);
    var ws = new WebSocketWrapper();
    ws.onDisconnect = this.onSocketDisconnect;
    ws.onMessage = this.onMessage;
    this.state = { ws: ws, messages: new Messages() };
  }
  onMessage(v) {
    console.log("Hey ", v);
    const messages = this.state.messages;
    this.setState({ messages: messages.push(v) });
  }

  onUrlChange(v) {
    const ws = this.state.ws;
    this.setState({ ws: ws.updateUrl(v) });
  }

  onSocketDisconnect() {
    const ws = this.state.ws;
    this.setState({ ws: ws.disconnect() });
  }

  onConnect() {
    const ws = this.state.ws;
    this.setState({ ws: ws.connect() });
  }

  onDisconnect() {
    console.log("Disconnected");
    const ws = this.state.ws;
    this.setState({ ws: ws.disconnect() });
  }

  render() {
    const ws = this.state.ws;
    const messages = this.state.messages;
    return (
      <div className="App">
        <div className="App-Container">
          <header className="header">
            <h1>Textractor webui</h1>
          </header>
          <div className="App-header">
            <WsSettings
              ws={ws}
              onUrlChange={this.onUrlChange}
              onConnect={this.onConnect}
              onDisconnect={this.onDisconnect}
            />
            <MessagesList data={messages} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
