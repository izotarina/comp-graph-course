function Camera() {
    this.matrix     = mat4.create();
    this.up         = vec3.create();
    this.right      = vec3.create();
    this.normal     = vec3.create();
    this.position   = vec3.create();
    this.home       = vec3.create();
    this.azimuth    = 0.0;
    this.elevation  = 0.0;
    
    this.hookRenderer = null;
    this.hookGUIUpdate = null;
}

Camera.prototype.goHome = function(home) {
    if (home){
        this.home = home;
    }

    this.setPosition(this.home);
    this.setAzimuth(0);
    this.setElevation(60);
}

Camera.prototype.setPosition = function(position) {
    vec3.set(position, this.position);
    this.update();
}

Camera.prototype.setAzimuth = function(az) {
    this.changeAzimuth(az - this.azimuth);
}

Camera.prototype.changeAzimuth = function(azimuth) {
    this.azimuth += azimuth;
    
    if (this.azimuth > 360 || this.azimuth < -360) {
		this.azimuth = this.azimuth % 360;
	}

    this.update();
}

Camera.prototype.setElevation = function(elevation) {
    this.changeElevation(elevation - this.elevation);
}

Camera.prototype.changeElevation = function(elevation) {  
    this.elevation += elevation;
    
    if (this.elevation > 360 || this.elevation < -360) {
		this.elevation = this.elevation % 360;
	}

    this.update();
}

Camera.prototype.update = function() {
    mat4.identity(this.matrix);
    mat4.rotateY(this.matrix, this.azimuth * Math.PI / 180);
    mat4.rotateX(this.matrix, this.elevation * Math.PI / 180);
    mat4.translate(this.matrix, this.position);

    mat4.multiplyVec4(this.matrix, [-1, 0, 0, 0], this.right);
    mat4.multiplyVec4(this.matrix, [0, 1, 0, 0], this.up);
    mat4.multiplyVec4(this.matrix, [0, 0, 1, 0], this.normal);
    
    if(this.hookRenderer){
        this.hookRenderer();
    }
    if(this.hookGUIUpdate){
        this.hookGUIUpdate();
    }
    
}

Camera.prototype.getViewTransform = function() {
    const matrix = mat4.create();
    mat4.inverse(this.matrix, matrix);
    return matrix;
}
