/***=================================***/
/*** Global variables initialization ***/
/***=================================***/

// Use 2D context with Brine.js
use2D = true;

/***===============================***/
/*** Global objects initialization ***/
/***===============================***/

// Create global sprite array
var active_sprites = new Array();

// Create an input manager for this room
// It is dependant on an event listener
var input_manager = new Sprite();
	// Input manager's mouse over call
	input_manager.update = function() {
		// For each active sprite in room...  
		for(var sprite in active_sprites){
			sprite = active_sprites[sprite];
			// If we are hovering over that sprite...
			if(checkSprite(sprite, gInput.mouse.x, gInput.mouse.y)) {
				// Set that sprites mouse over value 
				sprite.mouseOver = true;
			}else {
				sprite.mouseOver = false;
			}
		}
	}
	
	// Input manager's mouse down call
	input_manager.onMouseDown = function() {
		// For each active sprite in room...  
		for(var sprite in active_sprites){
			sprite = active_sprites[sprite];
			// If we are clicking on that sprite...
			if(checkSprite(sprite, gInput.mouse.x, gInput.mouse.y)) {
				// Do that sprite's on click function...
				sprite.click();
				break;
			}
		}
	}

// Create room manager
var room_manager = new Sprite();
	// curr_room shall point at the corresponding room sprite
	room_manager.curr_room;
	
/***=============================***/
/***     Room initialization     ***/
/***=============================***/

/***===   "Title Screen"   ===***/
var title_screen = new Sprite();
	// Create this room
	title_screen.create = function() {
		// This room's passive sprites
		title_screen.image_background = new Sprite();
		title_screen.image_background.width  = 1080;
		title_screen.image_background.height = 720;
		title_screen.image_background.x = 0;
		title_screen.image_background.y = 0;
		title_screen.image_background.image = Textures.load
			("./Common/Textures/Title/title background.png");
		
		// This room's active sprites
		title_screen.button_start = new Sprite();
		title_screen.button_start.width  = 160;
		title_screen.button_start.height = 60;
		title_screen.button_start.x = 460;
		title_screen.button_start.y = 360;
		title_screen.button_start.image = Textures.load
			("./Common/Textures/Title/start button up.png");
		title_screen.button_start.mouseOver = false;
		title_screen.button_start.update = function() {
			if(title_screen.button_start.mouseOver) {
				title_screen.button_start.image = Textures.load
					("./Common/Textures/Title/start button over.png");
			}else {
				title_screen.button_start.image = Textures.load
					("./Common/Textures/Title/start button up.png");
			}
		}
		title_screen.button_start.click = function() {
			console.log("Click!");
		}
		
		// Visible sprites at creation time
		world.addChild(title_screen.image_background);
		world.addChild(title_screen.button_start);
		
		// Active sprites at creation time
		active_sprites.push(title_screen.button_start);
	}

/***============================***/
/*** Brine world initialization ***/
/***============================***/

// Adding initial children to Brine's world
world.addChild(room_manager);
world.addChild(input_manager);

// Set the first room in the game
room_manager.curr_room = title_screen;
room_manager.curr_room.create();

// Event listeners to be used in the game always
gInput.addMouseDownListener(input_manager);

/***==========================***/
/***      Game functions      ***/
/***==========================***/

// Changes rooms
function changeRoom(room) {
	room_manager.curr_room.clear();
	room_manager.curr_room = room;
	room_manager.curr_room.create();
}

// Returns true if the mouse is over a sprite.
function checkSprite(sprite, x, y){
  var min_x = sprite.x;
  var max_x = sprite.x + sprite.width;
  var min_y = sprite.y;
  var max_y = sprite.y + sprite.height;
  var mx = x;
  var my = y;
  
  if(mx >= min_x && mx <= max_x && my >= min_y && my <= max_y){
    return true;
  }
  return false;
}








