import { Engine, Scene, FreeCamera, Vector3, HemisphericLight, MeshBuilder } from 'babylonjs';

export const createScene = (engine: Engine, canvas: HTMLCanvasElement): Scene => {
  const scene = new Scene(engine);

  // フリーカメラを作成し、その位置を(x:0, y:5, z:-10)に設定
  const camera = new FreeCamera('camera1', new Vector3(0, 5, -10), scene);

  // カメラのターゲットをシーンの原点に設定
  camera.setTarget(Vector3.Zero());

  // カメラをキャンバスにアタッチ
  camera.attachControl(canvas, true);

  // 基本的なライトを作成し、上方向(0,1,0)に設定
  const light = new HemisphericLight('light1', new Vector3(0, 1, 0), scene);

  // 組み込みの"球体"形状を作成
  const sphere = MeshBuilder.CreateSphere('sphere1', { segments: 16, diameter: 2 }, scene);

  // 球体をその高さの1/2だけ上に移動
  sphere.position.y = 1;

  // 組み込みの"地面"形状を作成
  const ground = MeshBuilder.CreateGround('ground1', { width: 6, height: 6, subdivisions: 2 }, scene);

  return scene;
};

// DOMContentLoadedイベントリスナーを設定
window.addEventListener('DOMContentLoaded', () => {
  // キャンバス要素を取得
  const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;

  // Babylon 3Dエンジンを生成
  const engine = new Engine(canvas, true);

  const scene = createScene(engine, canvas);

  // シーンを繰り返しレンダリングするレンダーループを登録
  engine.runRenderLoop(() => {
    scene.render();
  });

  // ブラウザ/キャンバスのリサイズイベントを監視
  window.addEventListener('resize', () => {
    engine.resize();
  });
});
