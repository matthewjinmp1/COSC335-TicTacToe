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
    if (check_10_chapels(game_state)) {
        achievements.push("Pope Francis");
    }
    if (check_8_factories(game_state)) {
        achievements.push("Global Warming");
    }
    if (check_14_cottages(game_state)) {
        achievements.push("Bilbo Baggins");
    }
    return achievements;
}

export function check_14_cottages(game_state) {
    let cottage_count = 0;
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            let e = game_state[r][c];
            if (e == 'cottage') {
                cottage_count++;
            }
        }
    }
    return cottage_count >= 14;
}

export function check_10_chapels(game_state) {
    let chapel_count = 0;
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            let e = game_state[r][c];
            if (e == 'chapel') {
                chapel_count++;
            }
        }
    }
    return chapel_count >= 10;
}

export function check_8_factories(game_state) {
    let factory_count = 0;
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            let e = game_state[r][c];
            if (e == 'factory') {
                factory_count++;
            }
        }
    }
    return factory_count >= 8;
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
    return well_count >= 15;
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
