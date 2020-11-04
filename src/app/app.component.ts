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
  public light = new THREE.DirectionalLight(0xffffff, 1);
  public controls = new OrbitControls(this.camera, this.renderer.domElement);
  public raycaster = new THREE.Raycaster();
  public mouse = new THREE.Vector2();
  public sphereGeometry = new THREE.SphereGeometry(1, 40, 40);


  ngOnInit() {
    this.init();
  }

  ngAfterViewInit() {}

  public init() {
    this.renderer.setClearColor('#000');
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.camera.position.set(0, 5, 5);
    this.controls.update();
    this.light.position.set(-1, 2, 4);
    this.scene.add(this.light);

    const spheres = [
      this.makeInstance(this.sphereGeometry, 0xff0000, 0, true),
      this.makeInstance(this.sphereGeometry, 0x00ff00, -4, true),
      this.makeInstance(this.sphereGeometry, 0x0000ff, 4, true)
    ];

    window.addEventListener('resize', () => {
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
    }, false);


    const animate = () => {
      spheres.forEach(sphere => {
        sphere.rotation.x += .01
      });

      this.controls.update()

      this.renderer.render(this.scene, this.camera)
      requestAnimationFrame(animate);
    }
    animate();
  }

  private makeInstance(geometry, color, x, wireframe) {
    const material = new THREE.MeshPhongMaterial({color, wireframe});

    const sphere = new THREE.Mesh(geometry, material);
    this.scene.add(sphere);

    sphere.position.x = x;

    return sphere;
  }

}

