const ytdl = require("ytdl-core");

class PriorityQueue {

  constructor() {
    this.playList = new Array();
    this.titleList = new Array();
  }

  add(song) {
      this.getQueue().push(song);

      var that = this;

      ytdl.getInfo(song, function(err, info) {
        if (err) throw err;
        that.getTitles().push(info.title);
        console.log("Title added: " + info.title);
      });
  }

  //make sure this isn't <0 -> handle that case before?
  remove(position) {
      if (position < 0) return;
      this.getQueue().splice(position-1, 1);
      this.getTitles().splice(position-1, 1);
  }

  empty() {
    this.getQueue().splice(0, this.getQueue().length);
    console.log("Cleared queue!");
  }

  getQueue() {
      return this.playList;
  }

  getTitles() {
    return this.titleList;
  }

  getCurrentSong() {
    return this.getQueue()[0];
  }

  getCurrentSongTitle() {
    return this.getTitles()[0];
  }

}

module.exports = PriorityQueue;
