let width; //window.innerWidth;
let height; //window.innerHeight;
let r; // box length
let scene;
let camera;
let renderer;
let controls;
let cube;

const light_color = 0xFFFFFF;

const camera_lights = [
    [0, 1000, 0], [500, 1000, 1000], [-500, 1000, -1000], [0, 1000, 500]
];

const imgs_links = [
    ['img/3d.png', 'https://zodiac-g12.github.io/3dd'],
    ['img/cal.png', 'https://zodiac-g12.github.io/Calendirty/'],
    ['img/lights.png', 'https://zodiac-g12.github.io/LightsOut'],
    ['img/main.png', 'https://zodiac-g12.github.io/main/form'],
    ['img/md.png', 'https://zodiac-g12.github.io/mtt/'],
    ['img/tail.png', 'https://zodiac-g12.github.io/tail/']
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
    controls.autoRotate = false;
    renderer = createRenderer();

    cube = createCube(r);
    //cubelist[0] = cube;

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
    const geometry = new THREE.BoxGeometry(r, r, r);
    const loader = new THREE.TextureLoader();
    const materials = [];

    loader.crossOrigin = '*';

    imgs_links.forEach((datas)=>{
        var texture = new THREE.TextureLoader().load(datas[0]);
        materials[materials.length] = new THREE.MeshLambertMaterial({map: texture});
    });

    const material = new THREE.MultiMaterial(materials); // マテリアルをセット
    const cube = new THREE.Mesh(geometry, material);
    // cube.color = 0;
    cube.position.set(0, 0, 0);
    scene.add(cube);

    return cube;
}



function createLight(color, x, y, z){
    const light = new THREE.DirectionalLight(color);
    light.position.set(x, y, z);
    return light;
}



function update(){
    controls.update();
    requestAnimationFrame(update);
    renderer.render(scene, camera);
    var projector = new THREE.Projector();
    var mouse = {x: 0, y: 0};

    cube.rotation.y += 0.01;
    cube.rotation.z += 0.005;

    window.onmousedown = function(e){
        if(e.target == renderer.domElement) {
            //マウス座標2D変換
            var rect = e.target.getBoundingClientRect();
            mouse.x =  e.clientX - rect.left;
            mouse.y =  e.clientY - rect.top;

            //マウス座標3D変換width(横)やheight(縦)は画面サイズ
            mouse.x =  (mouse.x / width) * 2 - 1;
            mouse.y = -(mouse.y / height) * 2 + 1;

            var vector = new THREE.Vector3(mouse.x, mouse.y ,1); //マウスベクトル

            projector.unprojectVector(vector, camera); //vectorはスクリーン座標系なので,オブジェクトの座標系に変換

            var ray = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize()); //始点,向きベクトルを渡してレイを作成

            // クリック判定
            var obj = ray.intersectObjects([cube]);

            console.log(obj)

            if(obj.length > 0) {
                location.href = imgs_links[obj[0].face.materialIndex][1];
            }
            //マウスが押された時
            //クリックされたら加速度切り替え(停止か稼働か)
            // if(controls.autoRotate){
            //   controls.autoRotate = false;
            // }else controls.autoRotate = true;
            // if(obj.length > 0){
            //     cube.color += 1;
            //     if(cube.color > 5){cube.color = 0};
            //     cubecolorChange();
            // }
        }
    };
}


window.addEventListener('DOMContentLoaded', init);
