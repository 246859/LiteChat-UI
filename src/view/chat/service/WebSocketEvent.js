//ws消息
export class WebSocketMessage {
    constructor(event, payload) {
        this.event = event;
        this.payload = payload;
    }
}