+++
title= "Interactive Score Card"
date= "2014-05-21 21:55:44 -0400"
comments = "true"
+++

Every June my family has a big reunion down south. One of our traditions is playing a card game called Contract Rummy. If you don't know the game here is [one version of rules](http://www.pagat.com/rummy/ctrummy.html), but basically it's gin rummy with 5 pre-set hands everyone plays. In the first hand, the "contract"-- what every player is trying to "get"-- is 2 sets of 3, or 2 3's-of-a-kind. For example, three 6s and three Jacks would fulfill this contract. The second hand is a set of 3 and a run of 4 (6 7 8 9, for example. Must be all in the same suit).  

<!-- more -->

Winning a hand means that you fulfill the contract and run out of cards before anyone else does. The winner's score for that hand is 0. Everyone besides the winner will have cards left in there hand, and their score for that hand is determined by which and how many cards they got stuck with. So if I was left with 3 non-face cards (3 through 10), my score for that hand would be 15. Obviously you want a low score. 

Knowing who won an individual hand is easy, but the winner of the game is the player with the lowest total score after 5 hands are played. For years we've just been using scrap paper and pencil: the scorekeeper sketching out a rough table with a row for each "contract" or hand and columns for each player and filling in scores as the game progresses. Sometimes the scorekeeper calculates the running totals between hands to get an idea of who in the lead, but usually it's a surprise until the end when all the scores are tallied. 

Obviously this task of scorekeeping and keeping a running total lends itself well to a simple app. Using JavaScript, jQuery, and an HTML table I got it [up-and-running pretty quickly](http://samschlinkert.com/contract/) (here's the [GitHub repo](https://github.com/sts10/contract_score_card)).

The heart of the JavaScript is a `keyup` listener trained to all the `input` tags or type `text`. Everytime there's a `keyup` event in any of the table's input fields (say we're entering Bob's score for hand number 3), we want to (a) re-calculate that player's total score and post to the "total" cell of that player, (b) re-compute the current leader, and highlight the name and total score of the new leader.

The actual function does a little more than this, but here's the simplified version for now: 

```javascript
$('input[type=text]').on("keyup", function(){
  var player_number = ($(this).attr('id')).charAt(6); // get 'this' player's number via the CSS id of the text input
  low_score = 10000; // reset the low score to an impossibly high number

  if (playerHasName(player_number)) { // if this is player who has a name, i.e. is actually in the game, and this isn't an erronaes data entry in an incorrect column
    calculateAndPostPlayerTotal(player_number);
  }

  updateCurrentLeader();  // rec-calulate new leader
  highlightLeader();      // use CSS to highlight the new leader's name and score 
});
```

The rest of the `app.js` file is all helper methods. I think I wrote them in the way that I'd write Ruby: each take in data, act on it-- sometimes in just one line, and return the described result. Here are some fun ones: 

```javascript
function makeScoreArray(player){
  var array = [];
  var i = 1;
  
  while (i <= number_of_hands){
    array.push(getHandScore(player, i));  
    i = i + 1;
  }

  return array;
}

function sumArray(array){
  return array.reduce(function(pv, cv) { return pv + cv; }, 0);
}

function calculatePlayerTotal(player_num){
  return sumArray(makeScoreArray(player_num));
}

function calculateAndPostPlayerTotal(player_num){
  $("#player" + player_num + "_total").html(calculatePlayerTotal(player_num));
}
```

### Some Bells and Whistles

Beyond that I added some extra bells and whistles. If a player's name is greater than 7 characters all of the player's names rotate 55 degrees, decreases in font size, and the first row of the table gets taller to accomodate. The jQuery there is just an `addClass` and `removeClass`.  

Also, if a player missed a hand (i.e. they joined the game late, which we usually allow), the scorekeeper can input a '*' and the app will get the highest (worst) score from that hand and replace the asterick with that penalty score. This cluttered up that `keyup` listener callback function, but I think it's a neat trick. 

### Interesting Challenges 

The fact that the _lowest_ score is the leader made that part of the app a interesting. Here's that function, where `leader` and `low_score` are global variables and `leader` is the leading players number:

```javascript
function updateCurrentLeader(){
  var i = 1;

  while (i <= number_of_players){
    if (playerHasName(i)) {
      var this_player_score = calculatePlayerTotal(i);
      if (this_player_score < low_score){  
        low_score = this_player_score;
        leader = i;
      }
    }
    i = i + 1;
  }
}
```

The sticky spot here is how do you initialize the `low_score` varaible. Obviously initializing it to `0` is problematic. I'm not sure how JavaScript would handle us just declaring it as `var lowest_score`. I ended up initializing it to an ridiculously high number, 10000. 

The second part of the problem was a little trickier to see at first. So let's say we've just played one hand-- the leader now has a score of 0, because he or she got rid of all his or her cards, so `lowest_score` is set to 0. The next hand a different player goes out first, so the newest lowest score is, let's say 10. Thus, we need to reset our `lowest_score` variable on every keyup. 

There's plenty I like about this code but also some parts that I do not. For example, I'm not sure how tightly the JavAscript should depend on the CSS. In one case I'm getting the player's number with this line `var player_number = ($(this).attr('id')).charAt(6);`, which of course relies heavily on the CSS id having the player's number at position 6. But that may just be the nature of this stack. 

Going forward, if I can, I think it'd be a fun exercise to re-write the JavaScript for this as all [object-oriented](http://sts10.github.io/blog/2014/05/16/javascript-prototypes-the-basic-basics/). The simple approach would be to define a prototype for 'player' and instantiate them as names are typed in. Each player would know his or her score on any given hand plus their current total. A more elaborate OO schema could have a `hand` prototype and probably a `player-hand` prototype, but that might be drifting too far into the Rails mindset. 



