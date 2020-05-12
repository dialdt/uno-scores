var firebaseConfig = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  databaseURL: config.databaseURL,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId
};


var greetings = ['Aloha', 'Yo', 'Hey', 'Hello', 'Welcome', 'Hi', 'Word up', 'What\'s up', '\'sup'];
// Initialize firebase
var newScore;

firebase.initializeApp(firebaseConfig);

var usr;
var name;


var db = firebase.firestore();

//Initialize auth ui

var ui = new firebaseui.auth.AuthUI(firebase.auth());
var provider = new firebase.auth.GoogleAuthProvider();

function databaseOp(col) {
  return db.collection(col).doc(localStorage.getItem('user'))
}

function initData(userId) {
  db.collection('teams').doc(userId).set({
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  }).then(function() {
    console.log('data successfully written!');
    //window.location.href = '/main/';
  }).catch(function(error){
    console.error("Error writing document: ", error);
  });

  db.collection('rules').doc(userId).set({

  }).then(function(){
    console.log('data successfully written!')
  }).catch(function(error){
    console.error("Error writing document: ", error);
  });
}

function resetScores() {

}

function createNewPlayer() {

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
      showScores(localStorage.getItem('user'));
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
  var nm = name;
  var data = db.collection('teams').doc(localStorage.getItem('user'));
  data.update({
    [`${nm}`]: firebase.firestore.FieldValue.delete()
  }).then(function(){
    console.log('Player deleted');
    showScores(localStorage.getItem('user'));
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

function newTeam(player) {
  //take to new page or modal
  //check whether doc exists
  var data = databaseOp('teams');
  var name = player.previousElementSibling.value;
  var parent = document.getElementById('newPlayers');
  var teamPlayers = document.getElementById('teamPlayers');

  data.get().then(function(doc){
    if(doc.exists) {
      data.update({
        [`${name}`] : 0
      })
    } else {
      data.set({
        [`${name}`] : 0
      })
    }
  });

  teamPlayers.innerHTML += '<li class="newPlayer" id="' + name + '">' + name + '<button onclick="removePlayer(this.parentElement.getAttribute(\'id\'));this.parentElement.remove()">x</button></li>';
  teamPlayers.value = '';

}

function newGame() {
  //// TODO: 1. Write to db

  // TODO: 2. Confirm rule added

  // TODO: 3. Take user to new game
}

async function login() {
  await firebase.auth().signInWithPopup(provider).then(function(result){
    window.location.href = "/auth/";
    //store user id in local storage
    localStorage.setItem('user', result.user.uid);
    localStorage.setItem('userName', result.user.displayName);
    //store authentication state in session storage
    sessionStorage.setItem('authState', 'Authenticated');
    //set authentication to expire 1 hour from now
    //sessionStorage.setItem("authExpires", Date.now.addHours(1));
    //navigate to main page
    window.location.href = '/main/';
  }).catch(function(error){
    console.log(error);
  });

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
      showScores(localStorage.getItem('user'));
    } else {
      return 'no such document!';
    }
  }).catch(function(error){
    return 'There was an error: ' + error;
  });
}

//// TODO: think about how to run this function when page loads?  Maybe put values into sessionStorage?
function showScores(user) {
  var players = db.collection('teams').doc(user);
  var scoresDiv = document.getElementById('scores');
  var updateScores = document.getElementById('updateScores');
  var addPlayerMsg = document.getElementById('addPlayersMsg');
  players.get().then(function(doc){

    //1. check if document exists
    if(doc.exists) {

      //1a. if document exists, check if it contains any data.  If so, output data
      if(Object.keys(doc.data()).length > 0) {;
        //get player data
        var obj = doc.data();

        // clear div contents
        addPlayerMsg.innerHTML = '';
        scoresDiv.innerHTML = '';
        updateScores.innerHTML = '';

        //loop through database object and output li
        for(var key in obj) {
          var name = key;
          var score = obj[key];

          //update page elements with db data
          updateScores.innerHTML += '<li class="player"><label for=' + name + '">'+ name + '</label><input class="input" type="number" id="' + name + '"><button class="button-primary" onclick="updateScores(this)">Winner!</button><button class="smallBtn" onclick="removePlayer(this.previousElementSibling.previousElementSibling.getAttribute(\'id\'))">x</button></li>';
          scoresDiv.innerHTML += '<li class="player">' + name + ': ' + score + '</li>';
        };
      } else {
        //1b. if document exists but does not contain any data, clear page and prompt user to add data
        scoresDiv.innerHTML = '';
        updateScores.innerHTML = '';
        if(addPlayerMsg != null) {
          addPlayerMsg.innerHTML = '<p>Add a player to get started</p>';
        }
      }
    } else {
      //2. if document does not exist, prompt user to create a new document
      addPlayerMsg.innerHTML = '<p>No team here!  Please <a href="#" onclick="window.location.href=\'/create/\'">add a team</a> to get started</p>'
    }
  }).catch(function(error){
    console.log(error);
  });
  var usr = localStorage.getItem('userName');
  if(usr != null) {
    document.getElementById('welcome').innerHTML = '<small>' + sessionStorage.getItem('greeting') + ' <a onclick="logout()" href="#">logout?</a></small>';
  }
}

function logout() {
  //// TODO: 1. check user logged in
  firebase.auth().signOut().then(function(){
    localStorage.clear();
    sessionStorage.clear();
    console.log('logged out');
    window.location.href = '../';
  }).catch(function(error){
    console.log(error);
  });
  //clear local storage as data will be pulled on next Login
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

function randomGreeting(name) {
  var randomNum = Math.floor(Math.random() * greetings.length);
  sessionStorage.setItem('greeting',greetings[randomNum] + ', ' + name);
}

Date.prototype.addHours = function(h) {
   this.setTime(this.getTime() + (h*60*60*1000));
   return this;
}
