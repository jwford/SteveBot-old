const ytdl = require(require("../../config.json").downloader);
const Song = require('./Song.js');

class PriorityQueue {

  constructor() {
    this.queue = new Array();
    this.requesterList = new Array();
    this.userList = new Map();
  }

  add(song, user) {

      //this.getQueue().push(song);
      this.getRequesters().push(user);

      var that = this;
      let newSong = null;

      let songPromise = new Promise (
        (resolve, reject) => {
          ytdl.getInfo(song, function(err, info) {
            if (err) throw err;
            newSong = new Song(song, info.title, user, info.duration);
            that.getQueue().push(newSong);
            console.log("Title added: " + info.title);
            resolve(newSong);
          });
        }
      );

      if (this.userList.has(user)) {
        let oldAmount = this.userList.get(user);
        this.userList.set(user, oldAmount+1);
      } else {
        this.userList.set(user, 1);
      }

      return songPromise;
  }

  //make sure this isn't <0 -> handle that case before?
  remove(position) {
      if (position < 0) return;

      this.getQueue().splice(position-1, 1);

      let user = this.getRequesters()[position-1];
      this.getRequesters().splice(position-1,1);

      let prevNumber = this.getUsers().get(user);
      this.getUsers().set(user, prevNumber-1);
  }

  empty() {
    this.getQueue().splice(0, this.getQueue().length);
    console.log("Cleared queue!");
  }

  getQueue() {
      return this.queue;
  }

  getRequesters() {
    return this.requesterList;
  }

  getCurrentSong() {
    return this.getQueue()[0];
  }

  getCurrentSongURL() {
    return this.getCurrentSong().getUrl();
  }

  getCurrentSongTitle() {
    return this.getCurrentSong().getTitle();
  }

  getUsers() {
    return this.userList;
  }

}

module.exports = PriorityQueue;
