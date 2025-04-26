// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

// await sleep(1000);

var resource_cards = document.getElementsByClassName('resource_card');
var squares = document.getElementsByClassName('square');
var resource_already_placed = false;
var resource = null;
var last_clicked = null;
var blocks_selected = 0;
var building_selected = '';
var buildings = {};
var monument_built = false;
var just_placed_factory = false;
var factory_blocks = [];
var resources = ['glass', 'brick', 'stone', 'wheat', 'wood'];

function get_time() {
    const date = new Date(Date.now());
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

const start_time = get_time();

var deck1 = [];
for (let resource of resources) {
    for (let i = 0; i < 3; i++) {
        deck1.push(resource);
    }
}

function shuffle(array) {
    for (let i = 0; i < array.length; i++) {
        let random_index = Math.floor(Math.random() * array.length);
        [array[i], array[random_index]] = [array[random_index], array[i]];
    }
    return array;
}

deck1 = shuffle(deck1);

var selected = [
    ['_','_','_','_'],
    ['_','_','_','_'],
    ['_','_','_','_'],
    ['_','_','_','_']
];

var game_state = [
    ['_','_','_','_'],
    ['_','_','_','_'],
    ['_','_','_','_'],
    ['_','_','_','_']
];

function place_item(square) {
    var square_id = square.id;
    var row = square_id[0];
    var column = square_id[1];
    if (just_placed_factory) {
        if (resource) {
            const div = document.createElement('div');
            div.className = resource + ' center_piece';
            let factory = square.querySelector('.factory_piece');
            factory.append(div);
            just_placed_factory = false;
            cover_blocks();
            for (let square of squares) {
                square.style.pointerEvents = '';
            }
            for (let resource_card of resource_cards) {
                resource_card.style.pointerEvents = '';
            }
            deselect_resources();
            factory_blocks.push(resource);
            resource = null;
            deal_resources(); 
        }
    } else if (square.children.length == 0 && resource && !resource_already_placed) {
        const div = document.createElement('div');
        div.className = resource + ' center_piece';
        square.append(div);
        game_state[row][column] = resource;
        resource_already_placed = true;
        deselect_resources();
        for (let block of blocks) {
            block.element.style.pointerEvents = 'none';
        }
        deal_resources();
    } else if (building_selected) {
        if (square.classList.contains('selected')) {
            let coordinates = [];
            for (let square of squares) {
                if (square.classList.contains('selected')) {
                    square.innerHTML = '';
                    square.classList.remove('selected');
                    let square_id = square.id;
                    let row = square_id[0];
                    let column = square_id[1];
                    coordinates.push([row, column]);
                }
            }
            const div = document.createElement('div');
            div.className = building_selected + '_piece center_piece';
            if (building_selected == 'factory') {
                div.classList.add('scale');
            }
            square.append(div);
            for (let [row, column] of coordinates) {
                selected[row][column] = '_';
                game_state[row][column] = '_';
            }
            game_state[row][column] = building_selected;
            let element = buildings[building_selected].element;
            element.classList.remove('selected');
            blocks_selected -= buildings[building_selected].blocks_required;
            if (building_selected == 'monument') {
                monument_built = true;
            } else if (building_selected == 'factory') {
                uncover_blocks();
                just_placed_factory = true;
                for (let resource_card of resource_cards) {
                    resource_card.style.pointerEvents = 'none';
                }
                for (let square of squares) {
                    square.style.pointerEvents = 'none';
                }
                square.style.pointerEvents = '';
            }
            building_selected = '';
        }
    } else {
        if (square.classList.contains('selected')) {
            square.classList.remove('selected');
            selected[row][column] = '_';
            blocks_selected -= 1;
        } else {
            square.classList.add('selected');
            selected[row][column] = game_state[row][column];
            blocks_selected += 1;
        }
    }
    uncover_blocks();
}

for (let square of squares) {
    square.addEventListener('click', function() {
        place_item(square);
    });
}

for (let resource_card of resource_cards) {
    resource_card.addEventListener('click', function() {
        var block = resource_card.getElementsByClassName('resource_card_middle')[0];
        resource = block.querySelector('div').classList[0];
        last_clicked = 'resource';
        deselect_resources();
        resource_card.classList.add('selected');
    })
}

function deal_resources() {
    if (!just_placed_factory) {
        let chosen_resource_cards = [];
        for (let i = 1; i < 4; i++) {
            let resource = deck1.pop();
            chosen_resource_cards.push(resource);
            if (factory_blocks.includes(resource)) {
                uncover_blocks();
            }
            let name_id = 'resource_name' + i;
            let block_id = 'resource_block' + i;
            var resource_name = document.getElementById(name_id);
            resource_name.innerHTML = resource.charAt(0).toUpperCase() + resource.slice(1);
            var resource_block = document.getElementById(block_id);
            resource_block.className = resource + ' ' + 'center_piece';
        }
        chosen_resource_cards = shuffle(chosen_resource_cards);
        deck1 = chosen_resource_cards.concat(deck1);
        resource = null;
        resource_already_placed = false;
    }
}

function list_to_string(list) {
    let string = ''
    for (let row of list) {
        for (let e of row) {
            string += e;
        }
    }
    return string;
}

function get_builds(build) {
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

class building {
    constructor(build, name) {
        this.element = document.getElementById(name);
        this.name = name;
        this.builds = get_builds(build);
        this.height = build.length;
        this.width = build[0].length;
        this.blocks_required = 0;
        for (let row of build) {
            for (let e of row) {
                if (e != '_') {
                    this.blocks_required += 1;
                }
            }
        }
        this.element.addEventListener('click', () => {
            var can_build = this.can_build();
            if (can_build) {
                if (this.element.classList.contains('selected')) {
                    this.element.classList.remove('selected');
                    building_selected = '';
                } else {
                    this.element.classList.add('selected');
                    building_selected = name;
                }
            }
        })
    }

    can_build() {
        if (this.name == 'monument') {
            if (monument_built) {
                return false;
            }
        }
        if (blocks_selected == this.blocks_required) {
            for (let row = 0; row <= 4-this.height; row++) {
                for (let column = 0; column <= 4-this.width; column++) {
                    var part = [];
                    for (let row1 = row; row1 < row+this.height; row1++) {
                        part.push(selected[row1].slice(column, column+this.width))
                    }
                    var string = list_to_string(part);
                    if (this.builds.includes(string)) {
                        return true;
                    } 
                }
            }
            for (let row = 0; row <= 4-this.width; row++) {
                for (let column = 0; column <= 4-this.height; column++) {
                    var part = [];
                    for (let row1 = row; row1 < row+this.width; row1++) {
                        part.push(selected[row1].slice(column, column+this.height))
                    }
                    var string = list_to_string(part);
                    if (this.builds.includes(string)) {
                        return true;
                    } 
                }
            }
        }
        return false;
    }
}

var cottage_build = [
    ['_', 'wheat'],
    ['brick', 'glass']
];

const cottage = new building(cottage_build, 'cottage');

var chapel_build = [
    ['_', '_', 'glass'], 
    ['stone', 'glass', 'stone'], 
];

const chapel = new building(chapel_build, 'chapel');

var farm_build = [
    ['wheat', 'wheat'],
    ['wood', 'wood']
];

const farm = new building(farm_build, 'farm');

var tavern_build = [
    ['brick', 'brick', 'glass'],
];

const tavern = new building(tavern_build, 'tavern');

var well_build = [
    ['wood', 'stone'],
];

const well = new building(well_build, 'well');

var theater_build = [
    ['_', 'stone', '_'],
    ['wood', 'glass', 'wood'],
];

const theater = new building(theater_build, 'theater');

var factory_build = [
    ['wood', '_', '_', '_'],
    ['brick', 'stone', 'stone', 'brick'],
];

const factory = new building(factory_build, 'factory');

var monument_build = [
    ['_', 'wheat'], 
    ['stone', 'glass']
];

const monument = new building(monument_build, 'monument');

buildings['cottage'] = cottage;
buildings['chapel'] = chapel;
buildings['farm'] = farm;
buildings['tavern'] = tavern;
buildings['well'] = well;
buildings['theater'] = theater;
buildings['factory'] = factory;
buildings['monument'] = monument;

var building_types = Object.keys(buildings);

deal_resources();

function get_score() {
    let cottages = 0;
    let chapels = 0;
    let farms = 0;
    let taverns = 0;
    let wells = 0;
    let theaters = 0;
    let factories = 0;
    let monuments = 0;
    let empty_squares = 0;
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

class block {
    constructor(name) {
        this.element = document.getElementById(name + '_block');
        this.element.addEventListener('click', () => {
            resource = name;
            if (this.element.classList.contains('selected')) {
                this.element.classList.remove('selected');
            } else {
                deselect_resources();
                this.element.classList.add('selected');
            }
        })
        this.element.style.pointerEvents = 'none';
    }
}

var wood_block = new block('wood');
var wheat_block = new block('wheat');
var brick_block = new block('brick');
var glass_block = new block('glass');
var stone_block = new block('stone');

var blocks = [wood_block, wheat_block, brick_block, glass_block, stone_block];

function deselect_resources() {
    for (let block of blocks) {
        block.element.classList.remove('selected');
    }
    for (let resource_card of resource_cards) {
        resource_card.classList.remove('selected');
    }
}

function cover_blocks() {
    for (let block of blocks) {
        block.element.style.pointerEvents = 'none';
    }
}

function uncover_blocks() {
    for (let block of blocks) {
        block.element.style.pointerEvents = '';
    }
}

function convert_game_state_to_string() {
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

// function complete_town() {
//     let board = convert_game_state_to_string();
//     let score = get_score();
//     let end_time = get_time();

//     document.getElementById('board_final').value = board;
//     document.getElementById('score_final').value = score;
//     document.getElementById('start_time').value = start_time;
//     document.getElementById('end_time').value = end_time;
//     document.getElementById('complete_town').submit();

//     alert(score);
// }

// function logout() {
//     document.getElementById('logout').submit();
// }

// const db = firebase.firestore();

// function save_game(data) {
//   const user = firebase.auth().currentUser;
//   if (!user) {
//     return Promise.reject(new Error('Not signed in'));
//   }

//   let board = convert_game_state_to_string();

//   return db
//     .collection('games')            
//     .add({                           
//       uid: user.uid,     
//       board: board,    
//     })
// }

function complete_town() {
    let score = get_score();
    alert(score);
    window.location.reload();  
}

let complete_town_button = document.getElementById('complete_town');
complete_town_button.addEventListener('click', complete_town);

uncover_blocks();

export function add(x, y) {
    return x + y;
}

