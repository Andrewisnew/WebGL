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


var VSHADER_SOURCE =
'attribute vec4 a_Position;\n' +
'attribute float a_PointSize;\n' +
 'void main() {\n' +
' gl_Position = a_Position;\n' +
 ' gl_PointSize = a_PointSize;\n' + // Установить размер точки
 '}\n';
// Фрагментный шейдер
 var FSHADER_SOURCE =
 'precision mediump float;\n' +
 'uniform vec4 u_FragColor;\n' + // uniform-переменная
 'void main() {\n' +
 ' gl_FragColor = u_FragColor;\n' + // Установить цвет
 '}\n';

 function main() {
 // Получить ссылку на элемент <canvas>
 var canvas = document.getElementById('webgl');

 // Получить контекст отображения для WebGL
 var gl = getWebGLContext(canvas);
 if (!gl) {
 console.log('Failed to get the rendering context for WebGL');
 return;
 }

 // Инициализировать шейдеры
 if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
 console.log('Failed to initialize shaders.');
 return;
 }

// Получить ссылку на переменную-атрибут
 var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
 var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');

 canvas.onmousedown = function(ev) { click(ev, canvas, gl); };

 // Сохранить координаты в переменной-атрибуте
 //gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0);
 //gl.vertexAttrib1f(a_PointSize, 10.0);


 draw(gl)

 }

function draw(gl){
  if(lightOn)
    color = new Light()
  else
    color = new Dark()
  // Указать цвет для очистки <canvas>
  bg = color.background
 gl.clearColor(bg[0], bg[1], bg[2], bg[3]);

 // Очистить <canvas>
 gl.clear(gl.COLOR_BUFFER_BIT);

 drawSquare(gl, [[0.6, -0.65], [0.6, 0.1], [0.7, -0.65], [0.7, 0.1]], color.silver)
 drawSquare(gl, [[0.6, -0.65], [0.6, 0.1], [0.7, -0.65], [0.7, 0.1]], color.silver)
 drawSquare(gl, [[-0.3, -0.65], [-0.3, -0.55], [0.65, -0.65], [0.65, -0.55]], color.yellow)
 drawSquare(gl, [[-0.25, -0.55], [-0.25, -0.5], [0.6, -0.55], [0.6, -0.5]], color.silver)
 drawSector(gl, 0.62, 0.68, 0, Math.PI/2, Math.PI/32, [0,0.1],color.silver)
 drawSquare(gl, [[0.078, 0.775], [0.048, 0.64], [0.014, 0.784], [-0.018, 0.656]], color.silver)
 drawSquare(gl, [[-0.13, 0.684], [0.156, 0.614], [-0.528, 0.098], [0.15, -0.105]], color.lamp)
 drawSquare(gl, [[-0.528, 0.098], [0.15, -0.105], [-0.5, -0.016], [0.052, -0.173]], color.lamp)
 if(lightOn)
   drawTriangle(gl, lightOnBtn, color.button)
 else
   drawTriangle(gl, lightOffBtn, color.button)
}

function drawSector(gl, r1, r2, alpha_start, alpha_end, alpha_delta, center, color){
  points = []
  for (var i = alpha_start; i < alpha_end; i+= alpha_delta) {
    points.push([center[0] + r1* Math.cos(i), center[1] + r1*Math.sin(i)])
    points.push([center[0] + r2* Math.cos(i), center[1] + r2*Math.sin(i)])
  }
  n = initVertexBuffers(gl, points, color)
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
}

function drawSquare(gl, vertices, color){
  n = initVertexBuffers(gl, vertices, color)
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
}


function drawTriangle(gl, vertices, color){
  n = initVertexBuffers(gl, vertices, color)
  gl.drawArrays(gl.TRIANGLES, 0, n);
}
function initVertexBuffers(gl, points, color) {
 var vertices = new Float32Array(points.flat());
 var n = points.length; // Число вершин

 // Создать буферный объект
 var vertexBuffer = gl.createBuffer()

 // Определить тип буферного объекта как вершинный
 gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
 // Записать данные в буферный объект
 gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

 var a_Position = gl.getAttribLocation(gl.program, 'a_Position');

 // Сохранить ссылку на буферный объект в переменной a_Position
 gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

 // Разрешить присваивание переменной a_Position
 gl.enableVertexAttribArray(a_Position);


 var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');

 gl.uniform4f(u_FragColor, color[0], color[1], color[2], color[3]);

 return n;
 }


 function click(ev, canvas, gl) {
 var x = ev.clientX; // координата X указателя мыши
 var y = ev.clientY; // координата Y указателя мыши
 var rect = ev.target.getBoundingClientRect();

 x = ((x - rect.left) - canvas. width/2)/(canvas.width/2);
 y = (canvas. height/2 - (y - rect.top))/(canvas.height/2);
 console.log('x: ' + x + ', y:' + y)
 
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
