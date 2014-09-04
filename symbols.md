# Concept

## Levels, movement
Symbols is simple rpg game. Main hero is a symbol **choose symbol at start of
the game.** It can move through level, which representing flat area. Actually it's a book page with short story. Several sentences, hundred words. Each symbol of word can be object with it's own properties. Some of symbols can become aggressive enemy, npc, treasures or quest symbols (stationary npcs).

The text of the level can be changed during play (as part of gaming).

Symbol become active when player approaches for some distance. Each special symbol can be noticed before it can be activated (Different colors or style or animation).

Player can move his character with pointing mouse in wanted direction. The speed of movement calculated according to distance between mouse pointer and coordinates of player.

To complete a level the player must to solve a puzzle, or kill boss moster.
about 10 levels.


## Enemies (monsters)
Can be aggressive or passive. Aggressive monsters starting to persuade player. Passive monsters don't care about player, but they can be killed. Each monster has its own area, and he moves in the circle around this place. Aggressive monsters starting to persuade player with speed about maximum speed of player, but they return to their area if distance between monster and center of his circle become too large.


## NPC
Some of symbols became NPC when player moves close to them. They can give some clues to player. Some of them want something in trade for this information.
### Interface of interaction
The approaching to the npc brings up the dialog. It's just a bubble with a text. In some cases player can input some text. It, in it's turn, can change the text of the bubble.  So... quests can be programmed independently from main game. In case of success (correct answer) player can get: symbols, words, clues (answers for some other puzzles).

Clues words or phrases must be emphasized with different color.


## Battle system
Player has some symbols. He can get symbols by killing monsters, by solving puzzles or he can just find some. During battle he can combine this symbols into words (He should know the *word*). Player can discover new words during his journey. If he does not have enough symbols for the word he can write just symbol (symbols). His own symbol is unlimited. Player can get some other unlimited symbols during his playing.

Commands (words, symbols) can be written with some frequency. (After command has been written it should take some time before the new one can be written). The period depend on level of player (see bellow).

Command can bring various effects. In general commands will damage monsters or reduce damage from them (if written in the *defense* area). But some words can produce other effects. Such as healing, stunning monsters, increasing attack or defense.


## Rpg system
The main parameters, which can be improved during game are: amount of health, attack and defense coefficients and delay between commands. All other parameters (amount of symbols, unlimited symbols and words) can be founded without any level dependencies (until it needed by story)


# Ideas, notes

* Puzzle with id of book + chapter + word
* Intro
* Luis Kerrol (Alice in wonderland)
* Artur Konan Doil (Sherlock Holms)
* Just digits (simple numbers)
* Wizard from ooz
* Duma (Muskets?)
* Treasure iland
* Gulliver travels
* Robinzon Cruzo
* [books](http://www.goodreads.com/list/tag/public-domain)

# Tasks
## Tasks format (date in format YYMMDD + optional counter)
140904 - Create log panel (left of main canvas)
140904-2 - Bug with mouse click
140903-1 Fix bug with offset of power symbols
140903-2 Power should be from min to max
140903-3 buitify output (left, rigth, top margins, font colour)
        [textures](http://bashcorpo.deviantart.com/art/Grungy-paper-texture-v-6-37649221)
140903-4 Create quest engine (aggregator)
140903-5 Create battle engine (aggregator)
140903-6. level editor
140903-7. set background for whole page (make some pics for it.)

# Complited Tasks
140903-8 Stop loop when player 
+. Переписать engine на node.js (Вместо текущего static nginx)
+ Set image background for canvas (paper) (2014-01-07 Tue 10:38 PM)
+ fix bug with mouse coordinates (some strange offset) 2014-01-07 Tue 02:11 AM
+ Enter caption before canvas ("Symbols"). pick up nice font for that 2014-01-07 Tue 02:11 AM
+ Centralize canvas(2014-01-06 Mon 11:26 PM)
+ Finish concept (2014-01-06 Mon 11:03 PM)
+ Сделать ревью проекта (2014-01-02 18:53)
+ Bug не отображаются фоновые символы (2014-01-02 18:54)

