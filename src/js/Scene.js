const Scene = {
    objects: [],

    loadObject : function() {
        DiamondSquare.diamondSquare();
        
        Scene.addObject({vertices: DiamondSquare.points});       
    },
    
    addObject: function(object) {
        let width = Math.pow(2, DiamondSquare.n) + 1;
        let height = Math.pow(2, DiamondSquare.n) + 1;
        let widthSegments = Math.pow(2, DiamondSquare.n);
        let heightSegments = Math.pow(2, DiamondSquare.n);

        const width_half = width / 2;
		const height_half = height / 2;

		const gridX = Math.floor( widthSegments );
		const gridY = Math.floor( heightSegments );

		const gridX1 = gridX + 1;
		const gridY1 = gridY + 1;

		const segment_width = width / gridX;
		const segment_height = height / gridY;

		const indices = [];
		const vertices = [];

		for (let iy = 0; iy < gridY1; iy++) {
			const y = iy * segment_height - height_half;

			for (let ix = 0; ix < gridX1; ix++) {
				const x = ix * segment_width - width_half;

				vertices.push(x, -y, 0);
			}
		}

		for (let iy = 0; iy < gridY; iy++) {
			for (let ix = 0; ix < gridX; ix++) {
				const a = ix + gridX1 * iy;
				const b = ix + gridX1 * (iy + 1);
				const c = (ix + 1) + gridX1 * (iy + 1);
				const d = (ix + 1) + gridX1 * iy;

				indices.push(a, b, d);
				indices.push(b, c, d);
			}
		}

        let count = 0;
        let colors = [];

        for (let i = 0; i < vertices.length; i += 3) {
            vertices[i + 2] = object.vertices[count];
            let mainColor;
            if (object.vertices[count] >= 74.5) {
                mainColor = (190 + (Math.round(object.vertices[count]))) / 255;
            } else if (object.vertices[count] >= 46) {
                mainColor = (160 + (Math.round(object.vertices[count]))) / 255;
            } else if (object.vertices[count] > 20) {
                mainColor = (140 + (Math.round(object.vertices[count]))) / 255;
            } else if (object.vertices[count] > 0) {
                mainColor = (100 + (Math.round(object.vertices[count]))) / 255;
            } else if (object.vertices[count] > -22) { 
                mainColor = (90 + (Math.round(object.vertices[count]))) / 255;
            } else { 
                mainColor = (60 + (Math.round(object.vertices[count]))) / 255;
            }
            colors.push(mainColor, mainColor, mainColor, 1);

            count += 1;
        }

        object.vertices = vertices;
        object.indices = indices;
        object.colors = colors;
    
        const vertexBufferObject = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObject);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(object.vertices), gl.STATIC_DRAW);

        const colorBufferObject = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBufferObject);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(object.colors), gl.STATIC_DRAW);
    
        const indexBufferObject = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBufferObject);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(object.indices), gl.STATIC_DRAW);
        
        object.vbo = vertexBufferObject;
        object.ibo = indexBufferObject;
        object.cbo = colorBufferObject;
    
        Scene.objects.push(object);
    }
};
