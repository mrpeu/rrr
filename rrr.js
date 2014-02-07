(function initPlayground(){
  document.body.setAttribute("style", "background-color: #222");

  var canvas = document.createElement("canvas");
  canvas.setAttribute("id", "c");
  canvas.setAttribute("style", "position: absolute; top: 0; left: 0; width: 100%; height: 100%;")
  document.body.appendChild(canvas);
  
  var pi2 = document.createElement("script");
  pi2.setAttribute("src", "https://rawgithub.com/schteppe/p2.js/master/build/p2.min.js");
  pi2.setAttribute("type", "text/javascript");
  document.body.appendChild(pi2);
})();


///////////////////////////////////////////////////////////////
// tween.js - http://github.com/sole/tween.js  
'use strict';void 0===Date.now&&(Date.now=function(){return(new Date).valueOf()});
var TWEEN=TWEEN||function(){var a=[];return{REVISION:"11dev",getAll:function(){return a},removeAll:function(){a=[]},add:function(c){a.push(c)},remove:function(c){c=a.indexOf(c);-1!==c&&a.splice(c,1)},update:function(c){if(0===a.length)return!1;for(var b=0,d=a.length,c=void 0!==c?c:"undefined"!==typeof window&&void 0!==window.performance&&void 0!==window.performance.now?window.performance.now():Date.now();b<d;)a[b].update(c)?b++:(a.splice(b,1),d--);return!0}}}();
TWEEN.Tween=function(a){var c={},b={},d={},e=1E3,g=0,h=!1,n=0,l=null,v=TWEEN.Easing.Linear.None,w=TWEEN.Interpolation.Linear,p=[],q=null,r=!1,s=null,t=null,j;for(j in a)c[j]=parseFloat(a[j],10);this.to=function(a,c){void 0!==c&&(e=c);b=a;return this};this.start=function(e){TWEEN.add(this);r=!1;l=void 0!==e?e:"undefined"!==typeof window&&void 0!==window.performance&&void 0!==window.performance.now?window.performance.now():Date.now();l+=n;for(var f in b){if(b[f]instanceof Array){if(0===b[f].length)continue;
b[f]=[a[f]].concat(b[f])}c[f]=a[f];!1===c[f]instanceof Array&&(c[f]*=1);d[f]=c[f]||0}return this};this.stop=function(){TWEEN.remove(this);return this};this.delay=function(a){n=a;return this};this.repeat=function(a){g=a;return this};this.yoyo=function(a){h=a;return this};this.easing=function(a){v=a;return this};this.interpolation=function(a){w=a;return this};this.chain=function(){p=arguments;return this};this.onStart=function(a){q=a;return this};this.onUpdate=function(a){s=a;return this};this.onComplete=
function(a){t=a;return this};this.update=function(m){var f;if(m<l)return!0;!1===r&&(null!==q&&q.call(a),r=!0);var i=(m-l)/e,i=1<i?1:i,j=v(i);for(f in b){var u=c[f]||0,k=b[f];k instanceof Array?a[f]=w(k,j):("string"===typeof k&&(k=u+parseFloat(k,10)),"number"===typeof k&&(a[f]=u+(k-u)*j))}null!==s&&s.call(a,j);if(1==i)if(0<g){isFinite(g)&&g--;for(f in d)"string"===typeof b[f]&&(d[f]+=parseFloat(b[f],10)),h&&(i=d[f],d[f]=b[f],b[f]=i),c[f]=d[f];l=m+n}else{null!==t&&t.call(a);f=0;for(i=p.length;f<i;f++)p[f].start(m);
return!1}return!0}};
TWEEN.Easing={Linear:{None:function(a){return a}},Quadratic:{In:function(a){return a*a},Out:function(a){return a*(2-a)},InOut:function(a){return 1>(a*=2)?0.5*a*a:-0.5*(--a*(a-2)-1)}},Cubic:{In:function(a){return a*a*a},Out:function(a){return--a*a*a+1},InOut:function(a){return 1>(a*=2)?0.5*a*a*a:0.5*((a-=2)*a*a+2)}},Quartic:{In:function(a){return a*a*a*a},Out:function(a){return 1- --a*a*a*a},InOut:function(a){return 1>(a*=2)?0.5*a*a*a*a:-0.5*((a-=2)*a*a*a-2)}},Quintic:{In:function(a){return a*a*a*
a*a},Out:function(a){return--a*a*a*a*a+1},InOut:function(a){return 1>(a*=2)?0.5*a*a*a*a*a:0.5*((a-=2)*a*a*a*a+2)}},Sinusoidal:{In:function(a){return 1-Math.cos(a*Math.PI/2)},Out:function(a){return Math.sin(a*Math.PI/2)},InOut:function(a){return 0.5*(1-Math.cos(Math.PI*a))}},Exponential:{In:function(a){return 0===a?0:Math.pow(1024,a-1)},Out:function(a){return 1===a?1:1-Math.pow(2,-10*a)},InOut:function(a){return 0===a?0:1===a?1:1>(a*=2)?0.5*Math.pow(1024,a-1):0.5*(-Math.pow(2,-10*(a-1))+2)}},Circular:{In:function(a){return 1-
Math.sqrt(1-a*a)},Out:function(a){return Math.sqrt(1- --a*a)},InOut:function(a){return 1>(a*=2)?-0.5*(Math.sqrt(1-a*a)-1):0.5*(Math.sqrt(1-(a-=2)*a)+1)}},Elastic:{In:function(a){var c,b=0.1;if(0===a)return 0;if(1===a)return 1;!b||1>b?(b=1,c=0.1):c=0.4*Math.asin(1/b)/(2*Math.PI);return-(b*Math.pow(2,10*(a-=1))*Math.sin((a-c)*2*Math.PI/0.4))},Out:function(a){var c,b=0.1;if(0===a)return 0;if(1===a)return 1;!b||1>b?(b=1,c=0.1):c=0.4*Math.asin(1/b)/(2*Math.PI);return b*Math.pow(2,-10*a)*Math.sin((a-c)*
2*Math.PI/0.4)+1},InOut:function(a){var c,b=0.1;if(0===a)return 0;if(1===a)return 1;!b||1>b?(b=1,c=0.1):c=0.4*Math.asin(1/b)/(2*Math.PI);return 1>(a*=2)?-0.5*b*Math.pow(2,10*(a-=1))*Math.sin((a-c)*2*Math.PI/0.4):0.5*b*Math.pow(2,-10*(a-=1))*Math.sin((a-c)*2*Math.PI/0.4)+1}},Back:{In:function(a){return a*a*(2.70158*a-1.70158)},Out:function(a){return--a*a*(2.70158*a+1.70158)+1},InOut:function(a){return 1>(a*=2)?0.5*a*a*(3.5949095*a-2.5949095):0.5*((a-=2)*a*(3.5949095*a+2.5949095)+2)}},Bounce:{In:function(a){return 1-
TWEEN.Easing.Bounce.Out(1-a)},Out:function(a){return a<1/2.75?7.5625*a*a:a<2/2.75?7.5625*(a-=1.5/2.75)*a+0.75:a<2.5/2.75?7.5625*(a-=2.25/2.75)*a+0.9375:7.5625*(a-=2.625/2.75)*a+0.984375},InOut:function(a){return 0.5>a?0.5*TWEEN.Easing.Bounce.In(2*a):0.5*TWEEN.Easing.Bounce.Out(2*a-1)+0.5}}};
TWEEN.Interpolation={Linear:function(a,c){var b=a.length-1,d=b*c,e=Math.floor(d),g=TWEEN.Interpolation.Utils.Linear;return 0>c?g(a[0],a[1],d):1<c?g(a[b],a[b-1],b-d):g(a[e],a[e+1>b?b:e+1],d-e)},Bezier:function(a,c){var b=0,d=a.length-1,e=Math.pow,g=TWEEN.Interpolation.Utils.Bernstein,h;for(h=0;h<=d;h++)b+=e(1-c,d-h)*e(c,h)*a[h]*g(d,h);return b},CatmullRom:function(a,c){var b=a.length-1,d=b*c,e=Math.floor(d),g=TWEEN.Interpolation.Utils.CatmullRom;return a[0]===a[b]?(0>c&&(e=Math.floor(d=b*(1+c))),g(a[(e-
1+b)%b],a[e],a[(e+1)%b],a[(e+2)%b],d-e)):0>c?a[0]-(g(a[0],a[0],a[1],a[1],-d)-a[0]):1<c?a[b]-(g(a[b],a[b],a[b-1],a[b-1],d-b)-a[b]):g(a[e?e-1:0],a[e],a[b<e+1?b:e+1],a[b<e+2?b:e+2],d-e)},Utils:{Linear:function(a,c,b){return(c-a)*b+a},Bernstein:function(a,c){var b=TWEEN.Interpolation.Utils.Factorial;return b(a)/b(c)/b(a-c)},Factorial:function(){var a=[1];return function(c){var b=1,d;if(a[c])return a[c];for(d=c;1<d;d--)b*=d;return a[c]=b}}(),CatmullRom:function(a,c,b,d,e){var a=0.5*(b-a),d=0.5*(d-c),g=
e*e;return(2*c-2*b+a+d)*e*g+(-3*c+3*b-2*a-d)*g+a*e+c}}};
///////////////////////////////////////////////////////////////


window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(a){window.setTimeout(a,1E3/60)}}();

var c = document.getElementById( 'c' ),
    w = c.width, h = c.height,
    ctx = c.getContext( '2d' ),
    items = []
;

var deg2rad = Math.PI/180;
var rad2deg = 180/Math.PI;


var enemy = function(opt){
  opt = opt || {};
  this.autoMove = opt.autoMove || false;
  this.radius = opt.radius || 15;
  this.x = opt.x || this.radius+(c.width-this.radius*2) * Math.random();
  this.y = opt.y || this.radius+(c.height-this.radius) * Math.random();
  this.direction = opt.direction || {x: this.x, y: this.y, a: 0};
  this.hue = opt.hue || Math.random()*255;
  this.hovered = opt.hovered || false;
  this.idle = this.direction != 0 || this.directin.y != 0;

  this.init();
}

enemy.prototype.all = [];

enemy.prototype.init = function(){
  this.id = enemy.prototype.all.length;
  enemy.prototype.all.push(this);
}
  
enemy.prototype.moveTo = function(x, y, time){
  var wasRunning = !this.idle;
  if(wasRunning) this.tweenMove.stop();
  
  this.direction = {
    x: x,
    y: y
  };
  
  this.direction.a = Math.atan2(this.direction.y-this.y, this.direction.x-this.x);

  this.tweenMove = new TWEEN.Tween( this )
    .to( {x:this.direction.x, y:this.direction.y}, time )
    .easing( wasRunning ? TWEEN.Easing.Cubic.Out : TWEEN.Easing.Cubic.InOut )
    .onComplete( function () {
        this.idle = true;
        this.tweenMove = undefined;
    } )
    .start();
  
  this.idle = false;
};

enemy.prototype.update = function(mouse){
  
  this.hovered = this.isHover(mouse);
  
  if(this.hovered){
    if(!this.idle){
      this.tweenMove.stop();
      this.idle = true;
    }
  }
  else{
    if(this.autoMove && Math.random()>0.99){
      this.moveTo( 
        this.radius + (c.width - this.radius * 2) * Math.random(),
        this.radius + (c.height - this.radius * 2) * Math.random(),
        4000
      );
    }
  }
};

enemy.prototype.render = function() {
  
  ctx.strokeStyle = 'hsla(' + this.hue + ', 100%, 50%, 1)';
  
  ctx.fillStyle = this.hovered ? 
    'hsla(' + this.hue + ', 100%, 50%, 0.8)' : 
    'hsla(' + this.hue + ', 100%, 50%, 0.3)';
  ctx.beginPath();
  ctx.arc( this.x, this.y, this.radius, 0, Math.PI * 2 );
  ctx.fill();
  
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc( this.x, this.y, this.radius - 0.5, this.radius - 0.0, 0, Math.PI * 2 );
  ctx.stroke();
  
  ctx.lineWidth = 4;
  ctx.beginPath();
  //ctx.arc( this.x, this.y, this.radius - 0.5, Math.PI,  Math.PI + Math.PI / 2 );
    ctx.arc( this.x, this.y, 
            this.radius - 0.5, this.direction.a - Math.PI/4, 
            this.direction.a + Math.PI/4 );
  ctx.stroke();
  
  if(!this.idle){
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'hsla(' + this.hue + ', 100%, 50%, 0.25)';
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.direction.x, this.direction.y);
    ctx.stroke();
  }

  ctx.fillStyle = 'hsla(' + this.hue + ', 100%, 50%, 0.9)';
  ctx.fillText( this.id, this.x-5, this.y+3);
};

enemy.prototype.isHover = function(point){
  if(point == undefined) return;

  var d = Math.sqrt( Math.pow(this.x-point.x, 2) + Math.pow(this.y-point.y, 2) );
  return this.radius >= d;
}

  
window.onresize = function()
{
  c.width = c.offsetWidth;
  c.height = c.offsetHeight;
};

var mouse;

window.onmousemove = function(e){
  mouse = {x: e.x, y: e.y};
}


function init() {  
  
  for(var i=20; i>=0; i--)
    items.push(new enemy({ autoMove: true }));

  window.onresize();
}

function loop() {
  requestAnimFrame.call( this, loop );
  
  TWEEN.update();
  
  
  
  ctx.clearRect( 0, 0, c.width, c.height );

  for(var i=0; i < items.length; i++){

    items[i].update( mouse );
    items[i].render();
  }
}

init();
loop();