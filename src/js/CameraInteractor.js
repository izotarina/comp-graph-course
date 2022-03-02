function CameraInteractor(camera, canvas) {
    this.camera = camera;
    this.canvas = canvas;
    this.update();
    
    this.dragging = false;
    this.x = 0;
    this.y = 0;
    this.lastX = 0;
    this.lastY = 0;
    this.button = 0;
    
    this.MOTION_FACTOR = 10.0;
}

CameraInteractor.prototype.onMouseUp = function() {
    this.dragging = false;
}

CameraInteractor.prototype.onMouseDown = function(event) {
    this.dragging = true;
    this.x = event.clientX;
	this.y = event.clientY;
	this.button = event.button;
}

CameraInteractor.prototype.onMouseMove = function(event) {
	this.lastX = this.x;
	this.lastY = this.y;
	this.x = event.clientX;
    this.y = event.clientY;
	
	if (!this.dragging) return;
	this.ctrl = event.ctrlKey;
	this.alt = event.altKey;

	const dx = this.x - this.lastX;
	const dy = this.y - this.lastY;
	
	if (this.button == 0) { 
        this.rotate(dx, dy);
	}
}

CameraInteractor.prototype.update = function() {
	this.canvas.onmousedown = (event) => {
		this.onMouseDown(event);
    }

    this.canvas.onmouseup = () => {
		this.onMouseUp();
    }
	
	this.canvas.onmousemove = (event) => {
		this.onMouseMove(event);
    }
}

CameraInteractor.prototype.rotate = function(dx, dy) {	
	const delta_elevation = -20.0 / this.canvas.height;
	const delta_azimuth   = -20.0 / this.canvas.width;
				
	const nAzimuth = dx * delta_azimuth * this.MOTION_FACTOR;
	const nElevation = dy * delta_elevation * this.MOTION_FACTOR;
	
	this.camera.changeAzimuth(nAzimuth);
	this.camera.changeElevation(nElevation);
}
