//let playList;// = new Array();
//const ytdl = require("youtube-dl");

let currentSong;

class PriorityQueue {

  constructor() {
    this.playList = new Array();
  }

  add(song) {
      //getQueue().push(song);
      this.getQueue().push(song);

      console.log("Added " + "<" + song + ">" + " to the queue");
      console.log(this.playList);
  }

  remove(song) {
      //this.queue.pop(song);
  }

  getQueue() {
      return this.playList;
  }

  getCurrentSong() {
    return this.playList[0];
  }

}
//module.exports = {
  //  add, getQueue, getCurrentSong
//};

module.exports = PriorityQueue;
