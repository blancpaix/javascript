import { EventEmitter } from "events";
import InitializedState from './InitializedState';

class DB extends EventEmitter {
  constructor() {
    super();
    this.state = new QueuingState(this);    // 외부를 말한다는건가???
  }

  async query(queryString) {
    return this.state.query(queryString);
  }

  connect() {
    // Simulate the delay of the connection;
    setTimeout(() => {
      this.connected = true;
      this.emit('connected');
      const oldState = this.state;
      this.state = new InitializedState(this);
      oldState[deactivate] && oldState[deactivate]();
    }, 500);
  }
}

export const db = new DB();