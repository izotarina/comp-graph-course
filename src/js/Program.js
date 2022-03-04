const Program = {
    getShader: function(gl, id) {
       const script = document.getElementById(id);
       if (!script) {
           return null;
       }

        let str = "";
        let k = script.firstChild;
        while (k) {
            if (k.nodeType == 3) {
                str += k.textContent;
            }
            k = k.nextSibling;
        }

        let shader;
        if (script.type == "x-shader/x-fragment") {
            shader = gl.createShader(gl.FRAGMENT_SHADER);
        } else if (script.type == "x-shader/x-vertex") {
            shader = gl.createShader(gl.VERTEX_SHADER);
        } else {
            return null;
        }

        gl.shaderSource(shader, str);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert(gl.getShaderInfoLog(shader));
            return null;
        }
        return shader;
    },
    
    load: function() {
        const fragmentShader = Program.getShader(gl, "shader-fs");
        const vertexShader = Program.getShader(gl, "shader-vs");
        
        prg = gl.createProgram();
        gl.attachShader(prg, vertexShader);
        gl.attachShader(prg, fragmentShader);
        
        gl.bindAttribLocation(prg, 0 , "aVertexPosition");

        gl.linkProgram(prg);

        if (!gl.getProgramParameter(prg, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
        }

        gl.useProgram(prg);     

        prg.aVertexPosition  = gl.getAttribLocation(prg, "aVertexPosition");
        gl.enableVertexAttribArray(prg.aVertexPosition);
        
        prg.aVertexColor     = gl.getAttribLocation(prg, "aVertexColor");
        
        prg.uPMatrix         = gl.getUniformLocation(prg, "uPMatrix");
        prg.uMVMatrix        = gl.getUniformLocation(prg, "uMVMatrix");
        prg.uNMatrix         = gl.getUniformLocation(prg, "uNMatrix");
    }
};
