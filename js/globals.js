//GLOBAL VARIABLES
SPRITELIST = []; //global spritelist
BOARD = null;
CANVAS = null;
CTX = null;
EXIT = false;

//GLOBAL FUNCTIONS
//detect a collision between a sprite and another sprite
function sprite_collision_with_sprite(sprite1, sprite2)
{
  if ( sprite1.x < sprite2.x + sprite2.width && sprite1.x + sprite1.width > sprite2.x &&
    sprite1.y < sprite2.y + sprite2.height && sprite1.y + sprite1.height > sprite2.y ) 
  { 
    return true; 
  } 
  else { 
    return false; 
  }
  return false;
}

//detect a collision between a sprite and a group
function sprite_collision_with_spritelist(sprite, spritelist)
{
  for (let i = 0; i < spritelist.length; i++) {
    if (spritelist[i] !== sprite) {
        sprite_collision_with_sprite(sprite, spritelist[i])
    }
  }
  return false;
}

