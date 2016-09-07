	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(100,
										window.innerWidth  /window.innerHeight,
										.1,
										5000);
	camera.position.x = 434;
	camera.position.y = 1206;
	camera.position.z = 2032;

	var renderer = new THREE.WebGLRenderer();
	renderer.setClearColor(0xEEEEEE);
	renderer.setSize(window.innerWidth,window.innerHeight);
	if(show_info)
		var stats = initStats();
	
	var depth = 512;
	var width = 512;
	var spacingX = 3;
	var spacingZ = 3;
	var heightOffset = 2;
	var canvas = document.createElement('canvas');
	canvas.width = 512;
	canvas.height = 512;
	var ctx = canvas.getContext('2d');
	var img = new Image();
	img.src = "./sorce/map.png";
	img.onload = function () {

		ctx.drawImage(img, 0, 0);
		var pixel = ctx.getImageData(0, 0, width, depth);
		var geom = new THREE.Geometry();
		var output = [];
		for (var x = 0; x < depth; x++) {
			for (var z = 0; z < width; z++) {
				// get pixel
				// since we're grayscale, we only need one element
				// each pixel contains four values RGB and opacity
				var yValue = pixel.data[z * 4 + (depth * x * 4)] / heightOffset;
				var vertex = new THREE.Vector3(x * spacingX, yValue, z * spacingZ);
				geom.vertices.push(vertex);
			}
		}
		for (var z = 0; z < depth - 1; z++) {
			for (var x = 0; x < width - 1; x++) {
				// we need to point to the position in the array
				// a - - b
				// |  x  |
				// c - - d
				var a = x + z * width;
				var b = (x + 1) + (z * width);
				var c = x + ((z + 1) * width);
				var d = (x + 1) + ((z + 1) * width);
				var face1 = new THREE.Face3(a, b, d);
				var face2 = new THREE.Face3(d, c, a);
				geom.faces.push(face1);
				geom.faces.push(face2);
			}
		}
		geom.computeVertexNormals(true);
		geom.computeFaceNormals();
		//texture

var textureLoader = new THREE.TextureLoader();
var material = new THREE.MeshPhongMaterial({
	map: textureLoader.load("./sorce/map.png"),
	transparent: true,
	opacity: .9,
	color: 0xFF0000
});

	
	var plane = new THREE.Mesh(geom, material);
	scene.add(plane);
	//camera.lookAt(scene.position);
	//camera.target.position.copy(plane);
	$("#canvas_face").append(renderer.domElement);
	renderScene(plane);	
	
	}


	function renderScene(plane) {
		if(show_info)
			stats.update();
		roteteCamera();
		requestAnimationFrame(renderScene);
		renderer.render(scene, camera);
	}
	

	var show = false
	function roteteCamera(){
        //position
		if( !Key.isDown(Key.SPACE) && (Key.isDown(Key.W))) {
            camera.position.y -= speed;
            show = true;
        }
        if( !Key.isDown(Key.SPACE) && (Key.isDown(Key.S))){
            show = true;
            camera.position.y += speed;
        }

        if( !Key.isDown(Key.SPACE) && (Key.isDown(Key.D)) ) {
            camera.position.x += speed;
            show = true;

        }
        if( !Key.isDown(Key.SPACE) && (Key.isDown(Key.A)) ) {
            show = true;
            camera.position.x -= speed;
        }

        //rotation
        if( Key.isDown(Key.SPACE) && Key.isDown(Key.W) ){
            camera.rotation.y += speed;
            show = true;
        }
        if( Key.isDown(Key.SPACE) && Key.isDown(Key.S) ) {
            camera.rotation.y -= speed;
            show = true;
        }
        if( Key.isDown(Key.SPACE) && Key.isDown(Key.A) ){
            camera.rotation.x += speed;
            show = true;
        }
        if( Key.isDown(Key.SPACE) && Key.isDown(Key.D) ) {
            camera.rotation.x -= speed;
            show = true;
        }

			
			//if( (Key.isDown(Key.S)) && (Key.isDown(Key.SPACE)) && (Key.isDown(Key.W)) )
        if(show) {
            console.log(camera.position);
            show = false;
        }
	}
	
	function initStats() {
		var stats = new Stats();
		stats.setMode(0);//0 - fps 
						//1 - rendering_time
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.left = '0px';
		stats.domElement.style.top = '0px';
		$("#Stats-output").append(stats.domElement );
		return stats;
	}
