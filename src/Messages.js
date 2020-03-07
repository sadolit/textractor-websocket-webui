const DEFAULT_LIMIT = 100;

class Messages {
  constructor(limit) {
    this.messagesList = [];
    this.limit = DEFAULT_LIMIT;
  }

  push(newMessage) {
    //TODO: Replace with a proper ring buffer
    if (this.messagesList.length >= this.limit) {
      this.messagesList.shift();
    }
    this.messagesList.push(newMessage);
    return this;
  }

  length() {
    return this.messagesList.length;
  }

  get(i) {
    return this.messagesList[i];
  }

  getReverse(i) {
    return this.get(this.length() - i - 1);
  }
}

export default Messages;
