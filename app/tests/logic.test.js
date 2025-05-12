import { get_score, get_builds, can_build } from '../src/logic_functions.js';

describe('can_build', () => {
  test('well', () => {
    let name = 'well';
    let monument_built = false;
    let blocks_required = 2;
    let height = 2;
    let width = 1;
    let builds = [
      'woodstone',
      'woodstone',
      'woodstone',
      'woodstone',
      'stonewood',
      'stonewood',
      'stonewood',
      'stonewood'
    ]
    let blocks_selected = 2;
    let selected = [
      ['_', '_', '_', '_'],
      ['_', '_', '_', '_'],
      ['_', '_', '_', '_'],
      ['_', '_', 'stone', 'wood'],
    ]

    expect(can_build(name, monument_built, blocks_required, height, width, builds, blocks_selected, selected)).toBe(true);
  });
});

describe('get_builds', () => {
  test('2x2 unique board produces the eight expected traversals', () => {
    const build = [
      ['a','b'],
      ['c','d']
    ];
    const expected = [
      'abcd', // row-major left->right, rows top->bottom
      'badc', // each row reversed, rows top->bottom
      'dcba', // rows bottom->top (already mutated by earlier reversals)
      'cdab', // each of those rows reversed again
      'cadb', // columns left->right, rows top->bottom (on mutated build)
      'acbd', // same columns, rows bottom->top
      'dbca', // columns right->left, rows top->bottom
      'bdac'  // columns right->left, rows bottom->top
    ];
    expect(get_builds(build)).toEqual(expected);
  });

  test('single-row board (1x3) still returns eight strings', () => {
    const build = [
      ['x','y','z']
    ];
    const builds = get_builds(build);
    expect(builds).toHaveLength(8);

    expect(builds).toEqual([
      'xyz', // row-major
      'zyx', // row reversed
      'zyx', // reversed rows order (same single row), no-op
      'xyz', // reversed row reversed again
      'xyz', // columns left->right, only one row
      'xyz', // same columns, bottom->top (same)
      'zyx', // columns right->left
      'zyx'  // columns right->left, bottom->top (same)
    ]);
  });
});

describe('get_score', () => {
  const makeEmpty = () =>
    Array.from({ length: 4 }, () => Array(4).fill(null));

  test('empty board -> -16 (0 taverns, 0 fed cottages, no monument -> -empty_squares)', () => {
    const board = makeEmpty();
    expect(get_score(board)).toBe(-16);
  });

  test('single tavern -> 2 tavern points - 15 empties = -13', () => {
    const board = makeEmpty();
    board[0][0] = 'tavern';
    expect(get_score(board)).toBe(-13);
  });

  test('one farm + one cottage -> 3 cottage points - 14 empties = -11', () => {
    const board = makeEmpty();
    board[0][0] = 'farm';
    board[0][1] = 'cottage';
    expect(get_score(board)).toBe(-11);
  });

  test('farm + cottage + chapel -> (3 + 1) - 13 empties = -9', () => {
    const board = makeEmpty();
    board[0][0] = 'farm';
    board[0][1] = 'cottage';
    board[0][2] = 'chapel';
    expect(get_score(board)).toBe(-9);
  });

  test('single monument -> +2 (no empty penalty)', () => {
    const board = makeEmpty();
    board[1][1] = 'monument';
    expect(get_score(board)).toBe(2);
  });

  test('exactly 4 taverns -> +14 tavern pts - 12 empties = 2', () => {
    const board = makeEmpty();
    board[0] = ['tavern', 'tavern', 'tavern', 'tavern'];
    expect(get_score(board)).toBe(2);
  });

  test('well adjacent to one cottage -> -14 empties +1 adjacency = -13', () => {
    const board = makeEmpty();
    board[1][1] = 'well';
    board[1][2] = 'cottage';
    expect(get_score(board)).toBe(-13);
  });
});
