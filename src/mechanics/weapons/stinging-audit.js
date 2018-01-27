function StingingAudit(player, renderer) {
    var shotSpriteSheet = new createjs.SpriteSheet({
        "images": [loader.getResult("moneyspin")],
        "frames": {
            "width": 16,
            "height": 16,
            "count": 2
        },
        "animations": {
            "shot": {
                "frames": [0, 1],
                "next": "shot",
                "speed": 0.25
            }
        }
    });

    this.stage = stage;
    this.damage = 6;
    this.animations = new createjs.Sprite(shotSpriteSheet, "shot");
    this.disabled = true;
    this.activated = false;
    this.animations.play();
    this.xspeed = 0;
    this.yspeed = -2;

    /**
     * [tickActions description]
     * @return {[type]} [description]
     */
    this.tickActions = function() {
        if (this.disabled) {
            return;
        }

        if (!this.activated) {
            if (this.yspeed === 0) {
                var enemy = null;
                var step = 1;
                while (!enemy) {
                    for (var i = 0; i < renderer.enemies.length; i++) {
                        if (renderer.enemies[i].dead || renderer.enemies[i].y < 0 || 
                            renderer.enemies[i].y > renderer.gamestage.height || renderer.enemies[i].damage <= 0) {
                            continue;
                        }

                        var delta = renderer.enemies[i].x - this.x;
                        if (abs(delta) < 32 * step) {
                            enemy = renderer.enemies[i];
                            break;
                        }
                    }
                    if (step > 12) {
                        break;
                    }
                    step++;
                }

                this.activated = true;
                this.yspeed = Math.sin(Math.atan2((enemy.y - this.y) + enemy.animations.spriteSheet._frameHeight / 2, (enemy.x - this.x) + enemy.animations.spriteSheet._frameWidth / 2)) * 2.5;
                this.xspeed = Math.cos(Math.atan2((enemy.y - this.y), (enemy.x - this.x))) * 2.5;
            } else {
                this.y += this.yspeed;
                this.yspeed += 0.0625;
            }
        } else {
            renderer.enemies.forEach(function(enemy) {
                if (enemy.dead) {
                    return;
                }

                //var intersection = ndgmrX.checkRectCollision(this.animations, enemy.animations);
                if (fastCollisionX(this, enemy) && !(enemy.constructor === Platform || enemy.constructor === DroppingPlatform
                     || enemy.constructor === DisappearingPlatform) && enemy.constructor !== KillCopy && enemy.constructor !== Phone) {

                    if (enemy.constructor === AnnoyingThing) {
                        enemy.pauseTicks = 120;
                        enemy.animations.gotoAndPlay("pause");
                    }

                    if (enemy.hardshell) {
                        this.x -= this.xspeed * 5;
                        this.y -= this.yspeed * 5;
                        playSound("shotbounce");
                        return;
                    }

                    if (enemy.constructor === ExplosiveBarrel) {
                        enemy.activated = true;
                    }
                    if (enemy.damage > 0) {
                        enemy.health -= 6 * damageModifier;
                    }
                    this.removeSelf();
                } else if (enemy.constructor === KillCopy && fastCollisionKillCopy(this, enemy)) { 
                    // special case due to large overhang of the left side of sprite
                    if (enemy.damage > 0) {
                        enemy.health -= 6 * damageModifier;
                    }
                    this.removeSelf();
                } else if (enemy.constructor === Phone && fastCollisionPhone(this, enemy)) { 
                    // special case due to large overhang of the left side of sprite
                    if (enemy.damage > 0) {
                        enemy.health -= 6 * damageModifier;
                    }
                    this.removeSelf();
                }
            }.bind(this));


            this.x += this.xspeed;
            this.y += this.yspeed;
        }

        if (!this.checkBounds()) {
            this.removeSelf();
        }

        this.animations.x = this.x - renderer.completedMapsWidthOffset;
        this.animations.y = this.y;
    };

    /**
     * [fireUp description]
     * @return {[type]} [description]
     */
    this.fireUp = function() {
        //console.log(player.x - renderer.completedMapsWidthOffset);
        this.x = player.x + ((player.animations.scaleX === 1) ? 26 : -3);
        this.y = player.y + 13.5;
        this.yspeed = 0;
        setTimeout(function() {
            this.disabled = false;
        }.bind(this), 500);

        this.bounced = false;
        this.activated = false;
        this.direction = player.animations.scaleX;
        this.animations.x = this.x - renderer.completedMapsWidthOffset;
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
        renderer.enemyContainer.addChild(explosion);
        setTimeout(function() {
            renderer.enemyContainer.removeChild(explosion);
        }.bind(this), 15.625); // approx 2 frames
        this.disabled = true;
    };

    this.checkBounds = function() {
        if (this.y < 0 || abs(this.y - player.y) > renderer.gamestage.canvas.height) {
            return false;
        }

        return !(this.x < 0 || abs(this.x - (player.x)) > 400);
    };
};