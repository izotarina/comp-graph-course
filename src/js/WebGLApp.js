let WEBGLAPP_RENDER = undefined;
let WEBGLAPP_TIMER_ID = -1;
let WEBGLAPP_RENDER_RATE = 500;

function WebGLApp(canvas) {
    gl = Utils.getGLContext(canvas);
    Program.load();  
}
  
WebGLApp.prototype.run = function(){ 
    this.configureGLHook();
    this.loadSceneHook();
    
    WEBGLAPP_RENDER = this.drawSceneHook;
    
    renderLoop();
 }
 
WebGLApp.prototype.refresh = function(){
    if (WEBGLAPP_RENDER) WEBGLAPP_RENDER();
}
     
renderLoop = function(){
    WEBGLAPP_TIMER_ID = setInterval(WEBGLAPP_RENDER, WEBGLAPP_RENDER_RATE);
}

window.onblur = function(){
    clearInterval(WEBGLAPP_TIMER_ID);
}

window.onfocus = function(){
    renderLoop();
}
