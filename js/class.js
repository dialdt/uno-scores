class Data {
  constructor(apiKey, authDomain, databaseURL, projectId, storageBucket, messagingSenderId, appId) {
    this.apiKey = apiKey;
    this.authDomain = authDomain;
    this.databaseURL = databaseURL;
    this.projectId = projectId;
    this.storageBucket = storageBucket;
    this.messagingSenderId = messagingSenderId;
    this.appId = appId;
  }

  config() {
      return {
        apiKey: this.apiKey,
        authDomain: this.authDomain,
        databaseURL: this.databaseURL,
        projectId: this.projectId,
        storageBucket: this.storageBucket,
        messagingSenderId: this.messagingSenderId,
        appId: this.appId
      }
  }

  init(collection) {
    //firebase.initializeApp(this.config());
    return db.collection(collection).doc(localStorage.getItem('user'));
  }

  add(collection) {
    this.init(collection);
  }

  update(collection, item) {
    this.init(collection);
  }

  remove(collection, item) {
    this.init(collection);
  }

  display(collection) {
    this.init(collection);
  }

}
