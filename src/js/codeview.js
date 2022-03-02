const cview = new CodeViewer();

$(window).resize(() => cview.updateCanvasSize());

function CodeViewer() {    
	this.TIMER = 0;
	this.WAIT = 1000;
}

CodeViewer.prototype.showView = function() {
	this.updateCanvasSize();
}

CodeViewer.prototype.updateCanvasSize = function() {
    c_width = $('#canvasContainer').width();
    c_height = $('#canvasContainer').height();
    $('canvas').attr('width',c_width);
    $('canvas').attr('height',c_height);
}

CodeViewer.prototype.updateGUI = function() {
    const canvas_container = document.getElementById('canvasContainer');
	const bottom = document.getElementById('bottom');
     
    canvas_container.style.width = '100%';
    bottom.style.display = 'block';

    this.updateCanvasSize();
	var selector = '#canvasContainer';
	
	$(selector).fadeIn(600);
}


CodeViewer.prototype.run = function() {	
	this.TIMER = setInterval(() => this.execute(), this.WAIT);
}

CodeViewer.prototype.execute = function(){
	if (this.TIMER) {
        clearInterval(this.TIMER);
    }
	
	this.updateGUI();
}
