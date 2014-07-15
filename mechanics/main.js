/**
 * this file should contain all global variables and the main game loop and the function for starting the main game loop
 */

var loader = new createjs.LoadQueue(false);
loader.addEventListener("complete", handleComplete);
// preload.addEventListener("progress", handleProgress);

loader.loadManifest([	{id: "logo", src: "images/executivemanlogo.png"},
                    	{id: "slide_one", src: "images/intro/1.png"},
                    	{id: "slide_two", src: "images/intro/2.png"},
                    	{id: "slide_three", src: "images/intro/3.png"},
                    	{id: "slide_four", src: "images/intro/4.png"},
                    	{id: "slide_five", src: "images/intro/5.png"},
                    	{id: "slide_six", src: "images/intro/6.png"},
						{id: "map1", src: "images/map1.png"},
						{id: "map2", src: "images/map2.png"},
						{id: "buttons", src: "images/buttons.png"},
						{id: "businessman", src: "images/businessmanspritesheet.png"},
						{id: "printerguy", src: "images/printerguy.png"},
						{id: "shieldguy", src: "images/shieldguy.png"},
						{id: "shot", src: "images/shot.png"},
						{id: "health", src: "images/healthbar.png"},
						{id: "explosion", src: "images/explosion.png"},
						{id: "shotexplosion", src: "images/shotexplode.png"},
						{id: "flood", src: "images/flood.png"},
						{id: "enemyshot", src: "images/enemyshot.png"},
						{id: "papershot", src: "images/papershot.png"},
						{id: "bossframe", src: "images/bossframe.png"},
						{id: "wastemanframe", src: "images/wastemanframe.png"},
						{id: "shopframe", src: "images/shopframe.png"},
						{id: "accountingmanframe", src: "images/accountingmanframe.png"},
						{id: "wasteman", src: "images/wastemanspritesheet.png"},
						{id: "accountingman", src: "images/accountingmansprite.png"},
						{id: "wastemanshot", src: "images/wastemanshot.png"},
						{id: "filingcabinet", src: "images/filingcabinet.png"},
						{id: "killcopy", src: "images/killcopy.png"},
						{id: "extralife", src: "images/extralife.png"},
						{id: "bighealth", src: "images/bighealth.png"},
						{id: "healthbriefcase", src: "images/healthbriefcase.png"},
						{id: "littlehealth", src: "images/littlehealth.png"},
						{id: "executivemantopper", src: "images/executivemantopper.png"},
						{id: "wastemanshotdown", src: "images/wastemanshotdown.png"},
						{id: "door", src: "images/door.png"},
					//	{id: "wastemansoundloop", src: "sounds/wastemansoundloop.mp3"},
						{id: "copter", src: "images/copter.png"}]);




function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

window.mobilecheck = function() {
var check = false;
(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true;})(navigator.userAgent||navigator.vendor||window.opera);
return check; };

function handleComplete() {
	/*backgroundImage = preload.getResult("background");
	treesImage = preload.getResult("trees");
	groundImage = preload.getResult("ground");

	loadProgressLabel.text = "Loading complete click to start";
	stage.update();

	canvas.addEventListener("click", handleClick);*/
	setTimeout(function() {
		init();
	}, 100);
}

var clicked = false;
var itemDropCount = 0;
var lives = 2;
var healthBriefCases = 0;
var gamezoom = 2;
var stage;
var altstage;
var gamestage;
var pausestage;
var watchedElements;
var player;
var mapper;
var showOffBossScreenCounter = 0;
var tileCollisionDetector;
var startgame;
var startlevel = false;
var bossscreenCounter = 0;
var mobile = false;

if (window.mobilecheck()) {
	mobile = true;
}
var fpsLabel;
var scoreLabel;
var logFPS = false;
var buttonSpriteSheet;
var skipCounter = 0;
var lowFramerate = 1; // 2 for 30FPS!
var skipFrames = 1;
var menuUp = false;
var score = 0;

var bossframes = [];

var explosionSprite;
var shotExplosionSprite;

var leftButtonSprite;
var rightButtonSprite;
var shootButtonSprite;
var pauseButtonSprite;

// powerups:
var doubleJump = false;
var damageModifier = 1;
var healthModifier = 1;
var scoreModifier = 1;


var titleSreenSprite;

function init() {
	initVars();
	initTitleScreen();
}

function initVars() {
	stage = null;
	gamestage = null;
	watchedElements = null;
	player = null;
	mapper = null;
	tileCollisionDetector = null;
}

window.onresize = function(event) {
	var zoomAmount = window.innerHeight / 256;

	gamezoom = zoomAmount;
	gamestage.canvas.width = window.innerWidth / zoomAmount;
	gamestage.canvas.height = window.innerHeight / zoomAmount;
	document.getElementById("gamecanvas").style.zoom = zoomAmount;
	document.getElementById("gamecanvas").style.MozTransform = "scale("+zoomAmount+")";
	initTouchControls();
};

function beginGame(newGame) {

	if (newGame && lives < 2) {
		lives = 2;
	}

	if (newGame) {
		halfwayPointReached = false;
		bosspointReached = false;
	}

	var explosionSpriteSheet = new createjs.SpriteSheet({
			"images": [loader.getResult("explosion")],
			"frames": {
				"width": 25, "height": 25, "count": 4
			},
			"animations": {
				"explode": {
					"frames" : [0, 1, 2, 3],
					"speed" : 0.125,
					"next" : "nothing"
				},
				"nothing": {
					"frames" : [4],
					"speed" : 0.125,
					"next" : "nothing"
				}
			}
		});

	explosionSprite = new createjs.Sprite(explosionSpriteSheet, "explode");
	var shotExplosionSpriteSheet = new createjs.SpriteSheet({
			"images": [loader.getResult("shotexplosion")],
			"frames": {
				"width": 16, "height": 16, "count": 1
			},
			"animations": {
				"explode": {
					"frames" : [0],
					"next" : "explode"
				}
			}
		});

	shotExplosionSprite = new createjs.Sprite(shotExplosionSpriteSheet, "explode");
	gamestage = new createjs.Stage("gamecanvas");
	gamestage.clear();
	gamestage.snapToPixelEnabled = true;

	var zoomAmount = window.innerHeight / ((mobile) ? 288 : 240);

	gamezoom = zoomAmount;
	gamestage.canvas.width = window.innerWidth / zoomAmount;
	gamestage.canvas.height = window.innerHeight / zoomAmount;
	document.getElementById("gamecanvas").style.zoom = zoomAmount;
	document.getElementById("gamecanvas").style.MozTransform = "scale("+zoomAmount+")";

	gamestage.canvas.style.backgroundColor = "#000";

	watchedElements = [];
	mapper = new Mapper(gamestage);

	if (bosspointReached) {
		if (bossnumber === 0) {
			mapper.mapData = maps[wastemanBossPoint];
			mapper.mapcounter = wastemanBossPoint;
		} else if (bossnumber === 1) {
			mapper.mapData = maps[accountingmanBossPoint];
			mapper.mapcounter = accountingmanBossPoint;
		}
	} else if (halfwayPointReached) {
		if (bossnumber === 0) {
			mapper.mapData = maps[wastemanHalfwayPoint];
			mapper.mapcounter = wastemanHalfwayPoint;
		} else if (bossnumber === 1) {
			mapper.mapData = maps[accountingmanHalfwayPoint];
			mapper.mapcounter = accountingmanHalfwayPoint;
		}
	}

    player = new Player();
	mapper.initMap();
	watchedElements.push(player);

	tileCollisionDetector = new TileCollisionDetector();

	watchedElements.push(mapper);

	if (mobile) {

		buttonSpriteSheet = new createjs.SpriteSheet({
			"images": [loader.getResult("buttons")],
			"frames": {
				"width": 64, "height": 64, "count": 4
			},
			"animations": {
				"left": {
					"frames" : [0],
					"next" : "left"
				},
				"right" : {
					"frames" : [1],
					"next" : "right"
				},
				"shoot" : {
					"frames" : [2],
					"next" : "shoot"
				},
				"pause" : {
					"frames" : [3],
					"next" : "pause"
				}
			}
		});
		leftButtonSprite = new createjs.Sprite(buttonSpriteSheet, "left");
		rightButtonSprite = new createjs.Sprite(buttonSpriteSheet, "right");
		shootButtonSprite = new createjs.Sprite(buttonSpriteSheet, "shoot");
		pauseButtonSprite = new createjs.Sprite(buttonSpriteSheet, "pause");

		leftButtonSprite.x = 16;
		rightButtonSprite.x = 96;
		shootButtonSprite.x = gamestage.canvas.width - 64;
		leftButtonSprite.y = gamestage.canvas.height - 64;
		rightButtonSprite.y = gamestage.canvas.height - 64;
		shootButtonSprite.y = gamestage.canvas.height - 64;
		pauseButtonSprite.y = -32;
		pauseButtonSprite.x = 0;
		initTouchControls();
	}

	if (logFPS) {
		fpsLabel = new createjs.Text("", "bold 14px Arial", "#FFF");
		gamestage.addChild(fpsLabel);

		fpsLabel.x = gamestage.canvas.width - 50;
		fpsLabel.y = 18;
	}

	scoreLabel = new createjs.Text("$ ", "bold 10px Arial", "#FFF");
	gamestage.addChild(scoreLabel);

	scoreLabel.x = gamestage.canvas.width - 256;
	scoreLabel.y = 18;

	createjs.Ticker.addEventListener("tick", handleTick);
	createjs.Ticker.useRAF = true;
	if (getParameterByName('lowfps')) {
		createjs.Ticker.setFPS(30); // NORMALLY 60
		lowFramerate = 2;
	} else {
		createjs.Ticker.setFPS(60); // NORMALLY 60
	}

	if (getParameterByName('skipframes')) {
		skipFrames = parseInt(getParameterByName('skipframes'));
	}
}

function initTouchControls() {
	gamestage.removeChild(leftButtonSprite);
	gamestage.removeChild(rightButtonSprite);
	gamestage.removeChild(shootButtonSprite);
	gamestage.removeChild(pauseButtonSprite);
	gamestage.addChild(leftButtonSprite);
	gamestage.addChild(rightButtonSprite);
	gamestage.addChild(shootButtonSprite);
	gamestage.addChild(pauseButtonSprite);
}



var bossnumber = 0;



function handleTick(event) {



	itemDropCount++;
	if (itemDropCount === 5) {
		itemDropCount = 0;
	}

	if (!mapper) {
		return;
	}

	if (!mapper.doneRendering) {
		return;
	} else if (mapper.transitiondown || mapper.transitionright) {

		mapper.tickActions({});
		gamestage.update();
		return;
	}

	if (mapper.showingReadyLabel) {
		gamestage.update();
		return;
	}

	if (menuUp) {
		return;
	}

	if (player.paused) {
		gamestage.update();
		return;
	}
	var actions = {"event" : event};

	actions.mobile = mobile;
	if (mobile) {

	}


	var modifier = 4;
	var xmodifier = 7;
	var playerCollisionPoints = {
		leftTop : { x: player.x + xmodifier, y: player.y + modifier },
		leftBottom : { x: player.x + xmodifier, y: player.y + player.animations.spriteSheet._frameHeight - modifier },
		bottomLeft : { x: player.x + xmodifier + 4 , y: player.y + player.animations.spriteSheet._frameHeight  },
		bottomRight : { x: player.x + player.animations.spriteSheet._frameWidth - xmodifier - 4, y: player.y + player.animations.spriteSheet._frameHeight },
		rightBottom : { x: player.x + player.animations.spriteSheet._frameWidth - xmodifier, y: player.y + player.animations.spriteSheet._frameHeight - modifier },
		rightTop : { x: player.x + player.animations.spriteSheet._frameWidth - xmodifier, y: player.y + modifier },
		topRight : { x: player.x + player.animations.spriteSheet._frameWidth - xmodifier - 4, y: player.y + modifier },
		topLeft : { x: player.x + xmodifier + 4, y: player.y + modifier }
	};
	var playerDeathCollisionPoints = {
		leftTop : { x: player.x + xmodifier * 2, y: player.y + modifier * 2 },
		leftBottom : { x: player.x + xmodifier * 2, y: player.y + player.animations.spriteSheet._frameHeight - modifier * 2 },
		bottomLeft : { x: player.x + xmodifier * 2 + 4 , y: player.y + player.animations.spriteSheet._frameHeight -5  },
		bottomRight : { x: player.x + player.animations.spriteSheet._frameWidth - xmodifier * 2 - 4, y: player.y + player.animations.spriteSheet._frameHeight -5 },
		rightBottom : { x: player.x + player.animations.spriteSheet._frameWidth - xmodifier * 2, y: player.y + player.animations.spriteSheet._frameHeight - modifier * 2 },
		rightTop : { x: player.x + player.animations.spriteSheet._frameWidth - xmodifier * 2, y: player.y + modifier * 2 },
		topRight : { x: player.x + player.animations.spriteSheet._frameWidth - xmodifier * 2 - 4, y: player.y + modifier * 2 },
		topLeft : { x: player.x + xmodifier * 2 + 4, y: player.y + modifier * 2 }
	};

	actions.collisionResults = tileCollisionDetector.checkCollisions(playerCollisionPoints, mapper.collisionArray, mapper.getCurrentHeightOffset(), (mapper.widthOffset + mapper.completedMapsWidthOffset));
	actions.deathCollisionResults = tileCollisionDetector.checkCollisions(playerDeathCollisionPoints, mapper.deathCollisionArray, mapper.getCurrentHeightOffset(), (mapper.widthOffset + mapper.completedMapsWidthOffset));



	watchedElements.forEach(function(element) {
		element.tickActions(actions);
	});

	this.mapper.enemies.forEach(function(element) {
		element.tickActions(actions);
	});

	//  { leftmove : true, downmove : true, rightmove : true, upmove : true, nextmap : false }
	if (((!actions.deathCollisionResults.leftmove || !actions.deathCollisionResults.leftmove || !actions.deathCollisionResults.upmove || !actions.deathCollisionResults.downmove) && !actions.deathCollisionResults.nextmap) || player.health <= 0) {
		actions.playerDeath = true;
		lives--;

		if (lives < 0) {
			setTimeout(function() {
				initVars();
				initBossScreen();
			}.bind(this), 2000);

			event.remove();
		} else {
			setTimeout(function() {
				initVars();
				beginGame(false);
			}.bind(this), 2000);

			event.remove();
		}
		//init();
	}

	if (logFPS) {
		fpsLabel.text = Math.round(createjs.Ticker.getMeasuredFPS()) + " / " + Math.round(createjs.Ticker.getFPS());
	}
	scoreLabel.text = "$ " + score;

	if (skipFrames === 1) {
		gamestage.update();
	} else if (skipCounter === skipFrames) {
		skipCounter = 0;
		gamestage.update();
	}

    skipCounter++;
}
