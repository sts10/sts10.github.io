+++
title= "Strike 9 Game"
date= "2014-05-30 10:03:10 -0400"
comments = "true"
+++

At my second meet-up of this week, I ventured north to the east 20s for Building JavaScript Games. Our task was to build a seemingly simple game called Strike 9.

### How the Game is Played

At the beginning of a turn, the "computer" rolls two die. The player has squares numbered 1 through 9 to make the sum of the computer's roll. The trick is that when the player uses a number it is removed from the board. So for example, if computer rolls a 9, the player can choose to remove any of the following combinations:  [9], [1,8], [2,7], [1,2,6], [2,3,4], etc. If he or she uses, say, the 1 and the 8, on the next roll neither 1 or 8 will be available. 

<!-- more -->

### Huh? / Live Demo

Yeah, it's kind of hard to explain in words. Here's a [live demo](http://samschlinkert.com/strike9/) (and [my GitHub repo](https://github.com/sts10/strike-9)).

### How I Approached the Basic Gameplay

The meat of this project lives in `strike9-board.js`. `onload` we initialize some arrays and variables, then call `resetGame()`, which draws our 9 HTML `canvas`'s and rolls the 2 die for the first time. 

From there we wait for the player to click one of the 9 canvases. When a canvas is clicked, we make sure it hasn't been clicked yet in this game. Then we mark it as clicked in the `board_array` and we remove that number from the `player_moves_remaining` array. We also add the number to `player_total`. 

Eventually we have to figure out if the player won, lost, or can keep playing on that turn. Here's a excerpt of that code:  

```javascript
// the player just made a sum...

// check if player has won
if (board_array.indexOf(0) == -1){   
  alert("Oh hey, You won!");
  resetGame();
} else { //still playing
  // re-roll dice. 
  computer_roll = rollTwoDie();

  // with new dice roll, we can already figure out if the game is over
  if (isGameOver(computer_roll, player_moves_remaining)){
    alert("Computer's next roll is " + computer_roll + "...Game over :(");
    resetGame();
  } else { // if there exists a way to make the roll's sum...
    sendMessage(randPraise() + "<br>New roll is " + computer_roll);
    // reset for new roll, same game
    possible_combinations = []; 
    player_total = 0;
  }
}
```

By far the most interesting of these outcomes to check is if the player lost-- which we do with the `isGameOver()` function called above. I wanted the game to know if the player lost right away-- in other words if the player had 1, 2, and 4 remaining and the computer's new roll was 5, I wanted the game to tell the player they had lost. 

This might sounds simple, but-- at least the way I went about it-- turned out to be pretty non-trivial. 

### Coolest Challenge: When is the Game Over?

Ideally I wanted a function called `isGameOver` that returns `true` if the player can't make the sum with the remaining numbers (like the case above), and `false` if the player can make the sum. 

My approach was to generate an array of all ways to make a sum (in the above hypothetical, all the ways to add numbers to make 5). So given, say, `6`, `getAllPossAddends` should return an array of arrays: `[[6], [1,5], [2,4], [1,2,3]]`. Note that we don't want `[3,3]` because there's only one 3 on the board, and we don't want `[5,1]` because we already have `[1,5]` and order doesn't matter here. And `6` itself should be included because, in line with the rules of the game, if the computer rolls a 6 you can just use the 6 square. 

Once we get this array of possible combinations to make a given sum, which I call `possible_combinations`, we'll just need to compare it to what numbers the player has left (`player_moves_remaining`) to see if `isGameOver` should be `true` or `false`. Cool? Sounds easy? OMG took me a whole day. 

Let's do this. 

### Part 1: Generating possible_combinations

_Note: The section below has been edited and updated to reflect some significant refactoring I've performed._

So the first thing I wanted to do was write the function that would take in a `sum`, say `6` and spit back `[[1,5], [2,4], [1,2,3], [6]]`. I decided to call this function `getAllPossAddends` ("addends", [according to Wikipedia](http://en.wikipedia.org/wiki/Addition#Notation_and_terminology), is the technical term for what you add together to get a sum).

After a few days of tinkering, I wrote a recursive function to accomplish this task.

```javascript
var possible_combinations = []; // I made this global

function getAllPossAddends(sum, baggage){
  // if baggage argument is undefined, this is our first run through
  // so set baggage = []
  // baggage is effectively an optional argument with a default value of [] if undefined in function call
  if (typeof baggage == 'undefined'){
    baggage = [];
    possible_combinations = [];
    possible_combinations.push([sum]); // can just play the number itself 
  }

  for (var j=1; j < sum/2; j++){
    // if j is not in baggage and sum-j is not in baggage
    if (baggage.indexOf(j) == -1 && baggage.indexOf(sum-j) == -1){
      // add j and sum-j back to baggage to make our new array we may add as a possible_combination
      var new_array = baggage.concat(j, sum-j);

      // if new_array is NOT a subArray of possible_combinations yet... 
      if (!isSubArray(new_array,possible_combinations)){
        possible_combinations.push(new_array);
      }

      // prep new_baggage and send new sum and baggage back to top of the function
      var new_baggage = baggage.concat(j);
      getAllPossAddends(sum-j, new_baggage);
    }
  }

  return possible_combinations;
}
```

Let's walk through it as if we called it with `getAllPossAddends(10)`, so `sum = 10` and `baggage` is `undefined`.

Right off the bat we use an `if` statement to check if `baggage` is undefined. If it is, we know that this is the "first time" we're running through `getAllPossAddends`, and that we should set `baggage = []` and reset `possible_combinations`. This setting of `baggage` to `[]` will make a little more sense in a minute.

Now to the meat of the function. First we loop from 1 to `sum/2` (5 in our case). We then do some checks against baggage, which we'll learn about in a minute. Note: this loop doesn't go up to 5 because we put `i < sum/2` not `i <= sum/2`, which is what we want-- remember there aren't 2 5s so we don't want `[5,5]` to count as a `possible_combination`.

Eventually we make a new_array and set it equal to `baggage.concat(j, sum-j)`. We don't have any baggage yet, so for the first run through, `j==1` and `sum-j==9`. And that's good, because [1,9] is a possible way of making 10. 

That's a start, but what about `[1,4,5]` or (gulp) `[1,2,3,4]`? This is the problem that the recursion handles:

```javascript
// prep new_baggage and send new sum and baggage back to top of the function
var new_baggage = baggage.concat(j);
getAllPossAddends(sum-j, new_baggage);
```

Basically, we want to take that `9` in `[1,9]` and expand it out to `[[1,9], [1,2,7], [1, 3, 6], [1, 4, 5]]`. We want to break that 9 down while keeping the 1 untouched (Notice how the `1` is the first element of every "sub-array"). I decided to call the `1` `baggage`, because it's like, just along for the ride. With the baggage taken care of, what we want to do to the 9 is very similar to what we set out to do the 10-- namely find all the ways to sum to it. Sounds like a case for recursion! 

We're going to call `getAllPossAddends` again, but first we have to set the `new_baggage`. In our example, right after we add `[1,9]`, 9 is the `sum-j` we want to break down further, and j is `1`, the baggage we want to pass along. We have to use `baggage.concat(j)` in case we got any baggage at the beginning of the run-through of the function, which will be the case every time except the first run-through.

On the second run-through in our example, the getAllPossAddends call is: `getAllPossAddends(9, [1])`. Now 9 is the new `sum` and `[1]` is the `baggage` (since `baggage` is defined, we do not execute that first `if` statement). 

So the array we prepare, `new_array`, WOULD BE [1,1,8], but we have a check against duplicated numbers: `if (baggage.indexOf(j) == -1 && baggage.indexOf(sum-j) == -1)`. `j`, which is equal to `1`, is in fact present in `baggage`, so we're not going to do anything in this `for` iteration. (Note: This is a bit wasteful, but refactoring further may make this thing a little too confusing.)

So we try again. On the next iteration of the `for` loop, `j` will be equal to 2 and `sum-j` == 7. This time we will make it through the `if` checks. `baggage` is still `[1]`, so when we get to `baggage.concat(2, 7)` it's going to evaluate to `[1,2,7]`. Then we'll add it to `possible_combinations`. 

We'll then call the function again which `sum-j` equal to 7 and `baggage` == `[1,2]`. So the call will be `getAllPossAddends(7, [1,2])`, and we'll go break down that 7. And so on! Crazy, right? 

### Part 2: Building My Own Array Tools

You may have noticed my use of a function called `isSubArray`. It checks whether the array we're trying to add to `possible_combinations` has already been added (again, we don't want duplicates). 

Of course this function is not a standard JavaScript function, but one I wrote myself. I ended up writing 3 of these "array helper" functions in total. 


```javascript
// believe it or not, array.sort sorts numbers alphabetically, so we have to define our own sort for numbers
function sortArray(array){ 
  return array.sort(function(a, b){return a-b});
}

// this guy takes an array of arrays and sorts all of its sub-arrays using the above function
function sortAllSubArrays(array){
  for(var i = 0; i < array.length; i++){
    array[i] = sortArray(array[i]);
  }
  return array;
}

// the workhorse function in the trio. It sorts both the sub-array and the array of arrays using their respective functions. 
// then sees if any of the arrays in `array` match the given `subArray`
function isSubArray (subArray, array) {
  subArray = sortArray(subArray); //  need to sort both the subArray...
  array = sortAllSubArrays(array); // and the sub-arrays in array in order to compare them more easily

  for(var i = 0; i < array.length; i++) {
    if(subArray.toString() === array[i].toString()){
      return true;
    }
  }
  return false;
}
```

### Part 3: Putting It All Together

Cool, so now we have an array, `possible_combinations`, that's full of all the ways our player could make a given sum (a given dice roll in our case). As I mentioned above, we also have an array of numbers that the player has left, called `player_moves_remaining`. Now all we have to do is compare them to figure out if the game is over.

Again, I broke this into 2 functions, but most of the work happens in `playerHasAMove`. `player_moves_left` is `player_moves_remaining` and `passing_moves` is our mega-awesome array of arrays, `possible_combinations`. 


```javascript
function playerHasAMove(player_moves_left, passing_moves){
  for(var i = 0; i < passing_moves.length; i++) {
    var matches = 0; 
    for(var j = 0; j < passing_moves[i].length; j++) {  
      if (player_moves_left.indexOf(passing_moves[i][j]) != -1){
        // we foudn a match
        matches = matches + 1;
      }
    }
    if (matches == passing_moves[i].length){
      return true;
    }
  }
  return false; 
}

function isGameOver(roll, player_moves_remaining){
  var ways_to_fulfill_roll = getAllPossAddends(roll);
  if (playerHasAMove(player_moves_remaining, ways_to_fulfill_roll)){
    return false; // game is not over
  } else {
    return true; // game is over
  }
}
```

`playerHasAMove` first loops over the `passing_moves` and yields the sub-arrays like `[1,9]` and `[1,3,6]`. It then loops through these sub-arrays and looks for `matches` in `player_moves_left` using the `indexOf` method. If, for a given sub-array, all of its element are contained in `player_moves_left`, we return true. If we get to the end of `passing_moves` and the player is out of luck, we return false. This easily plugs into `isGameOver`, where we return the final true/false verdict. 

Again, here's where `isGameOver` is called:

```javascript
// player just made a sum

if (board_array.indexOf(0) == -1){  // if board_array has no 0s, i.e. is all 1s 
  alert("Oh hey, You won!");
  resetGame();
} else { //still playing
  // re-roll dice. 
  computer_roll = rollTwoDie();

  // with new dice roll, we can already figure out if the game is over
  if (isGameOver(computer_roll, player_moves_remaining)){
    alert("Computer's next roll is " + computer_roll + "...Game over :(");
    resetGame();
  } else { // if there exists a way to make the roll's sum...
    sendMessage(randPraise() + "<br>New roll is " + computer_roll);
    // reset for new roll, same game
    possible_combinations = []; 
    player_total = 0;
  }
}
```

Think that's about it! 

_Side Note_: I hope to write more programs that have a `randPraise` function: 

```javascript
function randPraise(){
  var praise = ["Awesome!", "Good job!", "Knew you could do it!", "Sweet!", "You got this!", "Again! Again!", "Keep it up!", "Keep going!", "Easy, right?"];
  var rand = Math.floor(Math.random() * (praise.length));
  return praise[rand];
}
```

