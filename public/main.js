'use strict';
// The purpose of "use strict" is to indicate that the code should be executed in "strict mode". 
// With strict mode, you can not, for example, use undeclared variables.
// It mostly helps you keep your own code clean.

//anon function called. (Note that it runs thanks to () after its {} ): 
(function() {
  var socket = io();
  // whiteboard is the class name for the <canvas></canvas> element getting called in on index.html:
  var canvas = document.getElementsByClassName('whiteboard')[0];
  var colors = document.getElementsByClassName('color');
  // The HTMLCanvasElement.getContext() method returns the 2d drawing context on the canvas:
  // (examples of other options besides 2d are webgl, bitmaprenderer,)
  var context = canvas.getContext('2d');

  // draw color is html color named 'black' to start
  var current = {
    color: 'black'
  };
  // when you first arrive, you are not drawing instantly (must click to start)
  // when drawing is true, the mouse is drawing on the canvas
  var drawing = false;

  // canvas html element gets event listeners for mouse moves
  // the callback argument sets the callback that will be invoked when the event is dispatched.
  // element.addEventListener(type: string, listener: EventListener, option: boolean): void (+1 overload)
  canvas.addEventListener('mousedown', onMouseDown, false);
  canvas.addEventListener('mouseup', onMouseUp, false);
  canvas.addEventListener('mouseout', onMouseUp, false);
  canvas.addEventListener('mousemove', throttle(onMouseMove, 6), false);
  //Touch for mobile devices
  canvas.addEventListener('touchstart', onMouseDown, false);
  canvas.addEventListener('touchend', onMouseUp, false);
  canvas.addEventListener('touchcancel', onMouseUp, false);
  canvas.addEventListener('touchmove', throttle(onMouseMove, 6), false);

  // bring in all the colors in a classic js for loop, and update the color on click:
  for (let i = 0; i < colors.length; i++){
    colors[i].addEventListener('click', onColorUpdate, false);
  }

  // when the socket is on, the drawing event 
  socket.on('drawing', onDrawingEvent);

  window.addEventListener('resize', onResize, false);
  onResize();
  
  window.ontouchend = (e) => {
    e.preventDefault();
};

// creates  drawing-object by connecting these point coordinates with color
  function drawLine(x0, y0, x1, y1, color, emit){
    context.beginPath();
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.strokeStyle = color;
    context.lineWidth = 3;
    context.stroke();
    context.closePath();

    if (!emit) { return; }
    var w = canvas.width;
    var h = canvas.height;

    // socket emits, or sends out, the info needed for the drawing
    socket.emit('drawing', {
      x0: x0 / w,
      y0: y0 / h,
      x1: x1 / w,
      y1: y1 / h,
      color: color
    });
  }
  // makes the drawing start upon click / touch, at the event coords
  function onMouseDown(e){
    drawing = true;
    current.x = e.clientX||e.touches[0].clientX;
    current.y = e.clientY||e.touches[0].clientY;
  }
  // stops the drawing when the moust lifts / unlicks, or just returns if you're already not drawing
  function onMouseUp(e){
    if (!drawing) { return; }
    drawing = false;
    drawLine(current.x, current.y, e.clientX||e.touches[0].clientX, e.clientY||e.touches[0].clientY, current.color, true);
  }
  // when the mouse moves, if you are drawing, then draw the line
  function onMouseMove(e){
    if (!drawing) { return; }
    drawLine(current.x, current.y, e.clientX||e.touches[0].clientX, e.clientY||e.touches[0].clientY, current.color, true);
    current.x = e.clientX||e.touches[0].clientX;
    current.y = e.clientY||e.touches[0].clientY;
    console.log("function onMouseMove(e)", onMouseMove);
  }

  // since the colors are named with html color values like "green", 
  // this can grab it and send it easily without worrying about '#':
  function onColorUpdate(e){
    current.color = e.target.className.split(' ')[1];
  }

  // essentially 'wrapper function' that
  // limits the number of events per second:
  //  Throttle calls to "callback" routine and ensures that it
  // is not invoked any more often than "delay" milliseconds.
  // https://blogorama.nerdworks.in/javascriptfunctionthrottlingan/ 
  function throttle(callback, delay) {
    var previousCall = new Date().getTime();
    return function() {
      var time = new Date().getTime();
        // if "delay" milliseconds have expired since
        // the previous call then propagate this call to
        // "callback"
      if ((time - previousCall) >= delay) {
        previousCall = time;
        callback.apply(null, arguments);
      }
    };
  }
  // when the data comes in, draw the line accordingly
  function onDrawingEvent(data){
    var w = canvas.width;
    var h = canvas.height;
    drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
  }

  // make the canvas fill the window
  function onResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

})();