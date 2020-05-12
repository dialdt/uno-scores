---
layout: layouts/main.njk
templateClass: tmpl-new
---
<h2>Create New Team</h2>
<ul id="newPlayers">
  <li class="newPlayer"><input type="text"><button onclick="newTeam(this)">+</button></li>
</ul>
<ul id="teamPlayers">

</ul>
<button onclick="window.location.href='/main/'">Add Players to Team</button>
