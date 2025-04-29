export function get_achievements(game_state, score) {
    let achievements = [];
    if (check_chief_diversity_officer(game_state)) {
        achievements.push('Chief Diversity Officer');
    }
    if (check_master_builder(score)) {
        achievements.push('Try Hard Sweat');
    }
    if (check_full_board(game_state)) {
        achievements.push('16 Pack');
    }
    if (check_empty_board(game_state)) {
        achievements.push('Couldnt Care Less');
    }
    if (check_15_wells(game_state)) {
        achievements.push('Well Then');
    }
    return achievements;
}

export function check_15_wells(game_state) {
    let well_count = 0;
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            let e = game_state[r][c];
            if (e == 'well') {
                well_count++;
            }
        }
    }
    return well_count == 15;
}

export function check_empty_board(game_state) {
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            let e = game_state[r][c];
            if (e != '_') {
                return false;
            }
        }
    }
    return true;
}

export function check_chief_diversity_officer(game_state) {
    let buildings = new Set();
    let available_buildings = new Set([
        'cottage',
        'chapel',
        'farm',
        'tavern',
        'well',
        'theater',
        'factory',
        'monument'
    ]);
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            let e = game_state[r][c];
            if (available_buildings.has(e)) {
                buildings.add(e);
            }
        }
    }
    if (buildings.size >= 8) {
        return true;
    }
    return false;
}

export function check_master_builder(score) {
    return score >= 50;
}

export function check_full_board(game_state) {
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            let e = game_state[r][c];
            if (e == '_') {
                return false;
            }
        }
    }
    return true;
}

export function get_builds(build) {
    let builds = [];
    let string1 = '';
    let string2 = '';
    for (let row of build) {
        for (let e of row) {
            string1 += e;
        }
        for (let e of row.reverse()) {
            string2 += e;
        }
    }
    builds.push(string1, string2);
    string1 = '';
    string2 = '';
    for (let row of build.reverse()) {
        for (let e of row) {
            string1 += e;
        }
        for (let e of row.reverse()) {
            string2 += e;
        }
    }
    builds.push(string1, string2);

    let rows = build.length;
    let columns = build[0].length;
    let e;

    string1 = '';
    string2 = '';
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows; r++) {
            e = build[r][c];
            string1 += e;
        }
        for (let r = rows-1; r >= 0; r--) {
            e = build[r][c];
            string2 += e;
        }
    }
    builds.push(string1, string2);

    string1 = '';
    string2 = '';
    for (let c = columns-1; c >= 0; c--) {
        for (let r = 0; r < rows; r++) {
            e = build[r][c];
            string1 += e;
        }
        for (let r = rows-1; r >= 0; r--) {
            e = build[r][c];
            string2 += e;
        }
    }
    builds.push(string1, string2);

    return builds;
}

export function list_to_string(list) {
    let string = ''
    for (let row of list) {
        for (let e of row) {
            string += e;
        }
    }
    return string;
}

export function convert_game_state_to_string(game_state) {
    let board = '';
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            let element = game_state[r][c];
            if (element == 'cottage') {
                board += '1';
            } else if (element == 'chapel') {
                board += '2';
            } else if (element == 'farm') {
                board += '3';
            } else if (element == 'tavern') {
                board += '4';
            } else if (element == 'well') {
                board += '5';
            } else if (element == 'theater') {
                board += '6';
            } else if (element == 'factory') {
                board += '7';
            } else if (element == 'monument') {
                board += '8';
            } else if (element == 'wood') {
                board += 'a';
            } else if (element == 'wheat') {
                board += 'b';
            } else if (element == 'brick') {
                board += 'c';
            } else if (element == 'glass') {
                board += 'd';
            } else if (element == 'stone') {
                board += 'e';
            } else {
                board += '_';
            }
        }
    }
    return board;
}

export function get_score(game_state) {
    let cottages = 0;
    let chapels = 0;
    let farms = 0;
    let taverns = 0;
    let wells = 0;
    let theaters = 0;
    let factories = 0;
    let monuments = 0;
    let empty_squares = 0;
    let building_types = [
        'cottage',
        'chapel',
        'farm',
        'tavern',
        'well',
        'theater',
        'factory',
        'monument'
    ];
    for (let row of game_state) {
        for (let square of row) {
            if (square == 'cottage') {
                cottages += 1;
            } else if (square == 'chapel') {
                chapels += 1;
            } else if (square == 'farm') {
                farms += 1;
            } else if (square == 'tavern') {
                taverns += 1;
            } else if (square == 'well') {
                wells += 1;
            } else if (square == 'theater') {
                theaters += 1;
            } else if (square == 'factory') {
                factories += 1;
            } else if (square == 'monument') {
                monuments += 1;
            } else {
                empty_squares += 1;
            }
        }
    }
    let score = 0;
    if (taverns == 1) {
        score += 2;
    } else if (taverns == 2) {
        score += 5;
    } else if (taverns == 3) {
        score += 9;
    } else if (taverns == 4) {
        score += 14;
    } else if (taverns >= 5) {
        score += 20;
    }
    let feeding_potential = farms * 4;
    let fed_cottages = 0;
    if (cottages <= feeding_potential) {
        fed_cottages = cottages;
    } else {
        fed_cottages = feeding_potential;
    }
    score += fed_cottages * 3;
    score += chapels * fed_cottages;
    if (monuments == 1) {
        score += 2;
    } else {
        score -= empty_squares;
    }
    for (let row = 0; row < 4; row++) {
        for (let column = 0; column < 4; column++) {
            let element = game_state[row][column];
            if (element == 'well') {
                if (row > 0) {
                    let up = game_state[row-1][column];
                    if (up == 'cottage') {
                        score += 1;
                    }
                }
                if (row < 3) {
                    let down = game_state[row+1][column];
                    if (down == 'cottage') {
                        score += 1;
                    }
                }
                if (column > 0) {
                    let right = game_state[row][column+1];
                    if (right == 'cottage') {
                        score += 1;
                    }
                }
                if (column < 3) {
                    let left = game_state[row][column-1];
                    if (left == 'cottage') {
                        score += 1;
                    }
                }
            } else if (element == 'theater') {
                let unqiue_buildings = new Set();
                for (let row = 0; row < 4; row++) {
                    element = game_state[row][column];
                    if (building_types.includes(element)) {
                        unqiue_buildings.add(element);
                    }
                }
                for (let column = 0; column < 4; column++) {
                    element = game_state[row][column];
                    if (building_types.includes(element)) {
                        unqiue_buildings.add(element);
                    }
                }
                score += unqiue_buildings.size;
            }
        }
    }
    return score;
}