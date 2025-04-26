import { convert_game_state_to_string, get_score, list_to_string, get_builds } from '../src/functions.js';

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

describe('list_to_string', () => {
  test('returns empty string for empty list', () => {
    expect(list_to_string([])).toBe('');
  });

  test('concatenates a single row correctly', () => {
    const input = [['h', 'i', '!']];
    expect(list_to_string(input)).toBe('hi!');
  });

  test('concatenates multiple rows in row-major order', () => {
    const input = [
      ['a', 'b', 'c'],
      ['d', 'e'],
      ['f']
    ];
    expect(list_to_string(input)).toBe('abcdef');
  });

  test('treats nested empty rows as no-ops', () => {
    const input = [
      [],
      ['x', 'y'],
      []
    ];
    expect(list_to_string(input)).toBe('xy');
  });

  test('coerces non-string elements to strings', () => {
    const input = [
      [1, 2],
      [true, null, undefined]
    ];
    expect(list_to_string(input)).toBe('12truenullundefined');
  });
});

describe('convert_game_state_to_string', () => {
  test('returns 16-character string for empty board', () => {
    const emptyBoard = Array(4).fill(Array(4).fill(null));
    const result = convert_game_state_to_string(emptyBoard);
    expect(result).toHaveLength(16);
    expect(result).toBe('_'.repeat(16));
  });

  test('maps all building types correctly', () => {
    // one of each building in row-major order
    const buildings = [
      ['cottage','chapel','farm','tavern'],
      ['well','theater','factory','monument'],
      ['wood','wheat','brick','glass'],
      ['stone',null,null,null]
    ];
    const result = convert_game_state_to_string(buildings);
    expect(result).toBe('12345678abcde___'); 
    const expected = [
      '1','2','3','4',
      '5','6','7','8',
      'a','b','c','d',
      'e','_','_','_'
    ].join('');
    expect(result).toBe(expected);
  });

  test('handles a mixed, sparse board', () => {
    const state = [
      ['cottage', 'brick', null, 'farm'],
      [null, 'wood', 'chapel', null],
      ['glass', null, null, 'stone'],
      ['tavern', 'wheat', 'factory', 'unknown']
    ];
    const expected = '1c_3_a2_d__e4b7_';
    expect(convert_game_state_to_string(state)).toBe(expected);
    const explicit = [
      '1','c','_','3',
      '_','a','2','_',
      'd','_','_','e',
      '4','b','7','_'
    ].join('');
    expect(convert_game_state_to_string(state)).toBe(explicit);
  });

  test('always returns a string of length 16 even with wrong dimensions', () => {
    const weird = [
      ['cottage'],
      [],
      ['farm', 'tavern', 'well', 'theater', 'factory'],
      ['monument', 'wood']
    ];
    const out = convert_game_state_to_string(weird);
    expect(typeof out).toBe('string');
    expect(out).toHaveLength(16);
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
