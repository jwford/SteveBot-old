class Song {

  constructor(url, title, user, duration) {
    this.url = url;
    this.title = title;
    this.user = user;
    this.duration = duration;
  }

  setUrl(url) {
    this.url = url;
  }

  getUrl() {
    return this.url;
  }

  setTitle(title) {
    this.title = title;
  }

  getTitle() {
    return this.title;
  }

  setUser(user) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }

  setDuration(duration) {
    this.duration = duration;
  }

  getDuration() {
    return this.duration;
  }

}

module.exports = Song;
