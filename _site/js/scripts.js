var firebaseConfig = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  databaseURL: config.databaseURL,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId
};

// Initialize firebase

firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

//Initialize auth ui

var ui = new firebaseui.auth.AuthUI(firebase.auth());
var provider = new firebase.auth.GoogleAuthProvider();

function initData(userId) {
  db.collection('teams').doc(userId).set({
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  }).then(function() {
    console.log('data successfully written!');
    //window.location.href = '/main/';
  }).catch(function(error){
    console.error("Error writing document: ", error);
  });
}

function addPlayer() {
  //// TODO: 1. Write to db

  // TODO: 2. Confirm player added
}

function addRule() {
  //// TODO: 1. Write to db

  // TODO: 2. Confirm rule added
}

function addTeam() {
  //// TODO: 1. Write to db

  // TODO: 2. Confirm team added
}

function newGame() {
  //// TODO: 1. Write to db

  // TODO: 2. Confirm rule added

  // TODO: 3. Take user to new game
}

async function login() {
  const userCredentials = await firebase.auth().signInWithPopup(provider)

  const uid = userCredentials.user.uid;

  //save user id to session storage
  localStorage.setItem('user', uid);

  //initialize data
  initData(uid);

  window.location.href = '/main/'

}

function updateScores() {

}

//// TODO: think about how to run this function when page loads?  Maybe put values into sessionStorage?
function showScores(user) {
  var players = db.collection('teams').doc(user);
  players.get().then(function(doc){
    if(doc.exists) {
      //get player data
      var obj = doc.data().Players;
      var scoresDiv = document.getElementById('scores');
      var updateScores = document.getElementById('updateScores');
      // clear div contents
      scoresDiv.innerHTML = '';
      updateScores.innerHTML = '';
      for(var i = 0; i < Object.keys(obj).length; i++) {
        var name = Object.keys(obj)[i];
        var score = obj[Object.keys(obj)[i]].score;

        //update page elements with db data
        updateScores.innerHTML += '<li><label for=' + name + '">'+ name + '</label><input type="number" id="' + name + '"></li>';
        scoresDiv.innerHTML += '<li>' + name + ': ' + score + '</li>';

      };
      return doc.data().Players;
    } else {
      return 'no such document'
    }
  }).catch(function(error){
    console.log(error);
  });
}

function logout() {
  //// TODO: 1. check user logged in

  //clear local storage as data will be pulled on next Login
  localStorage.clear();

  // TODO: 2. log user out if logged in OR do not present logout button
}

// READ functions

function viewRules() {
  //// TODO: 1. retrieve values from db

  //// TODO: 2. present to user
}

function viewLeaderboard() {
  //// TODO: 1. retrieve values from db

  //// TODO: 2. present to user
}

// data structures - Firebase

// Collection: users
// Collection: teams
// Collection: games
// Collection: scores

function test(userId) {
db.collection('teams').doc(userId).set({
  createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  Players: {
    Mummy: {
      date: firebase.firestore.FieldValue.serverTimestamp(),
      score: 535
    },
    Daddy: {
      date: firebase.firestore.FieldValue.serverTimestamp(),
      score: 600
    },
    Isla: {
      date: firebase.firestore.FieldValue.serverTimestamp(),
      score: 400
    }
  }
}).then(function() {
  console.log('data successfully written!');
  //window.location.href = '/main/';
}).catch(function(error){
  console.error("Error writing document: ", error);
});;
}
