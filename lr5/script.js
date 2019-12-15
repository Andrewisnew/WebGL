'use strict';

function main() {
    const canvas = document.getElementById('canvas');
    const gl = canvas.getContext('webgl');
    if (!gl) {
        return;
    }

    const ext = gl.getExtension('WEBGL_depth_texture');

    const textureProgramInfo = webglUtils.createProgramInfo(gl, ['3d-vertex-shader', '3d-fragment-shader']);
    const colorProgramInfo = webglUtils.createProgramInfo(gl, ['color-vertex-shader', 'color-fragment-shader']);

    const planeBufferInfo = primitives.createPlaneBufferInfo(gl,25,25,1,1);

    const cylinderBufferInfo = primitives.createTruncatedConeBufferInfo(gl,0.4,0.4,1,100,2);

    const plasticStand = primitives.createCubeBufferInfo(gl, 2);

    const sphereBufferInfo = primitives.createSphereBufferInfo(gl,0.7, 100,100);

    const slampBufferInfo = primitives.createTruncatedConeBufferInfo(gl,1.5,0.1,0.5,100,2);

    const lampBufferInfo = primitives.createTruncatedConeBufferInfo(gl,2.5,1.5,4,100,2);

    const lampBottomBufferInfo = primitives.createHalfSphereBufferInfo(gl,2.5,100,100);

    function initBufferInfo(figure) {
        figure.generateBufferInfo();
        return webglUtils.createBufferInfoFromArrays(gl, {
            position: figure.vertices,
            indices: figure.indices,
            normals: figure.normals,
            texCoords: figure.textureCoords
        });
    }

    const lampTexture = initTexture('textures/lamp.png');
    const silverTexture = initTexture('textures/silver.png');
    const tableTexture = initTexture('textures/table.jpg');
    const wallTexture = initTexture('textures/wall.jpg');


    const depthTextureSize = 512;
    const depthTexture = createDepthTexture();
    const depthFramebuffer = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, depthFramebuffer);
    gl.framebufferTexture2D(
        gl.FRAMEBUFFER,       // target
        gl.DEPTH_ATTACHMENT,  // attachment point
        gl.TEXTURE_2D,        // texture target
        depthTexture,         // texture
        0);                   // mip level

    const settings = {
        cameraX: -9.5,
        cameraY: 12,
        posX: -6.33,
        posY: 11.96,
        posZ: 8.83,
        targetX: -1.65,
        targetY: 0.0,
        targetZ: 0.77,
        projWidth: 32.91,
        projHeight: 16.65,
		perspective: true,
        fieldOfView: 180,
        bias: -0.1,
    };
      webglLessonsUI.setupUI(document.querySelector('#ui'), settings, [
    { type: 'slider',   key: 'cameraX',    min: -10, max: 10, change: render, precision: 2, step: 0.001, },
    { type: 'slider',   key: 'cameraY',    min:   1, max: 20, change: render, precision: 2, step: 0.001, },
]);

    const fieldOfViewRadians = degToRad(60);

    function draw3DObjects(
        projectionMatrix,
        cameraMatrix,
        textureMatrix,
        lightWorldMatrix,
        programInfo) {
        const viewMatrix = m4.inverse(cameraMatrix);

        gl.useProgram(programInfo.program);

        webglUtils.setUniforms(programInfo, {
            u_view: viewMatrix,
            u_projection: projectionMatrix,
            u_bias: settings.bias,
            u_textureMatrix: textureMatrix,
            u_projectedTexture: depthTexture,
            u_shininess: 150,
      u_innerLimit: Math.cos(degToRad(settings.fieldOfView / 2 - 10)),
      u_outerLimit: Math.cos(degToRad(settings.fieldOfView / 2)),
      u_lightDirection: lightWorldMatrix.slice(8, 11).map(v => -v),
      u_lightWorldPosition: [settings.posX, settings.posY, settings.posZ],
      u_viewWorldPosition: cameraMatrix.slice(12, 15),
        });

        drawFigure(programInfo, cylinderBufferInfo, {
            u_colorMult: [1, 1, 1, 1],
            u_color: [1, 0, 0, 1],
            u_texture: silverTexture,
            u_world: m4.scale(m4.translation(2.5, 6, 0), 1, 1, 1)
        });

        drawFigure(programInfo, cylinderBufferInfo, {
            u_colorMult: [1, 1, 1, 1],
            u_color: [1, 0, 0, 1],
            u_texture: silverTexture,
            u_world: m4.yRotate(m4.zRotate(m4.translation(2.4, 6.9, 0), Math.PI/12), Math.PI)
        });
        drawFigure(programInfo, cylinderBufferInfo, {
            u_colorMult: [1, 1, 1, 1],
            u_color: [1, 0, 0, 1],
            u_texture: silverTexture,
            u_world: m4.yRotate(m4.zRotate(m4.translation(2.05, 7.7, 0), 2*Math.PI/12), Math.PI)
        });
        drawFigure(programInfo, cylinderBufferInfo, {
            u_colorMult: [1, 1, 1, 1],
            u_color: [1, 0, 0, 1],
            u_texture: silverTexture,
            u_world: m4.yRotate(m4.zRotate(m4.translation(1.475, 8.41, 0), 3*Math.PI/12), Math.PI)
        });
        drawFigure(programInfo, cylinderBufferInfo, {
            u_colorMult: [1, 1, 1, 1],
            u_color: [1, 0, 0, 1],
            u_texture: silverTexture,
            u_world: m4.yRotate(m4.zRotate(m4.translation(0.75, 8.95, 0), 4*Math.PI/12), Math.PI)
        });
        drawFigure(programInfo, cylinderBufferInfo, {
            u_colorMult: [1, 1, 1, 1],
            u_color: [1, 0, 0, 1],
            u_texture: silverTexture,
            u_world: m4.yRotate(m4.zRotate(m4.translation(-0.09, 9.29, 0), 5*Math.PI/12), Math.PI)
        });

        drawFigure(programInfo, sphereBufferInfo, {
            u_colorMult: [1, 1, 1, 1],
            u_color: [1, 0, 0, 1],
            u_texture: silverTexture,
            u_world: m4.yRotate(m4.zRotate(m4.translation(-1, 9.5, 0), 5*Math.PI/12), Math.PI)
        });

        drawFigure(programInfo, slampBufferInfo, {
            u_colorMult: [1, 1, 1, 1],
            u_color: [1, 0, 0, 1],
            u_texture: silverTexture,
            u_world: m4.yRotate(m4.zRotate(m4.translation(-1.4, 8.7, 0), -Math.PI/8 ), 0)
        });
        drawFigure(programInfo, lampBufferInfo, {
            u_colorMult: [1, 1, 1, 1],
            u_color: [1, 0, 0, 1],
            u_texture: lampTexture,
            u_world: m4.yRotate(m4.zRotate(m4.translation(-2.3, 6.6, 0), -Math.PI/8 ), 0)
        });

        drawFigure(programInfo, lampBottomBufferInfo, {
            u_colorMult: [1, 1, 1, 1],
            u_color: [1, 0, 0, 1],
            u_texture: lampTexture,
            u_world: m4.yRotate(m4.zRotate(m4.translation(-3.05, 4.8, 0), 7*Math.PI/8 ), 0)
        });


        drawFigure(programInfo, plasticStand,
            {
                u_colorMult: [1, 1, 1, 1],
                u_color: [1, 0, 0, 1],
                u_texture: silverTexture,
                u_world: m4.scale(m4.translation(2.5, 3, 0), 0.5, 3, 0.5),
            });

        drawFigure(programInfo, plasticStand,
            {
                u_colorMult: [1, 1, 1, 1],
                u_color: [1, 0, 0, 1],
                u_texture: silverTexture,
                u_world: m4.scale(m4.translation(0, 1, 0), 3.5, 0.6, 2.5),
            });
        drawFigure(programInfo, plasticStand,
            {
                u_colorMult: [1, 1, 1, 1],
                u_color: [1, 0, 0, 1],
                u_texture: lampTexture,
                u_world: m4.scaling(4, 1, 3),
            });

        drawFigure(programInfo, planeBufferInfo,
            {
                u_colorMult: [1, 1, 1, 1],
                u_color: [1, 0, 0, 1],
                u_texture: tableTexture,
                u_world: m4.translation(0, 0, 0),
            });

        drawFigure(programInfo, planeBufferInfo,
            {
                u_colorMult: [1, 1, 1, 1],
                u_color: [1, 0, 0, 1],
                u_texture: wallTexture,
                u_world: m4.yRotate(m4.zRotate(m4.translation(12.5, 0, 0), Math.PI/2 ), Math.PI/2),
            });
    }

    function drawFigure(program, figureBuffer, figureUniform, primitive) {
        webglUtils.setBuffersAndAttributes(gl, program, figureBuffer);
        webglUtils.setUniforms(program, figureUniform);
        if (primitive) {
            webglUtils.drawBufferInfo(gl, figureBuffer, primitive);
        } else {
            webglUtils.drawBufferInfo(gl, figureBuffer);
        }

    }
    function render() {
        webglUtils.resizeCanvasToDisplaySize(gl.canvas);

        gl.enable(gl.CULL_FACE);
        gl.enable(gl.DEPTH_TEST);

        // first draw from the POV of the light
        const lightWorldMatrix = m4.lookAt(
            [settings.posX, settings.posY, settings.posZ],          // position
            [settings.targetX, settings.targetY, settings.targetZ], // target
            [0, 1, 0],                                              // up
        );
        const lightProjectionMatrix = m4.orthographic(
            -settings.projWidth / 2,   // left
            settings.projWidth / 2,   // right
            -settings.projHeight / 2,  // bottom
            settings.projHeight / 2,  // top
            0.01,                      // near
            20);                      // far

        // draw to the depth texture
        gl.bindFramebuffer(gl.FRAMEBUFFER, depthFramebuffer);
        gl.viewport(0, 0, depthTextureSize, depthTextureSize);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // Depth rendering
        draw3DObjects(
            lightProjectionMatrix,
            lightWorldMatrix,
            m4.identity(),
            lightWorldMatrix,
            colorProgramInfo);

        // now draw scene to the canvas projecting the depth texture into the scene
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.clearColor(0, 0, 0, 0.5);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        let textureMatrix = m4.identity();
        textureMatrix = m4.translate(textureMatrix, 0.5, 0.5, 0.5);
        textureMatrix = m4.scale(textureMatrix, 0.5, 0.5, 0.5);
        textureMatrix = m4.multiply(textureMatrix, lightProjectionMatrix);
        textureMatrix = m4.multiply(
            textureMatrix,
            m4.inverse(lightWorldMatrix));

        const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
        const projectionMatrix =
            m4.perspective(fieldOfViewRadians, aspect, 1, 2000);

        const cameraPosition = [settings.cameraX, settings.cameraY, 15];
        const target = [0, 0, 0];
        const up = [0, 1, 0];
        const cameraMatrix = m4.lookAt(cameraPosition, target, up);

        draw3DObjects(
            projectionMatrix,
            cameraMatrix,
            textureMatrix,
            lightWorldMatrix,
            textureProgramInfo);
    }

    function initTexture(url) {
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        const level = 0;
        const internalFormat = gl.RGBA;
        const width = 1;
        const height = 1;
        const border = 0;
        const srcFormat = gl.RGBA;
        const srcType = gl.UNSIGNED_BYTE;
        const pixel = new Uint8Array([255, 255, 255, 255]);
        gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
            width, height, border, srcFormat, srcType,
            pixel);

        const image = new Image();
        image.onload = function () {
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                srcFormat, srcType, image);
            if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
                console.log("asd");
                gl.generateMipmap(gl.TEXTURE_2D);
            } else {
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            }
        };
        image.src = url;
        return texture;
    }

    function createDepthTexture() {
        let texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(
            gl.TEXTURE_2D,      // target
            0,                  // mip level
            gl.DEPTH_COMPONENT, // internal format
            depthTextureSize,   // width
            depthTextureSize,   // height
            0,                  // border
            gl.DEPTH_COMPONENT, // format
            gl.UNSIGNED_INT,    // type
            null);              // data
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

        return texture;
    }

    render();
}

main();
