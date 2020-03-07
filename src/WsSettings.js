import React from "react";
import { Input } from "pivotal-ui/react/inputs";
import { DefaultButton, PrimaryButton } from "pivotal-ui/react/buttons";
import "./WsSettings.css";
class WsSettings extends React.Component {
  constructor(props) {
    super(props);
    this.onUrlChange = this.onUrlChange.bind(this);
    this.onConnect = this.onConnect.bind(this);
    this.onDisconnect = this.onDisconnect.bind(this);
  }

  onUrlChange(e) {
    this.props.onUrlChange(e.target.value);
  }

  onConnect(e) {
    this.props.onConnect();
  }

  onDisconnect(e) {
    this.props.onDisconnect();
  }

  render() {
    const ws = this.props.ws;
    return (
      <div className="WsSettings">
        <h3>Settings</h3>
        <Input
          placeholder="wss://127.0.0.1:6677"
          value={ws.url}
          onChange={this.onUrlChange}
          disabled={ws.connected}
          type="text"
        />
        <div className="bg-dark-gray pal">
          <PrimaryButton
            disabled={ws.connected}
            onClick={this.onConnect}
            onDark
          >
            Connect
          </PrimaryButton>
          <DefaultButton
            disabled={!ws.connected}
            onClick={this.onDisconnect}
            onDark
          >
            Disconnect
          </DefaultButton>
        </div>
      </div>
    );
  }
}

export default WsSettings;
