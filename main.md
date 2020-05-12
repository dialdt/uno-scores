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
    <li><label for="mummy">Mummy</label><input type="number" id="mummy"></li>
    <li><label for="isla">Isla</label><input type="number" id="isla"></li>
    <li><label for="daddy">Mummy</label><input type="daddy" id="daddy"></li>
  </ul>
  <ul>
    <li><div id="newPlayerContainer"><input type="text" id="newPlayerName"><button class="smallBtn" onclick="addPlayer()">+</button></div></li>
  </ul>
  <button class="button-primary" onclick="document.getElementById('newPlayerContainer').style='visibility:visible;'">Add Player</button>
  <button class="button-primary">Update Scores</button>
</div>
<div class="four columns">
<h2>Leaderboard</h2>
<div id="scoreContainer">
    <ul id="scores">
      <li class="lb-player">First: Isla</li>
      <li class="lb-player">Second: Mummy</li>
      <li class="lb-player">Third: Daddy</li>
    </ul>
</div>

<ul class="navigation">
</ul>
</div>
</div>
