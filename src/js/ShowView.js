const showView = new ShowView();

$(window).resize(() => showView.updateCanvasSize());

function ShowView() {    
	this.TIMER = 0;
	this.WAIT = 1000;
}

ShowView.prototype.showView = function() {
	this.updateCanvasSize();
}

ShowView.prototype.updateCanvasSize = function() {
    c_width = $('#canvasContainer').width();
    c_height = $('#canvasContainer').height();
    $('canvas').attr('width',c_width);
    $('canvas').attr('height',c_height);
}

ShowView.prototype.updateGUI = function() {
    const canvas_container = document.getElementById('canvasContainer');
	const bottom = document.getElementById('bottom');
     
    canvas_container.style.width = '100%';
    bottom.style.display = 'block';

    this.updateCanvasSize();
	var selector = '#canvasContainer';
	
	$(selector).fadeIn(600);
}


ShowView.prototype.run = function() {	
	this.TIMER = setInterval(() => this.execute(), this.WAIT);
}

ShowView.prototype.execute = function(){
	if (this.TIMER) {
        clearInterval(this.TIMER);
    }
	
	this.updateGUI();
}
