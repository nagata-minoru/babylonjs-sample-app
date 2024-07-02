window.addEventListener('DOMContentLoaded', function() {
  // キャンバス要素を取得
  const canvas = document.getElementById('renderCanvas');

  // Babylon 3Dエンジンを生成
  const engine = new BABYLON.Engine(canvas, true);

  // シーンを作成
  const createScene = () => {
    // 基本的なBJSシーンオブジェクトを作成
    const scene = new BABYLON.Scene(engine);

    // フリーカメラを作成し、その位置を(x:0, y:5, z:-10)に設定
    const camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), scene);

    // カメラのターゲットをシーンの原点に設定
    camera.setTarget(BABYLON.Vector3.Zero());

    // カメラをキャンバスにアタッチ
    camera.attachControl(canvas, true);

    // 基本的なライトを作成し、上方向(0,1,0)に設定
    const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);

    // 組み込みの"球体"形状を作成。コンストラクタは4つのパラメータを取る：名前、分割数、サイズ、シーン
    const sphere = BABYLON.MeshBuilder.CreateSphere('sphere1', { segments: 16, diameter: 2 }, scene);

    // 球体をその高さの1/2だけ上に移動
    sphere.position.y = 1;

    // 組み込みの"地面"形状を作成
    const ground = BABYLON.MeshBuilder.CreateGround('ground1', { width: 6, height: 6, subdivisions: 2 }, scene);

    return scene;
  };

  const scene = createScene();

  // シーンを繰り返しレンダリングするレンダーループを登録
  engine.runRenderLoop(function() {
    scene.render();
  });

  // ブラウザ/キャンバスのリサイズイベントを監視
  window.addEventListener('resize', function() {
    engine.resize();
  });
});
