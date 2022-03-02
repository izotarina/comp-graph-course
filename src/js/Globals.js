let gl = null;    
let prg = null;    
let c_width = 0;  
let c_height = 0;  

let mvMatrix    = mat4.create();    
let pMatrix     = mat4.create();  
let nMatrix     = mat4.create();  
let cMatrix     = mat4.create(); 

let home     = [0,-2,-50];
let position = [0,-2,-50];
let rotation = [0,0,0];

let coords = -1;

let COORDS_WORLD = 1;
let COORDS_CAMERA = 2;
let requestUpdate = false;
