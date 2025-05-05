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
import { convert_game_state_to_string, get_score, list_to_string, get_builds, get_achievements } from "./functions";

function print(thing) {
    console.log(thing);
}

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

// for (let i = 0; i < 4; i++) {
//     for (let j = 0; j < 4; j++) {
//         game_state[i][j] = 'cottage';
//     }
// }

// print(game_state);

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
            factory_blocks.push(resource);
            resource = null;
            deselect_blocks();
            replace_card(); 
        }
    } else if (square.children.length == 0 && resource && !resource_already_placed) {
        const div = document.createElement('div');
        div.className = resource + ' center_piece';
        square.append(div);
        game_state[row][column] = resource;
        resource_already_placed = true;
        for (let block of blocks) {
            block.element.style.pointerEvents = 'none';
        }
        deselect_blocks();
        replace_card(); 
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
            div.className = building_selected + '_piece center_piece scale';
            if (building_selected == 'factory') {
                div.classList.add('factory_scale');
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

function replace_card() {
    for (let resource_card of resource_cards) {
        if (resource_card.classList.contains('selected')) {
            deck1.unshift(resource);
            let newResource = deck1.pop();
            let middleElement = resource_card.querySelector('.resource_card_middle');
            let cardDiv = middleElement.querySelector('div');
            cardDiv.className = newResource + ' center_piece';
            let resourceName = resource_card.getElementsByClassName('resource_card_name');
            resourceName[0].innerHTML = newResource.charAt(0).toUpperCase() + newResource.slice(1);
            resource_card.classList.remove('selected');
        }
    }
    resource = null;
    resource_already_placed = false;
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

function can_build(name, monument_built, blocks_required, height, width, builds) {
    if (name == 'monument') {
        if (monument_built) {
            return false;
        }
    }
    if (blocks_selected == blocks_required) {
        for (let row = 0; row <= 4-height; row++) {
            for (let column = 0; column <= 4-width; column++) {
                var part = [];
                for (let row1 = row; row1 < row+height; row1++) {
                    part.push(selected[row1].slice(column, column+width))
                }
                var string = list_to_string(part);
                if (builds.includes(string)) {
                    return true;
                } 
            }
        }
        for (let row = 0; row <= 4-width; row++) {
            for (let column = 0; column <= 4-height; column++) {
                var part = [];
                for (let row1 = row; row1 < row+width; row1++) {
                    part.push(selected[row1].slice(column, column+height))
                }
                var string = list_to_string(part);
                if (builds.includes(string)) {
                    return true;
                } 
            }
        }
    }
    return false;
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

deal_resources();

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

function deselect_blocks() {
    for (let block of blocks) {
        block.element.classList.remove('selected');
    }
}

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

const db = firebase.firestore();

function save_game() {
    const board = convert_game_state_to_string(game_state);
    const user = firebase.auth().currentUser;
    let score = get_score(game_state);
    let end_time = get_time();

    db.collection('games').add({
        uid: user.uid,
        board: board,
        score: score,
        start_time: start_time,
        end_time: end_time,
    })
    .then(docRef => {
    console.log('Game saved with ID:', docRef.id);
    })
    .catch(error => {
    console.error('Error saving game:', error);
    });
}

function check_achievements(score) {
    let achievements = get_achievements(game_state, score);
    const user = firebase.auth().currentUser;
    if (achievements) {
        db.collection('achievements').add({
            uid: user.uid,
            achievements: achievements,
        })
        .then(docRef => {
        console.log('Saved achievements with id:', docRef.id);
        })
        .catch(error => {
        console.error('Error saving achievements:', error);
        });
    }
}

function complete_town() {
    let score = get_score(game_state);
    alert(score);
    save_game();
    check_achievements(score);
    // window.location.reload();
}

let complete_town_button = document.getElementById('complete_town');
complete_town_button.addEventListener('click', complete_town);

// Call this with your array of achievement strings
function showAchievementsTable(achievements) {
    const overlay = document.getElementById('achievement-overlay');
    const tbody   = overlay.querySelector('tbody');
  
    // clear out old rows
    tbody.innerHTML = '';
  
    // build new rows
    achievements.forEach((ach, i) => {
      const row = document.createElement('tr');
      const idx = document.createElement('td');
      const txt = document.createElement('td');
      idx.textContent = i + 1;
      txt.textContent = ach;
      row.append(idx, txt);
      tbody.appendChild(row);
    });
  
    // display the overlay
    overlay.style.display = 'flex';
}
  
// Setup close-button behavior
document.querySelector('#achievement-modal .close-btn')
.addEventListener('click', () => {
    document.getElementById('achievement-overlay').style.display = 'none';
});

// Also clicking the backdrop closes it:
document.getElementById('achievement-overlay')
.addEventListener('click', e => {
    if (e.target.id === 'achievement-overlay') {
    e.currentTarget.style.display = 'none';
    }
});

// Call this with your array of achievement strings
function show_games_table(games) {
    const overlay = document.getElementById('games-overlay');
    const tbody   = overlay.querySelector('tbody');
  
    // clear out old rows
    tbody.innerHTML = '';
  
    // build new rows
    games.forEach((game, i) => {
      const row = document.createElement('tr');
      const idx = document.createElement('td');
      const startTimeCell = document.createElement('td');
      const scoreCell = document.createElement('td');
      idx.textContent = i + 1;
      startTimeCell.textContent = game[0];
      scoreCell.textContent = game[1];
      row.append(idx, startTimeCell, scoreCell);
      tbody.appendChild(row);
    });
  
    // display the overlay
    overlay.style.display = 'flex';
}

// Setup close-button behavior
document.querySelector('#games-modal .close-btn')
.addEventListener('click', () => {
    document.getElementById('games-overlay').style.display = 'none';
});

// Also clicking the backdrop closes it:
document.getElementById('games-overlay')
.addEventListener('click', e => {
    if (e.target.id === 'games-overlay') {
    e.currentTarget.style.display = 'none';
    }
});

async function show_achievements() {
    const user = firebase.auth().currentUser;
    try {
        const snapshot = await db
        .collection('achievements')
        .where('uid', '==', user.uid)
        .get();

        let achievementsList = new Set();
        snapshot.forEach(doc => {
            const data = doc.data();
            if (data.achievements) {
            data.achievements.forEach(achievement => {
                achievementsList.add(achievement);
            });
            }
        });
        showAchievementsTable(Array.from(achievementsList));

    } catch (err) {
        console.error('Query error:', err);
    }
}

async function show_games() {
    const user = firebase.auth().currentUser;
    try {
        const snapshot = await db
        .collection('games')
        .where('uid', '==', user.uid)
        .get();

        let games = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            let score = data.score;
            let start_time = data.start_time;
            games.push([start_time, score]);
        });
        show_games_table(games);

    } catch (err) {
        console.error('Query error:', err);
    }
}

uncover_blocks();

function display_profile() {
    document.getElementById('game').classList.add("hidden");
    const backButton = document.createElement('button');
    backButton.textContent = 'Back to Game';
    backButton.style.position = 'fixed';
    backButton.style.top = '0px';
    backButton.style.right = '0px';
    backButton.style.padding = '10px';
    backButton.style.border = '1px solid black';
    backButton.style.backgroundColor = 'ivory';
    backButton.addEventListener('click', () => {
        document.getElementById('game').classList.remove('hidden');
        backButton.remove();
    });
    document.body.appendChild(backButton);
    
    let profileContainer = document.createElement('div');
    profileContainer.style.margin = '20px';
    profileContainer.style.padding = '20px';
    profileContainer.style.border = '1px solid #ccc';
    profileContainer.style.backgroundColor = 'whitesmoke';

    let header = document.createElement('h2');
    header.textContent = 'Player Achievements';
    profileContainer.appendChild(header);

    let table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';

    let headerRow = document.createElement('tr');
    let th1 = document.createElement('th');
    th1.textContent = '#';
    th1.style.border = '1px solid #000';
    th1.style.padding = '8px';
    let th2 = document.createElement('th');
    th2.textContent = 'Achievement';
    th2.style.border = '1px solid #000';
    th2.style.padding = '8px';

    headerRow.append(th1, th2);
    table.appendChild(headerRow);

    let user = firebase.auth().currentUser;
    db.collection('achievements')
        .where('uid', '==', user.uid)
        .get()
        .then(snapshot => {
            let achievementsSet = new Set();
            snapshot.forEach(doc => {
                let data = doc.data();
                if (data.achievements) {
                    data.achievements.forEach(a => achievementsSet.add(a));
                }
            });
            let achievements = Array.from(achievementsSet);
            achievements.forEach((ach, index) => {
                let row = document.createElement('tr');
                let cellIndex = document.createElement('td');
                cellIndex.textContent = index + 1;
                cellIndex.style.border = '1px solid #000';
                cellIndex.style.padding = '8px';
                let cellAch = document.createElement('td');
                cellAch.textContent = ach;
                cellAch.style.border = '1px solid #000';
                cellAch.style.padding = '8px';
                row.append(cellIndex, cellAch);
                table.appendChild(row);
            });
        })
        .catch(err => {
            console.error('Error loading achievements:', err);
        });

    let gamesContainer = document.createElement('div');
    gamesContainer.style.margin = '20px';
    gamesContainer.style.padding = '20px';
    gamesContainer.style.border = '1px solid #ccc';
    gamesContainer.style.backgroundColor = 'whitesmoke';

    let gamesHeader = document.createElement('h2');
    gamesHeader.textContent = 'Games Played';
    gamesContainer.appendChild(gamesHeader);

    let gamesTable = document.createElement('table');
    gamesTable.style.width = '100%';
    gamesTable.style.borderCollapse = 'collapse';

    headerRow = document.createElement('tr');
    th1 = document.createElement('th');
    th1.textContent = '#';
    th1.style.border = '1px solid #000';
    th1.style.padding = '8px';
    th2 = document.createElement('th');
    th2.textContent = 'Start Time';
    th2.style.border = '1px solid #000';
    th2.style.padding = '8px';
    let th3 = document.createElement('th');
    th3.textContent = 'Score';
    th3.style.border = '1px solid #000';
    th3.style.padding = '8px';
    headerRow.append(th1, th2, th3);
    gamesTable.appendChild(headerRow);

    user = firebase.auth().currentUser;
    db.collection('games')
        .where('uid', '==', user.uid)
        .get()
        .then(snapshot => {
            let count = 1;
            snapshot.forEach(doc => {
                let data = doc.data();
                let row = document.createElement('tr');

                let cellIndex = document.createElement('td');
                cellIndex.textContent = count;
                cellIndex.style.border = '1px solid #000';
                cellIndex.style.padding = '8px';

                let cellStartTime = document.createElement('td');
                cellStartTime.textContent = data.start_time;
                cellStartTime.style.border = '1px solid #000';
                cellStartTime.style.padding = '8px';

                let cellScore = document.createElement('td');
                cellScore.textContent = data.score;
                cellScore.style.border = '1px solid #000';
                cellScore.style.padding = '8px';

                row.append(cellIndex, cellStartTime, cellScore);
                gamesTable.appendChild(row);
                count++;
            });
        })
        .catch(err => {
            console.error('Error loading games:', err);
        });

    // Create a grid container for the two panels
    let oldGrid = document.getElementById('profile-grid-container');
    if (oldGrid) {
        oldGrid.remove();
    }
    const gridContainer = document.createElement('div');
    gridContainer.id = 'profile-grid-container';
    gridContainer.style.display = 'grid';
    gridContainer.style.gridTemplateColumns = '1fr 1fr';
    gridContainer.style.gap = '20px';
    gridContainer.style.margin = '20px';

    // Only append the tables if they aren’t already added
    if (!profileContainer.contains(table)) {
        profileContainer.appendChild(table);
    }
    if (!gamesContainer.contains(gamesTable)) {
        gamesContainer.appendChild(gamesTable);
    }

    gridContainer.appendChild(profileContainer);
    gridContainer.appendChild(gamesContainer);
    document.body.appendChild(gridContainer);

    backButton.addEventListener('click', () => {
        const gridContainer = document.getElementById('profile-grid-container');
        if (gridContainer) {
            gridContainer.style.display = 'none';
        }
    });
    document.getElementById('logout_button').addEventListener('click', () => {
        const gridContainer = document.getElementById('profile-grid-container');
        if (gridContainer) {
            gridContainer.style.display = 'none';
        }
        backButton.style.display = 'none';
    });
}

document.getElementById('profile').addEventListener('click', display_profile);
