---
layout: layouts/main.njk
eleventyNavigation:
  key: Home
  order: 1
templateClass: tmpl-main
---
<div class="grid">
  <div class="modal">
    <div class="modalContent">
      <span class="close">&times;</span>
      <input type="text" id="newPlayer" placeholder="New player name"><button onclick="add('teams', this.previousElementSibling.value); this.parentElement.parentElement.style.display='none'">+</button>
    </div>
  </div>
  <div class="modal">
    <div class="modalContent">
      <span class="close">&times;</span>
      <input type="text" id="newRule" placeholder="New rule"><button onclick="add('rules', this.previousElementSibling.value); this.parentElement.parentElement.style.display='none'">+</button>
    </div>
  </div>
<div class="grid__col grid__col--3-of-5">
<h2>Score</h2>
  <ul id="updateScores" class="teams-display">
  </ul>
  <div id="addPlayersMsg" class="display"></div>
  <ul>
  </ul>
</div>
<div class="grid__col grid__col--2-of-5">
<h2>Leaderboard</h2>
  <div id="scoreContainer">
      <ul id="scores" class="teams-display">
      </ul>
  </div>
<h2>House Rules</h2>
  <div id="rulesContainer">
    <ol class="houseRules rules-display">
    </ol>
  </div>
</div>

<ul class="navigation">
</ul>
</div>
</div>
