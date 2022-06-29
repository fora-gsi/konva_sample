export default class Vector2d {
  // プロパティ
  x: number;
  y: number;

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  set(x: number, y: number) {
    this.x = x;
    this.y = y;
    return this;
  }

  /**
   * ベクトルの複製
   * @returns 複製したベクトル
   */
  clone() {
    return new Vector2d(this.x, this.y);
  }

  /** ベクトルの足し算 */
  add(v: Vector2d) {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  /** ベクトルの引き算 */
  sub(v: Vector2d) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  /** ベクトルの実数倍 */
  times(num: number) {
    this.x *= num;
    this.y *= num;
    return this;
  }

  /** 逆ベクトル */
  get inverse() {
    return this.clone().times(-1);
  }

  /** ベクトルの大きさ */
  get magnitude() {
    const { x, y } = this;
    return Math.sqrt(x ** 2 + y ** 2);
  }

  /** 正規化したベクトル */
  get normalized() {
    const { x, y, magnitude } = this;
    return new Vector2d(x / magnitude, y / magnitude);
  }

  /** ベクトルの加算 */
  static add(v1: Vector2d, v2: Vector2d) {
    return v1.clone().add(v2);
  }

  /** ベクトルの減算 */
  static sub(v1: Vector2d, v2: Vector2d) {
    return v1.clone().sub(v2);
  }

  /** ベクトルの実数倍 */
  static times(v1: Vector2d, num: number) {
    return v1.clone().times(num);
  }

  /** ベクトルの内積 */
  static dot(v1: Vector2d, v2: Vector2d) {
    return v1.x * v2.x + v1.y * v2.y;
  }

  /** ベクトルの外積 */
  static cross(v1: Vector2d, v2: Vector2d) {
    return v1.x * v2.y - v1.y * v2.x;
  }

  /** 2点間の距離 */
  static distance(v1: Vector2d, v2: Vector2d) {
    return Vector2d.sub(v1, v2).magnitude;
  }

  /** 2つのベクトルが平行か？ */
  static isParallel(v1: Vector2d, v2: Vector2d) {
    return Vector2d.cross(v1, v2) === 0;
  }

  /** 2つのベクトルが垂直か？ */
  static isVertical(v1: Vector2d, v2: Vector2d) {
    return Vector2d.dot(v1, v2) === 0;
  }

  /** 定数：ゼロベクトル */
  static get zero() {
    return new Vector2d(0, 0);
  }

  /** 定数：単位ベクトル */
  static get one() {
    return new Vector2d(1, 1);
  }

  /** 定数：右向きの単位ベクトル */
  static get right() {
    return new Vector2d(1, 0);
  }

  /** 定数：左向きの単位ベクトル */
  static get left() {
    return new Vector2d(-1, 0);
  }

  /** 定数：上向きの単位ベクトル */
  static get up() {
    return new Vector2d(0, 1);
  }

  /** 定数：下向きの単位ベクトル */
  static get down() {
    return new Vector2d(0, -1);
  }
}
