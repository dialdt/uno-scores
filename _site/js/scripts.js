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
var newScore;

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

function resetScores() {

}

function addPlayer() {
  //get name
  var playerName = document.getElementById('newPlayerName').value;
  var data = db.collection('teams').doc(localStorage.getItem('user'));
  //some validation
  if(playerName != '') {
    data.update({
          [`${playerName}`]: 0
    }).then(function(){
      console.log('data added successfully!');
    }).catch(function(error){
      console.log('error writing data');
    })
  } else {
    console.log('Please enter a value');
  }

  //hide textbox
  document.getElementById('newPlayerContainer').style.visibility = 'hidden';

}

function removePlayer(name) {
  var nm = name.previousElementSibling.previousElementSibling.getAttribute('id');
  var data = db.collection('teams').doc(localStorage.getItem('user'));
  data.update({
    [`${nm}`]: firebase.firestore.FieldValue.delete()
  }).then(function(){
    console.log('Player deleted');
  }).catch(function(error){
    console.log(error);
  })
}

function sort(){
  var data = db.collection('teams').doc(localStorage.getItem('user'));
  var obj = data.get().then(function(doc){
    if(doc.exists){

    } else {
      console.log('no such document');
    }
  })
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

  window.location.href = '/main/'

}

function updateScores(button) {
  var data = db.collection('teams').doc(localStorage.getItem('user'));
  var score = Number(button.previousElementSibling.value);
  var name = button.previousElementSibling.previousElementSibling.innerHTML;
  var updateData = {};
  updateData['Players.'+ name + '.score'] = newScore;

  var players = db.collection('teams').doc(localStorage.getItem('user'));

  data.get().then(function(doc){
    if(doc.exists) {
      var obj = doc.data();
      var currentScore = obj[name];
      newScore =  Number(currentScore) + score;
      data.update({
          [`${name}`]: `${newScore}`
      });
    } else {
      return 'no such document!';
    }
  }).catch(function(error){
    return 'There was an error: ' + error;
  });
  showScores(localStorage.getItem('user'));
}

//// TODO: think about how to run this function when page loads?  Maybe put values into sessionStorage?
function showScores(user) {
  var players = db.collection('teams').doc(user);
  players.get().then(function(doc){
    if(doc.exists) {

      //get player data
      var obj = doc.data();
      var scoresDiv = document.getElementById('scores');
      var updateScores = document.getElementById('updateScores');

      // clear div contents
      scoresDiv.innerHTML = '';
      updateScores.innerHTML = '';
      for(var key in obj) {
        var name = key;
        var score = obj[key];

        //update page elements with db data
        updateScores.innerHTML += '<li><label for=' + name + '">'+ name + '</label><input type="number" id="' + name + '"><button class="winner" onclick="updateScores(this)">Winner!</button><button onclick="removePlayer(this)">x</button></li>';
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

function test() {
}
