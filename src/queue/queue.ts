import { Dealer } from "zeromq"

export class Queue {
  queue: any[] = []
  socket: Dealer
  max: number
  sending = false

  constructor(socket: Dealer, max = 100) {
    this.socket = socket
    this.max = max
  }

  send(msg: any) {
    if (this.queue.length > this.max) {
      throw new Error("Queue is full")
    }
    this.queue.push(msg)
    this.trySend()
  }

  async trySend() {
    if (this.sending) {
      return
    }
    this.sending = true

    while (this.queue.length) {
      await this.socket.send(this.queue.shift())
    }

    this.sending = false
  }
}