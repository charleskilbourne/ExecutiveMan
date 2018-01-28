createjs.Sound.registerSound(RESOURCE_ROOT + "sounds/jumpland.wav", "jumpland");
createjs.Sound.registerSound(RESOURCE_ROOT + "sounds/shotbounce.wav", "shotbounce");
createjs.Sound.registerSound(RESOURCE_ROOT + "sounds/pauseopen.wav", "pauseopen");
createjs.Sound.registerSound(RESOURCE_ROOT + "sounds/pauseclose.wav", "pauseclose");
createjs.Sound.registerSound(RESOURCE_ROOT + "sounds/playerdamaged.wav", "playerdamaged");
createjs.Sound.registerSound(RESOURCE_ROOT + "sounds/shoot.wav", "shoot");
createjs.Sound.registerSound(RESOURCE_ROOT + "sounds/shotexplode.wav", "shotexplode");
createjs.Sound.registerSound(RESOURCE_ROOT + "sounds/shotexplode.wav", "shotexplode");
createjs.Sound.registerSound(RESOURCE_ROOT + "sounds/error.wav", "error");
createjs.Sound.registerSound(RESOURCE_ROOT + "sounds/papershot.wav", "papershot");
createjs.Sound.registerSound(RESOURCE_ROOT + "sounds/health.wav", "health");
createjs.Sound.registerSound(RESOURCE_ROOT + "sounds/death.wav", "death");
createjs.Sound.registerSound(RESOURCE_ROOT + "sounds/extralife.wav", "extralife");

createjs.Sound.registerSound(RESOURCE_ROOT + "sounds/warehousemanshoot.wav", "warehousemanshoot");
createjs.Sound.registerSound(RESOURCE_ROOT + "sounds/warehousemanshothit.wav", "warehousemanshothit");
createjs.Sound.registerSound(RESOURCE_ROOT + "sounds/warehousemanshothitsmall.wav", "warehousemanshothitsmall");

createjs.Sound.registerSound(RESOURCE_ROOT + "songs/intro_small.mp3", "intro");
createjs.Sound.registerSound(RESOURCE_ROOT + "songs/title_small.mp3", "title");
createjs.Sound.registerSound(RESOURCE_ROOT + "songs/wasteman_small.mp3", "wastemansong");
createjs.Sound.registerSound(RESOURCE_ROOT + "songs/accountingman_small.mp3", "accountingmansong");
createjs.Sound.registerSound(RESOURCE_ROOT + "songs/warehouseman_small.mp3", "warehousemansong");
createjs.Sound.registerSound(RESOURCE_ROOT + "songs/materialman_small.mp3", "materialmansong");
createjs.Sound.registerSound(RESOURCE_ROOT + "songs/visionaryman_small.mp3", "visionarymansong");

loader.installPlugin(createjs.SoundJS);

/**
 * [playSound description]
 * @param  {[type]} sound [description]
 * @return {[type]}       [description]
 */
function playSound(sound) {
	if (soundOff) {
		return;
	}
	var fx = createjs.Sound.play(sound);
	fx.volume = 0.4;
}

/**
 * [playSoundTwice description]
 * @param  {[type]} sound [description]
 * @return {[type]}       [description]
 */
function playSoundTwice(sound) {
	if (soundOff) {
		return;
	}
	var loop = createjs.Sound.play(sound, {
		loop: 1
	});
	loop.volume = 0.4;
}

/**
 * [playSoundLoop description]
 * @param  {[type]} sound [description]
 * @return {[type]}       [description]
 */
function playSoundLoop(sound) {
	if (musicOff || soundOff) {
		return;
	}

	var loop = createjs.Sound.play(sound, {
		loop: -1
	});
	loop.volume = 0.25;
}

/**
 * [stopMusic description]
 * @return {[type]} [description]
 */
function stopMusic() {
	createjs.Sound.stop();
}

(function() {
	if (getParameterByName("soundoff") === "true") {
		musicOff = true;
		soundOff = true;
	}

	if (getParameterByName("musicoff") === "true") {
		musicOff = true;
	}
})();