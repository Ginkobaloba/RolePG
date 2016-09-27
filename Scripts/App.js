var dice4 = new Dice(4);
var dice6 = new Dice(6);
var dice8 = new Dice(8);
var dice10 = new Dice(10);
var dice12 = new Dice(12);
var dice20 = new Dice(20);
var characterSelect = false;
var isInBattle = false;
var player1 = new Person();
var enemy = new Person();
$(document).ready(function() {
    
    $("#message_begin").fadeIn(3000);
    $("#area_main").fadeIn(3000);
    $("#enemycontainer").fadeIn(3000);
    $("#playercontainer").fadeIn(3000);
    $("#command_line").fadeIn(3000);
    $("form").submit(function() {
        var input = $("#command_line").val();
        if (input.indexOf("help") > -1) {
            if (input == "help") {
                $("#message_help").clone().insertBefore("#placeholder").fadeIn(1000);
            }
        }
        else if(characterSelect == false && isInBattle == false){
            enemy.gold = goldAmount();
            selectCharacter(input);
            firstBattle();
        }
        else if(isInBattle == false && characterSelect == true){
            newBattle();
        }
        else if(player1.health <= 0 || enemy.health <= 0){
            if(player1.health <= 0 && enemy.health <= 0){
                draw();
            }
            else if(player1.health > 0){
                endOfBattle();
            }else if(enemy.health > 0){
                $("#dead").clone().insertBefore("#placeholder").fadeIn(1000);
                finalGold();
                isInBattle = false;
            }
        }
        else if(isInBattle = true){
            if(input != ""){
            playerAttack();
            }
        }
        else if (input != "") {
            $('<p>I don\'t understand "' + input + '"</p>').insertBefore("#placeholder").fadeIn(1000);
        }
        $("#console").scrollTop($("#console")[0].scrollHeight);
$("#command_line").val("");


function playerAttack(){
    var damage = 0;
    input = input.toLowerCase().replace(/\s+/g, '')
    if(input.indexOf("normalattack") > -1){
        if(input == "normalattack"){
            damage = normalAttack();
            if(damage != 0){
            $("<p>You've choosen a normal attack. You attack and hit your target for " + damage + " damage.</p>").insertBefore("#placeholder").fadeIn(1000);
        } else{
            missedAttack();
        }
    }
    } else if(input.indexOf("quickattack") > -1){
        if(input == "quickattack"){
            damage = quickAttack();
            if(damage != 0){

            $("<p>You've choosen a quick attack. You've attacked and hit your target for " + damage + " damage.</p>").insertBefore("#placeholder").fadeIn(1000);
        } else{
            missedAttack();
        }
    }
    } else if(input.indexOf("heavyattack") > -1){
      if(input == "heavyattack"){
            damage = heavyAttack();
            if(damage != 0){	
       $("<p>You went with the heavy attack. You hit the enemy and hit your target for " + damage + " and have caused some real damage.</p>").insertBefore("#placeholder").fadeIn(1000);
        } else{
            missedAttack();
        }
    }
    }
    loseHealth(enemy, damage);
    CPUAttack();
    displayPlayerHealth();
}
});

});
//  var bar = new ProgressBar.Path('#playerheart-path', {
//  easing: 'easeInOut',
//   duration: 3000
// });

// bar.set(0);
// bar.animate(.5);  // Number from 0.0 to 1.0

// var bar = new ProgressBar.Path('#enemyheart-path', {
//    easing: 'easeInOut',
//   duration: 3000
// });

// bar.set(0);
// bar.animate(1.0);  // Number from 0.0 to 1.0
function selectCharacter(input){
if(input.indexOf("cowboy") > -1 && characterSelect == false){
           if(input == "cowboy"){
               $("#cowboy_choice").clone().insertBefore("#placeholder").fadeIn(1000)
               $("#cowboy_weapon").clone().insertBefore("#placeholder").fadeIn(1000);
               characterSelect = true;
           }
        }else if(input.indexOf("ninja") > -1 && characterSelect == false){
           if(input == "ninja"){
               $("#ninja_choice").clone().insertBefore("#placeholder").fadeIn(1000)
               $("#ninja_weapon").clone().insertBefore("#placeholder").fadeIn(1000)
                characterSelect = true;
            }
        }else if(input.indexOf("alien") > -1 && characterSelect == false){
            if(input == "alien"){
               $("#alien_choice").clone().insertBefore("#placeholder").fadeIn(1000)
               $("#alien_weapon").clone().insertBefore("#placeholder").fadeIn(1000);
               characterSelect = true;
           }
           }
           printHealth.call(player1, "You have ", "health.");
           printGold.call(player1, "You have ", "gold.");
}

function firstBattle(){
    $("#time_to_fight").clone().insertBefore("#placeholder").fadeIn(1000);
    $("#itIsTime").clone().insertBefore("#placeholder").fadeIn(1000);
    $("<p>Type 'help' for instructions</p>").insertBefore("#placeholder").fadeIn(1000);
    isInBattle = true;
}

function endOfBattle(){
    player1.gold = player1.gold + enemy.gold;
    displayPlayerGold();
    gainHealth();
    isInBattle = false;
    enemy.health = 100;
    $("#earned_gold").clone().insertBefore("#placeholder").fadeIn(1000);
    $("<p>Press 'Enter' to start new battle.</p>").insertBefore("#placeholder").fadeIn(1000);
}
function newBattle(){
    $("#time_to_fight").clone().insertBefore("#placeholder").fadeIn(1000);
    $("#new_fight").clone().insertBefore("#placeholder").fadeIn(1000);
    isInBattle = true;
}

function draw(){
    $("#draw").clone().insertBefore("#placeholder").fadeIn(1000)
    $("#dead").clone().insertBefore("#placeholder").fadeIn(1000);
}
function Dice(dice){
    this.dice = dice;
}

Dice.prototype.getRandomNumber = function(){
    return Math.round(Math.random() * this.dice);
}


function Person(){
    this.health = 100;
    this.gold = 0;
}

function printHealth(title, suffix){
    console.log(title, this.health, suffix)
}
function printGold(title, suffix){
    console.log(title, this.gold, suffix)
}
function gainHealth(){
    player1.health = player1.health + 50;
    if(player1.health >= 100){player1.health = 100;}
    $("<p>You have gained 50 health for winning! <br>Your health is now: " + player1.getHealth() +  " </p>").insertBefore("#placeholder").fadeIn(1000);
}
Person.prototype.getHealth = function(){
    return this.health;
}

Person.prototype.getGold = function(){
    return this.gold;
}

function displayPlayerHealth(){
     $("<p>Your health is: " + player1.getHealth() + "<br>Enemy health is: " + enemy.getHealth() + " </p>").insertBefore("#placeholder").fadeIn(1000);

}
function displayPlayerGold(){
     $("<p>The enemy had: " + enemy.getGold() + " Gold.<br>" + "Your Gold is now: " + player1.getGold() + " </p>").insertBefore("#placeholder").fadeIn(1000);    
}
function finalGold(){
     $("<p>Your final Gold amount is : " + player1.getGold() + " </p>").insertBefore("#placeholder").fadeIn(1000);    
}
function checkAlive(){
    if(player1.getHealth > 0){
        return true;
    }else {
        return false;
    }
}
function missedAttack(){
    $("<p>You missed your attack!</p>").insertBefore("#placeholder").fadeIn(1000);
}
function enemyMissedAttack(){
    $("<p>Enemy missed their attack!</p>").insertBefore("#placeholder").fadeIn(1000);
}
function quickAttack(){
    var hitDamage = Math.round(Math.random() * dice8.getRandomNumber());
				if (hitDamage < 4){ 
				hitDamage = 4;
				}
    if(Math.random() <= .9){ return hitDamage;}
    return 0;
}

function normalAttack(){
    var hitDamage = Math.round(Math.random() * dice12.getRandomNumber());
	if (hitDamage < 7){ 
				hitDamage = 7;
				}
    if(Math.random() <= .75){ return hitDamage;}
    return 0;
}

function heavyAttack(){
    var hitDamage = Math.round(Math.random() * dice20.getRandomNumber());
	if (hitDamage < 12){ 
				hitDamage = 12;
				}
    if(Math.random() <= .55){return hitDamage;} 
    return 0;
}

function goldAmount(){
    return Math.round(Math.random() * 100);
}

function loseHealth(playerHealth, hitDamage){
    playerHealth.health = playerHealth.health - hitDamage;
}

function takeDamage(playerHealth, hitDamage){
    var qAttack = quickAttack();
    var nAttack = normalAttack();
    var hAttack = heavyAttack();

    if(playerHealth > 0){loseHealth(playerHealth,hitDamage);}
}

function CPUAttack(){
    var hitDamage = Math.random() * 100;
    if(hitDamage < 33){
        var damage = quickAttack();
         if(damage != 0){
            $("<p>Your opponent has launched a quick attack and hit you for " + damage + " Oooh, is that blood?</p>").insertBefore("#placeholder").fadeIn(1000);
        } else{
            enemyMissedAttack();
    }
}
    else if(hitDamage < 66){
        var damage = normalAttack();
         if(damage != 0){
            $("<p>Your opponent has launched a normal attack and hit you for " + damage + " Be careful.</p>").insertBefore("#placeholder").fadeIn(1000);
        } else{
            enemyMissedAttack();
    }
}
    else{
        var damage = heavyAttack();
         if(damage != 0){
            $("<p>Your opponent has launched a heavy attack and hit you for " + damage + " Ouch, that looks like it hurt.</p>").insertBefore("#placeholder").fadeIn(1000);
        } else{
            enemyMissedAttack();
    }
    }
    loseHealth(player1, damage);
}















