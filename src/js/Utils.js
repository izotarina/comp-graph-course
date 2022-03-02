const Utils = {
	getGLContext: function(name){
		const canvas = document.getElementById(name);
		let ctx = null;
		
		if (!canvas){
			alert('there is no canvas on this page');
			return null;
		}
		else {
			c_width = canvas.width;
			c_height = canvas.height;
		}
				
		const names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
	
		for (let i = 0; i < names.length; ++i) {
            try {
                ctx = canvas.getContext(names[i]);
            } 
            catch(e) {}

            if (ctx) break;
		}

		if (!ctx) {
			alert("Could not initialise WebGL");
			return null;
		}
		else {
			return ctx;
		}
	},
}
