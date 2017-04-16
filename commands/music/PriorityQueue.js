//let playList;// = new Array();
const ytdl = require("youtube-dl");

let currentSong;

class PriorityQueue {

  constructor() {
    this.playList = new Array();
    this.titleList = new Array();
  }

  add(song) {
      //getQueue().push(song);
      this.getQueue().push(song);

      var that = this;

      ytdl.getInfo(song, function(err, info) {
        if (err) throw err;
      //  var title = info.title;
        that.getTitles().push(info.title);
        console.log("Title added: " + info.title);
      });

      //this.getTitles().push(title);



      //console.log("Added " + "<" + song + ">" + " to the queue");
      //console.log(this.playList);
  }

  remove(song) {

  }

  getQueue() {
      return this.playList;
  }

  getTitles() {
    return this.titleList;
  }

  getCurrentSong() {
    return this.playList[0];
  }

  getCurrentSongTitle() {
    return this.getTitles()[0];
  }

}
//module.exports = {
  //  add, getQueue, getCurrentSong
//};

module.exports = PriorityQueue;
