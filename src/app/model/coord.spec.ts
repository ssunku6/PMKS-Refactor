import {Coord} from './coord';

describe('Coord', () => {
  let coord: Coord;
  const x = 5;
  const y = 10;

  beforeEach(() => {
    coord = new Coord(x, y);
  });

  it('should create an instance', () => {
    expect(coord).toBeTruthy();
    expect(coord.x).toEqual(x);
    expect(coord.y).toEqual(y);
  });

  it('should set and get x', () => {
    const newX = 20;
    coord.x = newX;
    expect(coord.x).toEqual(newX);
  });

  it('should set and get y', () => {
    const newY = 40;
    coord.y = newY;
    expect(coord.y).toEqual(newY);
  });

  it('should calculate distance to another coordinate', () => {
    const otherCoord = new Coord(8, 14);
    expect(coord.getDistanceTo(otherCoord)).toBeCloseTo(5);
  });

  it('should check if coordinates are equal', () => {
    const similarCoord = new Coord(x, y);
    expect(coord.equals(similarCoord, 1)).toBeTruthy();
  });

  it('should add a vector to the coordinate', () => {
    const vector = new Coord(2, 3);
    const result = coord.add(vector);
    expect(result.x).toEqual(x + 2);
    expect(result.y).toEqual(y + 3);
  });

  it('should subtract a vector from the coordinate', () => {
    const vector = new Coord(2, 3);
    const result = coord.subtract(vector);
    expect(result.x).toEqual(x - 2);
    expect(result.y).toEqual(y - 3);
  });

  it('should clone the coordinate', () => {
    const clone = coord.clone();
    expect(clone.x).toEqual(coord.x);
    expect(clone.y).toEqual(coord.y);
    expect(clone).not.toBe(coord); // Ensuring it's a different instance
  });

  it('should scale the coordinate', () => {
    const scale = 2;
    const scaledCoord = coord.scale(scale);
    expect(scaledCoord.x).toEqual(coord.x * scale);
    expect(scaledCoord.y).toEqual(coord.y * scale);
  });

  it('should normalize the coordinate', () => {
    const normalized = coord.normalize();
    const length = Math.sqrt(normalized.x * normalized.x + normalized.y * normalized.y);
    expect(length).toBeCloseTo(1);
  });

  // Additional tests can be written for methods like applyMatrix, getAngleTo, looselyEquals, multiply, etc.
});
