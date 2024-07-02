# Babylon.js サンプルアプリ

これは、Babylon.jsを使用して基本的な3Dシーンを作成するシンプルなアプリケーションです。カメラ、ライト、および基本的なオブジェクト（球体と地面）を使用した3Dシーンの基本的な使い方を示しています。

## 特徴

- 基本的な3Dシーンの設定
- フリーカメラの制御
- 半球ライト
- 基本的な幾何学形状（球体と地面）

## インストール

このプロジェクトを始めるには、リポジトリをクローンしてブラウザで`index.html`ファイルを開きます。

### 必要条件

- 最新のウェブブラウザ（Chrome、Firefox、Safari、Edgeなど）
- Git（リポジトリをクローンする場合）

### リポジトリのクローン

```bash
git clone https://github.com/yourusername/babylonjs-sample-app.git
cd babylonjs-sample-app
```

## 使い方

`index.html`ファイルをウェブブラウザで開いてください。シンプルな3Dシーンが表示され、球体と地面がレンダリングされます。マウス操作でカメラを制御できます。

## ファイル構成

- `index.html`: キャンバスを設定し、必要なスクリプトを読み込むメインHTMLファイル。
- `app.js`: 3Dシーンを作成し、レンダリングするためのBabylon.jsコードを含むJavaScriptファイル。

## コード概要

### index.html

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Babylon.js Sample App</title>
  <style>
    body { margin: 0; overflow: hidden; }
    canvas { width: 100%; height: 100%; display: block; }
  </style>
</head>
<body>
  <canvas id="renderCanvas"></canvas>
  <script src="https://cdn.babylonjs.com/babylon.js"></script>
  <script src="app.js"></script>
</body>
</html>
```

### app.js

```javascript
window.addEventListener('DOMContentLoaded', function() {
  // キャンバス要素を取得
  const canvas = document.getElementById('renderCanvas');

  // Babylon 3Dエンジンを生成
  const engine = new BABYLON.Engine(canvas, true);

  // シーンを作成
  const createScene = function() {
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
```

## 貢献

貢献は歓迎します！改善点、バグ、新機能について議論するためにプルリクエストやイシューを提出してください。

## ライセンス

このプロジェクトはMITライセンスの下でライセンスされています。詳細は[LICENSE](LICENSE)ファイルを参照してください。

## 謝辞

- [Babylon.js](https://www.babylonjs.com/) - 本プロジェクトで使用している強力な3Dエンジン
- [GitHub](https://github.com/) - リポジトリのホスティングを提供
