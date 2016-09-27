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
var bar = new ProgressBar.SemiCircle(playercontainer, {
 strokeWidth: 6,
 color: '#FFEA82 ',
 trailColor: '#eee',
 trailWidth: 1,
 easing: 'easeInOut',
 duration: 1400,
 svgStyle: null,
 text: {
   value: '',
   alignToBottom: false
 },
 from: {color: '#FFEA82 '},
 to: {color: '#ED6A5A '},
 // Set default step function for all animate calls
 step: (state, bar) => {
   bar.path.setAttribute('stroke', state.color);
   var value = Math.round(bar.value() * 100);
   if (value === 0) {
     bar.setText('Dead');
   } else {
     bar.setText("Player");
   }

   bar.text.style.color = state.color;
 }
});
bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
bar.text.style.fontSize = '2rem';

bar.animate(0);  // Number from 0.0 to 1.

var bar = new ProgressBar.SemiCircle(enemycontainer, {
 strokeWidth: 6,
 color: '#FFEA82 ',
 trailColor: '#eee',
 trailWidth: 1,
 easing: 'easeInOut',
 duration: 1400,
 svgStyle: null,
 text: {
   value: '',
   alignToBottom: false
 },
 from: {color: '#FFEA82 '},
 to: {color: '#ED6A5A '},
 // Set default step function for all animate calls
 step: (state, bar) => {
   bar.path.setAttribute('stroke', state.color);
   var value = Math.round(bar.value() * 100);
   if (value === 0) {
     bar.setText('Dead');
   } else {
     bar.setText("Enemy");
   }

   bar.text.style.color = state.color;
 }
});
bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
bar.text.style.fontSize = '2rem';

bar.animate(1.0);  // Number from 0.0 to 1.0 UPDATE NUMBERS

function Dice(dice){
	this.dice = dice;
}

Dice.prototype.getRandomNumber = function(){
	return Math.round(Math.random() * this.dice);
}

var dice4 = new Dice(4);
var dice6 = new Dice(6);
var dice8 = new Dice(8);
var dice10 = new Dice(10);
var dice12 = new Dice(12);
var dice20 = new Dice(20);

function Person(name,type){
	this.name = name;
	this.health = 100;
	this.gold = 0;
	this.type = type;
}

Person.prototype.getName = function(){
	return this.name;
}

Person.prototype.getHealth = function(){
	return this.health;
}

Person.prototype.getGold = function(){
	return this.gold;
}

Person.prototype.getType = function(){
	return this.type;
}

var player1 = new Person("name", "type");
var player2 = new Person("name", getType());

function checkAlive(){
	if(player1.getHealth > 0 && player2.getHealth > 0){
		return true;
	}else {
		return false;
	}
}

function quickAttack(){
	var hitDamage = Math.round(Math.random() * dice8.getRandomNumber());
	if(Math.random() <= .7){ return document.getElementById("nAttack").innerHTML = hitDamage;}
	return document.getElementById("nAttack").innerHTML = 0;
}

function normalAttack(){
	var hitDamage = Math.round(Math.random() * dice12.getRandomNumber());
	if(Math.random() <= .6){ return document.getElementById("nAttack").innerHTML = hitDamage;}
	return document.getElementById("nAttack").innerHTML = 0;
}

function heavyAttack(){
	var hitDamage = Math.round(Math.random() * dice20.getRandomNumber());
	if(Math.random() <= .4){return document.getElementById("nAttack").innerHTML = hitDamage;} 
	return document.getElementById("nAttack").innerHTML = 0;
}

function goldAmount(){
	return Math.round(Math.Random() * 100);
}

function getType(){
	var randomType = Math.random() * 100;

	if(randomType < 30){
		return "Ninja";
	}else if(randomType < 60){
		return "Alien";
	}else if(randomType < 90){
		return "Cowboy";
	}else {return "Dragon";}
}

function loseHealth(playerHealth, hitDamage){
	playerHealth = playerHealth - hitDamage;
	return playerHealth;
}

function takeDamage(playerHealth, hitDamage){
	var qAttack = quickAttack();
	var nAttack = normalAttack();
	var hAttack = heavyAttack();

	if(playerHealth > 0){loseHealth(playerHealth,hitDamage);}
}

function CPUAttack(){
	var hitDamage = Math.random() * 100;
	if(hitDamage < 33){return quickAttack();}
	else if(hitDamage < 66){return normalAttack();}
	else{return heavyAttack()};
}

$("#main_content").scrollTop($("#main_content")[0].scrollHeight);
$("#command_line").val("");