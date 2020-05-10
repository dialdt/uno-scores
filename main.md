---
layout: layouts/base.njk
eleventyNavigation:
  key: home
  order: 1
---

<body onload="showScores(localStorage.getItem('user'))">
<h2>Score</h2>
  <ul id="updateScores">
    <li><label for="mummy">Mummy</label><input type="number" id="mummy"></li>
    <li><label for="isla">Isla</label><input type="number" id="isla"></li>
    <li><label for="daddy">Mummy</label><input type="daddy" id="daddy"></li>
  </ul>
  <button>Update Scores</button>
<h2>Leaderboard</h2>
<div id="scoreContainer">
    <ul id="scores">
      <li>First: Isla</li>
      <li>Second: Mummy</li>
      <li>Third: Daddy</li>
    </ul>
</div>

<button id="getScores" onclick="showScores(localStorage.getItem('user'))">Get Scores</button>

<ul class="navigation">
  <li><a href="#">New game</a></li>
  <li><a href="#">New team</a></li>
  <li><a href="#">New player</a></li>
  <li><a href="#">New house rule</a></li>
  <li><a href="#">Logout</a></li>
</ul>
</body>
