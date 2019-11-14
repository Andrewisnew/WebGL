class Light{
  yellow = [0.92, 0.92, 0.25, 1.0]
  lamp =  [1.0, 1.0, 0.0, 1.0]
  silver =  [0.84, 0.84, 0.71, 1.0]
  button =  [0.84, 0.0, 0.0, 1.0]
  background = [0.66, 0.99, 0.96, 1.0]

}
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
'attribute vec2 a_TexCoord;\n' +
  'varying vec2 v_TexCoord;\n' +

  'attribute vec4 a_Color;\n' +
  'attribute vec4 a_Normal;\n' +
  'uniform mat4 u_MvpMatrix;\n' +
  'uniform mat4 u_ModelMatrix;\n' +    // Model matrix
  'uniform mat4 u_NormalMatrix;\n' +   // Coordinate transformation matrix of the normal
  'uniform vec3 u_LightColor;\n' +     // Light color
  'uniform vec3 u_LightPosition;\n' +  // Position of the light source
  'uniform vec3 u_LightDirection;\n' +  // Position of the light source
  'uniform vec3 u_AmbientLight;\n' +   // Ambient light color
  'varying vec4 v_Color;\n' +
  'void main() {\n' +
  '  gl_Position = u_MvpMatrix * a_Position;\n' +
     // Recalculate the normal based on the model matrix and make its length 1.
  '  vec3 normal = normalize(vec3(u_NormalMatrix * a_Normal));\n' +
     // Calculate world coordinate of vertex
  '  vec4 vertexPosition = u_ModelMatrix * a_Position;\n' +
     // Calculate the light direction and make it 1.0 in length
  '  vec3 lightDirection = normalize(u_LightPosition - vec3(vertexPosition));\n' +
     // Calculate the dot product of the normal and light direction
  '  float nDotL = max(dot(normal, lightDirection), 0.0);\n' +
     // Calculate the color due to diffuse reflection
  '  vec3 diffuse = u_LightColor * a_Color.rgb * nDotL;\n' +
     // Calculate the color due to ambient reflection
  '  vec3 ambient = u_AmbientLight * a_Color.rgb;\n' +

  '  vec3 norm = normalize(vec3(a_Normal));\n' +
     // Calculate the dot product of the normal and light direction
  '  float nDotL2 = max(dot(u_LightDirection, norm), 0.0);\n' +
     // Calculate the color due to diffuse reflection
  '  vec3 diffuse2 = u_LightColor * a_Color.rgb * nDotL2;\n' +
     // Calculate the color due to ambient reflection
  '  vec3 ambient2 = u_AmbientLight * a_Color.rgb;\n' +

     // Add the surface colors due to diffuse reflection and ambient reflection
  '  v_Color = vec4(diffuse + ambient+diffuse2 + ambient2, a_Color.a);\n' + 
  '  v_TexCoord = a_TexCoord;\n' +
  '}\n';

// Fragment shader program
var FSHADER_SOURCE =
  '#ifdef GL_ES\n' +
  'precision mediump float;\n' +
  '#endif\n' +
  'varying vec4 v_Color;\n' +
   'uniform sampler2D u_Sampler;\n' +
  'varying vec2 v_TexCoord;\n' +
  'uniform bool isTextured;\n' +
  'void main() {\n' +
  '  if(isTextured){gl_FragColor =texture2D(u_Sampler, v_TexCoord); gl_FragColor.rgb *= v_Color.rgb;}\n' +
  '  else {gl_FragColor = v_Color;}\n' +
  '}\n';
 var angle = {
    x : 0,
    y : 0,
    z : 0
 }
 var eye = {
    lr : 0,
    ud : 0
 }
  var translation = {
    x : 0,
    y : 0,
    z : 0
 }
  var scale = {
    x : 1,
    y : 1,
    z : 1
 }
 var canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  var gl = getWebGLContext(canvas);
function main() {
  // Retrieve <canvas> element
  
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  draw(gl);
  
}

function draw(gl){
  // Set the clear color and enable the depth test
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.enable(gl.DEPTH_TEST);
    // Clear color and depth buffer
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  var vertices = [
 // Координаты вершин и цвета
   [0.65, -0.55, 0.3], // v0
    [-0.3, -0.55, 0.3],  // v1
  [-0.3, -0.65, 0.3],  // v2
  [0.65, -0.65, 0.3], // v3
  [0.65, -0.65, -0.3], // v4
  [0.65, -0.55, -0.3], // v5
  [-0.3, -0.55, -0.3], // v6
  [-0.3, -0.65, -0.3] // v7

 ];

  drawCube(vertices,new Light().yellow,{x:0, y:0, z:0});

 vertices = [
 // Координаты вершин и цвета

  [0.6, -0.5, 0.27],  // v0
   [-0.25, -0.5, 0.27], // v1
  [-0.25, -0.55, 0.27], // v2
 [0.6, -0.55, 0.27], // v3
 [0.6, -0.55, -0.27],// v4

 [0.6, -0.5, -0.27], // v5
 [-0.25, -0.5, -0.27], // v6
 [-0.25, -0.55, -0.27] // v7

 

 ];
drawCube(vertices,new Light().silver,{x:0, y:0, z:0});
    /*
    v7----v6
   /|    / |
 v4-+--v5  | 
 |  v3-+--v2
 | /   | /
v0----v1
*/

  //    v6----- v5
  //   /|      /|
  //  v1------v0|
  //  | |     | |
  //  | |v7---|-|v4
  //  |/      |/
  //  v2------v3
vertices = [
 // Координаты вершин и цвета
  [0.7, 0.1, -0.27], // v0
   [0.6, 0.1, -0.27],  // v1
 [0.6, -0.65, -0.27],  // v2
 [0.7, -0.65, -0.27],  // v3
 [0.7, -0.65, -0.37],  // v4
  [0.7, 0.1, -0.37],  // v5 
   [0.6, 0.1, -0.37],  // v6
 [0.6, -0.65, -0.37],  // v7




 ];
 drawCube(vertices, new Light().silver,{x:0, y:0, z:0});
drawTorus(0.5, 0.04, 0.0, Math.PI/2, Math.PI/16,Math.PI/4, [0.3, 0.1, 0.04], new Light().silver);
 //drawSphere(0.08, [0.29,0.6,0.04], Math.PI/5, new Light().silver);
 drawShape(0.05, Math.PI/5, 0.0, 0.15, expConeFunc, {x:10,y:-5,z:-25}, {x:0.26,y:0.5,z:0.04}, new Light().silver)
 drawShape(0.15, Math.PI/5, 0.15, 0.3, cutCone, {x:10,y:-5,z:-25}, {x:0.26,y:0.5,z:0.04}, new Light().lamp)
 drawShape(0.01, Math.PI/5, 0.0, 0.3, lampBottom, {x:10,y:-5,z:-25}, {x:0.26,y:0.5,z:0.04}, new Light().lamp)
 drawShape(0.005, Math.PI/5, 0.0, 0.08, parab, {x:0,y:0,z:0}, {x:0.29,y:0.51,z:0.04}, new Light().silver)
 drawShape(0.005, Math.PI/5, 0.0, 0.08, parab2, {x:0,y:0,z:0}, {x:0.29,y:0.6,z:0.04}, new Light().silver)

  //    v6----- v5
  //   /|      /|
  //  v1------v0|
  //  | |     | |
  //  | |v7---|-|v4
  //  |/      |/
  //  v2------v3
  vertices = [
 // Координаты вершин
  [3,3,0.01], // v0
   [-3,3,0.01],  // v1
 [-3,-3,0.01],  // v2
 [3,-3,0.01],  // v3
 [3,-3,-0.01],  // v4
  [3,3,-0.01],  // v5 
   [-3,3,-0.01],  // v6
 [-3,-3,-0.01],];  // v7
 drawTexturedCube(vertices,[1.0,1.0,1.0,1.0],'public/textures/wall.png')
   vertices = [
 // Координаты вершин
  [3,-0.65,3], // v0
   [-3,-0.65,3],  // v1
 [-3,-0.67,3],  // v2
 [3,-0.67,3],  // v3
 [3,-0.67,-3],  // v4
  [3,-0.65,-3],  // v5 
   [-3,-0.65,-3],  // v6
 [-3,-0.67,-3],];  // v7
 drawCube(vertices,[0.12,0.06,0.0,1.0],{x:0, y:-45, z:0})

}


function drawTorus(R, r, a_start, a_end, a_delta, b_delta, center, color){
  for (var phi = [a_start, a_start+a_delta]; phi[0] < a_end; phi[0]+= a_delta, phi[1]+=a_delta) {
    points = []
    for (var psi = 0; psi < 2 * Math.PI+2*b_delta; psi += b_delta) {
      for(var i = 0; i < phi.length; i++){
        points.push((R + r*Math.cos(psi))* Math.cos(phi[i]));
        points.push((R+ r*Math.cos(psi))*Math.sin(phi[i]));
        points.push(r*Math.sin(psi));
      }
    }
    var indices = []
    var normals = []
  for (var i = 0; i < points.length/3; i++) {
    indices.push(i);
    // var a = {x:points[(3*i)%points.length], y:points[(3*i+1)%points.length],z:points[(3*i+2)%points.length]}
    // var b = {x:points[(3*(i+1)+1)%points.length], y:points[(3*(i+1)+1)%points.length],z:points[(3*(i+1)+2)%points.length]}
    // var c = {x:points[(3*(i+2)+1)%points.length], y:points[(3*(i+2)+1)%points.length],z:points[(3*(i+2)+2)%points.length]}

    // var normal = calcNormals(a,b,c);
    //normals.push(...[0,1,0]);
    }
    var v = points;
  for (var i = 0; i < v.length/12; i++) {
    var a = {x:v[12*i], y:v[12*i+1],z:v[12*i+2]}
    var b = {x:v[12*i+3], y:v[12*i+4],z:v[12*i+5]}
    var c = {x:v[12*i+6], y:v[12*i+7],z:v[12*i+8]}
     var normal = calcNormals(a,b,c);
     normals.push(...[normal.x,normal.y,normal.z])
     normals.push(...[normal.x,normal.y,normal.z])
     normals.push(...[normal.x,normal.y,normal.z])
     normals.push(...[normal.x,normal.y,normal.z])
  }
    n = initVertexBuffers(gl,new Float32Array(points),new Float32Array(normals), new Uint8Array(indices), color);
    modify({x:0, y:45, z:0}, {x:center[0], y:center[1],z:center[2]});
  gl.drawElements(gl.TRIANGLE_STRIP, n, gl.UNSIGNED_BYTE, 0);
  
  }
  } 


function drawSphere(r, center, delta, color){

  for (var phi = [0, delta]; phi[1] < 2*Math.PI; phi[0]+= delta, phi[1]+=delta) {
    points = []
    for (var psi = 0; psi < 4 * Math.PI+2*delta; psi += delta) {
      for(var i = 0; i < phi.length; i++){
        points.push(r*Math.cos(psi)* Math.sin(phi[i]));
        points.push(r*Math.sin(psi)*Math.sin(phi[i]));
        points.push(r*Math.cos(phi[i]));
      }
    }
    var indices = []
    var normals = []
  for (var i = 0; i < points.length/3; i++) {
    indices.push(i);
    normals.push(...[0,1,0])
    }
  //   var v = points;
  // for (var i = 0; i < v.length/12; i++) {
  //   var a = {x:v[12*i], y:v[12*i+1],z:v[12*i+2]}
  //   var b = {x:v[12*i+3], y:v[12*i+4],z:v[12*i+5]}
  //   var c = {x:v[12*i+6], y:v[12*i+7],z:v[12*i+8]}
  //    var normal = calcNormals(a,b,c);
  //    console.log(normal)
  //    normals.push(...[-normal.x,-normal.y,-normal.z])
  //    normals.push(...[-normal.x,-normal.y,-normal.z])
  //    normals.push(...[-normal.x,-normal.y,-normal.z])
  //    normals.push(...[-normal.x,-normal.y,-normal.z])
  // }


    n = initVertexBuffers(gl, new Float32Array(points), new Float32Array(normals), new Uint8Array(indices), color);
    modify({x:0, y:0, z:0}, {x:center[0], y:center[1],z:center[2]});
  gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0);
  }
   
}

function drawTexturedCube(v,color,url){

  vertices = new Float32Array([

    ...v[0], ...v[1], ...v[2], ...v[3], // v0-v1-v2-v3 front
      ...v[0], ...v[3], ...v[4], ...v[5], // v0-v3-v4-v5 right
      ...v[0], ...v[5], ...v[6], ...v[1], // v0-v5-v6-v1 up
     ...v[1], ...v[6], ...v[7], ...v[2], // v1-v6-v7-v2 left
     ...v[7], ...v[4], ...v[3], ...v[2], // v7-v4-v3-v2 down
      ...v[4], ...v[7], ...v[6], ...v[5]  // v4-v7-v6-v5 back
 ]);
    // Normal
  var normals = new Float32Array([
    0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,  // v0-v1-v2-v3 front
    1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,  // v0-v3-v4-v5 right
    0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,  // v0-v5-v6-v1 up
   -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  // v1-v6-v7-v2 left
    0.0,-1.0, 0.0,   0.0,-1.0, 0.0,   0.0,-1.0, 0.0,   0.0,-1.0, 0.0,  // v7-v4-v3-v2 down
    0.0, 0.0,-1.0,   0.0, 0.0,-1.0,   0.0, 0.0,-1.0,   0.0, 0.0,-1.0   // v4-v7-v6-v5 back
  ]);
  v = [

    ...v[0], ...v[1], ...v[2], ...v[3], // v0-v1-v2-v3 front
      ...v[0], ...v[3], ...v[4], ...v[5], // v0-v3-v4-v5 right
      ...v[0], ...v[5], ...v[6], ...v[1], // v0-v5-v6-v1 up
     ...v[1], ...v[6], ...v[7], ...v[2], // v1-v6-v7-v2 left
     ...v[7], ...v[4], ...v[3], ...v[2], // v7-v4-v3-v2 down
      ...v[4], ...v[7], ...v[6], ...v[5]  // v4-v7-v6-v5 back
 ];
  var norms = []
  for (var i = 0; i < v.length/12; i++) {
    var a = {x:v[12*i], y:v[12*i+1],z:v[12*i+2]}
    var b = {x:v[12*i+3], y:v[12*i+4],z:v[12*i+5]}
    var c = {x:v[12*i+6], y:v[12*i+7],z:v[12*i+8]}
     var normal = calcNormals(a,b,c);
     norms.push(...[normal.x,normal.y,normal.z])
     norms.push(...[normal.x,normal.y,normal.z])
     norms.push(...[normal.x,normal.y,normal.z])
     norms.push(...[normal.x,normal.y,normal.z])
  }
  // Indices of the vertices
  var indices = new Uint8Array([
     0, 1, 2,   0, 2, 3,    // front
     4, 5, 6,   4, 6, 7,    // right
     8, 9,10,   8,10,11,    // up
    12,13,14,  12,14,15,    // left
    16,17,18,  16,18,19,    // down
    20,21,22,  20,22,23     // back
 ]);
  // Set the vertex coordinates, the color and the normal
  var n = initVertexBuffers(gl, vertices, new Float32Array(norms), indices, color);
    var texCoords = new Float32Array([   // Texture coordinates
      1.0, 1.0,   0.0, 1.0,   0.0, 0.0,   1.0, 0.0,    // v0-v1-v2-v3 front
      0.0, 1.0,   0.0, 0.0,   1.0, 0.0,   1.0, 1.0,    // v0-v3-v4-v5 right
      1.0, 0.0,   1.0, 1.0,   0.0, 1.0,   0.0, 0.0,    // v0-v5-v6-v1 up
      1.0, 1.0,   0.0, 1.0,   0.0, 0.0,   1.0, 0.0,    // v1-v6-v7-v2 left
      0.0, 0.0,   1.0, 0.0,   1.0, 1.0,   0.0, 1.0,    // v7-v4-v3-v2 down
      0.0, 0.0,   1.0, 0.0,   1.0, 1.0,   0.0, 1.0     // v4-v7-v6-v5 back
  ]);
  if (!initArrayBuffer(gl, 'a_TexCoord', texCoords, 2, gl.FLOAT )) return -1;// Texture coordinates

  if (n < 0) {
    console.log('Failed to set the vertex information');
    return;
  }
  modify({x:0, y:-45, z:0},{x:1, y:0, z:-1});
   // Set texture
  if (!initTextures(gl, url)) {
    console.log('Failed to intialize the texture.');
    return;
  }
  gl.uniform1i(gl.getUniformLocation(gl.program, "isTextured"), true);

  gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0);

}


function drawCube(v,color,shAng){

  vertices = new Float32Array([

    ...v[0], ...v[1], ...v[2], ...v[3], // v0-v1-v2-v3 front
      ...v[0], ...v[3], ...v[4], ...v[5], // v0-v3-v4-v5 right
      ...v[0], ...v[5], ...v[6], ...v[1], // v0-v5-v6-v1 up
     ...v[1], ...v[6], ...v[7], ...v[2], // v1-v6-v7-v2 left
     ...v[7], ...v[4], ...v[3], ...v[2], // v7-v4-v3-v2 down
      ...v[4], ...v[7], ...v[6], ...v[5]  // v4-v7-v6-v5 back
 ]);
    // Normal
  var normals = new Float32Array([
    0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,  // v0-v1-v2-v3 front
    1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,  // v0-v3-v4-v5 right
    0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,  // v0-v5-v6-v1 up
   -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  // v1-v6-v7-v2 left
    0.0,-1.0, 0.0,   0.0,-1.0, 0.0,   0.0,-1.0, 0.0,   0.0,-1.0, 0.0,  // v7-v4-v3-v2 down
    0.0, 0.0,-1.0,   0.0, 0.0,-1.0,   0.0, 0.0,-1.0,   0.0, 0.0,-1.0   // v4-v7-v6-v5 back
  ]);

  // Indices of the vertices
  var indices = new Uint8Array([
     0, 1, 2,   0, 2, 3,    // front
     4, 5, 6,   4, 6, 7,    // right
     8, 9,10,   8,10,11,    // up
    12,13,14,  12,14,15,    // left
    16,17,18,  16,18,19,    // down
    20,21,22,  20,22,23     // back
 ]);
  // Set the vertex coordinates, the color and the normal
  var n = initVertexBuffers(gl, vertices, normals, indices, color);
  if (n < 0) {
    console.log('Failed to set the vertex information');
    return;
  }
  modify(shAng,{x:0, y:0, z:0});
  gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0);

}

function drawShape(x_delta, angle_delta, x_start, x_end, func, shapeAngle, bottomCenter, color){

  if(x_delta > x_end){
    console.log("Bad x_delta");
  }
  for (var x = [x_start, x_start + x_delta]; x[0] < x_end; x[0]+= x_delta, x[1]+=x_delta) {
    y = [func(x[0]), func(x[1])];
    points = []
    for (var psi = 0; psi <= 2 * Math.PI + angle_delta; psi += angle_delta) {
      for(var i = 0; i < x.length; i++){
        
        points.push(x[i]*Math.cos(psi));
        points.push(y[i]);
        points.push(x[i]*Math.sin(psi));
      }
    }
      var indices = []
    var normals = []
  for (var i = 0; i < points.length/3; i++) {
    indices.push(i);
    //normals.push(...[0,1,0]);
    }
    var v = points;
  for (var i = 0; i < v.length/12; i++) {
    var a = {x:v[12*i], y:v[12*i+1],z:v[12*i+2]}
    var b = {x:v[12*i+3], y:v[12*i+4],z:v[12*i+5]}
    var c = {x:v[12*i+6], y:v[12*i+7],z:v[12*i+8]}
     var normal = calcNormals(a,b,c);
     if(func == parab || func==lampBottom){
        normals.push(...[normal.x,normal.y,normal.z])
     normals.push(...[normal.x,normal.y,normal.z])
     normals.push(...[normal.x,normal.y,normal.z])
     normals.push(...[normal.x,normal.y,normal.z])
     }else{
     normals.push(...[-normal.x,-normal.y,-normal.z])
     normals.push(...[-normal.x,-normal.y,-normal.z])
     normals.push(...[-normal.x,-normal.y,-normal.z])
     normals.push(...[-normal.x,-normal.y,-normal.z])}
  }
    n = initVertexBuffers(gl, new Float32Array(points), new Float32Array(normals), new Uint8Array(indices), color);
    modify(shapeAngle, bottomCenter);
  gl.drawElements(gl.TRIANGLE_STRIP, n, gl.UNSIGNED_BYTE, 0);
  
  } 
}

function modify(shAng, shTr){
  // Get the storage locations of uniform variables and so on
  var u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
  var u_MvpMatrix = gl.getUniformLocation(gl.program, 'u_MvpMatrix');
  var u_NormalMatrix = gl.getUniformLocation(gl.program, 'u_NormalMatrix');
  var u_LightColor = gl.getUniformLocation(gl.program, 'u_LightColor');
  var u_LightPosition = gl.getUniformLocation(gl.program, 'u_LightPosition');
  var u_LightDirection = gl.getUniformLocation(gl.program, 'u_LightDirection');
  var u_AmbientLight = gl.getUniformLocation(gl.program, 'u_AmbientLight');
  if (!u_MvpMatrix || !u_NormalMatrix || !u_LightColor || !u_LightPosition　|| !u_AmbientLight) { 
    console.log('Failed to get the storage location');
    return;
  }

  var vpMatrix = new Matrix4();   // View projection matrix
  vpMatrix.setPerspective(30, canvas.width/canvas.height, 1, 100);

  var x = 14*Math.sin(toRadians(eye.lr))* Math.cos(toRadians(eye.ud/2));
  var z = 14*Math.cos(toRadians(eye.lr))*Math.cos(toRadians(eye.ud/2));
  var y = 14*Math.sin(toRadians(eye.ud/2));
  vpMatrix.lookAt(x, y, z, 0, 0, 0, 0, 1, 0);

  // Set the light color (white)
  gl.uniform3f(u_LightColor, 1.0, 1.0, 1.0);
  // Set the light direction (in the world coordinate)
  gl.uniform3f(u_LightPosition, -4,4, 4);
  var lightDirection = new Vector3([0, 3.0, 0]); 
   lightDirection.normalize();
  gl.uniform3fv(u_LightDirection, lightDirection.elements);
  // Set the ambient light
  gl.uniform3f(u_AmbientLight, 0.2, 0.2, 0.2);

  var modelMatrix = new Matrix4();  // Model matrix
  var mvpMatrix = new Matrix4();    // Model view projection matrix
  var normalMatrix = new Matrix4(); // Transformation matrix for normals
  // Calculate the model matrix
  modelMatrix.scale(2+scale.x, 2+scale.y, 2+scale.z);
  modelMatrix.translate(parseFloat(translation.x) + shTr.x, parseFloat(translation.y) + shTr.y, parseFloat(translation.z) + shTr.z);
  modelMatrix.rotate(parseFloat(angle.x) + shAng.x, 1, 0, 0); // Rotate around the y-axis
  modelMatrix.rotate(parseFloat(angle.y) + shAng.y, 0, 1, 0);
  modelMatrix.rotate(parseFloat(angle.z) + shAng.z, 0, 0, 1);


  // Pass the model matrix to u_ModelMatrix
  gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);

  // Pass the model view projection matrix to u_MvpMatrix
  mvpMatrix.set(vpMatrix).multiply(modelMatrix);
  gl.uniformMatrix4fv(u_MvpMatrix, false, mvpMatrix.elements);

  // Pass the matrix to transform the normal based on the model matrix to u_NormalMatrix
  normalMatrix.setInverseOf(modelMatrix);
  normalMatrix.transpose();
  gl.uniformMatrix4fv(u_NormalMatrix, false, normalMatrix.elements);


  // Draw the cube
}

function initVertexBuffers(gl, vertices, normals, indices, color) {


  var colors = []
  for (var i = 0; i < 24; i++) {
   colors.push(color[0]);
   colors.push(color[1]);
   colors.push(color[2]);

  }
  // Write the vertex property to buffers (coordinates, colors and normals)
  if (!initArrayBuffer(gl, 'a_Position', vertices, 3, gl.FLOAT)) return -1;
  if (!initArrayBuffer(gl, 'a_Color', new Float32Array(colors), 3, gl.FLOAT)) return -1;
  if (!initArrayBuffer(gl, 'a_Normal', normals, 3, gl.FLOAT)) return -1;
  gl.uniform1i(gl.getUniformLocation(gl.program, "isTextured"), false);

  // Unbind the buffer object
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  // Write the indices to the buffer object
  var indexBuffer = gl.createBuffer();
  if (!indexBuffer) {
    console.log('Failed to create the buffer object');
    return false;
  }
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

  return indices.length;
}

function initArrayBuffer(gl, attribute, data, num, type) {
  // Create a buffer object
  var buffer = gl.createBuffer();
  if (!buffer) {
    console.log('Failed to create the buffer object');
    return false;
  }
  // Write date into the buffer object
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  // Assign the buffer object to the attribute variable
  var a_attribute = gl.getAttribLocation(gl.program, attribute);
  if (a_attribute < 0) {
    console.log('Failed to get the storage location of ' + attribute);
    return false;
  }
  gl.vertexAttribPointer(a_attribute, num, type, false, 0, 0);
  // Enable the assignment of the buffer object to the attribute variable
  gl.enableVertexAttribArray(a_attribute);

  return true;
}
function initTextures(gl, url) {
  // Create a texture object
  var texture = gl.createTexture();
  if (!texture) {
    console.log('Failed to create the texture object');
    return false;
  }

  // Get the storage location of u_Sampler
  var u_Sampler = gl.getUniformLocation(gl.program, 'u_Sampler');
  if (!u_Sampler) {
    console.log('Failed to get the storage location of u_Sampler');
    return false;
  }

  // Create the image object
  var image = new Image();
  if (!image) {
    console.log('Failed to create the image object');
    return false;
  }
  // Register the event handler to be called when image loading is completed
  image.onload = function(){ loadTexture(gl, texture, u_Sampler, image); };
  // Tell the browser to load an Image
  image.src = url;

  return true;
}
function loadTexture(gl, texture, u_Sampler, image) {
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);  // Flip the image Y coordinate
  // Activate texture unit0
  gl.activeTexture(gl.TEXTURE0);
  // Bind the texture object to the target
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Set texture parameters
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  // Set the image to texture
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

  // Pass the texure unit 0 to u_Sampler
  gl.uniform1i(u_Sampler, 0);
}


function toRadians(alpha){
  return alpha / 180 * Math.PI;
}


function onLREye() {
   eye.lr = document.getElementById('lrEye').value;
    draw(gl)
  }

function onUDEye() {
    eye.ud = document.getElementById('udEye').value;
    draw(gl)
  }


function expConeFunc(x){
  return Math.exp(-15*x)/25;
}
function lampBottom(x){
  return 1/10*(Math.exp(30*(x-0.3)) -1) - 0.5
}
function cutCone(x){
  return -10/3*(x - 0.15);
}

function parab(x){
  
  return 13*x*x;
}
function parab2(x){
  
  return -13*x*x+0.08;
}
function calcNormals(a, b, c)
{
  var n={x:0,y:0,z:0};

  var wrki;
  var v1={x:0,y:0,z:0}, v2={x:0,y:0,z:0};

  v1.x = a.x - b.x;
  v1.y = a.y - b.y;
  v1.z = a.z - b.z;

  v2.x = b.x - c.x;
  v2.y = b.y - c.y;
  v2.z = b.z - c.z;

  wrki = Math.sqrt((v1.y*v2.z - v1.z * v2.y)*(v1.y*v2.z - v1.z * v2.y) + (v1.z * v2.x - v1.x * v2.z)*(v1.z * v2.x - v1.x * v2.z) + (v1.x * v2.y - v1.y * v2.x)*(v1.x * v2.y - v1.y * v2.x));
  n.x = (v1.y * v2.z - v1.z * v2.y) / wrki;
  n.y = (v1.z * v2.x - v1.x * v2.z) / wrki;
  n.z = (v1.x * v2.y - v1.y * v2.x) / wrki;

  return n;
}