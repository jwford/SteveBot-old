var queue = [];

class PriorityQueue {

  add (song) {
    this.queue.push(song);
  }

  remove (song) {
    this.queue.pop(song);
  }

}
