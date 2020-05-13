---
layout: layouts/main.njk
eleventyNavigation:
  key: Home
  order: 1
templateClass: tmpl-main
---
<div class="row">
<div class="seven columns">
<h2>Score</h2>
  <ul id="updateScores">
  </ul>
  <div id="addPlayersMsg" clas=="display"></div>
  <ul>
  </ul>
  <button class="button-primary" onclick="getPlayer()">Add Player</button>
</div>
<div class="five columns">
<h2>Leaderboard</h2>
  <div id="scoreContainer">
      <ul id="scores" class="display">
      </ul>
  </div>
<h2>House Rules</h2>
  <div id="rulesContainer">
    <ol class="houseRules display">
    </ol>
  </div>
</div>

<ul class="navigation">
</ul>
</div>
</div>
