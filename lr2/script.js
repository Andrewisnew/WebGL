class Light{
  yellow = [0.92, 0.92, 0.25, 1.0]
  lamp =  [1.0, 1.0, 0.0, 1.0]
  silver =  [0.84, 0.84, 0.71, 1.0]
  button =  [0.84, 0.0, 0.0, 1.0]
  background = [0.66, 0.99, 0.96, 1.0]

}

class Dark{
  yellow = [0.21, 0.21, 0.09, 1.0]
  lamp =  [0.29, 0.29, 0.0, 1.0]
  silver =  [0.14, 0.14, 0.14, 1.0]
  button =  [0.3, 0.0, 0.0, 1.0]
  background = [0.0, 0.0, 0.0, 1.0]

}

var lightOn = false

var lightOnBtn = [[0.1, -0.5], [0.3, -0.5], [0.29, -0.45]]
var lightOffBtn = [[0.1, -0.5], [0.3, -0.5], [0.11, -0.45]]
 var angle = {
    x : 0,
    y : 0,
    z : 0
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

var VSHADER_SOURCE =
'attribute vec4 a_Position;\n' +
'uniform mat4 u_userTranslationMatrix;\n' +
'uniform mat4 u_userScaleMatrix;\n' +
'uniform mat4 u_userXRotationMatrix;\n' +
'uniform mat4 u_userYRotationMatrix;\n' +
'uniform mat4 u_userZRotationMatrix;\n' +

'uniform mat4 u_TranslationMatrix;\n' +
'uniform mat4 u_xRotationMatrix;\n' +
'uniform mat4 u_yRotationMatrix;\n' +
'uniform mat4 u_zRotationMatrix;\n' +

'uniform mat4 u_ViewMatrix;\n' +

'uniform mat4 u_ProjMatrix;\n' +

'attribute vec4 a_Color;\n' +
'varying vec4 v_Color;\n' +
 'void main() {\n' +
 'vec4 modifiedPosition = u_TranslationMatrix * (u_xRotationMatrix * (u_yRotationMatrix * (u_zRotationMatrix * a_Position)));\n' +
' gl_Position = u_ProjMatrix * u_ViewMatrix * (u_userTranslationMatrix * (u_userScaleMatrix * (u_userXRotationMatrix * (u_userYRotationMatrix * (u_userZRotationMatrix * modifiedPosition)))));\n' +
'v_Color = a_Color;\n' +
 '}\n';

// Фрагментный шейдер
 var FSHADER_SOURCE =
 'precision mediump float;\n' +
 'uniform vec4 u_FragColor;\n' + // uniform-переменная
 'void main() {\n' +
 ' gl_FragColor = u_FragColor;\n' + // Установить цвет
 '}\n';


var canvas = document.getElementById('webgl');
var gl = getWebGLContext(canvas);


function main() {
  

 // Инициализировать шейдеры
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to initialize shaders.');
    return;
  }
  canvas.onmousedown = function(ev) { click(ev, canvas); };
  
  draw();

}

function draw(){
  if(lightOn)
    color = new Light()
  else
    color = new Dark()
  // Указать цвет для очистки <canvas>
  bg = color.background
 gl.clearColor(bg[0], bg[1], bg[2], bg[3]);
 gl.enable(gl.DEPTH_TEST);
 // Очистить <canvas>
 gl.clear(gl.COLOR_BUFFER_BIT| gl.DEPTH_BUFFER_BIT);

 // drawSquare([[0.6, -0.65], [0.6, 0.1], [0.7, -0.65], [0.7, 0.1]], color.silver)
 // drawSquare([[0.6, -0.65], [0.6, 0.1], [0.7, -0.65], [0.7, 0.1]], color.silver)
 // drawSquare([[-0.3, -0.65], [-0.3, -0.55], [0.65, -0.65], [0.65, -0.55]], color.yellow)
 // drawSquare([[-0.25, -0.55], [-0.25, -0.5], [0.6, -0.55], [0.6, -0.5]], color.silver)
 // drawSector(0.62, 0.68, 0, Math.PI/2, Math.PI/32, [0,0.1],color.silver)
 // drawSquare([[0.078, 0.775], [0.048, 0.64], [0.014, 0.784], [-0.018, 0.656]], color.silver)
 // drawSquare([[-0.13, 0.684], [0.156, 0.614], [-0.528, 0.098], [0.15, -0.105]], color.lamp)
 // drawSquare([[-0.528, 0.098], [0.15, -0.105], [-0.5, -0.016], [0.052, -0.173]], color.lamp)
 var verticesColors = new Float32Array([
 // Координаты вершин и цвета
 -0.3, -0.65, 0.3, 1.0, 1.0, 1.0, // v0
 0.65, -0.65, 0.3, 1.0, 0.0, 1.0, // v1
 0.65, -0.65, -0.3, 1.0, 0.0, 0.0, // v2
 -0.3, -0.65, -0.3, 1.0, 0.0, 0.0, // v3
 -0.3, -0.55, 0.3, 1.0, 1.0, 1.0, // v4
 0.65, -0.55, 0.3, 1.0, 0.0, 1.0, // v5
 0.65, -0.55, -0.3, 1.0, 0.0, 0.0, // v6
 -0.3, -0.55, -0.3, 1.0, 0.0, 0.0, // v7
 ]);
 drawCube(verticesColors, color.yellow)

var verticesColors = new Float32Array([
 // Координаты вершин и цвета
 -0.25, -0.55, 0.27, 1.0, 1.0, 1.0, // v0
 0.6, -0.55, 0.27, 1.0, 0.0, 1.0, // v1
 0.6, -0.55, -0.27, 1.0, 0.0, 0.0, // v2
 -0.25, -0.55, -0.27, 1.0, 0.0, 0.0, // v3
 -0.25, -0.5, 0.27, 1.0, 1.0, 1.0, // v4
 0.6, -0.5, 0.27, 1.0, 0.0, 1.0, // v5
 0.6, -0.5, -0.27, 1.0, 0.0, 0.0, // v6
 -0.25, -0.5, -0.27, 1.0, 0.0, 0.0, // v7
 ]);
 drawCube(verticesColors, color.silver)

var verticesColors = new Float32Array([
 // Координаты вершин и цвета
 0.6, -0.65, -0.27, 1.0, 1.0, 1.0, // v0
 0.7, -0.65, -0.27, 1.0, 0.0, 1.0, // v1
 0.7, -0.65, -0.37, 1.0, 0.0, 0.0, // v2
 0.6, -0.65, -0.37, 1.0, 0.0, 0.0, // v3
 0.6, 0.1, -0.27, 1.0, 1.0, 1.0, // v4
 0.7, 0.1, -0.27, 1.0, 0.0, 1.0, // v5
 0.7, 0.1, -0.37, 1.0, 0.0, 0.0, // v6 
 0.6, 0.1, -0.37, 1.0, 0.0, 0.0, // v7
 ]);
 drawCube(verticesColors, color.silver);
 drawTorus(0.5, 0.04, 0.0, Math.PI/2, Math.PI/16,Math.PI/8, [0.3, 0.1, 0.04], color.silver);
 drawSphere(0.08, [0.29,0.6,0.04], Math.PI/8, color.silver);
 drawShape(0.05, Math.PI/8, 0.0, 0.15, expConeFunc, {x:10,y:-5,z:-25}, {x:0.26,y:0.5,z:0.04}, color.silver)
 drawShape(0.15, Math.PI/8, 0.15, 0.3, cutCone, {x:10,y:-5,z:-25}, {x:0.26,y:0.5,z:0.04}, color.lamp)
 drawShape(0.01, Math.PI/8, 0.0, 0.3, lampBottom, {x:10,y:-5,z:-25}, {x:0.26,y:0.5,z:0.04}, color.lamp)

}


function drawSphere(r, center, delta, color){

  for (var phi = [0, delta]; phi[1] < Math.PI; phi[0]+= delta, phi[1]+=delta) {
    points = []
    for (var psi = 0; psi < 2 * Math.PI+2*delta; psi += delta) {
      for(var i = 0; i < phi.length; i++){
        points.push(r*Math.cos(psi)* Math.sin(phi[i]));
        points.push(r*Math.sin(psi)*Math.sin(phi[i]));
        points.push(r*Math.cos(phi[i]));
        points.push(1.0);
        points.push(1.0);
        points.push(1.0);
      }
    }
    var indices = []
  for (var i = 0; i < points.length/6; i++) {
    indices.push(i);
    }
    n = initVertexBuffers(new Float32Array(points), new Uint8Array(indices), color, {x:0, y:0, z:0}, {x:center[0], y:center[1],z:center[2]});
  gl.drawElements(gl.TRIANGLE_STRIP, n, gl.UNSIGNED_BYTE, 0);
  
  } 
}
function drawTorus(R, r, a_start, a_end, a_delta, b_delta, center, color){

  for (var phi = [a_start, a_start+a_delta]; phi[0] < a_end; phi[0]+= a_delta, phi[1]+=a_delta) {
    points = []
    for (var psi = 0; psi < 2 * Math.PI+2*b_delta; psi += b_delta) {
      for(var i = 0; i < phi.length; i++){
        
        points.push((R + r*Math.cos(psi))* Math.cos(phi[i]));
        points.push((R+ r*Math.cos(psi))*Math.sin(phi[i]));
        points.push(r*Math.sin(psi));
        points.push(1.0);
        points.push(1.0);
        points.push(1.0);

      }
    }
    var indices = []
  for (var i = 0; i < points.length/6; i++) {
    indices.push(i);
    }
    n = initVertexBuffers(new Float32Array(points), new Uint8Array(indices), color, {x:0, y:-45, z:0}, {x:center[0], y:center[1],z:center[2]});
  gl.drawElements(gl.TRIANGLE_STRIP, n, gl.UNSIGNED_BYTE, 0);
  
  } 
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
        points.push(1.0);
        points.push(1.0);
        points.push(1.0);

      }
    }
    var indices = []
  for (var i = 0; i < points.length/6; i++) {
    indices.push(i);
    }
    n = initVertexBuffers(new Float32Array(points), new Uint8Array(indices), color, shapeAngle, bottomCenter);
  gl.drawElements(gl.TRIANGLE_STRIP, n, gl.UNSIGNED_BYTE, 0);
  
  } 
}



/*
    v7----v6
   /|    / |
 v4-+--v5  | 
 |  v3-+--v2
 | /   | /
v0----v1
*/
function drawCube(verticesColors, color){
   // Индексы вершин
 var indices = new Uint8Array([
 0,1,2,0,2,3, // bottom
 4,5,6,5,7,6, // top
 0,3,4,3,4,7, // left
 1,2,5,2,5,6, // right
 0,1,5,0,4,5, // front
 2,3,7,2,6,7 // back
 ]);
  n = initVertexBuffers(verticesColors, indices, color,{x:0, y:0, z:0},{x:0, y:0, z:0})

  gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0);
}

function initVertexBuffers(verticesColors, indices, color, shapeAngle, shapeTranslation) {
 // Создать буферный объект
 var vertexColorBuffer = gl.createBuffer();
 var indexBuffer = gl.createBuffer();
 // Записать координаты и цвета в буферный объект
 gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
 gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW);

 var FSIZE = verticesColors.BYTES_PER_ELEMENT;
 // Получить ссылку на переменную a_Position и разрешить присваивание ей
 var a_Position = gl.getAttribLocation(gl.program, 'a_Position');

 gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FSIZE * 6, 0);
 gl.enableVertexAttribArray(a_Position);

 // Записать индексы в буферный объект
 gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
 gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

 var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');

 gl.uniform4f(u_FragColor, color[0], color[1], color[2], color[3]);

 var u_userTranslation = gl.getUniformLocation(gl.program, 'u_userTranslationMatrix');
 var userTransformMatrix = new Float32Array([
 1.0, 0.0, 0.0, 0.0,
 0.0, 1.0, 0.0, 0.0,
 0.0, 0.0, 1.0, 0.0,
 translation.x, translation.y, translation.z, 1.0
 ]);
 gl.uniformMatrix4fv(u_userTranslation, false, userTransformMatrix);

 var u_Translation = gl.getUniformLocation(gl.program, 'u_TranslationMatrix');
 var transformMatrix = new Float32Array([
 1.0, 0.0, 0.0, 0.0,
 0.0, 1.0, 0.0, 0.0,
 0.0, 0.0, 1.0, 0.0,
 shapeTranslation.x, shapeTranslation.y, shapeTranslation.z, 1.0
 ]);
 gl.uniformMatrix4fv(u_Translation, false, transformMatrix);


 var u_userXRotationMatrix = gl.getUniformLocation(gl.program, 'u_userXRotationMatrix');
 gl.uniformMatrix4fv(u_userXRotationMatrix , false, getXRotMat(angle));
 var u_userYRotationMatrix = gl.getUniformLocation(gl.program, 'u_userYRotationMatrix');
 gl.uniformMatrix4fv(u_userYRotationMatrix , false, getYRotMat(angle));
 var u_userZRotationMatrix = gl.getUniformLocation(gl.program, 'u_userZRotationMatrix');
 gl.uniformMatrix4fv(u_userZRotationMatrix , false, getZRotMat(angle));

 var u_xRotationMatrix = gl.getUniformLocation(gl.program, 'u_xRotationMatrix');
 gl.uniformMatrix4fv(u_xRotationMatrix , false, getXRotMat(shapeAngle));
 var u_yRotationMatrix = gl.getUniformLocation(gl.program, 'u_yRotationMatrix');
 gl.uniformMatrix4fv(u_yRotationMatrix , false, getYRotMat(shapeAngle));
 var u_zRotationMatrix = gl.getUniformLocation(gl.program, 'u_zRotationMatrix');
 gl.uniformMatrix4fv(u_zRotationMatrix , false, getZRotMat(shapeAngle));

 var u_ViewMatrix = gl.getUniformLocation(gl.program,'u_ViewMatrix');

 // Точка наблюдения, точка направления взгляда и направление вверх
 var viewMatrix = new Matrix4();
 viewMatrix.setLookAt(0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0, 1, 0);
 // Передать матрицу вида в переменную u_ViewMatrix
 gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements);


  var u_ProjMatrix = gl.getUniformLocation(gl.program,'u_ProjMatrix');
  var projMatrix = new Matrix4();
  projMatrix.setOrtho(-1.0, 1.5, -1.0, 1.5, -1.0, 1.5);
  gl.uniformMatrix4fv(u_ProjMatrix, false, projMatrix.elements);


var u_Scale = gl.getUniformLocation(gl.program, 'u_userScaleMatrix');
 var scaleMatrix = new Float32Array([
 scale.x, 0.0, 0.0, 0.0,
 0.0, scale.y, 0.0, 0.0,
 0.0, 0.0, scale.z, 0.0,
 0.0, 0.0, 0.0, 1.0
 ]);
 gl.uniformMatrix4fv(u_Scale, false, scaleMatrix);

 return indices.length;
 }

 function getXRotMat(shapeAngle){
    var radian = Math.PI * (shapeAngle.x) / 180.0; // Преобразовать в радианы
    var cosB = Math.cos(radian), sinB = Math.sin(radian);

   return new Float32Array([
    1.0, 0.0, 0.0, 0.0,
    0.0, cosB,sinB, 0.0,
    0.0, -sinB, cosB, 0.0,
    0.0, 0.0, 0.0, 1.0
    ]);
 }

 function getYRotMat(shapeAngle){
    var radian = Math.PI * (shapeAngle.y) / 180.0; // Преобразовать в радианы
    var cosB = Math.cos(radian), sinB = Math.sin(radian);
   return new Float32Array([
    cosB, 0.0, sinB, 0.0,
    0.0, 1.0, 0.0, 0.0,
    -sinB, 0.0, cosB, 0.0,
    0.0, 0.0, 0.0, 1.0
    ]);
 }

  function getZRotMat(shapeAngle){
    var radian = Math.PI * (shapeAngle.z) / 180.0; // Преобразовать в радианы
    var cosB = Math.cos(radian), sinB = Math.sin(radian);

   return new Float32Array([
    cosB, sinB, 0.0, 0.0,
    -sinB, cosB, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
    ]);
 }
function click(ev, canvas, gl) {
  var x = ev.clientX; // координата X указателя мыши
  var y = ev.clientY; // координата Y указателя мыши
  var rect = ev.target.getBoundingClientRect();

  x = ((x - rect.left) - canvas. width/2)/(canvas.width/2);
  y = (canvas. height/2 - (y - rect.top))/(canvas.height/2);
 
  t = lightOn ? lightOnBtn : lightOffBtn
  x1 = t[0][0]
  y1 = t[0][1]
  x2 = t[1][0]
  y2 = t[1][1]
   x3 = t[2][0]
   y3 = t[2][1]
  v1 = (x1-x)*(y2-y1)-(x2-x1)*(y1-y)
  v2 = (x2-x)*(y3-y2)-(x3-x2)*(y2-y)
  v3 = (x3-x)*(y1-y3)-(x1-x3)*(y3-y)

 if(v1 > 0 && v2 > 0 && v3 > 0 || 
    v1 < 0 && v2 < 0 && v3 < 0 ||
    v1 == 0 && v2 == 0 && v3 == 0){
  lightOn = !lightOn
  draw(gl)
 }

 }


function onXRotation() {
    angle.x = document.getElementById('xRotation').value;
    draw(gl)
  }

function onYRotation() {
    angle.y = document.getElementById('yRotation').value;
    draw(gl)
  }

function onZRotation() {
    angle.z = document.getElementById('zRotation').value;
    draw(gl)
  }

function onXTranslation() {
    translation.x = document.getElementById('xTranslation').value;
    draw(gl)
  }

function onYTranslation() {
    translation.y = document.getElementById('yTranslation').value;
    draw(gl)
  }

function onZTranslation() {
    translation.z = document.getElementById('zTranslation').value;
    draw(gl)
  }

function onXScale() {
    scale.x = document.getElementById('xScale').value;
    draw(gl)
  }

function onYScale() {
    scale.y = document.getElementById('yScale').value;
    draw(gl)
  }

function onZScale() {
    scale.z = document.getElementById('zScale').value;
    draw(gl)
  }