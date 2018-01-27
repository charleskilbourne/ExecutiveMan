/**
	 * [Shot description]
	 * @param {[type]} player   [description]
	 * @param {[type]} renderer [description]
	 */

function StickyNote(player, renderer){
	this.shotLimit = 3;
	this.color = "";
	this.shoot = function(){
		if(player.shots.length < this.shotLimit){
			var shot = new StickyNoteShot(player, renderer)
			shot.fireUp();
			player.shots.push(shot);
		}
	}
}
function StickyNoteShot(player, renderer) {
		var shotSpriteSheet = new createjs.SpriteSheet({
			"images": [loader.getResult("shot")],
			"frames": {
				"width": 8,
				"height": 8,
				"count": 1
			},
			"animations": {
				"shot": {
					"frames": [0],
					"next": "shot"
				}
			}
		});

		this.animations = new createjs.Sprite(shotSpriteSheet, "shot");
		this.x = -7.5;
		this.y = -7.5;
		this.disabled = true;
		this.direction = 0;
		this.yspeed = 0;
		this.bounced = false;

		/**
		 * [tickActions description]
		 * @return {[type]} [description]
		 */
		this.tickActions = function() {
			if (this.disabled) {
				return;
			}

			this.x = this.x + (3.5 * this.direction);
			this.y -= this.yspeed;
			this.animations.x = this.x;
			this.animations.y = this.y;

			if (!this.checkBounds()) {
				this.removeSelf();
			}

			renderer.enemies.forEach(function(enemy) {
				if (enemy.dead) {
					return;
				}

				//var intersection = ndgmrX.checkRectCollision(this.animations, enemy.animations);
				if (fastCollisionX(this, enemy) && !(enemy.constructor === Platform || enemy.constructor === DroppingPlatform || enemy.constructor === DisappearingPlatform) && enemy.constructor !== KillCopy && enemy.constructor !== Phone) {

					if (enemy.constructor === AnnoyingThing) {
						enemy.pauseTicks = 120;
						enemy.animations.gotoAndPlay("pause");
					}

					if (enemy.hardshell) {
						this.yspeed = 3.5;
						this.direction = this.direction * (this.bounced) ? 1 : -1;
						this.bounced = true;

						playSound("shotbounce");
						return;
					}

					if (enemy.constructor === ExplosiveBarrel) {
						enemy.activated = true;
					}
					if (enemy.damage > 0) {
						enemy.health -= 1 * damageModifier;
					}
					this.removeSelf();
				} else if (enemy.constructor === KillCopy && fastCollisionKillCopy(this, enemy)) { // special case due to large overhang of the left side of sprite
					if (enemy.damage > 0) {
						enemy.health -= 1 * damageModifier;
					}
					this.removeSelf();
				} else if (enemy.constructor === Phone && fastCollisionPhone(this, enemy)) { // special case due to large overhang of the left side of sprite
					if (enemy.damage > 0) {
						enemy.health -= 1 * damageModifier;
					}
					this.removeSelf();
				}
			}.bind(this));
		};

		/**
		 * [fireUp description]
		 * @return {[type]} [description]
		 */
		this.fireUp = function() {
			//console.log(player.x - renderer.completedMapsWidthOffset);
			this.x = player.x - renderer.completedMapsWidthOffset + ((player.animations.scaleX === 1) ? 26 : -3);
			this.y = player.y + 13.5;
			this.yspeed = 0;
			this.disabled = false;
			this.bounced = false;
			this.direction = player.animations.scaleX;
			this.animations.x = this.x;
			this.animations.y = this.y;
			this.animations.play();
			renderer.enemyContainer.addChild(this.animations);
		};

		/**
		 * [removeSelf description]
		 * @return {[type]} [description]
		 */
		this.removeSelf = function() {
			//console.log("removing");
			renderer.enemyContainer.removeChild(this.animations);
			var explosion = shotExplosionSprite.clone(true);
			explosion.x = this.animations.x - this.animations.spriteSheet._frameWidth / 2;
			explosion.y = this.animations.y - this.animations.spriteSheet._frameHeight / 2;
			renderer.enemyContainer.removeChild(this.animations);
			explosion.gotoAndPlay("explode");

			if (this.checkBounds()) {
				playSound("shotexplode");
			}
			var shotIndex = player.shots.indexOf(this);
			player.shots.splice(shotIndex, 1);
			renderer.enemyContainer.addChild(explosion);
			setTimeout(function() {
				renderer.enemyContainer.removeChild(explosion);
			}.bind(this), 15.625); // approx 2 frames
			this.disabled = true;
		};

		/**
		 * [checkBounds description]
		 * @return {[type]} [description]
		 */
		this.checkBounds = function() {
			if (this.y < 0 || abs(this.y - player.y) > renderer.gamestage.canvas.height) {
				return false;
			}

			return !(this.x < 0 || abs(this.x - (player.x - renderer.completedMapsWidthOffset)) > player.gamestage.canvas.width / 2);
		};
	};