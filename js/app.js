// web2/js/app.js - Standalone Vanilla JS for Middle School 3D Geometry
// 2022 개정 교육과정 중학교 수학과 성취기준 [9수03-07], [9수03-08] 기반

(function() {
  'use strict';

  /* ==========================================================================
     1. SHAPE DEFINITIONS & MATHEMATICAL PROPERTIES
     ========================================================================== */
  const SHAPE_DATA = {
    // 1) 다면체 (Polyhedra)
    tetrahedron: {
      type: 'poly',
      title: '정사면체 (Regular Tetrahedron)',
      category: '정다면체 5종',
      desc: '4개의 합동인 정삼각형으로 둘러싸여 있으며, 한 꼭짓점에 3개의 면이 모이는 가장 단순한 정다면체입니다.',
      V: 4, E: 6, F: 4,
      euler: '4 - 6 + 4 = 2',
      faceShape: '정삼각형',
      vertexFaces: 3
    },
    cube: {
      type: 'poly',
      title: '정육면체 (Cube / Regular Hexahedron)',
      category: '정다면체 5종',
      desc: '6개의 합동인 정사각형으로 둘러싸여 있으며, 한 꼭짓점에 3개의 면이 모이는 정다면체(정사각기둥)입니다.',
      V: 8, E: 12, F: 6,
      euler: '8 - 12 + 6 = 2',
      faceShape: '정사각형',
      vertexFaces: 3
    },
    octahedron: {
      type: 'poly',
      title: '정팔면체 (Regular Octahedron)',
      category: '정다면체 5종',
      desc: '8개의 합동인 정삼각형으로 둘러싸여 있으며, 한 꼭짓점에 4개의 면이 모이는 정다면체입니다.',
      V: 6, E: 12, F: 8,
      euler: '6 - 12 + 8 = 2',
      faceShape: '정삼각형',
      vertexFaces: 4
    },
    prism_tri: {
      type: 'poly',
      title: '삼각기둥 (Triangular Prism)',
      category: '각기둥',
      desc: '두 밑면이 평행하고 서로 합동인 삼각형이며, 옆면이 모두 직사각형인 다면체입니다.',
      V: 6, E: 9, F: 5,
      euler: '6 - 9 + 5 = 2',
      faceShape: '밑면 삼각형, 옆면 직사각형',
      vertexFaces: 3
    },
    cuboid: {
      type: 'poly',
      title: '직육면체 (Cuboid / Rectangular Prism)',
      category: '각기둥',
      desc: '직사각형 6개로 둘러싸인 사각기둥으로, 마주 보는 세 쌍의 면이 각각 서로 평행하고 합동입니다.',
      V: 8, E: 12, F: 6,
      euler: '8 - 12 + 6 = 2',
      faceShape: '직사각형',
      vertexFaces: 3
    },
    pyramid_sq: {
      type: 'poly',
      title: '사각뿔 (Square Pyramid)',
      category: '각뿔',
      desc: '밑면이 사각형이고 옆면이 모두 삼각형인 다면체로, 옆면들이 한 꼭짓점(각뿔의 꼭짓점)에서 만납니다.',
      V: 5, E: 8, F: 5,
      euler: '5 - 8 + 5 = 2',
      faceShape: '밑면 사각형, 옆면 삼각형',
      vertexFaces: '밑면 3개, 꼭짓점 4개'
    },
    pyramid_hex: {
      type: 'poly',
      title: '육각뿔 (Hexagonal Pyramid)',
      category: '각뿔',
      desc: '밑면이 육각형이고 옆면이 6개의 삼각형으로 이루어진 뿔 다면체입니다.',
      V: 7, E: 12, F: 7,
      euler: '7 - 12 + 7 = 2',
      faceShape: '밑면 육각형, 옆면 삼각형',
      vertexFaces: '밑면 3개, 꼭짓점 6개'
    },
    pyramid_trunc: {
      type: 'poly',
      title: '사각뿔대',
      category: '각뿔대 (중등 핵심)',
      desc: '사각뿔을 밑면에 평행한 평면으로 잘라 생기는 두 입체도형 중 각뿔이 아닌 쪽입니다. 두 밑면은 평행하지만 크기가 다르고, 옆면은 모두 사다리꼴입니다.',
      V: 8, E: 12, F: 6,
      euler: '8 - 12 + 6 = 2',
      faceShape: '밑면 정사각형 2개, 옆면 사다리꼴 4개',
      vertexFaces: 3
    },

    // 2) 회전체 (Solids of Revolution)
    cylinder: {
      type: 'revol',
      title: '원기둥 (Cylinder)',
      category: '회전체',
      desc: '직사각형의 한 변을 회전축(L)으로 하여 1회전 시켰을 때 생기는 회전체입니다. 두 밑면은 서로 평행하고 합동인 원입니다.',
      axis: '직사각형의 한 세로 변',
      cutPerp: '원 (밑면과 평행, 크기 동일)',
      cutAxis: '직사각형 (선대칭도형, 대칭축=회전축)'
    },
    cone: {
      type: 'revol',
      title: '원뿔 (Cone)',
      category: '회전체',
      desc: '직각삼각형의 직각을 낀 한 변을 회전축(L)으로 하여 1회전 시켰을 때 생기는 회전체입니다.',
      axis: '직각삼각형의 높이 변',
      cutPerp: '원 (높이에 따라 크기가 달라짐)',
      cutAxis: '이등변삼각형 (모선의 길이가 두 변이 됨)'
    },
    cone_trunc: {
      type: 'revol',
      title: '원뿔대 (Truncated Cone)',
      category: '회전체 (중등 핵심)',
      desc: '원뿔을 밑면에 평행한 평면으로 잘라 생기는 입체도형으로, 직각사다리꼴의 수직인 한 변을 축으로 1회전하여 만들어집니다.',
      axis: '직각사다리꼴의 수직 변',
      cutPerp: '원 (두 밑면과 평행)',
      cutAxis: '등변사다리꼴 (선대칭도형)'
    },
    sphere: {
      type: 'revol',
      title: '구 (Sphere)',
      category: '회전체',
      desc: '반원의 지름을 회전축(L)으로 하여 1회전 시켰을 때 생기는 회전체입니다.',
      axis: '반원의 지름',
      cutPerp: '원 (중심에서 멀어질수록 작아짐)',
      cutAxis: '원 (지름이 원래 구와 동일한 대원)'
    }
  };

  /* ==========================================================================
     2. 3D SCENE & ENGINE
     ========================================================================== */
  class GeometryEngine {
    constructor(container) {
      this.container = container;
      this.currentMode = 'poly'; // 'poly' or 'revol'
      this.currentShapeKey = 'tetrahedron';
      this.pullProgress = 0.0;
      this.revolAngleDeg = 360;
      this.cutPlaneType = 'perp'; // 'perp' or 'axis'
      this.cutHeightRatio = 0.5;  // 0.0 ~ 1.0
      this.isXRay = false;
      this.autoRotate = false;
      this.showAxis = true;

      this.initThree();
      this.initLights();
      this.initHelpers();
      this.loadShape(this.currentShapeKey);

      window.addEventListener('resize', () => this.onResize());
      this.animate = this.animate.bind(this);
      requestAnimationFrame(this.animate);
    }

    initThree() {
      this.scene = new THREE.Scene();

      const aspect = this.container.clientWidth / this.container.clientHeight;
      this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 100);
      this.defaultCamPos = new THREE.Vector3(4.5, 4.5, 5.5);
      this.camera.position.copy(this.defaultCamPos);

      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      this.renderer.localClippingEnabled = true; // For Cross Section
      this.container.appendChild(this.renderer.domElement);

      this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.05;
      this.controls.maxPolarAngle = Math.PI / 2 + 0.1;
      this.controls.target.set(0, 0.5, 0);
    }

    initLights() {
      const ambient = new THREE.AmbientLight(0xffffff, 0.75);
      this.scene.add(ambient);

      const dirLight = new THREE.DirectionalLight(0xffffff, 0.85);
      dirLight.position.set(6, 10, 6);
      dirLight.castShadow = true;
      dirLight.shadow.mapSize.width = 1024;
      dirLight.shadow.mapSize.height = 1024;
      this.scene.add(dirLight);

      const backLight = new THREE.DirectionalLight(0xe0f2fe, 0.4);
      backLight.position.set(-6, -2, -6);
      this.scene.add(backLight);
    }

    initHelpers() {
      // Floor Grid
      const grid = new THREE.GridHelper(12, 24, 0x94a3b8, 0xe2e8f0);
      grid.position.y = -0.001;
      this.scene.add(grid);

      // Axis Helper (회전축 L)
      this.axisGroup = new THREE.Group();
      const axisGeo = new THREE.CylinderGeometry(0.02, 0.02, 5, 16);
      const axisMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
      const axisMesh = new THREE.Mesh(axisGeo, axisMat);
      axisMesh.position.y = 1.8;
      this.axisGroup.add(axisMesh);

      // Arrow on top
      const coneGeo = new THREE.ConeGeometry(0.08, 0.25, 16);
      const coneMesh = new THREE.Mesh(coneGeo, axisMat);
      coneMesh.position.y = 4.3;
      this.axisGroup.add(coneMesh);

      this.scene.add(this.axisGroup);
      this.axisGroup.visible = false; // only in revol mode

      // Dynamic Shape Group
      this.shapeGroup = new THREE.Group();
      this.scene.add(this.shapeGroup);

      // String line
      this.stringGroup = new THREE.Group();
      this.scene.add(this.stringGroup);

      // Cutting Plane Visualizer
      this.cutPlaneMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(3.6, 3.6),
        new THREE.MeshBasicMaterial({
          color: 0xf43f5e,
          transparent: true,
          opacity: 0.35,
          side: THREE.DoubleSide
        })
      );
      this.cutPlaneMesh.visible = false;
      this.scene.add(this.cutPlaneMesh);
    }

    onResize() {
      if (!this.container) return;
      const width = this.container.clientWidth;
      const height = this.container.clientHeight;
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    }

    /* ==========================================================================
       3. SHAPE BUILDING & HINGE MECHANICS
       ========================================================================== */
    loadShape(shapeKey) {
      this.currentShapeKey = shapeKey;
      const data = SHAPE_DATA[shapeKey];
      if (!data) return;

      this.currentMode = data.type;
      this.clearShapeGroup();

      if (this.currentMode === 'poly') {
        this.axisGroup.visible = false;
        this.cutPlaneMesh.visible = false;
        this.buildPolyhedron(shapeKey);
        this.updatePolyHinges(this.pullProgress);
      } else {
        this.axisGroup.visible = this.showAxis;
        this.buildRevolutionSolid(shapeKey);
        this.updateRevolution(this.revolAngleDeg);
        this.updateCrossSection();
      }
    }

    clearShapeGroup() {
      while (this.shapeGroup.children.length > 0) {
        const obj = this.shapeGroup.children[0];
        this.shapeGroup.remove(obj);
        if (obj.geometry) obj.geometry.dispose();
      }
      while (this.stringGroup.children.length > 0) {
        const obj = this.stringGroup.children[0];
        this.stringGroup.remove(obj);
        if (obj.geometry) obj.geometry.dispose();
      }
      this.hinges = [];
      this.trackedHoles = [];
    }

    getFaceMaterial(color = 0x38bdf8, opacity = 0.85) {
      return new THREE.MeshStandardMaterial({
        color: color,
        roughness: 0.3,
        metalness: 0.1,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: this.isXRay ? 0.35 : opacity
      });
    }

    createWireframe(geometry, color = 0x0284c7) {
      const edges = new THREE.EdgesGeometry(geometry);
      return new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: color, linewidth: 2 }));
    }

    /* --- 다면체 힌지 빌더 --- */
    buildPolyhedron(key) {
      this.hinges = [];
      this.trackedHoles = [];

      switch (key) {
        case 'tetrahedron': this.buildTetrahedron(); break;
        case 'cube': this.buildCube(); break;
        case 'octahedron': this.buildOctahedron(); break;
        case 'prism_tri': this.buildPrismTri(); break;
        case 'cuboid': this.buildCuboid(); break;
        case 'pyramid_sq': this.buildPyramidSq(); break;
        case 'pyramid_hex': this.buildPyramidHex(); break;
        case 'pyramid_trunc': this.buildPyramidTrunc(); break;
        default: this.buildCube(); break;
      }
    }

    // 1) 정사면체 (밑면 1 + 옆면 3)
    buildTetrahedron() {
      const s = 1.8; // 변 길이
      const hTri = s * Math.sqrt(3) / 2; // 삼각형 높이

      // 1. Root Base Face (정삼각형)
      const baseGeo = new THREE.BufferGeometry();
      const v0 = new THREE.Vector3(0, 0, (2/3) * hTri);
      const v1 = new THREE.Vector3(-s/2, 0, -(1/3) * hTri);
      const v2 = new THREE.Vector3(s/2, 0, -(1/3) * hTri);
      baseGeo.setFromPoints([v0, v1, v2]);
      baseGeo.computeVertexNormals();

      const baseMesh = new THREE.Mesh(baseGeo, this.getFaceMaterial(0x0ea5e9));
      baseMesh.add(this.createWireframe(baseGeo));
      this.shapeGroup.add(baseMesh);

      // 접는 각도: 정사면체 면 사이 이면각은 arccos(1/3) 약 70.53도
      // 평면(0) -> 입체(Math.PI - 1.231 = 약 1.91 rad)
      const targetAngle = Math.PI - Math.acos(1/3);

      // 3 Sides attached to edges
      const edges = [
        { p1: v1, p2: v2, normal: new THREE.Vector3(0, 0, -1), angle: 0 },
        { p1: v2, p2: v0, normal: new THREE.Vector3(Math.sqrt(3)/2, 0, 1/2), angle: 2*Math.PI/3 },
        { p1: v0, p2: v1, normal: new THREE.Vector3(-Math.sqrt(3)/2, 0, 1/2), angle: -2*Math.PI/3 }
      ];

      edges.forEach((ed, idx) => {
        const pivot = new THREE.Group();
        const mid = new THREE.Vector3().addVectors(ed.p1, ed.p2).multiplyScalar(0.5);
        pivot.position.copy(mid);

        // Edge direction
        const edgeDir = new THREE.Vector3().subVectors(ed.p2, ed.p1).normalize();
        const sideGeo = new THREE.BufferGeometry();
        // Triangle extending outward from edge
        const pLocal1 = new THREE.Vector3().subVectors(ed.p1, mid);
        const pLocal2 = new THREE.Vector3().subVectors(ed.p2, mid);
        const pApex = new THREE.Vector3().copy(ed.normal).multiplyScalar(hTri);
        sideGeo.setFromPoints([pLocal1, pLocal2, pApex]);
        sideGeo.computeVertexNormals();

        const sideMesh = new THREE.Mesh(sideGeo, this.getFaceMaterial(0x38bdf8));
        sideMesh.add(this.createWireframe(sideGeo));
        pivot.add(sideMesh);

        // Hole at apex
        const hole = new THREE.Group();
        hole.position.copy(pApex);
        pivot.add(hole);
        this.trackedHoles.push(hole);

        this.shapeGroup.add(pivot);
        this.hinges.push({ pivot, axis: edgeDir, maxAngle: targetAngle });
      });
    }

    // 2) 정육면체 (Cube)
    buildCube() {
      const s = 1.4;
      const baseGeo = new THREE.PlaneGeometry(s, s);
      baseGeo.rotateX(-Math.PI / 2);
      const baseMesh = new THREE.Mesh(baseGeo, this.getFaceMaterial(0x10b981));
      baseMesh.add(this.createWireframe(baseGeo));
      this.shapeGroup.add(baseMesh);

      const targetAngle = Math.PI / 2;

      // 4 sides around base
      const sides = [
        { pos: [0, 0, s/2], rot: [0, 0, 0], axis: new THREE.Vector3(1, 0, 0), dir: -1 }, // front
        { pos: [0, 0, -s/2], rot: [0, Math.PI, 0], axis: new THREE.Vector3(1, 0, 0), dir: 1 }, // back
        { pos: [-s/2, 0, 0], rot: [0, Math.PI/2, 0], axis: new THREE.Vector3(0, 0, 1), dir: -1 }, // left
        { pos: [s/2, 0, 0], rot: [0, -Math.PI/2, 0], axis: new THREE.Vector3(0, 0, 1), dir: 1 }  // right
      ];

      sides.forEach((sd, idx) => {
        const pivot = new THREE.Group();
        pivot.position.set(...sd.pos);

        const faceGeo = new THREE.PlaneGeometry(s, s);
        faceGeo.rotateX(-Math.PI / 2);
        faceGeo.translate(0, 0, sd.dir * s/2);

        const faceMesh = new THREE.Mesh(faceGeo, this.getFaceMaterial(0x34d399));
        faceMesh.add(this.createWireframe(faceGeo));
        pivot.add(faceMesh);

        // Top face attached to front side
        if (idx === 0) {
          const topPivot = new THREE.Group();
          topPivot.position.set(0, 0, s);
          const topGeo = new THREE.PlaneGeometry(s, s);
          topGeo.rotateX(-Math.PI / 2);
          topGeo.translate(0, 0, s/2);
          const topMesh = new THREE.Mesh(topGeo, this.getFaceMaterial(0x6ee7b7));
          topMesh.add(this.createWireframe(topGeo));
          topPivot.add(topMesh);
          pivot.add(topPivot);
          this.hinges.push({ pivot: topPivot, axis: new THREE.Vector3(1, 0, 0), maxAngle: targetAngle });
        }

        const hole = new THREE.Group();
        hole.position.set(0, 0, sd.dir * s);
        pivot.add(hole);
        this.trackedHoles.push(hole);

        this.shapeGroup.add(pivot);
        this.hinges.push({ pivot, axis: sd.axis, maxAngle: sd.dir * targetAngle });
      });
    }

    // 3) 사각뿔대 (Truncated Square Pyramid) - 중등 특화 핵심
    buildPyramidTrunc() {
      const bBottom = 1.8; // 밑면 정사각형 한 변
      const bTop = 0.9;    // 윗면 정사각형 한 변
      const h = 1.0;       // 높이
      // 사다리꼴 옆면 경사 변 길이
      const sideH = Math.sqrt(h*h + Math.pow((bBottom - bTop)/2, 2));

      // 1. Bottom Base
      const baseGeo = new THREE.PlaneGeometry(bBottom, bBottom);
      baseGeo.rotateX(-Math.PI / 2);
      const baseMesh = new THREE.Mesh(baseGeo, this.getFaceMaterial(0xd97706));
      baseMesh.add(this.createWireframe(baseGeo));
      this.shapeGroup.add(baseMesh);

      // 경사각
      const angle = Math.atan2(h, (bBottom - bTop)/2);

      // 4 Trapezoid sides
      const sides = [
        { pos: [0, 0, bBottom/2], axis: new THREE.Vector3(1, 0, 0), dir: -1 },
        { pos: [0, 0, -bBottom/2], axis: new THREE.Vector3(1, 0, 0), dir: 1 },
        { pos: [-bBottom/2, 0, 0], axis: new THREE.Vector3(0, 0, 1), dir: -1 },
        { pos: [bBottom/2, 0, 0], axis: new THREE.Vector3(0, 0, 1), dir: 1 }
      ];

      sides.forEach((sd, idx) => {
        const pivot = new THREE.Group();
        pivot.position.set(...sd.pos);

        // Trapezoid Geometry
        const shape = new THREE.Shape();
        const hw1 = bBottom / 2;
        const hw2 = bTop / 2;
        shape.moveTo(-hw1, 0);
        shape.lineTo(hw1, 0);
        shape.lineTo(hw2, sideH);
        shape.lineTo(-hw2, sideH);
        shape.closePath();

        const geo = new THREE.ShapeGeometry(shape);
        geo.rotateX(-Math.PI / 2);
        if (sd.axis.z === 1) geo.rotateY(Math.PI / 2);

        const mesh = new THREE.Mesh(geo, this.getFaceMaterial(0xfbbf24));
        mesh.add(this.createWireframe(geo));
        pivot.add(mesh);

        // Top base attached to front side
        if (idx === 0) {
          const topPivot = new THREE.Group();
          topPivot.position.set(0, 0, sideH);
          const topGeo = new THREE.PlaneGeometry(bTop, bTop);
          topGeo.rotateX(-Math.PI / 2);
          topGeo.translate(0, 0, bTop/2);
          const topMesh = new THREE.Mesh(topGeo, this.getFaceMaterial(0xfde68a));
          topMesh.add(this.createWireframe(topGeo));
          topPivot.add(topMesh);
          pivot.add(topPivot);
          this.hinges.push({ pivot: topPivot, axis: new THREE.Vector3(1, 0, 0), maxAngle: -(Math.PI - angle) });
        }

        const hole = new THREE.Group();
        hole.position.set(0, 0, sideH);
        pivot.add(hole);
        this.trackedHoles.push(hole);

        this.shapeGroup.add(pivot);
        this.hinges.push({ pivot, axis: sd.axis, maxAngle: sd.dir * angle });
      });
    }

    // 4) 삼각기둥 (Triangular Prism)
    buildPrismTri() {
      const s = 1.4; // 밑면 정삼각형 변
      const hPrism = 1.8; // 기둥 높이
      const hTri = s * Math.sqrt(3) / 2;

      // Center rectangle face
      const baseGeo = new THREE.PlaneGeometry(s, hPrism);
      baseGeo.rotateX(-Math.PI / 2);
      const baseMesh = new THREE.Mesh(baseGeo, this.getFaceMaterial(0x6366f1));
      baseMesh.add(this.createWireframe(baseGeo));
      this.shapeGroup.add(baseMesh);

      // Left & Right rectangle faces
      [-s/2, s/2].forEach((xPos, idx) => {
        const pivot = new THREE.Group();
        pivot.position.set(xPos, 0, 0);

        const geo = new THREE.PlaneGeometry(s, hPrism);
        geo.rotateX(-Math.PI / 2);
        geo.translate(idx === 0 ? -s/2 : s/2, 0, 0);
        const mesh = new THREE.Mesh(geo, this.getFaceMaterial(0x818cf8));
        mesh.add(this.createWireframe(geo));
        pivot.add(mesh);

        this.shapeGroup.add(pivot);
        this.hinges.push({ pivot, axis: new THREE.Vector3(0, 0, 1), maxAngle: idx === 0 ? Math.PI/3 : -Math.PI/3 });
      });

      // Top & Bottom Triangular faces
      [-hPrism/2, hPrism/2].forEach((zPos, idx) => {
        const pivot = new THREE.Group();
        pivot.position.set(0, 0, zPos);

        const shape = new THREE.Shape();
        shape.moveTo(-s/2, 0);
        shape.lineTo(s/2, 0);
        shape.lineTo(0, idx === 0 ? -hTri : hTri);
        shape.closePath();

        const geo = new THREE.ShapeGeometry(shape);
        geo.rotateX(-Math.PI / 2);
        const mesh = new THREE.Mesh(geo, this.getFaceMaterial(0xa5b4fc));
        mesh.add(this.createWireframe(geo));
        pivot.add(mesh);

        this.shapeGroup.add(pivot);
        this.hinges.push({ pivot, axis: new THREE.Vector3(1, 0, 0), maxAngle: idx === 0 ? Math.PI/2 : -Math.PI/2 });
      });
    }

    // 5) 정팔면체 (Octahedron)
    buildOctahedron() {
      // 8 정삼각형 중 3D 오프셋 프리뷰
      const s = 1.5;
      const geo = new THREE.OctahedronGeometry(s, 0);
      const mesh = new THREE.Mesh(geo, this.getFaceMaterial(0x06b6d4));
      mesh.add(this.createWireframe(geo));
      mesh.position.y = 1.0;
      this.shapeGroup.add(mesh);
    }

    // 6) 직육면체 (Cuboid)
    buildCuboid() {
      const w = 1.8, d = 1.2, h = 1.2;
      const baseGeo = new THREE.PlaneGeometry(w, d);
      baseGeo.rotateX(-Math.PI / 2);
      const baseMesh = new THREE.Mesh(baseGeo, this.getFaceMaterial(0x10b981));
      baseMesh.add(this.createWireframe(baseGeo));
      this.shapeGroup.add(baseMesh);

      const target = Math.PI / 2;
      const sides = [
        { pos: [0, 0, d/2], size: [w, h], axis: new THREE.Vector3(1, 0, 0), dir: -1 },
        { pos: [0, 0, -d/2], size: [w, h], axis: new THREE.Vector3(1, 0, 0), dir: 1 },
        { pos: [-w/2, 0, 0], size: [d, h], axis: new THREE.Vector3(0, 0, 1), dir: -1, rotY: true },
        { pos: [w/2, 0, 0], size: [d, h], axis: new THREE.Vector3(0, 0, 1), dir: 1, rotY: true }
      ];

      sides.forEach((sd) => {
        const pivot = new THREE.Group();
        pivot.position.set(...sd.pos);
        const geo = new THREE.PlaneGeometry(sd.size[0], sd.size[1]);
        geo.rotateX(-Math.PI / 2);
        if (sd.rotY) geo.rotateY(Math.PI / 2);
        geo.translate(0, 0, sd.dir * sd.size[1]/2);
        const mesh = new THREE.Mesh(geo, this.getFaceMaterial(0x34d399));
        mesh.add(this.createWireframe(geo));
        pivot.add(mesh);
        this.shapeGroup.add(pivot);
        this.hinges.push({ pivot, axis: sd.axis, maxAngle: sd.dir * target });
      });
    }

    // 7) 사각뿔 (Square Pyramid)
    buildPyramidSq() {
      const s = 1.6;
      const hPyramid = 1.3;
      const slantH = Math.sqrt(hPyramid*hPyramid + (s/2)*(s/2));
      const targetAngle = Math.atan2(hPyramid, s/2);

      const baseGeo = new THREE.PlaneGeometry(s, s);
      baseGeo.rotateX(-Math.PI / 2);
      const baseMesh = new THREE.Mesh(baseGeo, this.getFaceMaterial(0xf43f5e));
      baseMesh.add(this.createWireframe(baseGeo));
      this.shapeGroup.add(baseMesh);

      const sides = [
        { pos: [0, 0, s/2], axis: new THREE.Vector3(1, 0, 0), dir: -1 },
        { pos: [0, 0, -s/2], axis: new THREE.Vector3(1, 0, 0), dir: 1 },
        { pos: [-s/2, 0, 0], axis: new THREE.Vector3(0, 0, 1), dir: -1, rotY: true },
        { pos: [s/2, 0, 0], axis: new THREE.Vector3(0, 0, 1), dir: 1, rotY: true }
      ];

      sides.forEach(sd => {
        const pivot = new THREE.Group();
        pivot.position.set(...sd.pos);
        const shape = new THREE.Shape();
        shape.moveTo(-s/2, 0);
        shape.lineTo(s/2, 0);
        shape.lineTo(0, slantH);
        shape.closePath();
        const geo = new THREE.ShapeGeometry(shape);
        geo.rotateX(-Math.PI / 2);
        if (sd.rotY) geo.rotateY(Math.PI / 2);
        const mesh = new THREE.Mesh(geo, this.getFaceMaterial(0xfb7185));
        mesh.add(this.createWireframe(geo));
        pivot.add(mesh);
        this.shapeGroup.add(pivot);
        this.hinges.push({ pivot, axis: sd.axis, maxAngle: sd.dir * targetAngle });
      });
    }

    // 8) 육각뿔 (Hexagonal Pyramid)
    buildPyramidHex() {
      const r = 1.2;
      const hPyramid = 1.4;
      const baseGeo = new THREE.CircleGeometry(r, 6);
      baseGeo.rotateX(-Math.PI / 2);
      const baseMesh = new THREE.Mesh(baseGeo, this.getFaceMaterial(0xec4899));
      baseMesh.add(this.createWireframe(baseGeo));
      this.shapeGroup.add(baseMesh);

      const s = r;
      const slantH = Math.sqrt(hPyramid*hPyramid + (r * Math.sqrt(3)/2)*(r * Math.sqrt(3)/2));
      const targetAngle = Math.atan2(hPyramid, r * Math.sqrt(3)/2);

      for (let i = 0; i < 6; i++) {
        const theta = (i + 0.5) * (Math.PI / 3);
        const edgeMid = new THREE.Vector3(
          r * Math.cos(Math.PI/6) * Math.cos(theta),
          0,
          r * Math.cos(Math.PI/6) * Math.sin(theta)
        );

        const pivot = new THREE.Group();
        pivot.position.copy(edgeMid);
        pivot.rotation.y = -theta + Math.PI/2;

        const shape = new THREE.Shape();
        shape.moveTo(-s/2, 0);
        shape.lineTo(s/2, 0);
        shape.lineTo(0, slantH);
        shape.closePath();
        const geo = new THREE.ShapeGeometry(shape);
        geo.rotateX(-Math.PI / 2);

        const mesh = new THREE.Mesh(geo, this.getFaceMaterial(0xf472b6));
        mesh.add(this.createWireframe(geo));
        pivot.add(mesh);
        this.shapeGroup.add(pivot);
        this.hinges.push({ pivot, axis: new THREE.Vector3(1, 0, 0), maxAngle: -targetAngle });
      }
    }

    updatePolyHinges(progress) {
      this.pullProgress = progress;
      const t = progress / 100.0;

      this.hinges.forEach(h => {
        h.pivot.setRotationFromAxisAngle(h.axis, h.maxAngle * t);
      });

      // Update strings
      this.updateStrings();
    }

    updateStrings() {
      while (this.stringGroup.children.length > 0) {
        this.stringGroup.remove(this.stringGroup.children[0]);
      }
      if (this.trackedHoles.length < 2) return;

      const points = [];
      const worldPos = new THREE.Vector3();
      this.trackedHoles.forEach(hole => {
        hole.getWorldPosition(worldPos);
        points.push(worldPos.clone());
      });

      if (points.length >= 2) {
        const geo = new THREE.BufferGeometry().setFromPoints(points);
        const mat = new THREE.LineBasicMaterial({ color: 0xd97706, linewidth: 3 });
        const line = new THREE.Line(geo, mat);
        this.stringGroup.add(line);
      }
    }

    /* ==========================================================================
       4. SOLIDS OF REVOLUTION & CROSS-SECTION ENGINE
       ========================================================================== */
    buildRevolutionSolid(key) {
      this.revolPoints = [];
      this.revolHeight = 2.0;
      this.revolRadius = 1.2;

      switch (key) {
        case 'cylinder':
          // 직사각형 (r, y)
          this.revolPoints = [
            new THREE.Vector2(0, 0),
            new THREE.Vector2(1.2, 0),
            new THREE.Vector2(1.2, 2.0),
            new THREE.Vector2(0, 2.0)
          ];
          break;
        case 'cone':
          // 직각삼각형 (r, y)
          this.revolPoints = [
            new THREE.Vector2(0, 0),
            new THREE.Vector2(1.3, 0),
            new THREE.Vector2(0, 2.2)
          ];
          break;
        case 'cone_trunc':
          // 사다리꼴 (r, y)
          this.revolPoints = [
            new THREE.Vector2(0, 0),
            new THREE.Vector2(1.3, 0),
            new THREE.Vector2(0.6, 1.8),
            new THREE.Vector2(0, 1.8)
          ];
          break;
        case 'sphere':
          // 반원
          for (let i = 0; i <= 20; i++) {
            const theta = (i / 20) * Math.PI - Math.PI/2;
            const r = 1.2 * Math.cos(theta);
            const y = 1.2 + 1.2 * Math.sin(theta);
            this.revolPoints.push(new THREE.Vector2(r, y));
          }
          break;
      }
    }

    updateRevolution(angleDeg) {
      if (this.currentMode !== 'revol' || !this.revolPoints || this.revolPoints.length < 2) return;

      this.revolAngleDeg = angleDeg;
      const angleRad = (angleDeg / 360) * Math.PI * 2;

      // Dispose existing
      while (this.shapeGroup.children.length > 0) {
        const obj = this.shapeGroup.children[0];
        this.shapeGroup.remove(obj);
        if (obj.geometry) obj.geometry.dispose();
      }

      // 1. 2D Profile plane at angle 0
      const profileShape = new THREE.Shape();
      profileShape.moveTo(this.revolPoints[0].x, this.revolPoints[0].y);
      for (let i = 1; i < this.revolPoints.length; i++) {
        profileShape.lineTo(this.revolPoints[i].x, this.revolPoints[i].y);
      }
      profileShape.closePath();

      const profileGeo = new THREE.ShapeGeometry(profileShape);
      const profileMat = new THREE.MeshBasicMaterial({
        color: 0xf59e0b,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.75
      });
      const profileMesh = new THREE.Mesh(profileGeo, profileMat);
      profileMesh.add(this.createWireframe(profileGeo, 0xd97706));
      this.shapeGroup.add(profileMesh);

      // 2. 3D Lathe Geometry
      if (angleRad > 0.05) {
        const latheGeo = new THREE.LatheGeometry(this.revolPoints, 32, 0, angleRad);
        const latheMat = this.getFaceMaterial(0x0ea5e9, 0.85);
        this.latheMesh = new THREE.Mesh(latheGeo, latheMat);
        this.latheMesh.add(this.createWireframe(latheGeo, 0x0284c7));
        this.shapeGroup.add(this.latheMesh);
      }
    }

    updateCrossSection() {
      if (this.currentMode !== 'revol') {
        this.cutPlaneMesh.visible = false;
        return;
      }

      this.cutPlaneMesh.visible = true;

      // Plane Position
      const hMin = 0.1, hMax = 2.0;
      const currentH = hMin + this.cutHeightRatio * (hMax - hMin);

      if (this.cutPlaneType === 'perp') {
        // Horizontal plane (수직 단면)
        this.cutPlaneMesh.rotation.set(Math.PI / 2, 0, 0);
        this.cutPlaneMesh.position.set(0, currentH, 0);
      } else {
        // Vertical plane passing axis (회전축 포함 단면)
        this.cutPlaneMesh.rotation.set(0, 0, 0);
        this.cutPlaneMesh.position.set(0, 1.0, 0);
      }

      // Draw 2D Minimap
      this.drawCrossSection2D(currentH);
    }

    drawCrossSection2D(height) {
      const canvas = document.getElementById('cross-section-canvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const w = canvas.width, h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, w, h);

      ctx.save();
      ctx.translate(w / 2, h / 2);

      const shape = this.currentShapeKey;
      const caption = document.getElementById('minimap-caption');

      if (this.cutPlaneType === 'perp') {
        // 수직 단면: 항상 원!
        let r = 40;
        if (shape === 'cylinder') r = 45;
        else if (shape === 'cone') r = Math.max(10, 45 * (1 - (height / 2.2)));
        else if (shape === 'cone_trunc') r = 45 - (height / 1.8) * 22;
        else if (shape === 'sphere') {
          const dy = height - 1.2;
          const rSq = Math.pow(45, 2) - Math.pow(dy * 30, 2);
          r = rSq > 0 ? Math.sqrt(rSq) : 10;
        }

        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.fillStyle = '#fee2e2';
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#f43f5e';
        ctx.stroke();

        ctx.fillStyle = '#e11d48';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`반지름 r`, 0, -5);

        if (caption) caption.innerHTML = `회전축에 수직인 단면: <strong style="color:#e11d48;">원 (Circle)</strong>`;
      } else {
        // 회전축 포함 단면: 선대칭도형
        ctx.fillStyle = '#dbeafe';
        ctx.strokeStyle = '#0284c7';
        ctx.lineWidth = 2;

        if (shape === 'cylinder') {
          ctx.beginPath();
          ctx.rect(-35, -45, 70, 90);
          ctx.fill();
          ctx.stroke();
          if (caption) caption.innerHTML = `회전축 포함 단면: <strong style="color:#0284c7;">직사각형</strong>`;
        } else if (shape === 'cone') {
          ctx.beginPath();
          ctx.moveTo(0, -45);
          ctx.lineTo(40, 45);
          ctx.lineTo(-40, 45);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          if (caption) caption.innerHTML = `회전축 포함 단면: <strong style="color:#0284c7;">이등변삼각형</strong>`;
        } else if (shape === 'cone_trunc') {
          ctx.beginPath();
          ctx.moveTo(-20, -40);
          ctx.lineTo(20, -40);
          ctx.lineTo(40, 40);
          ctx.lineTo(-40, 40);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          if (caption) caption.innerHTML = `회전축 포함 단면: <strong style="color:#0284c7;">등변사다리꼴</strong>`;
        } else if (shape === 'sphere') {
          ctx.beginPath();
          ctx.arc(0, 0, 45, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          if (caption) caption.innerHTML = `회전축 포함 단면: <strong style="color:#0284c7;">원 (대원)</strong>`;
        }
      }
      ctx.restore();
    }

    animate() {
      requestAnimationFrame(this.animate);
      if (this.autoRotate) {
        this.shapeGroup.rotation.y += 0.008;
      }
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    }
  }

  /* ==========================================================================
     5. SVG NET GENERATOR FOR MIDDLE SCHOOL A4 PRINT
     ========================================================================== */
  class SvgGenerator {
    static generate(shapeKey) {
      const width = 595, height = 842;
      const data = SHAPE_DATA[shapeKey] || SHAPE_DATA.tetrahedron;

      const header = `
        <g id="header" transform="translate(40, 45)" font-family="'Malgun Gothic', sans-serif">
          <text x="0" y="0" font-size="16" font-weight="bold" fill="#0369A1">StringPoly 3D Middle - 중등 기하 탐구 전개도</text>
          <text x="0" y="18" font-size="11" fill="#475569">도형: ${data.title} | 영역: 2022 개정 수학과 [9수03-07]</text>
          <line x1="0" y1="26" x2="515" y2="26" stroke="#CBD5E1" stroke-width="1"/>
        </g>
      `;

      const footer = `
        <g id="footer" transform="translate(40, 770)" font-family="'Malgun Gothic', sans-serif" font-size="10" fill="#334155">
          <line x1="0" y1="0" x2="515" y2="0" stroke="#CBD5E1" stroke-width="1"/>
          <g transform="translate(0, 16)">
            <line x1="0" y1="5" x2="30" y2="5" stroke="#000" stroke-width="2"/>
            <text x="36" y="9">자르는 선 (실선)</text>
            <line x1="130" y1="5" x2="160" y2="5" stroke="#666" stroke-width="1.5" stroke-dasharray="4,4"/>
            <text x="166" y="9">접는 선 (칼선 길내기)</text>
            <circle cx="280" cy="5" r="5" fill="#FEE2E2" stroke="#E11D48" stroke-width="1.5"/>
            <text x="292" y="9">펀치 홀 (실 꿰기)</text>
          </g>
          <g transform="translate(410, 6)">
            <rect width="75" height="32" rx="4" fill="#FEF3C7" stroke="#D97706" stroke-width="1.5"/>
            <text x="37" y="21" text-anchor="middle" font-size="13" font-weight="bold" fill="#B45309">PULL</text>
          </g>
        </g>
      `;

      let body = '';
      if (shapeKey === 'sphere') {
        body = `
          <g transform="translate(40, 220)" font-family="'Malgun Gothic', sans-serif">
            <rect width="515" height="240" rx="14" fill="#F0F9FF" stroke="#0284C7" stroke-width="2"/>
            <text x="257" y="60" text-anchor="middle" font-size="20" font-weight="bold" fill="#0369A1">⚽ 구(Sphere)는 평면 전개도를 그릴 수 없습니다</text>
            <text x="257" y="105" text-anchor="middle" font-size="13.5" fill="#334155">구는 모든 방향으로 둥글게 휘어진 곡면으로만 이루어져 있어,</text>
            <text x="257" y="132" text-anchor="middle" font-size="13.5" fill="#334155">찢거나 늘리지 않고는 평면(A4 종이) 위에 전개도를 만들 수 없습니다.</text>
            <text x="257" y="160" text-anchor="middle" font-size="12" fill="#64748b">(2022 개정 수학과 교육과정: 원기둥·원뿔과 달리 구의 전개도는 존재하지 않음)</text>
            <rect x="107" y="185" width="300" height="36" rx="6" fill="#FEF3C7" stroke="#D97706" stroke-width="1.5"/>
            <text x="257" y="208" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#B45309">💡 정사면체, 사각뿔대, 정육면체 도안을 출력해 보세요!</text>
          </g>
        `;
      } else if (shapeKey === 'tetrahedron') body = this.generateTetrahedronNet();
      else if (shapeKey === 'pyramid_trunc') body = this.generatePyramidTruncNet();
      else if (shapeKey === 'prism_tri') body = this.generatePrismTriNet();
      else body = this.generateCubeNet();

      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="100%">${header}${body}${footer}</svg>`;
    }

    static generateTetrahedronNet() {
      // 4 equilateral triangles
      const s = 140;
      const h = s * Math.sqrt(3) / 2;
      const cx = 297, cy = 400;

      return `
        <g id="tetra-net" transform="translate(${cx}, ${cy})">
          <!-- Base triangle -->
          <polygon points="0,${-h/3} ${-s/2},${2*h/3} ${s/2},${2*h/3}" fill="#E0F2FE" stroke="#0284C7" stroke-width="2" stroke-dasharray="4,4"/>
          <!-- Top Triangle -->
          <polygon points="0,${-h/3} ${-s/2},${-4*h/3} ${s/2},${-4*h/3}" fill="#F0F9FF" stroke="#000" stroke-width="2"/>
          <!-- Bottom Left Triangle -->
          <polygon points="${-s/2},${2*h/3} ${-s},${-h/3} ${-s/2},${-4*h/3}" fill="#F0F9FF" stroke="#000" stroke-width="2"/>
          <!-- Bottom Right Triangle -->
          <polygon points="${s/2},${2*h/3} ${s},${-h/3} ${s/2},${-4*h/3}" fill="#F0F9FF" stroke="#000" stroke-width="2"/>
          <!-- Punch holes -->
          <circle cx="0" cy="${-4*h/3 + 12}" r="4" fill="#FEE2E2" stroke="#E11D48" stroke-width="1.5"/>
          <text x="0" y="30" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="#0369A1">정사면체 밑면</text>
        </g>
      `;
    }

    static generatePyramidTruncNet() {
      const b1 = 140, b2 = 70, h = 80;
      const cx = 297, cy = 410;
      return `
        <g id="trunc-net" transform="translate(${cx}, ${cy})">
          <!-- Base square -->
          <rect x="${-b1/2}" y="${-b1/2}" width="${b1}" height="${b1}" fill="#FEF3C7" stroke="#D97706" stroke-width="2" stroke-dasharray="4,4"/>
          <!-- 4 Trapezoids -->
          <polygon points="${-b1/2},${-b1/2} ${b1/2},${-b1/2} ${b2/2},${-b1/2 - h} ${-b2/2},${-b1/2 - h}" fill="#FFFBEB" stroke="#000" stroke-width="2"/>
          <polygon points="${-b1/2},${b1/2} ${b1/2},${b1/2} ${b2/2},${b1/2 + h} ${-b2/2},${b1/2 + h}" fill="#FFFBEB" stroke="#000" stroke-width="2"/>
          <polygon points="${-b1/2},${-b1/2} ${-b1/2},${b1/2} ${-b1/2 - h},${b2/2} ${-b1/2 - h},${-b2/2}" fill="#FFFBEB" stroke="#000" stroke-width="2"/>
          <polygon points="${b1/2},${-b1/2} ${b1/2},${b1/2} ${b1/2 + h},${b2/2} ${b1/2 + h},${-b2/2}" fill="#FFFBEB" stroke="#000" stroke-width="2"/>
          <!-- Top small square attached to top trapezoid -->
          <rect x="${-b2/2}" y="${-b1/2 - h - b2}" width="${b2}" height="${b2}" fill="#FEF3C7" stroke="#000" stroke-width="2"/>
          <text x="0" y="5" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#B45309">사각뿔대 큰 밑면</text>
          <text x="0" y="${-b1/2 - h - b2/2 + 4}" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#B45309">작은 밑면</text>
        </g>
      `;
    }

    static generatePrismTriNet() {
      const s = 100, h = 140, hTri = s * Math.sqrt(3) / 2;
      const cx = 297, cy = 400;
      return `
        <g id="prism-net" transform="translate(${cx}, ${cy})">
          <rect x="${-s/2}" y="${-h/2}" width="${s}" height="${h}" fill="#EEF2FF" stroke="#4F46E5" stroke-width="2" stroke-dasharray="4,4"/>
          <rect x="${-3*s/2}" y="${-h/2}" width="${s}" height="${h}" fill="#FAFAFA" stroke="#000" stroke-width="2"/>
          <rect x="${s/2}" y="${-h/2}" width="${s}" height="${h}" fill="#FAFAFA" stroke="#000" stroke-width="2"/>
          <polygon points="${-s/2},${-h/2} ${s/2},${-h/2} 0,${-h/2 - hTri}" fill="#EEF2FF" stroke="#000" stroke-width="2"/>
          <polygon points="${-s/2},${h/2} ${s/2},${h/2} 0,${h/2 + hTri}" fill="#EEF2FF" stroke="#000" stroke-width="2"/>
          <text x="0" y="5" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#4338CA">삼각기둥 옆면</text>
        </g>
      `;
    }

    static generateCubeNet() {
      const s = 90;
      const cx = 297, cy = 400;
      return `
        <g id="cube-net" transform="translate(${cx}, ${cy})">
          <rect x="${-s/2}" y="${-s/2}" width="${s}" height="${s}" fill="#ECFDF5" stroke="#059669" stroke-width="2" stroke-dasharray="4,4"/>
          <rect x="${-s/2}" y="${-3*s/2}" width="${s}" height="${s}" fill="#F0FDF4" stroke="#000" stroke-width="2"/>
          <rect x="${-s/2}" y="${s/2}" width="${s}" height="${s}" fill="#F0FDF4" stroke="#000" stroke-width="2"/>
          <rect x="${-s/2}" y="${3*s/2}" width="${s}" height="${s}" fill="#F0FDF4" stroke="#000" stroke-width="2"/>
          <rect x="${-3*s/2}" y="${-s/2}" width="${s}" height="${s}" fill="#F0FDF4" stroke="#000" stroke-width="2"/>
          <rect x="${s/2}" y="${-s/2}" width="${s}" height="${s}" fill="#F0FDF4" stroke="#000" stroke-width="2"/>
          <text x="0" y="5" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#047857">정육면체 밑면</text>
        </g>
      `;
    }
  }

  /* ==========================================================================
     6. MAIN APPLICATION CONTROLLER
     ========================================================================== */
  class Application {
    constructor() {
      const container = document.getElementById('canvas-container');
      this.engine = new GeometryEngine(container);
      this.bindUI();
      this.updateInfoCard('tetrahedron');
    }

    bindUI() {
      // 1. Mode Switch Tabs
      const btnModePoly = document.getElementById('btn-mode-poly');
      const btnModeRevol = document.getElementById('btn-mode-revol');
      const polyShapes = document.getElementById('poly-shapes');
      const revolShapes = document.getElementById('revol-shapes');
      const polyCtrl = document.getElementById('poly-ctrl-group');
      const revolCtrl = document.getElementById('revol-ctrl-group');
      const minimap = document.getElementById('minimap-panel');

      btnModePoly.addEventListener('click', () => {
        btnModePoly.classList.add('active');
        btnModeRevol.classList.remove('active');
        polyShapes.style.display = 'flex';
        revolShapes.style.display = 'none';
        polyCtrl.style.display = 'flex';
        revolCtrl.style.display = 'none';
        minimap.style.display = 'none';
        this.selectShape('tetrahedron');
      });

      btnModeRevol.addEventListener('click', () => {
        btnModeRevol.classList.add('active');
        btnModePoly.classList.remove('active');
        polyShapes.style.display = 'none';
        revolShapes.style.display = 'flex';
        polyCtrl.style.display = 'none';
        revolCtrl.style.display = 'flex';
        minimap.style.display = 'block';
        this.selectShape('cylinder');
      });

      // 2. Shape Buttons
      document.querySelectorAll('.shape-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.shape-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.selectShape(btn.dataset.shape);
        });
      });

      // 3. Poly Controller: PULL Slider
      const pullSlider = document.getElementById('pull-slider');
      const pullPct = document.getElementById('poly-percentage');
      const polyState = document.getElementById('poly-state-label');

      pullSlider.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        pullPct.innerText = `${Math.round(val)}%`;
        if (val < 10) polyState.innerText = '평면 전개도 (2D 상태)';
        else if (val > 90) polyState.innerText = '완전 조립 (3D 입체)';
        else polyState.innerText = '스트링 기립 진행 중...';
        this.engine.updatePolyHinges(val);
      });

      document.getElementById('btn-unfold').addEventListener('click', () => {
        pullSlider.value = 0;
        pullSlider.dispatchEvent(new Event('input'));
      });
      document.getElementById('btn-fold').addEventListener('click', () => {
        pullSlider.value = 100;
        pullSlider.dispatchEvent(new Event('input'));
      });

      // Auto Demo Play
      let isPlaying = false;
      let playDir = 1;
      let animId = null;
      const btnPlay = document.getElementById('btn-play-poly');

      btnPlay.addEventListener('click', () => {
        isPlaying = !isPlaying;
        btnPlay.innerText = isPlaying ? '⏸ 일시 정지' : '▶ 실 당기기 (자동 시연)';
        if (isPlaying) {
          const step = () => {
            if (!isPlaying) return;
            let current = parseFloat(pullSlider.value);
            current += playDir * 0.8;
            if (current >= 100) { current = 100; playDir = -1; }
            if (current <= 0) { current = 0; playDir = 1; }
            pullSlider.value = current;
            pullSlider.dispatchEvent(new Event('input'));
            animId = requestAnimationFrame(step);
          };
          animId = requestAnimationFrame(step);
        } else {
          if (animId) cancelAnimationFrame(animId);
        }
      });

      // 4. Revolution Controller
      const revolSlider = document.getElementById('revol-slider');
      const revolVal = document.getElementById('revol-deg-value');
      revolSlider.addEventListener('input', (e) => {
        const deg = parseInt(e.target.value, 10);
        revolVal.innerText = `${deg}°`;
        this.engine.updateRevolution(deg);
      });

      // 5. Cross-Section Tool
      const btnCutPerp = document.getElementById('btn-cut-perp');
      const btnCutAxis = document.getElementById('btn-cut-axis');
      const cutHeightSlider = document.getElementById('cut-height-slider');

      btnCutPerp.addEventListener('click', () => {
        btnCutPerp.classList.add('active');
        btnCutAxis.classList.remove('active');
        this.engine.cutPlaneType = 'perp';
        this.engine.updateCrossSection();
      });

      btnCutAxis.addEventListener('click', () => {
        btnCutAxis.classList.add('active');
        btnCutPerp.classList.remove('active');
        this.engine.cutPlaneType = 'axis';
        this.engine.updateCrossSection();
      });

      cutHeightSlider.addEventListener('input', (e) => {
        this.engine.cutHeightRatio = parseFloat(e.target.value) / 100.0;
        this.engine.updateCrossSection();
      });

      // 6. View Tools
      document.getElementById('btn-cam-reset').addEventListener('click', () => {
        this.engine.camera.position.copy(this.engine.defaultCamPos);
        this.engine.controls.target.set(0, 0.5, 0);
      });

      const btnAutoRot = document.getElementById('btn-auto-rotate');
      btnAutoRot.addEventListener('click', () => {
        this.engine.autoRotate = !this.engine.autoRotate;
        btnAutoRot.classList.toggle('active', this.engine.autoRotate);
      });

      const btnXRay = document.getElementById('btn-xray');
      btnXRay.addEventListener('click', () => {
        this.engine.isXRay = !this.engine.isXRay;
        btnXRay.classList.toggle('active', this.engine.isXRay);
        this.engine.loadShape(this.engine.currentShapeKey);
      });

      const btnAxis = document.getElementById('btn-axis');
      btnAxis.addEventListener('click', () => {
        this.engine.showAxis = !this.engine.showAxis;
        btnAxis.classList.toggle('active', this.engine.showAxis);
        this.engine.axisGroup.visible = this.engine.showAxis && (this.engine.currentMode === 'revol');
      });

      // 7. Modals
      this.bindModals();
      this.bindLab();
    }

    selectShape(shapeKey) {
      this.engine.loadShape(shapeKey);
      this.updateInfoCard(shapeKey);
      // Reset sliders only for active mode
      if (this.engine.currentMode === 'poly') {
        const pullSlider = document.getElementById('pull-slider');
        if (pullSlider) {
          pullSlider.value = 0;
          pullSlider.dispatchEvent(new Event('input'));
        }
      } else {
        const revolSlider = document.getElementById('revol-slider');
        if (revolSlider) {
          revolSlider.value = 360;
          revolSlider.dispatchEvent(new Event('input'));
        }
      }
      this.renderMath();
    }

    renderMath() {
      setTimeout(() => {
        if (window.renderMathInElement) {
          window.renderMathInElement(document.body, {
            delimiters: [
              { left: '$$', right: '$$', display: true },
              { left: '$', right: '$', display: false }
            ],
            throwOnError: false
          });
        }
      }, 60);
    }

    updateInfoCard(shapeKey) {
      const data = SHAPE_DATA[shapeKey];
      if (!data) return;

      document.getElementById('info-title').innerText = data.title;
      document.getElementById('info-category').innerText = data.category;
      document.getElementById('info-desc').innerText = data.desc;

      const badges = document.getElementById('math-badges');
      if (data.type === 'poly') {
        badges.innerHTML = `
          <span class="math-badge">꼭짓점(V): <strong>${data.V}개</strong></span>
          <span class="math-badge">모서리(E): <strong>${data.E}개</strong></span>
          <span class="math-badge">면(F): <strong>${data.F}개</strong></span>
          <span class="math-badge highlight">오일러 정리: ${data.euler}</span>
        `;
      } else {
        badges.innerHTML = `
          <span class="math-badge">회전축: <strong>${data.axis}</strong></span>
          <span class="math-badge">수직단면: <strong>${data.cutPerp}</strong></span>
          <span class="math-badge highlight">포함단면: <strong>${data.cutAxis}</strong></span>
        `;
      }
    }

    bindModals() {
      // 1. Docked Lab Sidebar Toggle
      const labPanel = document.getElementById('docked-lab-panel');
      const btnOpenLab = document.getElementById('btn-open-lab');
      const btnToggleLab = document.getElementById('btn-toggle-lab');
      const btnOpenLabFloat = document.getElementById('btn-open-lab-float');

      const toggleLabPanel = (forceState) => {
        const isCollapsed = forceState !== undefined ? !forceState : !labPanel.classList.contains('collapsed');
        if (isCollapsed) {
          labPanel.classList.add('collapsed');
          if (btnToggleLab) btnToggleLab.innerText = '◀';
          if (btnOpenLab) {
            btnOpenLab.classList.remove('active-lab');
            btnOpenLab.innerHTML = '<span>🧪</span> 탐구 랩실 (OFF)';
          }
          if (btnOpenLabFloat) btnOpenLabFloat.style.display = 'flex';
        } else {
          labPanel.classList.remove('collapsed');
          if (btnToggleLab) btnToggleLab.innerText = '▶';
          if (btnOpenLab) {
            btnOpenLab.classList.add('active-lab');
            btnOpenLab.innerHTML = '<span>🧪</span> 탐구 랩실 (ON)';
          }
          if (btnOpenLabFloat) btnOpenLabFloat.style.display = 'none';
        }

        // Trigger smooth 3D Canvas resize
        setTimeout(() => {
          this.engine.onResize();
        }, 300);
      };

      if (btnOpenLab) {
        btnOpenLab.addEventListener('click', () => {
          const currentlyCollapsed = labPanel.classList.contains('collapsed');
          toggleLabPanel(currentlyCollapsed);
        });
      }

      if (btnToggleLab) {
        btnToggleLab.addEventListener('click', () => {
          toggleLabPanel(false); // collapse
        });
      }

      if (btnOpenLabFloat) {
        btnOpenLabFloat.addEventListener('click', () => {
          toggleLabPanel(true); // expand
        });
      }

      // 2. Modals (Print & Curriculum)
      document.getElementById('btn-open-print').addEventListener('click', () => {
        document.getElementById('modal-print').classList.add('active');
        this.renderPrintPreview();
      });
      document.getElementById('btn-open-curriculum').addEventListener('click', () => {
        document.getElementById('modal-curriculum').classList.add('active');
      });

      // Close Buttons
      document.querySelectorAll('[data-close]').forEach(btn => {
        btn.addEventListener('click', () => {
          const target = btn.dataset.close;
          document.getElementById(target).classList.remove('active');
        });
      });

      // Native Print Action
      document.getElementById('btn-print-action').addEventListener('click', () => {
        const printArea = document.getElementById('print-area');
        printArea.innerHTML = SvgGenerator.generate(this.engine.currentShapeKey);
        window.print();
      });
    }

    renderPrintPreview() {
      const preview = document.getElementById('print-svg-preview');
      preview.innerHTML = SvgGenerator.generate(this.engine.currentShapeKey);
    }

    bindLab() {
      // Lab Tab buttons (Sidebar)
      document.querySelectorAll('.lab-side-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.lab-side-tab-btn').forEach(b => b.classList.remove('active'));
          document.querySelectorAll('.lab-tab-content').forEach(c => c.style.display = 'none');
          btn.classList.add('active');
          const tabId = `tab-${btn.dataset.tab}`;
          const target = document.getElementById(tabId);
          if (target) target.style.display = 'block';
          this.renderMath();
        });
      });

      // Cone surface slider event
      const sliderR = document.getElementById('slider-cone-R');
      const sliderr = document.getElementById('slider-cone-r');
      const updateConeLab = () => {
        const R = parseFloat(sliderR.value);
        const r = parseFloat(sliderr.value);
        document.getElementById('val-cone-R').innerText = `${R} cm`;
        document.getElementById('val-cone-r').innerText = `${r} cm`;

        const circum = 2 * r;
        const angle = Math.round(360 * (r / R));
        const baseArea = Math.round(r * r);
        const sideArea = Math.round(R * r);
        const totalArea = baseArea + sideArea;

        document.getElementById('cone-math-result').innerHTML = `
          • 밑면 둘레 = 부채꼴 호의 길이 = $2\\pi r = ${circum}\\pi\\text{ cm}$<br>
          • 부채꼴 중심각 $x = 360^\\circ \\times \\frac{${r}}{${R}} = ${angle}^\\circ$<br>
          • 원뿔 겉넓이 = 밑넓이($${baseArea}\\pi$) + 옆넓이($${sideArea}\\pi$) = $${totalArea}\\pi\\text{ cm}^2$<br>
          • <strong>부피 관계</strong>: 높이가 $h$일 때, $\\text{원뿔의 부피} = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3} \\times (\\text{원기둥 부피})$
        `;
        this.renderMath();
      };
      sliderR.addEventListener('input', updateConeLab);
      sliderr.addEventListener('input', updateConeLab);
    }

    // Public method for Euler check
    checkEuler(key, correctV, correctE, correctF) {
      const rawV = document.getElementById(`v-${key}`).value.trim();
      const rawE = document.getElementById(`e-${key}`).value.trim();
      const rawF = document.getElementById(`f-${key}`).value.trim();
      const resTd = document.getElementById(`res-${key}`);

      if (!rawV || !rawE || !rawF) {
        alert('V, E, F 값을 모두 입력해 주세요.');
        return;
      }

      const numV = Number(rawV);
      const numE = Number(rawE);
      const numF = Number(rawF);

      if (!Number.isInteger(numV) || !Number.isInteger(numE) || !Number.isInteger(numF) || numV <= 0 || numE <= 0 || numF <= 0) {
        alert('꼭짓점(V), 모서리(E), 면(F)의 개수는 1 이상의 자연수로 입력해 주세요.');
        return;
      }

      const val = numV - numE + numF;
      if (numV === correctV && numE === correctE && numF === correctF) {
        resTd.innerHTML = `<span style="color:#10b981; font-weight:bold;">${numV} - ${numE} + ${numF} = 2 (정답!)</span>`;
      } else {
        resTd.innerHTML = `<span style="color:#f43f5e; font-weight:bold;">${numV} - ${numE} + ${numF} = ${val} (다시 세어보세요)</span>`;
      }
    }

    // Public method for Platonic test
    testPlatonic(deg, count, shapeName) {
      const sum = deg * count;
      const res = document.getElementById('platonic-test-result');

      if (sum < 360) {
        res.style.background = '#f0fdf4';
        res.style.borderColor = '#bbf7d0';
        res.style.color = '#166534';
        res.innerHTML = `
          ✅ <strong>입체도형 만들기 가능!</strong> (한 꼭짓점에 모인 각의 합: ${sum}° &lt; 360°)<br>
          면들이 안쪽으로 꺾여 모일 수 있으므로 3차원 정다면체인 <strong>[${shapeName}]</strong>을(를) 만들 수 있습니다!
        `;
      } else {
        res.style.background = '#fef2f2';
        res.style.borderColor = '#fecaca';
        res.style.color = '#991b1b';
        res.innerHTML = `
          ❌ <strong>입체도형 만들기 불가능!</strong> (한 꼭짓점에 모인 각의 합: ${sum}° ≥ 360°)<br>
          한 꼭짓점에 모인 각의 합이 360° 이상이면 면들이 꺾이지 못하고 <strong>완전한 평면(바닥)</strong>이 되거나 겹쳐서 입체도형이 만들어지지 않습니다!
        `;
      }
    }

    // Public method for Explain Card
    generateExplainCard() {
      const shape = document.getElementById('explain-shape-select').value;
      const text = document.getElementById('explain-text').value.trim();
      const output = document.getElementById('explain-card-output');

      if (!text) {
        alert('설명할 내용을 입력해 주세요.');
        return;
      }

      output.innerHTML = `
        <div style="background:#f8fafc; border:2px solid #0284c7; border-radius:10px; padding:16px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <span style="font-size:12px; font-weight:bold; color:#0284c7;">[나만의 중등 기하 탐구 카드]</span>
            <span style="font-size:11px; color:#64748b;">성취기준: [9수03-07]</span>
          </div>
          <h4 style="font-size:15px; color:#0f172a; margin-bottom:6px;">탐구 대상: ${shape}</h4>
          <p style="font-size:13px; line-height:1.6; color:#334155; white-space:pre-wrap;">${text}</p>
          <div style="margin-top:10px; text-align:right;">
            <button class="btn-ctrl" onclick="window.print()">🖨️ 카드 인쇄하기</button>
          </div>
        </div>
      `;
    }
  }

  // Initialize
  window.addEventListener('DOMContentLoaded', () => {
    window.App = new Application();
    window.App.renderMath();
  });
})();
