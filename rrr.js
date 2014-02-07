( function initPlayground() {
  document.body.setAttribute( "style", "background-color: #222" );

  var canvas = document.createElement( "canvas" );
  canvas.setAttribute( "id", "c" );
  canvas.setAttribute( "style", "position: absolute; top: 0; left: 0; width: 100%; height: 100%;" )
  document.body.appendChild( canvas );
} )();


//============================================================


window.requestAnimFrame = function() { return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function( a ) { window.setTimeout( a, 1E3 / 60 ) } }();

var c = document.getElementById( 'c' ),
    w = c.width, h = c.height,
    ctx = c.getContext( '2d' ),
    balls = []
;

var deg2rad = Math.PI / 180;
var rad2deg = 180 / Math.PI;


//============================================================
// copied from https://github.com/jonobr1/two.js/blob/master/build/two.clean.js

Vec2 = function( x, y ) { this.x = x || 0; this.y = y || 0; };

Vec2.prototype.set = function( x, y ) { this.x = x; this.y = y; return this; };

Vec2.prototype.clear = function() { x = 0; y = 0; return this; };

Vec2.prototype.add = function( v1, v2 ) {
  this.x = v1.x + v2.x;
  this.y = v1.y + v2.y;
  return this;
};

Vec2.prototype.sub = function( v1, v2 ) {
  this.x = v1.x - v2.x;
  this.y = v1.y - v2.y;
  return this;
};

Vec2.prototype.multiplyScalar = function( s ) {
  this.x *= s;
  this.y *= s;
  return this;
};

Vec2.prototype.divideScalar = function( s ) {
  if ( s ) {
    this.x /= s;
    this.y /= s;
  } else {
    this.set( 0, 0 );
  }
  return this;
};

Vec2.prototype.length = function() {
  return Math.sqrt( this.lengthSquared() );
};

Vec2.prototype.normalize = function() {
  return this.divideScalar( this.length() );
};

Vec2.prototype.distanceTo = function( v ) {
  return Math.sqrt( this.distanceToSquared( v ) );
};

Vec2.prototype.setLength = function( l ) {
  return this.normalize().multiplyScalar( l );
};

Vec2.prototype.equals = function( v ) {
  return ( this.distanceTo( v ) < 0.0001 /* almost same position */ );
};

Vec2.prototype.toString = function() {
  return this.x + ',' + this.y;
};

//============================================================


var Ball = function( opt ) {
  opt = opt || {};
  this.autoMove = opt.autoMove || false;
  this.hovered = opt.hovered || false;

  var hue = opt.hue || Math.random() * 255;
  this.color = 'hsla(' + hue + ', 100%, 50%, 1)';
  this.color80 = 'hsla(' + hue + ', 100%, 50%, .8)';
  this.color50 = 'hsla(' + hue + ', 100%, 50%, .5)';
  this.color30 = 'hsla(' + hue + ', 100%, 50%, .3)';
  this.color10 = 'hsla(' + hue + ', 100%, 50%, .1)';

  this.radius = opt.radius || 15;

  this.pos = opt.translation || {};
  this.pos.x = this.pos.x || this.radius + ( c.width - this.radius * 2 ) * Math.random();
  this.pos.y = this.pos.y || this.radius + ( c.height - this.radius ) * Math.random();
  this.vel = opt.vel || { x: 0, y: 0 }; // translation velocity
  this.acc = opt.acc || { x: 0, y: 0 }; // translation acceleration
  this.velA = opt.velA || 0; // angular velocity
  this.posTarget = opt.translationTarget || { x: this.pos.x, y: this.pos.y, a: 0, t: 0 };

  this.init();
}

Ball.prototype.all = [];

Ball.prototype.init = function() {
  this.id = Ball.prototype.all.length;
  Ball.prototype.all.push( this );
}

Ball.prototype.isIdle = function() {
  return this.vel.x == this.vel.y == this.acc.x == this.acc.y == 0;
}

Ball.prototype.stop = function() {
  this.posTarget = this.pos;
  this.acc = { x: 0, y: 0 };
  this.vel = { x: 0, y: 0 };
  this.velA = 0;
};

Ball.prototype.moveTo = function( x, y, time ) {
  var isRunning = !this.isIdle();

  this.posTarget = {
    x: x,
    y: y,
    t: time,
    angle: Math.atan2( y - this.pos.y, x - this.pos.x )
  };

  this.vel = {
    x: ( x - this.pos.x ) / time,
    y: ( y - this.pos.y ) / time
  };
};

Ball.prototype.update = function( mouse ) {

  this.hovered = this.isHover( mouse );

  if ( this.hovered ) {
    this.stop();
  }
  else {
    if ( this.acc.x < 0.1 ) this.acc.x = 0;
    if ( this.acc.y < 0.1 ) this.acc.y = 0;
    if ( this.vel.x < 0.1 ) this.vel.x = 0;
    if ( this.vel.y < 0.1 ) this.vel.y = 0;

    if ( this.isIdle() ) {
      if ( this.autoMove && Math.random() > 0.99 ) {
        this.moveTo(
          this.radius + ( c.width - this.radius * 2 ) * Math.random(),
          this.radius + ( c.height - this.radius * 2 ) * Math.random(),
          4000
        );
      }
    }
  }

  this.vel.x += this.acc.x;
  this.vel.y += this.acc.y;
  this.pos.x += this.vel.x;
  this.pos.y += this.vel.y;

};

Ball.prototype.render = function() {

  ctx.save();
  ctx.translate( this.pos.x, this.pos.y );
  ctx.save();
  ctx.rotate( this.posTarget.angle );

  // disk
  ctx.fillStyle = this.hovered ? this.color80 : this.color30;
  ctx.beginPath();
  ctx.arc( 0, 0, this.radius, 0, Math.PI * 2 );
  ctx.fill();

  //circumference
  ctx.strokeStyle = this.color;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc( 0, 0, this.radius - 0.5, this.radius - 0.0, 0, Math.PI * 2 );
  ctx.stroke();

  //bumper
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc( 0, 0,
    this.radius - 0.5, -Math.PI / 4, Math.PI / 4
  );
  ctx.stroke();

  // target line
  if ( !this.isIdle() ) {
    ctx.lineWidth = 1;
    ctx.strokeStyle = this.color30;
    ctx.beginPath();
    ctx.moveTo( this.radius, 0 );
    ctx.lineTo( Math.sqrt( Math.pow( this.posTarget.x, 2 ) + Math.pow( this.posTarget.y, 2 ) ) - this.radius, 0 );
    ctx.stroke();
  }

  ctx.restore();

  // text
  ctx.fillStyle = this.color80;
  ctx.fillText( this.id, this.id < 10 ? -3 : this.id < 100 ? -7 : -10, 3 );

  ctx.restore();
};

Ball.prototype.isHover = function( point ) {
  if ( point == undefined ) return;

  var d = Math.sqrt( Math.pow( this.pos.x - point.x, 2 ) + Math.pow( this.pos.y - point.y, 2 ) );
  return this.radius >= d;
}


//============================================================


window.onresize = function() {
  c.width = c.offsetWidth;
  c.height = c.offsetHeight;
};

var mouse;

window.onmousemove = function( e ) {
  mouse = { x: e.x, y: e.y };
}


//============================================================


function init() {

  for ( var i = 20; i >= 0; i-- )
    balls.push( new Ball( { autoMove: true } ) );

  window.onresize();
}

function loop( time ) {
  requestAnimFrame.call( this, loop );

  ctx.clearRect( 0, 0, c.width, c.height );

  for ( var i = 0; i < balls.length; i++ ) {

    balls[i].update( mouse );
    balls[i].render();
  }
}


init();
loop();