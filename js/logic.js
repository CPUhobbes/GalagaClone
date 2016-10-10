//STATIC VARS

var IMG_LOC = "./img/";
var SPACE_SHIP = "ship.png";
var ALIEN_BEE = "alien_bee.png"
var MISSLE = "missle.png";

var SCREEN_HEIGHT = 288;
var SCREEN_WIDTH = 224;
var SCALAR = 3; //3 default
var CENTER = 0;

//IMAGE DIMENSIONS

//Ship
var SHIP_W = 0;
var SHIP_H = 0;

//Missle
var MISSLE_W = 0;
var MISSLE_H = 0;

//Alien Bee
var ALIEN_B_W = 0;
var ALIEN_B_H = 0;

//DYNAMIC VARS
var keyPresses = {}  //keyPressArray
var missleAvaliable = true;
var missleID=0;
var alienID = 0;
var alienLeft = 0;
var alienTop = 0;
var misslePos = "left";
var ship;
var alienList = [];

//FUNCTIONS

//Check size of browser window
function checkBrowserDim(){
	SCALAR = Math.floor($(window).height()/SCREEN_HEIGHT);
	if(SCALAR === 0){
		SCALAR =1;
	}
	CENTER = Math.floor($(window).width()/2)-(SCREEN_WIDTH*SCALAR/2);
}

//Adjust screen area based on browser window size
function adjustScreen(){
	$("#screen").css({
		width: SCREEN_WIDTH*SCALAR,
		height: SCREEN_HEIGHT*SCALAR,
		left: CENTER,
	});
	$("#space_ship_area").css({
		width: SCREEN_WIDTH*SCALAR
	});

}

function updateImageDim(){
	//Ship
	SHIP_W = 15*SCALAR;
	SHIP_H = 18*SCALAR;

	//Missle
	MISSLE_W = 3*SCALAR;
	MISSLE_H = 6*SCALAR;

	//Alien Bee
	ALIEN_B_W = 15*SCALAR;
 	ALIEN_B_H = 15*SCALAR;

}

function createShip(){
	
	$("#space_ship_area").append($('<img>').attr({
		src: ship.src,
		alt: ship.alt,
		width: ship.width+"px",
		height: ship.height+"px",
		id: ship.id
	}));
	$('#ship').css({
		left: ship.left,
	});
	ship.top = $("#ship").offset().top;
}

function getMissleBank(){
	if(misslePos === "right"){
		misslePos = "left";
		return 13*SCALAR;
	}
	else{
		misslePos = "right";
		return 0;
	}
}

function checkCollision(missle, spacecraft){
	if((missle.top <= spacecraft.top+ALIEN_B_H) &&
	 	((missle.left >= spacecraft.left &&
	 	missle.left <= spacecraft.left+ALIEN_B_W) ||
	 	(missle.left+MISSLE_W >= spacecraft.left &&
	 	missle.left+MISSLE_W <= spacecraft.left+ALIEN_B_W))){
			return true;
	}
	else{
		return false;
	}
}


function killAlien(alien){
	$(alien).remove();


}

function fireMissle(missleObj, ID){
	$("#missle"+ID).css({
	left: ship.left+getMissleBank(),
	top: ship.top,
	visibility: "visible"

	});
	$("#missle"+ID).animate({top: (-10*SCALAR)},{ 
		duration: 500, 
		easing: "linear", 
		step: function(){
				//console.log($("#missle"+ID).position().left+missleObj.width, $("#"+alienList[0].id).position().left+alienList[0].obj.width);
				 //Check missle for colllions
				 // if(($("#missle"+ID).position().top <= $("#"+alienList[0].id).position().top+alienList[0].obj.height) &&
				 // 	(($("#missle"+ID).position().left >= $("#"+alienList[0].id).position().left+20 &&
				 // 	$("#missle"+ID).position().left <= $("#"+alienList[0].id).position().left+alienList[0].obj.width+20) ||
				 // 	($("#missle"+ID).position().left+missleObj.width >= $("#"+alienList[0].id).position().left+20 &&
				 // 	$("#missle"+ID).position().left+missleObj.width <= $("#"+alienList[0].id).position().left+alienList[0].obj.width+20))){
				 // 		console.log("hit");
				 	//$("#missle"+ID).position().left+$("#missle"+ID).width()<= ){
					 	
					 	alienList.forEach(function(item, index){
					 		if($("#missle"+ID).length>0){
						 		if(checkCollision($("#missle"+ID).position(), $("#"+item.id).position())){
						 			$("#missle"+ID).stop();
						 			$("#missle"+ID).remove();
						 			delete missleObj;
						 			killAlien("#"+item.id);
						 			alienList.splice(index,1);

						 		}
						 	}



					 	});
					//  	if(checkCollision($("#missle"+ID).position(), $("#"+alienList[0].id).position())){
					//  		$("#missle"+ID).stop();
					//  		$("#missle"+ID).remove();
					//  		delete missleObj;
					//  }
				 // //}


				
			},
		done: function(){
				$("#missle"+ID).remove();
				delete missleObj;

			}
	});   
}

function createMissle(){
	var missle = new ShipMissle();
	$("#screen").append($('<img>').attr({
		src: missle.src,
		alt: missle.alt,
		width: missle.width+"px",
		height: missle.height+"px",
		id: missle.id,
		class: missle.class
	}));
	fireMissle(missle, missleID);
	missleID+=1;
}

function animateKeyPress() {
    for (var key in keyPresses) {
        if (!keyPresses.hasOwnProperty(key))continue;
	        if(parseInt(key) === 32  && missleAvaliable === true){
	        	missleAvaliable = false;
	        	setTimeout(function(){
	        			missleAvaliable = true; 
	        		}
	        	, 400);
	        	createMissle();
	        }
	        else{
	        	moveShip(parseInt(key));
	        }
    }
}

function moveShip(key){
	if ((key === 37 || key === 65) && $("#ship").position().left > 0) {
            $("#ship").animate({left: "-="+SCALAR*2}, 0);
            ship.left-=SCALAR*2;            
        }
        
        if ((key === 39 || key === 68) && $("#ship").position().left < SCREEN_WIDTH*SCALAR-15*SCALAR) { //15*SCALAR is ship width from ship obj
            $("#ship").animate({left: "+="+SCALAR*2}, 0); 
            ship.left+=SCALAR*2;   
        }
}

function createAliens(){
	var alienBee = new AlienBee();
	var alienBeeObj = {
		obj: alienBee,
		id: alienBee.id,
		xPos:20*SCALAR*alienLeft,
		yPos:20*SCALAR*alienTop
	};
	alienList.push(alienBeeObj); 
	console.log(alienList[alienID]);


	var tempImg = $('<img>').attr({
		src: alienBee.src,
		alt: alienBee.alt,
		width: alienBee.width+"px",
		height: alienBee.height+"px",
		id: alienBee.id,
		class: alienBee.class

	}).css({"left": alienBeeObj.xPos+"px", "top": alienBeeObj.yPos+"px"});
	$("#screen").append(tempImg);
	alienID+=1;

	if(alienLeft>8){
		alienLeft =0;
		alienTop+=1;
	}
	else{
		alienLeft+=1;
	}
	
}

//OBJECTS
function Ship(){
	this.src = IMG_LOC+SPACE_SHIP,
	this.alt = "Ship",
	this.width = 15*SCALAR,
	this.height = 18*SCALAR,
	this.id = "ship",
	this.left = SCREEN_WIDTH*SCALAR/2-this.width/2,
	this.right = SCREEN_WIDTH*SCALAR/2 + this.width/2
}

function AlienBee(){
	this.src = IMG_LOC+ALIEN_BEE,
	this.alt = "Alien Bee",
	this.width = 15*SCALAR,
	this.height = 15*SCALAR,
	this.id = "alien"+alienID,
	this.class = "alienBee"
	// this.left = SCREEN_WIDTH*SCALAR/2-this.width/2,
	// this.right = SCREEN_WIDTH*SCALAR/2 + this.width/2
}

function ShipMissle(){
	this.src = IMG_LOC+MISSLE,
	this.alt = "Missle",
	this.width = 3*SCALAR,
	this.height = 6* SCALAR,
	this.id = "missle"+missleID,
	this.class = "missle"
}

function generateAliens(){

	for (var i = 0;i<40;++i){
		createAliens();
	}

}



//RUN GAME
function initializeGame(){
	checkBrowserDim();
	adjustScreen();
	updateImageDim();
	ship = new Ship();
	createShip();
	generateAliens();
	console.log($("#alien0").offset().top,$("#alien0").offset().left);
}




$(document).ready(function(){
	initializeGame();
	//Moves ship every 20 millsec based on keypresses stored in keyPresses
	setInterval(animateKeyPress, 20);
	
});


$(document).keydown(function(event) {
    keyPresses[event.keyCode] = true;
});

$(document).keyup(function(event) {
    delete keyPresses[event.keyCode];
});






