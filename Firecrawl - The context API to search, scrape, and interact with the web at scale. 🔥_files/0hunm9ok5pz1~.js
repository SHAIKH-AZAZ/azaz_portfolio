;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="d959edb8-bd8d-0126-dc8e-5209ee7b3cf8")}catch(e){}}();
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,842744,e=>{"use strict";e.s(["nanoid",0,(e=21)=>{let t="",r=crypto.getRandomValues(new Uint8Array(e|=0));for(;e--;)t+="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict"[63&r[e]];return t}],842744)},146674,436059,33791,20141,e=>{"use strict";var t=e.i(883771),r=e.i(402442);let a={f32:4,i32:4,"vec2<f32>":8,"vec3<f32>":12,"vec4<f32>":16,"vec2<i32>":8,"vec3<i32>":12,"vec4<i32>":16,"mat2x2<f32>":32,"mat3x3<f32>":48,"mat4x4<f32>":64};function n(e){let t=e.map(e=>({data:e,offset:0,size:0})),r=0,n=0;for(let e=0;e<t.length;e++){let i=t[e];if(!(r=a[i.data.type]))throw Error(`Unknown type ${i.data.type}`);i.data.size>1&&(r=Math.max(r,16)*i.data.size);let o=12===r?16:r;i.size=r;let s=n%16;s>0&&16-s<o?n+=(16-s)%16:n+=(r-s%r)%r,i.offset=n,n+=r}return{uboElements:t,size:n=16*Math.ceil(n/16)}}e.s(["WGSL_TO_STD40_SIZE",0,a,"createUboElementsSTD40",0,n],436059);var i=e.i(502069),o=e.i(967316);function s(e,t){let r=Math.max(a[e.data.type]/16,1),n=e.data.value.length/e.data.size,i=(4-n%4)%4,o=e.data.type.indexOf("i32")>=0?"dataInt32":"data";return`
        v = uv.${e.data.name};
        offset += ${t};

        arrayOffset = offset;

        t = 0;

        for(var i=0; i < ${e.data.size*r}; i++)
        {
            for(var j = 0; j < ${n}; j++)
            {
                ${o}[arrayOffset++] = v[t++];
            }
            ${0!==i?`arrayOffset += ${i};`:""}
        }
    `}function u(e){return(0,i.createUboSyncFunction)(e,"uboStd40",s,o.uboSyncFunctionsSTD40)}class c extends r.UboSystem{constructor(){super({createUboElements:n,generateUboSync:u})}}c.extension={type:[t.ExtensionType.WebGLSystem],name:"ubo"},e.s(["GlUboSystem",0,c],146674);var f=e.i(175580),l=e.i(211893),v=e.i(603891),m=e.i(909077);class d{constructor(e,t){this.program=e,this.uniformData=t,this.uniformGroups={},this.uniformDirtyGroups={},this.uniformBlockBindings={}}destroy(){this.uniformData=null,this.uniformGroups=null,this.uniformDirtyGroups=null,this.uniformBlockBindings=null,this.program=null}}function h(e,t,r){let a=e.createShader(t);return e.shaderSource(a,r),e.compileShader(a),a}function g(e){let t=Array(e);for(let e=0;e<t.length;e++)t[e]=!1;return t}function _(e,t){switch(e){case"float":case"int":case"uint":case"sampler2D":case"sampler2DArray":return 0;case"vec2":return new Float32Array(2*t);case"vec3":return new Float32Array(3*t);case"vec4":return new Float32Array(4*t);case"ivec2":return new Int32Array(2*t);case"ivec3":return new Int32Array(3*t);case"ivec4":return new Int32Array(4*t);case"uvec2":return new Uint32Array(2*t);case"uvec3":return new Uint32Array(3*t);case"uvec4":return new Uint32Array(4*t);case"bool":return!1;case"bvec2":return g(2*t);case"bvec3":return g(3*t);case"bvec4":return g(4*t);case"mat2":return new Float32Array([1,0,0,1]);case"mat3":return new Float32Array([1,0,0,0,1,0,0,0,1]);case"mat4":return new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])}return null}var p=e.i(659557);let y=null,b={FLOAT:"float",FLOAT_VEC2:"vec2",FLOAT_VEC3:"vec3",FLOAT_VEC4:"vec4",INT:"int",INT_VEC2:"ivec2",INT_VEC3:"ivec3",INT_VEC4:"ivec4",UNSIGNED_INT:"uint",UNSIGNED_INT_VEC2:"uvec2",UNSIGNED_INT_VEC3:"uvec3",UNSIGNED_INT_VEC4:"uvec4",BOOL:"bool",BOOL_VEC2:"bvec2",BOOL_VEC3:"bvec3",BOOL_VEC4:"bvec4",FLOAT_MAT2:"mat2",FLOAT_MAT3:"mat3",FLOAT_MAT4:"mat4",SAMPLER_2D:"sampler2D",INT_SAMPLER_2D:"sampler2D",UNSIGNED_INT_SAMPLER_2D:"sampler2D",SAMPLER_CUBE:"samplerCube",INT_SAMPLER_CUBE:"samplerCube",UNSIGNED_INT_SAMPLER_CUBE:"samplerCube",SAMPLER_2D_ARRAY:"sampler2DArray",INT_SAMPLER_2D_ARRAY:"sampler2DArray",UNSIGNED_INT_SAMPLER_2D_ARRAY:"sampler2DArray"},x={float:"float32",vec2:"float32x2",vec3:"float32x3",vec4:"float32x4",int:"sint32",ivec2:"sint32x2",ivec3:"sint32x3",ivec4:"sint32x4",uint:"uint32",uvec2:"uint32x2",uvec3:"uint32x3",uvec4:"uint32x4",bool:"uint32",bvec2:"uint32x2",bvec3:"uint32x3",bvec4:"uint32x4"};function S(e,t){if(!y){let t=Object.keys(b);y={};for(let r=0;r<t.length;++r){let a=t[r];y[e[a]]=b[a]}}return y[t]}function E(e,t){let r=e.getShaderSource(t).split("\n").map((e,t)=>`${t}: ${e}`),a=e.getShaderInfoLog(t),n=a.split("\n"),i={},o=n.map(e=>parseFloat(e.replace(/^ERROR\: 0\:([\d]+)\:.*$/,"$1"))).filter(e=>!!e&&!i[e]&&(i[e]=!0,!0)),s=[""];o.forEach(e=>{r[e-1]=`%c${r[e-1]}%c`,s.push("background: #FF0000; color:#FFFFFF; font-size: 10px","font-size: 10px")});let u=r.join("\n");s[0]=u,console.error(a),console.groupCollapsed("click to view full shader code"),console.warn(...s),console.groupEnd()}let T={textureCount:0,blockIndex:0};class P{constructor(e){this._activeProgram=null,this._programDataHash=Object.create(null),this._shaderSyncFunctions=Object.create(null),this._renderer=e,this._renderer.renderableGC.addManagedHash(this,"_programDataHash")}contextChange(e){this._gl=e,this._programDataHash=Object.create(null),this._shaderSyncFunctions=Object.create(null),this._activeProgram=null}bind(e,t){if(this._setProgram(e.glProgram),t)return;T.textureCount=0,T.blockIndex=0;let r=this._shaderSyncFunctions[e.glProgram._key];r||(r=this._shaderSyncFunctions[e.glProgram._key]=this._generateShaderSync(e,this)),this._renderer.buffer.nextBindBase(!!e.glProgram.transformFeedbackVaryings),r(this._renderer,e,T)}updateUniformGroup(e){this._renderer.uniformGroup.updateUniformGroup(e,this._activeProgram,T)}bindUniformBlock(e,t,r=0){let a=this._renderer.buffer,n=this._getProgramData(this._activeProgram),i=e._bufferResource;i||this._renderer.ubo.updateUniformGroup(e);let o=e.buffer,s=a.updateBuffer(o),u=a.freeLocationForBufferBase(s);if(i){let{offset:t,size:r}=e;0===t&&r===o.data.byteLength?a.bindBufferBase(s,u):a.bindBufferRange(s,u,t)}else a.getLastBindBaseLocation(s)!==u&&a.bindBufferBase(s,u);let c=this._activeProgram._uniformBlockData[t].index;n.uniformBlockBindings[r]!==u&&(n.uniformBlockBindings[r]=u,this._renderer.gl.uniformBlockBinding(n.program,c,u))}_setProgram(e){if(this._activeProgram===e)return;this._activeProgram=e;let t=this._getProgramData(e);this._gl.useProgram(t.program)}_getProgramData(e){return this._programDataHash[e._key]||this._createProgramData(e)}_createProgramData(e){let t=e._key;return this._programDataHash[t]=function(e,t){let r=h(e,e.VERTEX_SHADER,t.vertex),a=h(e,e.FRAGMENT_SHADER,t.fragment),n=e.createProgram();e.attachShader(n,r),e.attachShader(n,a);let i=t.transformFeedbackVaryings;i&&("function"!=typeof e.transformFeedbackVaryings?(0,m.warn)("TransformFeedback is not supported but TransformFeedbackVaryings are given."):e.transformFeedbackVaryings(n,i.names,"separate"===i.bufferMode?e.SEPARATE_ATTRIBS:e.INTERLEAVED_ATTRIBS)),e.linkProgram(n),!e.getProgramParameter(n,e.LINK_STATUS)&&(e.getProgramParameter(n,e.LINK_STATUS)||(e.getShaderParameter(r,e.COMPILE_STATUS)||E(e,r),e.getShaderParameter(a,e.COMPILE_STATUS)||E(e,a),console.error("PixiJS Error: Could not initialize shader."),""!==e.getProgramInfoLog(n)&&console.warn("PixiJS Warning: gl.getProgramInfoLog()",e.getProgramInfoLog(n)))),t._attributeData=function(e,t,r=!1){let a={},n=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){let n=t.getActiveAttrib(e,r);if(n.name.startsWith("gl_"))continue;let i=x[S(t,n.type)]||"float32";a[n.name]={location:0,format:i,stride:(0,p.getAttributeInfoFromFormat)(i).stride,offset:0,instance:!1,start:0}}let i=Object.keys(a);if(r){i.sort((e,t)=>e>t?1:-1);for(let r=0;r<i.length;r++)a[i[r]].location=r,t.bindAttribLocation(e,r,i[r]);t.linkProgram(e)}else for(let r=0;r<i.length;r++)a[i[r]].location=t.getAttribLocation(e,i[r]);return a}(n,e,!/^[ \t]*#[ \t]*version[ \t]+300[ \t]+es[ \t]*$/m.test(t.vertex)),t._uniformData=function(e,t){let r={},a=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let n=0;n<a;n++){let a=t.getActiveUniform(e,n),i=a.name.replace(/\[.*?\]$/,""),o=!!a.name.match(/\[.*?\]$/),s=S(t,a.type);r[i]={name:i,index:n,type:s,size:a.size,isArray:o,value:_(s,a.size)}}return r}(n,e),t._uniformBlockData=function(e,t){if(!t.ACTIVE_UNIFORM_BLOCKS)return{};let r={},a=t.getProgramParameter(e,t.ACTIVE_UNIFORM_BLOCKS);for(let n=0;n<a;n++){let a=t.getActiveUniformBlockName(e,n),i=t.getUniformBlockIndex(e,a),o=t.getActiveUniformBlockParameter(e,n,t.UNIFORM_BLOCK_DATA_SIZE);r[a]={name:a,index:i,size:o}}return r}(n,e),e.deleteShader(r),e.deleteShader(a);let o={};for(let r in t._uniformData){let a=t._uniformData[r];o[r]={location:e.getUniformLocation(n,r),value:_(a.type,a.size)}}return new d(n,o)}(this._gl,e),this._programDataHash[t]}destroy(){for(let e of Object.keys(this._programDataHash))this._programDataHash[e].destroy(),this._programDataHash[e]=null;this._programDataHash=null}_generateShaderSync(e,t){return function(e,t){let r=[],a=[`
        var g = s.groups;
        var sS = r.shader;
        var p = s.glProgram;
        var ugS = r.uniformGroup;
        var resources;
    `],n=!1,i=0,o=t._getProgramData(e.glProgram);for(let s in e.groups){let u=e.groups[s];for(let c in r.push(`
            resources = g[${s}].resources;
        `),u.resources){let m=u.resources[c];if(m instanceof l.UniformGroup)if(m.ubo){let t=e._uniformBindMap[s][Number(c)];r.push(`
                        sS.bindUniformBlock(
                            resources[${c}],
                            '${t}',
                            ${e.glProgram._uniformBlockData[t].index}
                        );
                    `)}else r.push(`
                        ugS.updateUniformGroup(resources[${c}], p, sD);
                    `);else if(m instanceof f.BufferResource){let t=e._uniformBindMap[s][Number(c)];r.push(`
                    sS.bindUniformBlock(
                        resources[${c}],
                        '${t}',
                        ${e.glProgram._uniformBlockData[t].index}
                    );
                `)}else if(m instanceof v.TextureSource){let u=e._uniformBindMap[s][c],f=o.uniformData[u];f&&(n||(n=!0,a.push(`
                        var tS = r.texture;
                        `)),t._gl.uniform1i(f.location,i),r.push(`
                        tS.bind(resources[${c}], ${i});
                    `),i++)}}}return Function("r","s","sD",[...a,...r].join("\n"))}(e,t)}resetState(){this._activeProgram=null}}P.extension={type:[t.ExtensionType.WebGLSystem],name:"shader"},e.s(["GlShaderSystem",0,P],33791);var A=e.i(206137);let I={f32:`if (cv !== v) {
            cu.value = v;
            gl.uniform1f(location, v);
        }`,"vec2<f32>":`if (cv[0] !== v[0] || cv[1] !== v[1]) {
            cv[0] = v[0];
            cv[1] = v[1];
            gl.uniform2f(location, v[0], v[1]);
        }`,"vec3<f32>":`if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2]) {
            cv[0] = v[0];
            cv[1] = v[1];
            cv[2] = v[2];
            gl.uniform3f(location, v[0], v[1], v[2]);
        }`,"vec4<f32>":`if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3]) {
            cv[0] = v[0];
            cv[1] = v[1];
            cv[2] = v[2];
            cv[3] = v[3];
            gl.uniform4f(location, v[0], v[1], v[2], v[3]);
        }`,i32:`if (cv !== v) {
            cu.value = v;
            gl.uniform1i(location, v);
        }`,"vec2<i32>":`if (cv[0] !== v[0] || cv[1] !== v[1]) {
            cv[0] = v[0];
            cv[1] = v[1];
            gl.uniform2i(location, v[0], v[1]);
        }`,"vec3<i32>":`if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2]) {
            cv[0] = v[0];
            cv[1] = v[1];
            cv[2] = v[2];
            gl.uniform3i(location, v[0], v[1], v[2]);
        }`,"vec4<i32>":`if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3]) {
            cv[0] = v[0];
            cv[1] = v[1];
            cv[2] = v[2];
            cv[3] = v[3];
            gl.uniform4i(location, v[0], v[1], v[2], v[3]);
        }`,u32:`if (cv !== v) {
            cu.value = v;
            gl.uniform1ui(location, v);
        }`,"vec2<u32>":`if (cv[0] !== v[0] || cv[1] !== v[1]) {
            cv[0] = v[0];
            cv[1] = v[1];
            gl.uniform2ui(location, v[0], v[1]);
        }`,"vec3<u32>":`if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2]) {
            cv[0] = v[0];
            cv[1] = v[1];
            cv[2] = v[2];
            gl.uniform3ui(location, v[0], v[1], v[2]);
        }`,"vec4<u32>":`if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3]) {
            cv[0] = v[0];
            cv[1] = v[1];
            cv[2] = v[2];
            cv[3] = v[3];
            gl.uniform4ui(location, v[0], v[1], v[2], v[3]);
        }`,bool:`if (cv !== v) {
            cu.value = v;
            gl.uniform1i(location, v);
        }`,"vec2<bool>":`if (cv[0] !== v[0] || cv[1] !== v[1]) {
            cv[0] = v[0];
            cv[1] = v[1];
            gl.uniform2i(location, v[0], v[1]);
        }`,"vec3<bool>":`if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2]) {
            cv[0] = v[0];
            cv[1] = v[1];
            cv[2] = v[2];
            gl.uniform3i(location, v[0], v[1], v[2]);
        }`,"vec4<bool>":`if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3]) {
            cv[0] = v[0];
            cv[1] = v[1];
            cv[2] = v[2];
            cv[3] = v[3];
            gl.uniform4i(location, v[0], v[1], v[2], v[3]);
        }`,"mat2x2<f32>":"gl.uniformMatrix2fv(location, false, v);","mat3x3<f32>":"gl.uniformMatrix3fv(location, false, v);","mat4x4<f32>":"gl.uniformMatrix4fv(location, false, v);"},C={f32:"gl.uniform1fv(location, v);","vec2<f32>":"gl.uniform2fv(location, v);","vec3<f32>":"gl.uniform3fv(location, v);","vec4<f32>":"gl.uniform4fv(location, v);","mat2x2<f32>":"gl.uniformMatrix2fv(location, false, v);","mat3x3<f32>":"gl.uniformMatrix3fv(location, false, v);","mat4x4<f32>":"gl.uniformMatrix4fv(location, false, v);",i32:"gl.uniform1iv(location, v);","vec2<i32>":"gl.uniform2iv(location, v);","vec3<i32>":"gl.uniform3iv(location, v);","vec4<i32>":"gl.uniform4iv(location, v);",u32:"gl.uniform1iv(location, v);","vec2<u32>":"gl.uniform2iv(location, v);","vec3<u32>":"gl.uniform3iv(location, v);","vec4<u32>":"gl.uniform4iv(location, v);",bool:"gl.uniform1iv(location, v);","vec2<bool>":"gl.uniform2iv(location, v);","vec3<bool>":"gl.uniform3iv(location, v);","vec4<bool>":"gl.uniform4iv(location, v);"};class U{constructor(e){this._cache={},this._uniformGroupSyncHash={},this._renderer=e,this.gl=null,this._cache={}}contextChange(e){this.gl=e}updateUniformGroup(e,t,r){let a=this._renderer.shader._getProgramData(t);e.isStatic&&e._dirtyId===a.uniformDirtyGroups[e.uid]||(a.uniformDirtyGroups[e.uid]=e._dirtyId,this._getUniformSyncFunction(e,t)(a.uniformData,e.uniforms,this._renderer,r))}_getUniformSyncFunction(e,t){return this._uniformGroupSyncHash[e._signature]?.[t._key]||this._createUniformSyncFunction(e,t)}_createUniformSyncFunction(e,t){let r=this._uniformGroupSyncHash[e._signature]||(this._uniformGroupSyncHash[e._signature]={}),a=this._getSignature(e,t._uniformData,"u");return this._cache[a]||(this._cache[a]=this._generateUniformsSync(e,t._uniformData)),r[t._key]=this._cache[a],r[t._key]}_generateUniformsSync(e,t){return function(e,t){let r=[`
        var v = null;
        var cv = null;
        var cu = null;
        var t = 0;
        var gl = renderer.gl;
        var name = null;
    `];for(let a in e.uniforms){if(!t[a]){e.uniforms[a]instanceof l.UniformGroup?e.uniforms[a].ubo?r.push(`
                        renderer.shader.bindUniformBlock(uv.${a}, "${a}");
                    `):r.push(`
                        renderer.shader.updateUniformGroup(uv.${a});
                    `):e.uniforms[a]instanceof f.BufferResource&&r.push(`
                        renderer.shader.bindBufferResource(uv.${a}, "${a}");
                    `);continue}let n=e.uniformStructures[a],i=!1;for(let e=0;e<A.uniformParsers.length;e++){let t=A.uniformParsers[e];if(n.type===t.type&&t.test(n)){r.push(`name = "${a}";`,A.uniformParsers[e].uniform),i=!0;break}}if(!i){let e=(1===n.size?I:C)[n.type].replace("location",`ud["${a}"].location`);r.push(`
            cu = ud["${a}"];
            cv = cu.value;
            v = uv["${a}"];
            ${e};`)}}return Function("ud","uv","renderer","syncData",r.join("\n"))}(e,t)}_getSignature(e,t,r){let a=e.uniforms,n=[`${r}-`];for(let e in a)n.push(e),t[e]&&n.push(t[e].type);return n.join("-")}destroy(){this._renderer=null,this._cache=null}}U.extension={type:[t.ExtensionType.WebGLSystem],name:"uniformGroup"},e.s(["GlUniformGroupSystem",0,U],20141)},631053,945549,e=>{"use strict";var t=e.i(307524),r=e.i(297294);let a={};e.s(["getTextureBatchBindGroup",0,function(e,n,i){let o=0x811c9dc5;for(let t=0;t<n;t++)o^=e[t].uid,o=Math.imul(o,0x1000193)>>>0;return a[o]||function(e,n,i,o){let s={},u=0;for(let t=0;t<o;t++){let a=t<n?e[t]:r.Texture.EMPTY.source;s[u++]=a.source,s[u++]=a.style}let c=new t.BindGroup(s);return a[i]=c,c}(e,n,o,i)}],631053);var n=e.i(69203),i=e.i(561714);let o=new class{constructor(e){this._canvasPool=Object.create(null),this.canvasOptions=e||{},this.enableFullScreen=!1}_createCanvasAndContext(e,t){let r=n.DOMAdapter.get().createCanvas();r.width=e,r.height=t;let a=r.getContext("2d");return{canvas:r,context:a}}getOptimalCanvasAndContext(e,t,r=1){e=Math.ceil(e*r-1e-6),t=Math.ceil(t*r-1e-6),e=(0,i.nextPow2)(e),t=(0,i.nextPow2)(t);let a=(e<<17)+(t<<1);this._canvasPool[a]||(this._canvasPool[a]=[]);let n=this._canvasPool[a].pop();return n||(n=this._createCanvasAndContext(e,t)),n}returnCanvasAndContext(e){let{width:t,height:r}=e.canvas,a=(t<<17)+(r<<1);e.context.resetTransform(),e.context.clearRect(0,0,t,r),this._canvasPool[a].push(e)}clear(){this._canvasPool={}}};e.s(["CanvasPool",0,o],945549)},684054,e=>{"use strict";let t;e.s(["unsafeEvalSupported",0,function(){if("boolean"==typeof t)return t;try{let e=Function("param1","param2","param3","return param1[param2] === param3;");t=!0===e({a:"b"},"a","b")}catch(e){t=!1}return t}])},402442,206137,502069,967316,175580,e=>{"use strict";var t=e.i(684054),r=e.i(130395),a=e.i(185563);e.s(["UboSystem",0,class{constructor(e){this._syncFunctionHash=Object.create(null),this._adaptor=e,this._systemCheck()}_systemCheck(){if(!(0,t.unsafeEvalSupported)())throw Error("Current environment does not allow unsafe-eval, please use pixi.js/unsafe-eval module to enable support.")}ensureUniformGroup(e){let t=this.getUniformGroupData(e);e.buffer||(e.buffer=new r.Buffer({data:new Float32Array(t.layout.size/4),usage:a.BufferUsage.UNIFORM|a.BufferUsage.COPY_DST}))}getUniformGroupData(e){return this._syncFunctionHash[e._signature]||this._initUniformGroup(e)}_initUniformGroup(e){let t=e._signature,r=this._syncFunctionHash[t];if(!r){let a=Object.keys(e.uniformStructures).map(t=>e.uniformStructures[t]),n=this._adaptor.createUboElements(a),i=this._generateUboSync(n.uboElements);r=this._syncFunctionHash[t]={layout:n,syncFunction:i}}return this._syncFunctionHash[t]}_generateUboSync(e){return this._adaptor.generateUboSync(e)}syncUniformGroup(e,t,n){let i=this.getUniformGroupData(e);e.buffer||(e.buffer=new r.Buffer({data:new Float32Array(i.layout.size/4),usage:a.BufferUsage.UNIFORM|a.BufferUsage.COPY_DST}));let o=null;return t||(t=e.buffer.data,o=e.buffer.dataInt32),n||(n=0),i.syncFunction(e.uniforms,t,o,n),!0}updateUniformGroup(e){if(e.isStatic&&!e._dirtyId)return!1;e._dirtyId=0;let t=this.syncUniformGroup(e);return e.buffer.update(),t}destroy(){this._syncFunctionHash=null}}],402442);let n=[{type:"mat3x3<f32>",test:e=>void 0!==e.value.a,ubo:`
            var matrix = uv[name].toArray(true);
            data[offset] = matrix[0];
            data[offset + 1] = matrix[1];
            data[offset + 2] = matrix[2];
            data[offset + 4] = matrix[3];
            data[offset + 5] = matrix[4];
            data[offset + 6] = matrix[5];
            data[offset + 8] = matrix[6];
            data[offset + 9] = matrix[7];
            data[offset + 10] = matrix[8];
        `,uniform:`
            gl.uniformMatrix3fv(ud[name].location, false, uv[name].toArray(true));
        `},{type:"vec4<f32>",test:e=>"vec4<f32>"===e.type&&1===e.size&&void 0!==e.value.width,ubo:`
            v = uv[name];
            data[offset] = v.x;
            data[offset + 1] = v.y;
            data[offset + 2] = v.width;
            data[offset + 3] = v.height;
        `,uniform:`
            cv = ud[name].value;
            v = uv[name];
            if (cv[0] !== v.x || cv[1] !== v.y || cv[2] !== v.width || cv[3] !== v.height) {
                cv[0] = v.x;
                cv[1] = v.y;
                cv[2] = v.width;
                cv[3] = v.height;
                gl.uniform4f(ud[name].location, v.x, v.y, v.width, v.height);
            }
        `},{type:"vec2<f32>",test:e=>"vec2<f32>"===e.type&&1===e.size&&void 0!==e.value.x,ubo:`
            v = uv[name];
            data[offset] = v.x;
            data[offset + 1] = v.y;
        `,uniform:`
            cv = ud[name].value;
            v = uv[name];
            if (cv[0] !== v.x || cv[1] !== v.y) {
                cv[0] = v.x;
                cv[1] = v.y;
                gl.uniform2f(ud[name].location, v.x, v.y);
            }
        `},{type:"vec4<f32>",test:e=>"vec4<f32>"===e.type&&1===e.size&&void 0!==e.value.red,ubo:`
            v = uv[name];
            data[offset] = v.red;
            data[offset + 1] = v.green;
            data[offset + 2] = v.blue;
            data[offset + 3] = v.alpha;
        `,uniform:`
            cv = ud[name].value;
            v = uv[name];
            if (cv[0] !== v.red || cv[1] !== v.green || cv[2] !== v.blue || cv[3] !== v.alpha) {
                cv[0] = v.red;
                cv[1] = v.green;
                cv[2] = v.blue;
                cv[3] = v.alpha;
                gl.uniform4f(ud[name].location, v.red, v.green, v.blue, v.alpha);
            }
        `},{type:"vec3<f32>",test:e=>"vec3<f32>"===e.type&&1===e.size&&void 0!==e.value.red,ubo:`
            v = uv[name];
            data[offset] = v.red;
            data[offset + 1] = v.green;
            data[offset + 2] = v.blue;
        `,uniform:`
            cv = ud[name].value;
            v = uv[name];
            if (cv[0] !== v.red || cv[1] !== v.green || cv[2] !== v.blue) {
                cv[0] = v.red;
                cv[1] = v.green;
                cv[2] = v.blue;
                gl.uniform3f(ud[name].location, v.red, v.green, v.blue);
            }
        `}];function i(e,t){return`
        for (let i = 0; i < ${e*t}; i++) {
            data[offset + (((i / ${e})|0) * 4) + (i % ${e})] = v[i];
        }
    `}e.s(["uniformParsers",0,n],206137),e.s(["createUboSyncFunction",0,function(e,t,r,a){let i=[`
        var v = null;
        var v2 = null;
        var t = 0;
        var index = 0;
        var name = null;
        var arrayOffset = null;
    `],o=0;for(let s=0;s<e.length;s++){let u=e[s],c=u.data.name,f=!1,l=0;for(let e=0;e<n.length;e++)if(n[e].test(u.data)){l=u.offset/4,i.push(`name = "${c}";`,`offset += ${l-o};`,n[e][t]||n[e].ubo),f=!0;break}if(!f)if(u.data.size>1)l=u.offset/4,i.push(r(u,l-o));else{let e=a[u.data.type];l=u.offset/4,i.push(`
                    v = uv.${c};
                    offset += ${l-o};
                    ${e};
                `)}o=l}return Function("uv","data","dataInt32","offset",i.join("\n"))}],502069);let o={f32:`
        data[offset] = v;`,i32:`
        dataInt32[offset] = v;`,"vec2<f32>":`
        data[offset] = v[0];
        data[offset + 1] = v[1];`,"vec3<f32>":`
        data[offset] = v[0];
        data[offset + 1] = v[1];
        data[offset + 2] = v[2];`,"vec4<f32>":`
        data[offset] = v[0];
        data[offset + 1] = v[1];
        data[offset + 2] = v[2];
        data[offset + 3] = v[3];`,"vec2<i32>":`
        dataInt32[offset] = v[0];
        dataInt32[offset + 1] = v[1];`,"vec3<i32>":`
        dataInt32[offset] = v[0];
        dataInt32[offset + 1] = v[1];
        dataInt32[offset + 2] = v[2];`,"vec4<i32>":`
        dataInt32[offset] = v[0];
        dataInt32[offset + 1] = v[1];
        dataInt32[offset + 2] = v[2];
        dataInt32[offset + 3] = v[3];`,"mat2x2<f32>":`
        data[offset] = v[0];
        data[offset + 1] = v[1];
        data[offset + 4] = v[2];
        data[offset + 5] = v[3];`,"mat3x3<f32>":`
        data[offset] = v[0];
        data[offset + 1] = v[1];
        data[offset + 2] = v[2];
        data[offset + 4] = v[3];
        data[offset + 5] = v[4];
        data[offset + 6] = v[5];
        data[offset + 8] = v[6];
        data[offset + 9] = v[7];
        data[offset + 10] = v[8];`,"mat4x4<f32>":`
        for (let i = 0; i < 16; i++) {
            data[offset + i] = v[i];
        }`,"mat3x2<f32>":i(3,2),"mat4x2<f32>":i(4,2),"mat2x3<f32>":i(2,3),"mat4x3<f32>":i(4,3),"mat2x4<f32>":i(2,4),"mat3x4<f32>":i(3,4)},s={...o,"mat2x2<f32>":`
        data[offset] = v[0];
        data[offset + 1] = v[1];
        data[offset + 2] = v[2];
        data[offset + 3] = v[3];
    `};e.s(["uboSyncFunctionsSTD40",0,o,"uboSyncFunctionsWGSL",0,s],967316);var u=e.i(785373),c=e.i(526078);class f extends u.default{constructor({buffer:e,offset:t,size:r}){super(),this.uid=(0,c.uid)("buffer"),this._resourceType="bufferResource",this._touched=0,this._resourceId=(0,c.uid)("resource"),this._bufferResource=!0,this.destroyed=!1,this.buffer=e,this.offset=0|t,this.size=r,this.buffer.on("change",this.onBufferChange,this)}onBufferChange(){this._resourceId=(0,c.uid)("resource"),this.emit("change",this)}destroy(e=!1){this.destroyed=!0,e&&this.buffer.destroy(),this.emit("change",this),this.buffer=null}}e.s(["BufferResource",0,f],175580)},152009,e=>{"use strict";var t=e.i(883771);let r=[];async function a(e){if(!e)for(let e=0;e<r.length;e++){let t=r[e];if(t.value.test())return void await t.value.load()}}t.extensions.handleByNamedList(t.ExtensionType.Environment,r),e.s(["loadEnvironmentExtensions",0,a])},986857,902902,639751,794709,936686,e=>{"use strict";var t,r=e.i(307301),a=e.i(152009),n=e.i(402991),i=e.i(684054),o=e.i(526078),s=e.i(373839),u=((t=u||{})[t.NONE=0]="NONE",t[t.COLOR=16384]="COLOR",t[t.STENCIL=1024]="STENCIL",t[t.DEPTH=256]="DEPTH",t[t.COLOR_DEPTH=16640]="COLOR_DEPTH",t[t.COLOR_STENCIL=17408]="COLOR_STENCIL",t[t.DEPTH_STENCIL=1280]="DEPTH_STENCIL",t[t.ALL=17664]="ALL",t);e.s(["CLEAR",0,u],902902);class c{constructor(e){this.items=[],this._name=e}emit(e,t,r,a,n,i,o,s){let{name:u,items:c}=this;for(let f=0,l=c.length;f<l;f++)c[f][u](e,t,r,a,n,i,o,s);return this}add(e){return e[this._name]&&(this.remove(e),this.items.push(e)),this}remove(e){let t=this.items.indexOf(e);return -1!==t&&this.items.splice(t,1),this}contains(e){return -1!==this.items.indexOf(e)}removeAll(){return this.items.length=0,this}destroy(){this.removeAll(),this.items=null,this._name=null}get empty(){return 0===this.items.length}get name(){return this._name}}e.s(["SystemRunner",0,c],639751);var f=e.i(785373);let l=["init","destroy","contextChange","resolutionChange","resetState","renderEnd","renderStart","render","update","postrender","prerender"],v=class e extends f.default{constructor(e){super(),this.uid=(0,o.uid)("renderer"),this.runners=Object.create(null),this.renderPipes=Object.create(null),this._initOptions={},this._systemsHash=Object.create(null),this.type=e.type,this.name=e.name,this.config=e;const t=[...l,...this.config.runners??[]];this._addRunners(...t),this._unsafeEvalCheck()}async init(t={}){let r=!0===t.skipExtensionImports||!1===t.manageImports;for(let e in await (0,a.loadEnvironmentExtensions)(r),this._addSystems(this.config.systems),this._addPipes(this.config.renderPipes,this.config.renderPipeAdaptors),this._systemsHash)t={...this._systemsHash[e].constructor.defaultOptions,...t};t={...e.defaultOptions,...t},this._roundPixels=+!!t.roundPixels;for(let e=0;e<this.runners.init.items.length;e++)await this.runners.init.items[e].init(t);this._initOptions=t}render(e,t){let a=e;if(a instanceof n.Container&&(a={container:a},t&&((0,s.deprecation)(s.v8_0_0,"passing a second argument is deprecated, please use render options instead"),a.target=t.renderTexture)),a.target||(a.target=this.view.renderTarget),a.target===this.view.renderTarget&&(this._lastObjectRendered=a.container,a.clearColor??(a.clearColor=this.background.colorRgba),a.clear??(a.clear=this.background.clearBeforeRender)),a.clearColor){let e=Array.isArray(a.clearColor)&&4===a.clearColor.length;a.clearColor=e?a.clearColor:r.Color.shared.setValue(a.clearColor).toArray()}a.transform||(a.container.updateLocalTransform(),a.transform=a.container.localTransform),a.container.enableRenderGroup(),this.runners.prerender.emit(a),this.runners.renderStart.emit(a),this.runners.render.emit(a),this.runners.renderEnd.emit(a),this.runners.postrender.emit(a)}resize(e,t,r){let a=this.view.resolution;this.view.resize(e,t,r),this.emit("resize",this.view.screen.width,this.view.screen.height,this.view.resolution),void 0!==r&&r!==a&&this.runners.resolutionChange.emit(r)}clear(e={}){e.target||(e.target=this.renderTarget.renderTarget),e.clearColor||(e.clearColor=this.background.colorRgba),e.clear??(e.clear=u.ALL);let{clear:t,clearColor:a,target:n}=e;r.Color.shared.setValue(a??this.background.colorRgba),this.renderTarget.clear(n,t,r.Color.shared.toArray())}get resolution(){return this.view.resolution}set resolution(e){this.view.resolution=e,this.runners.resolutionChange.emit(e)}get width(){return this.view.texture.frame.width}get height(){return this.view.texture.frame.height}get canvas(){return this.view.canvas}get lastObjectRendered(){return this._lastObjectRendered}get renderingToScreen(){return this.renderTarget.renderingToScreen}get screen(){return this.view.screen}_addRunners(...e){e.forEach(e=>{this.runners[e]=new c(e)})}_addSystems(e){let t;for(t in e){let r=e[t];this._addSystem(r.value,r.name)}}_addSystem(e,t){let r=new e(this);if(this[t])throw Error(`Whoops! The name "${t}" is already in use`);for(let e in this[t]=r,this._systemsHash[t]=r,this.runners)this.runners[e].add(r);return this}_addPipes(e,t){let r=t.reduce((e,t)=>(e[t.name]=t.value,e),{});e.forEach(e=>{let t=e.value,a=e.name,n=r[a];this.renderPipes[a]=new t(this,n?new n:null)})}destroy(e=!1){this.runners.destroy.items.reverse(),this.runners.destroy.emit(e),Object.values(this.runners).forEach(e=>{e.destroy()}),this._systemsHash=null,this.renderPipes=null}generateTexture(e){return this.textureGenerator.generateTexture(e)}get roundPixels(){return!!this._roundPixels}_unsafeEvalCheck(){if(!(0,i.unsafeEvalSupported)())throw Error("Current environment does not allow unsafe-eval, please use pixi.js/unsafe-eval module to enable support.")}resetState(){this.runners.resetState.emit()}};v.defaultOptions={resolution:1,failIfMajorPerformanceCaveat:!1,roundPixels:!1},e.s(["AbstractRenderer",0,v],986857);var m=e.i(883771);let d="8.11.0";e.s(["VERSION",0,d],794709);class h{static init(){globalThis.__PIXI_APP_INIT__?.(this,d)}static destroy(){}}h.extension=m.ExtensionType.Application;class g{constructor(e){this._renderer=e}init(){globalThis.__PIXI_RENDERER_INIT__?.(this._renderer,d)}destroy(){this._renderer=null}}g.extension={type:[m.ExtensionType.WebGLSystem,m.ExtensionType.WebGPUSystem],name:"initHook",priority:-10},e.s(["ApplicationInitHook",0,h,"RendererInitHook",0,g],936686)},346729,114410,e=>{"use strict";var t=e.i(883771),r=e.i(402442);let a={i32:{align:4,size:4},u32:{align:4,size:4},f32:{align:4,size:4},f16:{align:2,size:2},"vec2<i32>":{align:8,size:8},"vec2<u32>":{align:8,size:8},"vec2<f32>":{align:8,size:8},"vec2<f16>":{align:4,size:4},"vec3<i32>":{align:16,size:12},"vec3<u32>":{align:16,size:12},"vec3<f32>":{align:16,size:12},"vec3<f16>":{align:8,size:6},"vec4<i32>":{align:16,size:16},"vec4<u32>":{align:16,size:16},"vec4<f32>":{align:16,size:16},"vec4<f16>":{align:8,size:8},"mat2x2<f32>":{align:8,size:16},"mat2x2<f16>":{align:4,size:8},"mat3x2<f32>":{align:8,size:24},"mat3x2<f16>":{align:4,size:12},"mat4x2<f32>":{align:8,size:32},"mat4x2<f16>":{align:4,size:16},"mat2x3<f32>":{align:16,size:32},"mat2x3<f16>":{align:8,size:16},"mat3x3<f32>":{align:16,size:48},"mat3x3<f16>":{align:8,size:24},"mat4x3<f32>":{align:16,size:64},"mat4x3<f16>":{align:8,size:32},"mat2x4<f32>":{align:16,size:32},"mat2x4<f16>":{align:8,size:16},"mat3x4<f32>":{align:16,size:48},"mat3x4<f16>":{align:8,size:24},"mat4x4<f32>":{align:16,size:64},"mat4x4<f16>":{align:8,size:32}};function n(e){let t=e.map(e=>({data:e,offset:0,size:0})),r=0;for(let e=0;e<t.length;e++){let n=t[e],i=a[n.data.type].size,o=a[n.data.type].align;if(!a[n.data.type])throw Error(`[Pixi.js] WebGPU UniformBuffer: Unknown type ${n.data.type}`);n.data.size>1&&(i=Math.max(i,o)*n.data.size),r=Math.ceil(r/o)*o,n.size=i,n.offset=r,r+=i}return{uboElements:t,size:r=16*Math.ceil(r/16)}}e.s(["WGSL_ALIGN_SIZE_DATA",0,a,"createUboElementsWGSL",0,n],114410);var i=e.i(502069),o=e.i(967316);function s(e,t){let{size:r,align:n}=a[e.data.type],i=(n-r)/4,o=e.data.type.indexOf("i32")>=0?"dataInt32":"data";return`
         v = uv.${e.data.name};
         ${0!==t?`offset += ${t};`:""}

         arrayOffset = offset;

         t = 0;

         for(var i=0; i < ${e.data.size*(r/4)}; i++)
         {
             for(var j = 0; j < ${r/4}; j++)
             {
                 ${o}[arrayOffset++] = v[t++];
             }
             ${0!==i?`arrayOffset += ${i};`:""}
         }
     `}function u(e){return(0,i.createUboSyncFunction)(e,"uboWgsl",s,o.uboSyncFunctionsWGSL)}class c extends r.UboSystem{constructor(){super({createUboElements:n,generateUboSync:u})}}c.extension={type:[t.ExtensionType.WebGPUSystem],name:"ubo"},e.s(["GpuUboSystem",0,c],346729)}]);

//# debugId=d959edb8-bd8d-0126-dc8e-5209ee7b3cf8
//# sourceMappingURL=06bv1g7ez4vvz.js.map