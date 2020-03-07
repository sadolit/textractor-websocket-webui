const DEFAULT_URL = "ws://127.0.0.1:6677";

class WebSocketWrapper {
  constructor() {
    this.url = DEFAULT_URL;
    this.connected = false;
    this.ws = null;
    this.onDisconnect = () => {};
    this.onConnect = () => {};
    this.onMessage = () => {};
  }

  updateUrl(url) {
    if (!this.connected) {
      this.url = url;
    }
    return this;
  }

  connect() {
    if (!this.connected) {
      this.ws = this.createWebSocket(this.url);
      this.connected = true;
    }
    return this;
  }

  disconnect() {
    if (this.ws != null) {
      this.ws.close();
    }
    this.ws = null;
    this.connected = false;
    return this;
  }

  createWebSocket(url) {
    var ws = new WebSocket(url);
    const that = this;
    ws.onopen = () => {
      console.log("Opened connection to " + url);
      that.onConnect();
    };
    ws.onclose = this.onDisconnect;
    ws.onmessage = m => {
      that.onMessage(m.data);
    };
    ws.onerror = e => {
      console.log("Error connecting: ", e);
      that.onDisconnect();
    };
    return ws;
  }
}

export default WebSocketWrapper;
