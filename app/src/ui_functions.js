export function place_resource(resource, square) {
    const div = document.createElement('div');
    div.className = resource + ' center_piece';
    square.append(div);
}

export function place_building(building_selected, square) {
    const div = document.createElement('div');
    div.className = building_selected + '_piece center_piece scale';
    if (building_selected == 'factory') {
        div.classList.add('factory_scale');
    }
    square.append(div);
}
