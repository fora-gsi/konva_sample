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

  clone() {
    return new Vector2d(this.x, this.y);
  }

  add(v: Vector2d) {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  sub(v: Vector2d) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  times(num: number) {
    this.x *= num;
    this.y *= num;
    return this;
  }

  get inverse() {
    return this.clone().times(-1);
  }

  get magnitude() {
    const { x, y } = this;
    return Math.sqrt(x ** 2 + y ** 2);
  }

  get normalized() {
    const { x, y, magnitude } = this;
    return new Vector2d(x / magnitude, y / magnitude);
  }

  static add(v1: Vector2d, v2: Vector2d) {
    return v1.clone().add(v2);
  }

  static sub(v1: Vector2d, v2: Vector2d) {
    return v1.clone().sub(v2);
  }

  static times(v1: Vector2d, num: number) {
    return v1.clone().times(num);
  }

  static dot(v1: Vector2d, v2: Vector2d) {
    return v1.x * v2.x + v1.y * v2.y;
  }

  static cross(v1: Vector2d, v2: Vector2d) {
    return v1.x * v2.y - v1.y * v2.x;
  }

  static distance(v1: Vector2d, v2: Vector2d) {
    return Vector2d.sub(v1, v2).magnitude;
  }

  static isParallel(v1: Vector2d, v2: Vector2d) {
    return Vector2d.cross(v1, v2) === 0;
  }

  static isVertical(v1: Vector2d, v2: Vector2d) {
    return Vector2d.dot(v1, v2) === 0;
  }

  static get zero() {
    return new Vector2d(0, 0);
  }

  static get one() {
    return new Vector2d(1, 1);
  }

  static get right() {
    return new Vector2d(1, 0);
  }

  static get left() {
    return new Vector2d(-1, 0);
  }

  static get up() {
    return new Vector2d(0, 1);
  }

  static get down() {
    return new Vector2d(0, -1);
  }
}
