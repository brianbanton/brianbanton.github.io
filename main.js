import * as THREE from 'three';




// Creating the Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); // (FOV, ratio, close clipping point, far clipping point)

    const renderer = new THREE.WebGL1Renderer({alpha: true});
    renderer.setSize( window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement); //adds the renderer element to our HTML document

// Adding the Cube

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhysicalMaterial({color: 0x00ff00});
    const cube = new THREE.Mesh( geometry, material);
    scene.add(cube);

// Adding the light

    const light = new THREE.SpotLight(0x404040, 1000);
    scene.add(light);


// Rendering the Scene

    camera.position.z = 5;

    function animate() {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    }

    animate();