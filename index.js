let width; //window.innerWidth;
let height; //window.innerHeight;
let r; // box length
var scene;
var camera;
var renderer;
var controls;
var cube;
var cubelist = [];
var save = [];

const light_color = 0xFFFFFF;

const camera_lights = [
    [0, 1000, 0], [500, 1000, 1000], [-500, 1000, -1000], [0, 1000, 500]
];


function windSize(){
    height = window.innerHeight;
    width = window.innerWidth;
    r = height > width ? width / 20 : height / 20;
}

function createLight(color, x, y, z){
    const light = new THREE.DirectionalLight(color);
    light.position.set(x, y, z);
    return light;
}


function init(){
    windSize(); //Windowサイズ取得

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(100, width / height, 1, 1000);
    controls = new THREE.OrbitControls(camera);
    controls.autoRotate = true;
    renderer = createRenderer();

    cube = createCube(r);
    cubelist[0] = cube;

    camera.position.set(0, 0, 100);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    camera_lights.forEach((light)=>{
        scene.add(createLight(light_color, light[0], light[1], light[2]));
    });

    update();
}


function createRenderer(){
    // trueにするとrenderが透明に出来るようになる
    const renderer = new THREE.WebGLRenderer({alpha:true});
    renderer.setSize(width, height);
    renderer.setClearColor(light_color, 0); //0:透明
    document.body.appendChild(renderer.domElement);
    return renderer;
}


function createCube(r){
    var geometry = new THREE.BoxGeometry(r, r, r);
    // var geometry = new THREE.SphereGeometry(10, 10, 10);
    var loader = new THREE.TextureLoader();
    loader.crossOrigin = '*';
    // //var texture = new THREE.TextureLoader().load( './a.jpg' );
    //
    // var material// = new THREE.MeshBasicMaterial( { map: texture } );
    // // load a resource
    var materials;

    loader.load(
        // resource URL
        'a.jpg',

        // onLoad callback
        function ( texture ) {
            // in this example we create the material when the texture is loaded
            // material = new THREE.MeshPhongMaterial( {
            //     map: texture
            // } );
            materials = [
                new THREE.MeshLambertMaterial({map: texture}),
                new THREE.MeshLambertMaterial({map: texture}),
                new THREE.MeshLambertMaterial({map: texture}),
                new THREE.MeshLambertMaterial({map: texture}),
                new THREE.MeshLambertMaterial({map: texture}),
                new THREE.MeshLambertMaterial({map: texture})
                // new THREE.MeshLambertMaterial({map:THREE.ImageUtils.loadTexture("images/texture01.png")}),
                // new THREE.MeshLambertMaterial({map:THREE.ImageUtils.loadTexture("images/texture02.png")}),
                // new THREE.MeshLambertMaterial({map:THREE.ImageUtils.loadTexture("images/texture03.png")}),
                // new THREE.MeshLambertMaterial({map:THREE.ImageUtils.loadTexture("images/texture04.png")}),
                // new THREE.MeshLambertMaterial({map:THREE.ImageUtils.loadTexture("images/texture05.png")}),
            ];
        },

        // onProgress callback currently not supported
        undefined,

        // onError callback
        function ( err ) {
            console.error( 'An error happened.' );
        }
    );
    var material = new THREE.MultiMaterial(materials); // マテリアルをセット
    // var material = new THREE.MeshPhongMaterial({map: THREE.ImageUtils.loadTexture('a.jpg')});
    const cube = new THREE.Mesh(geometry, material);
    cube.color = 0;
    cube.position.set(0, 0, 0);
    scene.add(cube);
    return cube;
}



function setcolor(color){
    cube.material.color.setHex(color);
}



function cubecolorChange(){
    var color = cube.color;
    if(color == 0){
        setcolor(0xFFFFFF);
    }else if(color == 1){
        setcolor(0xFF8000);
    }else if(color == 2){
        setcolor(0xFF00FF);
    }else if(color == 3){
        setcolor(0x0000FF);
    }else if(color == 4){
        setcolor(0x40FF00);
    }else setcolor(0x00FFFF);
}



function createLight(color, x, y, z){
    var light = new THREE.DirectionalLight(color);
    light.position.set(x, y, z);
    return light;
}



function update(){
    controls.update();
    requestAnimationFrame(update);
    renderer.render(scene, camera);
    // var projector = new THREE.Projector();
    // var mouse = {x: 0, y: 0};

    // cube.rotation.y += 0.05;
    //
    // if(move == "up"){
    //   cube.position.y += 0.5;
    // }else cube.position.y -= 0.5;
    //
    //
    // if(Date.now() - tmp > 5000){
    //   tmp = Date.now();
    //   if(move == "up"){
    //     move = "down";
    //   }else move = "up";
    // }

    // window.onmousedown = function(e){
    //     if(e.target == renderer.domElement) {
    //         //マウス座標2D変換
    //         var rect = e.target.getBoundingClientRect();
    //         mouse.x =  e.clientX - rect.left;
    //         mouse.y =  e.clientY - rect.top;
    //
    //         //マウス座標3D変換width(横)やheight(縦)は画面サイズ
    //         mouse.x =  (mouse.x / width) * 2 - 1;
    //         mouse.y = -(mouse.y / height) * 2 + 1;
    //
    //         var vector = new THREE.Vector3(mouse.x, mouse.y ,1); //マウスベクトル
    //
    //         projector.unprojectVector(vector, camera); //vectorはスクリーン座標系なので,オブジェクトの座標系に変換
    //
    //         var ray = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize()); //始点,向きベクトルを渡してレイを作成
    //
    //         // クリック判定
    //         var obj = ray.intersectObjects(cubelist);
    //
    //         //マウスが押された時
    //         //クリックされたら加速度切り替え(停止か稼働か)
    //         // if(controls.autoRotate){
    //         //   controls.autoRotate = false;
    //         // }else controls.autoRotate = true;
    //         if(obj.length > 0){
    //             cube.color += 1;
    //             if(cube.color > 5){cube.color = 0};
    //             cubecolorChange();
    //         }
    //     }
    // };
}


window.addEventListener('DOMContentLoaded', init);
