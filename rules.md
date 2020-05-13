---
layout: layouts/rules.njk
eleventyNavigation:
  key: Add Rule
  order: 2
---
  <div class="row">
    <div class="twelve columns offset-by-3 align-centre">
      <h2>Add House Rules</h2>
      <input type="text" class="rule"><button onclick="addRule(this.previousElementSibling.value)">+</button>
      <ol class="houseRules display">
      </ol>
    </div>
  </div>
