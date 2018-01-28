// function Controls(player){
//     if (!demoMode) {
//         document.onkeydown = function(event) {
//             switch (event.keyCode) {
//                 case keyCodes.left:
//                     // keyCode 37 is left arrow
//                     player.actions.playerLeft = true;
//                     break;
    
//                 case keyCodes.right:
//                     // keyCode 39 is right arrow
//                     player.actions.playerRight = true;
//                     break;
    
    
//                 case keyCodes.jump:
//                     // keyCode 32 is space
//                     player.actions.playerJump = true;
//                     break;
    
//                 case keyCodes.shoot:
//                     // keyCode 67 is c
//                     player.actions.playerAttack = true;
//                     break;
    
    
//                 case 68:
//                     // keyCode 68 is d
//                     player.actions.playerDebug = true;
//                     break;
    
//                 case keyCodes.pause:
//                     // keyCode 68 is p
//                     if (player.paused) {
//                         player.paused = false;
//                         player.pauseMenu.remove();
//                     } else {
//                         player.paused = true;
//                         player.pauseMenu.show();
    
//                     }
    
//                     break;
//             }
//         }.bind(this);
    
//         document.onkeyup = function(event) {
//             switch (event.keyCode) {
//                 case keyCodes.left:
//                     // keyCode 37 is left arrow
//                     player.actions.playerLeft = false;
//                     break;
    
//                 case keyCodes.right:
//                     // keyCode 39 is right arrow
//                     player.actions.playerRight = false;
//                     break;
    
//                 case keyCodes.jump:
//                     // keyCode 32 is space
//                     player.actions.playerJump = false;
//                     player.jumpreleased = true;
//                     break;
    
//                 case keyCodes.shoot:
//                     // keyCode 67 is c
//                     player.actions.playerAttack = false;
//                     player.shootTicks = 1;
//                     break;
    
    
//                 case 68:
//                     // keyCode 68 is d
//                     player.actions.playerDebug = false;
//                     break;
//             }
//         }.bind(this);
//     }
// }
