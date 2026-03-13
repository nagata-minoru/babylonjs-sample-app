import { createScene } from './app';

const mockSetTarget = jest.fn();
const mockAttachControl = jest.fn();
const mockCamera = { setTarget: mockSetTarget, attachControl: mockAttachControl };

const mockSphere = { position: { y: 0 } };
const mockGround = {};

const mockScene = {};

jest.mock('babylonjs', () => ({
  Engine: jest.fn(),
  Scene: jest.fn(() => mockScene),
  FreeCamera: jest.fn(() => mockCamera),
  Vector3: Object.assign(
    jest.fn((x: number, y: number, z: number) => ({ x, y, z })),
    { Zero: jest.fn(() => ({ x: 0, y: 0, z: 0 })) }
  ),
  HemisphericLight: jest.fn(),
  MeshBuilder: {
    CreateSphere: jest.fn(() => mockSphere),
    CreateGround: jest.fn(() => mockGround),
  },
}));

import {
  Scene,
  FreeCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
} from 'babylonjs';

describe('createScene', () => {
  const mockEngine = {} as any;
  const mockCanvas = {} as HTMLCanvasElement;

  beforeEach(() => {
    jest.clearAllMocks();
    mockSphere.position.y = 0;
  });

  test('Sceneを生成する', () => {
    createScene(mockEngine, mockCanvas);
    expect(Scene).toHaveBeenCalledWith(mockEngine);
  });

  test('FreeCameraを位置(0, 5, -10)に生成する', () => {
    createScene(mockEngine, mockCanvas);
    expect(FreeCamera).toHaveBeenCalledWith(
      'camera1',
      { x: 0, y: 5, z: -10 },
      mockScene
    );
  });

  test('カメラのターゲットを原点に設定する', () => {
    createScene(mockEngine, mockCanvas);
    expect(Vector3.Zero).toHaveBeenCalled();
    expect(mockSetTarget).toHaveBeenCalledWith({ x: 0, y: 0, z: 0 });
  });

  test('カメラをキャンバスにアタッチする', () => {
    createScene(mockEngine, mockCanvas);
    expect(mockAttachControl).toHaveBeenCalledWith(mockCanvas, true);
  });

  test('HemisphericLightを上方向に生成する', () => {
    createScene(mockEngine, mockCanvas);
    expect(HemisphericLight).toHaveBeenCalledWith(
      'light1',
      { x: 0, y: 1, z: 0 },
      mockScene
    );
  });

  test('球体を直径2、16分割で生成する', () => {
    createScene(mockEngine, mockCanvas);
    expect(MeshBuilder.CreateSphere).toHaveBeenCalledWith(
      'sphere1',
      { segments: 16, diameter: 2 },
      mockScene
    );
  });

  test('球体のY位置が1である', () => {
    createScene(mockEngine, mockCanvas);
    expect(mockSphere.position.y).toBe(1);
  });

  test('地面を6x6サイズで生成する', () => {
    createScene(mockEngine, mockCanvas);
    expect(MeshBuilder.CreateGround).toHaveBeenCalledWith(
      'ground1',
      { width: 6, height: 6, subdivisions: 2 },
      mockScene
    );
  });

  test('シーンを返す', () => {
    const scene = createScene(mockEngine, mockCanvas);
    expect(scene).toBe(mockScene);
  });
});
