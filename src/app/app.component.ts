import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  public scene = new THREE.Scene();
  public camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000);
  public renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  public controls = new OrbitControls(this.camera, this.renderer.domElement);
  public raycaster = new THREE.Raycaster();
  public mouse = new THREE.Vector2();
  public group = new THREE.Group();
  public cubeGeometry = new THREE.BoxGeometry();
  public cubeMaterial = new THREE.MeshBasicMaterial({
    color: 0xff0000
  });
  public cube = new THREE.Mesh(this.cubeGeometry, this.cubeMaterial);
  public sphereGeometry = new THREE.SphereGeometry(1, 50, 50);
  public sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true
  });
  public sphere = new THREE.Mesh(this.sphereGeometry, this.sphereMaterial);
  public sphereGeometry2 = new THREE.SphereGeometry(2, 50, 50);
  public sphereMaterial2 = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true
  });
  public sphere2 = new THREE.Mesh(this.sphereGeometry2, this.sphereMaterial2);
  public sphereGeometry3 = new THREE.SphereGeometry(3, 50, 50);
  public sphereMaterial3 = new THREE.MeshBasicMaterial({
    color: 0x0000ff,
    wireframe: true
  });
  public sphere3 = new THREE.Mesh(this.sphereGeometry3, this.sphereMaterial3);


  ngOnInit() {
    this.init();
  }

  ngAfterViewInit() {}

  public init() {
    this.renderer.setClearColor('#e5e5e5');
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    // this.cube.scale.set(1,2,1);
    this.cube.position.set(4, 0, 0);
    this.group.add(this.cube);
    this.group.add(this.sphere);
    this.group.add(this.sphere2);
    this.group.add(this.sphere3);
    // this.scene.add(this.cube);
    this.scene.add(this.group);

    this.camera.position.set(0, 5, 5);
    this.controls.update();

    window.addEventListener('resize', () => {
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
    }, false);

    window.addEventListener('click', (event) => {
      event.preventDefault();

      this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = (event.clientY / window.innerHeight) * 2 - 1;

      console.log('Mouse X ->', this.mouse.x);
      console.log('Mouse Y ->', this.mouse.y);

      this.raycaster.setFromCamera(this.mouse, this.camera);

      let intersect: any = this.raycaster.intersectObjects(this.scene.children);
      console.log('Intersects ->', intersect);
      for (let i = 0; i < intersect.length; i++) {
        intersect[i].object.material.color.set(0x00ffff);
      }
    }, false);

    const animate = () => {
      this.group.rotation.x += .01;
      this.group.rotation.y += .01;
      // this.sphere.rotation.x += .01;
      // this.sphere.rotation.y += .01;

      this.controls.update()

      this.renderer.render(this.scene, this.camera)
      requestAnimationFrame(animate);
    }
    animate();
  }

}

