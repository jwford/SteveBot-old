let playList;// = new Array();
let currentSong;

function add(song) {
    //getQueue().push(song);
    this.playList = song;

    console.log("Added song to queue");
    console.log(playList);
}

function remove(song) {
    //this.queue.pop(song);
}

function getQueue() {
    return this.playList;
}

function getCurrentSong() {
  return this.playList;
}

module.exports = {
    add, getQueue, getCurrentSong
};

//module.exports = PriorityQueue;
