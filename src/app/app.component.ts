import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit{
  public scene;
  public camera;
  public renderer;
  public cube;


  ngOnInit() {
    this.init();
    // window.addEventListener('resize', this.onWindowResize, false);
  }

  ngAfterViewInit() {
    window.addEventListener('resize', this.onWindowResize, false);
  }

  private init() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000);
    this.renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    let geometry = new THREE.BoxGeometry();
    let material = new THREE.MeshBasicMaterial({
      color: 0xff0000
    });

    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);

    this.camera.position.z = 5;

    setInterval(() => {
      this.animate();
    }, 20);
  }

  private animate() {
    this.cube.rotation.x += .02;
    this.cube.rotation.y += .02;

    this.renderer.render(this.scene, this.camera)
  }

  private onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

}

