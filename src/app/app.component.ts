import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public scene = new THREE.Scene();
  public camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000);
  public renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  public light = new THREE.DirectionalLight(0xffffff, 1);
  public controls = new OrbitControls(this.camera, this.renderer.domElement);
  public raycaster = new THREE.Raycaster();
  public mouse = new THREE.Vector2();
  public sphereGeometry = new THREE.SphereGeometry(1, 40, 40);
  public boxGeometry = new THREE.BoxGeometry(2, 2, 2);


  ngOnInit() {
    this.init();
  }

  public init() {
    this.renderer.setClearColor('#000');
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.camera.position.set(0, 5, 5);
    this.controls.update();
    this.light.position.set(-1, 2, 4);
    this.scene.add(this.light);

    const objects3D = [
      this.makeInstance(this.sphereGeometry, 0xff0000, true, 0, 0, 0),
      this.makeInstance(this.boxGeometry, 0x00ff00, false, -4, 0, 0),
      this.makeInstance(this.boxGeometry, 0x0000ff, false, 4, 0, 0),
      this.makeInstance(this.boxGeometry, 0xff00ff, false, 0, 4, 0),
      this.makeInstance(this.boxGeometry, 0x00ffff, false, 0, -4, 0),
      this.makeInstance(this.boxGeometry, 0xffff00, false, 0, 0, 4),
      this.makeInstance(this.boxGeometry, 0xe5e5e5, false, 0, 0, -4),
    ];

    objects3D.forEach(obj => {
      console.log('3D Object -> ', obj);
    });

    window.addEventListener('resize', () => {
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
    }, false);

    // window.addEventListener('click', (event) => {
    //   event.preventDefault();

    //   this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    //   this.mouse.y = (event.clientY / window.innerHeight) * 2 - 1;

    //   console.log('Mouse X ->', this.mouse.x);
    //   console.log('Mouse Y ->', this.mouse.y);

    //   this.raycaster.setFromCamera(this.mouse, this.camera);

    //   let intersect: any = this.raycaster.intersectObjects(this.scene.children);
    //   console.log('Intersects ->', intersect);
    //   for (let i = 0; i < intersect.length; i++) {
    //     intersect[i].object.material.color.set(0x000);
    //   }
    // }, false);


    const animate = () => {
      objects3D.forEach(obj => {
        if (obj.geometry.type == 'BoxGeometry') {
          obj.rotation.y += .01;
        }
        obj.rotation.x += .01
      });

      this.controls.update()

      this.renderer.render(this.scene, this.camera)
      requestAnimationFrame(animate);
    }
    animate();
  }

  private makeInstance(geometry, color, wireframe, x, y, z) {
    const material = new THREE.MeshPhongMaterial({color, wireframe});

    const objToAdd = new THREE.Mesh(geometry, material);
    this.scene.add(objToAdd);

    objToAdd.position.x = x;
    objToAdd.position.y = y;
    objToAdd.position.z = z;

    return objToAdd;
  }

}

