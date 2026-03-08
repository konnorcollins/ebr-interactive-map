let showLocationCardNumbers = $state(false);

export function getShowLocationNumbers() {
    return showLocationCardNumbers;
}

export function toggleLocationNumbers() {
    showLocationCardNumbers = !showLocationCardNumbers;
}
