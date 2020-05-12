---
layout: layouts/main.njk
eleventyNavigation:
  key: Home
  order: 1
templateClass: tmpl-main
---
<div class="row">
<div class="eight columns">
<h2>Score</h2>
  <ul id="updateScores">
  </ul>
  <div id="addPlayersMsg"></div>
  <ul>
    <li><div id="newPlayerContainer"><input type="text" id="newPlayerName"><button class="smallBtn" onclick="addPlayer()">+</button></div></li>
  </ul>
  <button class="button-primary" onclick="document.getElementById('newPlayerContainer').style='visibility:visible;'">Add Player</button>
</div>
<div class="four columns">
<h2>Leaderboard</h2>
<div id="scoreContainer">
    <ul id="scores">
    </ul>
</div>

<ul class="navigation">
</ul>
</div>
</div>
