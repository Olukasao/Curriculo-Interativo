import{T as B,C as G,W as L,S as R,N as _,L as U,a as j,P as I,G as A,M as f,b,c as S,d as v,A as M,B as O,e as q,R as Y,f as T,V as N,D as Q,g as X}from"./three-CLOmk-q-.js";const c=1,g=Math.PI/180,P={lat:-23.32,lon:-46.73},$=[{lat:40.71,lon:-74},{lat:38.72,lon:-9.14},{lat:51.5,lon:-.12},{lat:25.76,lon:-80.19},{lat:-34.6,lon:-58.38},{lat:-33.45,lon:-70.67},{lat:4.71,lon:-74.07},{lat:-33.92,lon:18.42},{lat:6.52,lon:3.38},{lat:40.4,lon:-3.7},{lat:-3.73,lon:-38.52},{lat:34.05,lon:-118.24},{lat:19.43,lon:-99.13},{lat:48.85,lon:2.35}],J=[[0,2],[3,6],[1,8],[11,12],[4,5],[13,9],[7,8]],C=new N(-.75,.32,.58).normalize(),K=new N(0,1,0);function E(s,e,t=c){const a=(90-s)*g,o=(e+180)*g;return new N(-t*Math.sin(a)*Math.cos(o),t*Math.cos(a),t*Math.sin(a)*Math.sin(o))}function Z(s,e){const a=.1+.38*(s.angleTo(e)/Math.PI),o=s.clone().lerp(e,.25).normalize().multiplyScalar(c*(1+a)),n=s.clone().lerp(e,.75).normalize().multiplyScalar(c*(1+a));return new X(s,o,n,e)}const H=`
  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vPosW;
  void main() {
    vUv = uv;
    vNormalW = normalize(mat3(modelMatrix) * normal);
    vec4 w = modelMatrix * vec4(position, 1.0);
    vPosW = w.xyz;
    gl_Position = projectionMatrix * viewMatrix * w;
  }
`,ee=`
  uniform sampler2D uDay;
  uniform sampler2D uNight;
  uniform sampler2D uWater;
  uniform vec3 uSun;
  uniform vec3 uAtmo;
  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vPosW;
  void main() {
    vec3 N = normalize(vNormalW);
    vec3 V = normalize(cameraPosition - vPosW);
    float sunDot = dot(N, uSun);
    float dayMix = smoothstep(-0.18, 0.22, sunDot);

    vec3 day = texture2D(uDay, vUv).rgb;
    vec3 night = texture2D(uNight, vUv).rgb;
    float water = texture2D(uWater, vUv).r;

    // Dia: difuso com piso (nunca fica chapado preto)
    vec3 dayCol = day * (0.16 + 1.08 * max(sunDot, 0.0));
    // Noite: luzes das cidades em tom âmbar
    vec3 nightCol = night * vec3(1.0, 0.82, 0.55) * 1.8 + vec3(0.004, 0.008, 0.02);
    vec3 col = mix(nightCol, dayCol, dayMix);

    // Reflexo do sol só nos oceanos
    vec3 H = normalize(uSun + V);
    float spec = pow(max(dot(N, H), 0.0), 900.0) * water * dayMix;
    col += vec3(0.8, 0.9, 1.0) * spec * 0.35;

    // Brilho atmosférico na borda (fresnel), mais forte no lado iluminado
    float fres = pow(1.0 - max(dot(N, V), 0.0), 2.6);
    col = mix(col, uAtmo, fres * (0.2 + 0.6 * dayMix));

    // Terminador levemente alaranjado (pôr do sol)
    float dusk = smoothstep(-0.05, 0.12, sunDot) * (1.0 - smoothstep(0.12, 0.35, sunDot));
    col += vec3(0.35, 0.14, 0.04) * dusk * 0.07;

    gl_FragColor = vec4(col, 1.0);
    #include <colorspace_fragment>
  }
`,te=`
  uniform vec3 uColor;
  uniform vec3 uSun;
  varying vec3 vNormalW;
  varying vec3 vPosW;
  void main() {
    vec3 N = normalize(vNormalW);
    vec3 V = normalize(cameraPosition - vPosW);
    // c = 0 na borda externa do halo, ~0.47 rente ao limbo da Terra
    float c = clamp(-dot(N, V), 0.0, 1.0);
    float rim = pow(smoothstep(0.0, 0.47, c), 1.6);
    float lit = 0.25 + 0.75 * smoothstep(-0.35, 0.6, dot(N, uSun));
    float a = rim * lit;
    gl_FragColor = vec4(uColor * a * 1.4, a);
    #include <colorspace_fragment>
  }
`,oe=`
  varying float vProg;
  void main() {
    vProg = uv.x;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,ae=`
  uniform float uHead;
  uniform float uTrail;
  uniform vec3 uColor;
  uniform vec3 uHot;
  uniform float uBase;
  varying float vProg;
  void main() {
    float behind = uHead - vProg;
    float trail = behind >= 0.0 ? 1.0 - behind / uTrail : 0.0;
    trail = pow(clamp(trail, 0.0, 1.0), 2.2);
    float head = 1.0 - smoothstep(0.0, 0.02, abs(behind));
    vec3 col = mix(uColor, uHot, trail * trail + head);
    float a = max(uBase, trail * 0.95 + head);
    gl_FragColor = vec4(col, a);
    #include <colorspace_fragment>
  }
`;function D(s,e){return new Promise((t,a)=>s.load(e,t,void 0,a))}class V{static async create(e,t={}){const a=t.tier==="lite"?"1k":"2k",o=new B,[n,r,w]=await Promise.all([D(o,`/apps/acessanet-site/earth/day-${a}.webp`),D(o,`/apps/acessanet-site/earth/night-${a}.webp`),D(o,"/apps/acessanet-site/earth/water-1k.webp")]);return new V(e,{...t,textures:{day:n,night:r,water:w}})}constructor(e,{tier:t="full",onReady:a,textures:o,lockDay:n=!1}){this.canvas=e,this.lockDay=n,this.earthSun=C.clone(),this.tier=t,this.running=!1,this.pointer={x:0,y:0,tx:0,ty:0},this.clock=new G;const r=t==="lite";this.pixelRatio=Math.min(window.devicePixelRatio||1,r?1.25:1.75),this.renderer=new L({canvas:e,antialias:!r,alpha:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(this.pixelRatio),this.renderer.setClearColor(0,0),this.failed=!1,this.renderer.debug.onShaderError=()=>{this.failed=!0};const w=Math.min(8,this.renderer.capabilities.getMaxAnisotropy());o.day.colorSpace=R,o.night.colorSpace=R,o.water.colorSpace=_;for(const i of Object.values(o))i.anisotropy=w,i.minFilter=U;this.scene=new j,this.camera=new I(32,1,.1,100),this.camera.position.set(0,.2,4.6),this.root=new A,this.globe=new A,this.root.add(this.globe),this.scene.add(this.root);const W=r?64:128;this.globe.add(new f(new b(c,W,W),new S({vertexShader:H,fragmentShader:ee,uniforms:{uDay:{value:o.day},uNight:{value:o.night},uWater:{value:o.water},uSun:{value:this.earthSun},uAtmo:{value:new v("#5aa8ff")}}}))),this.root.add(new f(new b(c*1.13,64,64),new S({vertexShader:H,fragmentShader:te,side:O,transparent:!0,depthWrite:!1,blending:M,uniforms:{uColor:{value:new v("#3b8cff")},uSun:{value:C}}}))),this.arcs=[];const p=E(P.lat,P.lon,c*1.002),d=$.map(i=>E(i.lat,i.lon,c*1.002)),k=d.map(i=>[p,i]);r||J.forEach(([i,l])=>k.push([d[i],d[l]])),k.forEach(([i,l],x)=>{const u=x<d.length,m=new S({vertexShader:oe,fragmentShader:ae,transparent:!0,depthWrite:!1,blending:M,uniforms:{uHead:{value:0},uTrail:{value:.4},uColor:{value:new v(u?"#4f9bff":"#2f6bff")},uHot:{value:new v("#d8f6ff")},uBase:{value:u?.1:.04}}}),h=new q(Z(i,l),r?48:96,u?.0042:.0028,r?3:5,!1);this.globe.add(new f(h,m)),this.arcs.push({mat:m,speed:.15+Math.random()*.1,offset:Math.random()*1.6})}),this.pulses=[];const F=new Y(.6,1,40),y=(i,l,x,u)=>{const m=new T({color:x,transparent:!0,side:Q,depthWrite:!1,blending:M}),h=new f(F,m);h.position.copy(i.clone().multiplyScalar(1.003)),h.lookAt(i.clone().multiplyScalar(2)),this.globe.add(h),this.pulses.push({m:h,mat:m,scale:l,delay:u})};y(p,.055,"#8ae8ff",0),y(p,.055,"#8ae8ff",.5),d.forEach((i,l)=>y(i,.018,"#8ae8ff",l*.37%1));const z=new f(new b(.011,16,16),new T({color:"#ffffff"}));if(z.position.copy(p),this.globe.add(z),this.root.rotation.z=23.4*g*.6,this.root.rotation.x=-.22,this.globe.rotation.y=-((P.lon+180)*g)+Math.PI/2-.5,this.rot0=this.globe.rotation.y,this.onResize=this.onResize.bind(this),this.tick=this.tick.bind(this),this.onPointer=this.onPointer.bind(this),this.ro=new ResizeObserver(this.onResize),this.ro.observe(e.parentElement),this.onResize(),t==="full"&&window.addEventListener("pointermove",this.onPointer,{passive:!0}),this.intro=0,this.renderer.compile(this.scene,this.camera),this.renderer.render(this.scene,this.camera),this.failed||this.renderer.getContext().isContextLost())throw this.dispose(),new Error("globe-shader");a?.()}onPointer(e){this.pointer.tx=e.clientX/window.innerWidth*2-1,this.pointer.ty=e.clientY/window.innerHeight*2-1}onResize(){const e=this.canvas.parentElement,t=e.clientWidth,a=e.clientHeight;!t||!a||(this.renderer.setSize(t,a,!1),this.camera.aspect=t/a,this.camera.position.z=t/a<.9?5.6:4.6,this.camera.updateProjectionMatrix(),this.running||this.renderer.render(this.scene,this.camera))}setVisible(e){e?this.start():this.stop()}start(){this.running||(this.running=!0,this.clock.getDelta(),this.raf=requestAnimationFrame(this.tick))}stop(){this.running=!1,cancelAnimationFrame(this.raf)}tick(){if(!this.running)return;const e=Math.min(this.clock.getDelta(),.05),t=this.clock.elapsedTime;this.intro=Math.min(1,this.intro+e/2.4);const a=1-Math.pow(1-this.intro,4);this.globe.rotation.y+=e*.06,this.lockDay&&this.earthSun.copy(C).applyQuaternion(this.root.quaternion.clone().invert()).applyAxisAngle(K,this.globe.rotation.y-this.rot0).applyQuaternion(this.root.quaternion),this.root.scale.setScalar(.9+.1*a);const o=this.pointer;o.x+=(o.tx-o.x)*.04,o.y+=(o.ty-o.y)*.04,this.camera.position.x=Math.sin(t*.1)*.18+o.x*.16,this.camera.position.y=.2+Math.cos(t*.08)*.1-o.y*.1+(1-a)*.5,this.camera.lookAt(0,0,0);for(const n of this.arcs){const r=(t*n.speed+n.offset)%1.8/1.8;n.mat.uniforms.uHead.value=r*1.8-.2}for(const n of this.pulses){const r=(t*.55+n.delay)%1;n.m.scale.setScalar(n.scale*(.4+r*1.6)),n.mat.opacity=(1-r)*(n.scale>.04?.85:.6)}this.renderer.render(this.scene,this.camera),this.raf=requestAnimationFrame(this.tick)}dispose(){this.stop(),this.ro?.disconnect(),window.removeEventListener("pointermove",this.onPointer),this.scene?.traverse(e=>{if(e.geometry?.dispose?.(),e.material){for(const t of Object.values(e.material.uniforms||{}))t.value?.dispose?.();e.material.dispose?.()}}),this.renderer.dispose()}}export{V as GlobeScene,E as latLonToVec3};
