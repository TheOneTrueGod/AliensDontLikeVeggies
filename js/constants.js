export function getMapSize() {
    return { x: 12, y: 12 };
}

export function getPixiCanvasSize() {
    return { x: 800, y: 400 };
}

export function getTileSize() {
    return { x: 32, y: 32};
    const { x: mapSizeX, y: mapSizeY } = getMapSize();
    const { x: canvasSizeX, y: canvasSizeY } = getPixiCanvasSize();

    return { x: canvasSizeX / mapSizeX, y: canvasSizeY / mapSizeY };
}