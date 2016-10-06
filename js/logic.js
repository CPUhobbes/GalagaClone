//STATIC VARS

var IMG_LOC = "./img/";
var SPACE_SHIP = "ship.png";
var MISSLE = "missle.png";
var SCREEN_HEIGHT = 288;
var SCREEN_WIDTH = 224;
var SCALAR = 3; //3 default
var CENTER;

//DYNAMIC VARS
var keyPresses = {}  //keyPressArray
var missleAvaliable = true;
var missleID=0;
var misslePos = "left";


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
		src: IMG_LOC+SPACE_SHIP,
		alt: "Ship",
		width: 20*SCALAR+"px",
		id: "ship"
	}));
	$('#ship').css({
		left: SCREEN_WIDTH*SCALAR/2
	});
}

function fireMissle(ID){
	var imgBuffer= 0;
	if(misslePos === "right"){
		misslePos = "left";
		imgBuffer = 17*SCALAR;
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
	$("#missle"+ID).animate({top: (-10*SCALAR)}, 500, "linear", function(){
		$("#missle"+ID).remove();

	});   

	console.log($("#ship").offset().left);
	console.log($("#ship").offset().top);

}

function createMissle(){
	$("#screen").append($('<img>').attr({
		src: IMG_LOC+MISSLE,
		alt: "Missle",
		width: 3*SCALAR+"px",
		id: "missle"+missleID,
		class: "missle"
	}));
	fireMissle(missleID);
	missleID+=1;
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
	if (key === 37 || key === 65) {
            $("#ship").animate({left: "-="+SCALAR*2}, 0);                
        }
        
        if (key === 39 || key === 68) {
            $("#ship").animate({left: "+="+SCALAR*2}, 0);  
        }
}

function initializeGame(){
	checkBrowserDim();
	adjustScreen();
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






