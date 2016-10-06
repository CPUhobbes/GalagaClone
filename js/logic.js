//STATIC VARS

var IMG_LOC = "./img/";
var SPACE_SHIP = "ship.png";
var ALIEN_BEE = "alien_bee.png"
var MISSLE = "missle.png";

var SCREEN_HEIGHT = 288;
var SCREEN_WIDTH = 224;
var SCALAR = 3; //3 default
var CENTER;

//DYNAMIC VARS
var keyPresses = {}  //keyPressArray
var missleAvaliable = true;
var missleID=0;
var alienID = 0;
var misslePos = "left";
var ship;



//OBJECTS
function Ship(){
	this.src = IMG_LOC+SPACE_SHIP,
	this.alt = "Ship",
	this.width = 15*SCALAR,
	this.id = "ship",
	this.left = SCREEN_WIDTH*SCALAR/2-this.width/2,
	this.right = SCREEN_WIDTH*SCALAR/2 + this.width/2
}

function AlienBee(){
	this.src = IMG_LOC+ALIEN_BEE,
	this.alt = "Alien Bee",
	this.width = 15*SCALAR,
	this.id = "alien"
	// this.left = SCREEN_WIDTH*SCALAR/2-this.width/2,
	// this.right = SCREEN_WIDTH*SCALAR/2 + this.width/2
}

function ShipMissle(){
	this.src = IMG_LOC+MISSLE,
	this.alt = "Missle",
	this.width = 3*SCALAR+"px",
	this.id = "missle"+missleID,
	this.class = "missle"
}

//FUNCTIONS
function checkBrowserDim(){
	SCALAR = Math.floor($(window).height()/SCREEN_HEIGHT);
	if(SCALAR === 0){
		SCALAR =1;
	}
	CENTER = Math.floor($(window).width()/2)-(SCREEN_WIDTH*SCALAR/2);
}

function createShip(){
	
	$("#space_ship_area").append($('<img>').attr({
		src: ship.src,
		alt: ship.alt,
		width: ship.width+"px",
		id: ship.id
	}));
	$('#ship').css({
		left: ship.left
	});

	ship.top = $("#ship").offset().top;
	
}

function fireMissle(obj, ID){
	var imgBuffer= 0;
	if(misslePos === "right"){
		misslePos = "left";
		imgBuffer = 13*SCALAR;
	}
	else{
		misslePos = "right";
		imgBuffer = 0;
	}

	$("#missle"+ID).css({
	left: $("#ship").position().left+imgBuffer,
	top: $("#ship").offset().top,
	visibility: "visible"

	});
	$("#missle"+ID).animate({top: (-10*SCALAR)},{ 
		duration: 500, 
		easing: "linear", 
		step: function(){
			console.log($("#missle"+ID).position().top); //Check missle for colllions
			},
		done: function(){
				$("#missle"+ID).remove();
			}

	});   

	// console.log($("#ship").offset().left);
	// console.log($("#ship").offset().top);


}

function createMissle(){
	var missle = new ShipMissle();
	$("#screen").append($('<img>').attr({
		src: missle.src,
		alt: missle.alt,
		width: missle.width+"px",
		id: missle.id,
		class: missle.class
	}));
	fireMissle(missle, missleID);
	missleID+=1;
	delete missle;
}

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
        }
        
        if ((key === 39 || key === 68) && $("#ship").position().left < SCREEN_WIDTH*SCALAR-15*SCALAR) { //15*SCALAR is ship width from ship obj
            $("#ship").animate({left: "+="+SCALAR*2}, 0);  
        }
}

function initializeGame(){
	checkBrowserDim();
	adjustScreen();
	ship = new Ship();
	createShip();
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






