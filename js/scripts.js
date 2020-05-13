class Database {
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
    firebase.initializeApp({
      apiKey: this.apiKey,
      authDomain: this.authDomain,
      databaseURL: this.databaseURL,
      projectId: this.projectId,
      storageBucket: this.storageBucket,
      messagingSenderId: this.messagingSenderId,
      appId: this.appId
    });
  }

  init(collection) {
    return firebase.firestore().collection(collection).doc(localStorage.getItem('user'));
  }

  add(collection, item) {
    var newPlayer = document.getElementById('updateScores');
    var data = this.init(collection);

    updateScores.innerHTML += '<li><input type="text" id="newPlayerName"><button>+</button></li>';

    //some validation
    if(item != '') {
      data.update({
            [`${item}`]: 0
      }).then(function(){
        console.log('data added successfully!');
        showScores();
      }).catch(function(error){
        console.log('error writing data');
      })
    } else {
      console.log('Please enter a value');
    }

  }

  update(collection, item, value) {
    var data = this.init(collection);
    var score = Number(value) //Prev: button.previousElementSibling.value;

    data.get().then(function(doc){
      if(doc.exists) {
        var obj = doc.data();
        var currentScore = obj[item];
        newScore =  Number(currentScore) + score;
        data.update({
            [`${item}`]: `${newScore}`
        });
        showScores(localStorage.getItem('user'));
      } else {
        return 'no such document!';
      }
    }).catch(function(error){
      return 'There was an error: ' + error;
    });
  }

  remove(collection, item) {
    var data = this.init(collection);
    data.update({
      [`${item}`]: firebase.firestore.FieldValue.delete()
    }).then(function(){
      console.log('Player deleted');
      dsplay(collection);
    }).catch(function(error){
      console.log(error);
    })
  }

  display(collection) {
    // clear all displays
    var display = document.getElementsByClassName('display');
    for (var i = 0; i < display.length; i++) {
      display[i].innerHTML = '';
    }

    var data = this.init(collection);
    var scoresDiv = document.getElementById('scores');
    var updateScores = document.getElementById('updateScores');
    var addPlayerMsg = document.getElementById('addPlayersMsg');
    data.get().then(function(doc){

      //1. check if document exists
      if(doc.exists) {

        //1a. if document exists, check if it contains any data.  If so, output data
        if(Object.keys(doc.data()).length > 0) {
          //get player data
          var obj = doc.data();

          //loop through database object and output li
          for(var key in obj) {
            var name = key;
            var score = obj[key];

            //update page elements with db data
            if(collection === 'teams') {
              document.getElementById('updateScores').innerHTML += '<li class="player"><label for=' + name + '">'+ name + '</label><input class="input" type="number" id="' + name + '"><button class="button-primary" onclick="database.update(\'teams\', this.previousElementSibling.getAttribute(\'Id\'), this.previousElementSibling.value)">Winner!</button><button class="smallBtn" onclick="database.remove(\'teams\',this.previousElementSibling.previousElementSibling.getAttribute(\'id\'))">x</button></li>';
              document.getElementById('scores').innerHTML += '<li class="player">' + name + ': ' + score + '</li>';
            } else if (collection === 'rules') {
                document.getElementsByClassName('houseRules')[0].innerHTML += '<li id="' + ruleNum + '">' + rule + '<button onclick="removeRule(this.parentElement.getAttribute(\'id\'))">x</button></li>';
            }
          };
        } else {
          //1b. if document exists but does not contain any data, clear page and prompt user to add data
          if(addPlayerMsg != null && collection === 'teams') {
            addPlayerMsg.innerHTML = '<p>Add a player to get started</p>';
          }
        }
      } else {
        //2. if document does not exist, prompt user to create a new document
        if(addPlayerMsg != null && collection === 'teams') {
          addPlayerMsg.innerHTML = '<p>No team here!  Please <a href="#" onclick="window.location.href=\'/create/\'">add a team</a> to get started</p>';
        }
      }
    }).catch(function(error){
      console.log(error);
    });
    var usr = localStorage.getItem('userName');
    if(usr != null) {
      document.getElementById('welcome').innerHTML = '<small>' + sessionStorage.getItem('greeting') + ' <a onclick="logout()" href="#">logout?</a></small>';
    }
  }

}

//firebase.initializeApp(firebaseConfig);

var database = new Database(config.apiKey, config.authDomain, config.databaseURL, config.projectId,
  config.storageBucket, config.messagingSenderId, config.appId);

database.config();

var greetings = ['Aloha', 'Yo', 'Hey', 'Hello', 'Welcome', 'Hi', 'Word up', 'What\'s up', '\'sup'],
    newScore,
    usr,
    name,
    //db = firebase.firestore(),

//Initialize auth ui

    //ui = new firebaseui.auth.AuthUI(firebase.auth()),
    provider = new firebase.auth.GoogleAuthProvider();

console.log(greetings);

function databaseOp(col) {
  return database.init(col);
}

function getPlayer() {
  var newPlayer = document.getElementById('updateScores');
  newPlayer.innerHTML += '<li><input type="text" id="newPlayerName"><button onclick="database.add(\'teams\', this.previousElementSibling.value); this.parentElement.remove()">+</button></li>';
}

function sort(){
  var data = databaseOp('teams');
  var obj = data.get().then(function(doc){
    if(doc.exists){

    } else {
      console.log('no such document');
    }
  })
}

function addRule(rule) {
  var rulesDiv = document.getElementsByClassName('houseRules')[0];
  var ruleNum;
  var data = databaseOp('rules');
  data.get().then(function(doc){
    if(doc.exists) {
      //count fields
      ruleNum = 'rule' + (Object.keys(doc.data()).length === 0 ? 1 : Object.keys(doc.data()).length + 1);
      data.update({
        [`${ruleNum}`] : rule
      });
    } else {
      data.set({
        [`${ruleNum}`] : rule
      });

    }
    rulesDiv.innerHTML += '<li id="' + ruleNum + '">' + rule + '<button onclick="removeRule(this.parentElement.getAttribute(\'id\'))">x</button></li>';

  })
}

function removeRule(rule) {
  var data = databaseOp('rules');
  data.update({
    [`${rule}`]: firebase.firestore.FieldValue.delete()
  }).then(function(){
    console.log('Rule deleted');
    showRules();
  }).catch(function(error){
    console.log(error);
  })
}

function showRules() {
    var rules = document.getElementsByClassName('houseRules')[0];
    var data = databaseOp('rules');

    rules.innerHTML = '';
    data.get().then(function(doc){
      var obj = doc.data();
      if(doc.exists) {
        for(key in obj) {
          if(window.location.pathname === '/main/') {
            rules.innerHTML += '<li class="rule">' + obj[key] + '</li>';

          } else {
            rules.innerHTML += '<li id="' + key + '">' + obj[key] + '</li><button onclick="">x</button>';
          }
        }
      } else  {

      }
    });
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

  teamPlayers.innerHTML += '<li class="newPlayer" id="' + name + '">' + name + '<button onclick="removePlayer(this.parentElement.getAttribute(\'id\')); this.parentElement.remove()">x</button></li>';
  teamPlayers.value = '';
}

async function login() {
  await firebase.auth().signInWithPopup(provider).then(function(result){
    //store user id in local storage
    localStorage.setItem('user', result.user.uid);
    localStorage.setItem('userName', result.user.displayName);
    //store authentication state in session storage
    sessionStorage.setItem('authState', 'Authenticated');
    //navigate to main page
    randomGreeting(result.user.displayName);
    window.location.href = '/main/';
  }).catch(function(error){
    console.log(error);
  });

}

//// TODO: think about how to run this function when page loads?  Maybe put values into sessionStorage?
function showScores() {
  var players = databaseOp('teams');
  var scoresDiv = document.getElementById('scores');
  var updateScores = document.getElementById('updateScores');
  var addPlayerMsg = document.getElementById('addPlayersMsg');
  players.get().then(function(doc){

    //1. check if document exists
    if(doc.exists) {

      //1a. if document exists, check if it contains any data.  If so, output data
      if(Object.keys(doc.data()).length > 0) {
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
          updateScores.innerHTML += '<li class="player"><label for=' + name + '">'+ name + '</label><input class="input" type="number" id="' + name + '"><button class="button-primary" onclick="database.update(\'teams\', this.previousElementSibling.getAttribute(\'Id\'), this.previousElementSibling.value)">Winner!</button><button class="smallBtn" onclick="database.remove(\'teams\',this.previousElementSibling.previousElementSibling.getAttribute(\'id\'))">x</button></li>';
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
      if(addPlayerMsg != null) {
        addPlayerMsg.innerHTML = '<p>No team here!  Please <a href="#" onclick="window.location.href=\'/create/\'">add a team</a> to get started</p>';
      }
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

function randomGreeting(name) {
  var randomNum = Math.floor(Math.random() * greetings.length);
  sessionStorage.setItem('greeting',greetings[randomNum] + ', ' + name);
}
