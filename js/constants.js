export function getMapSize() {
    return { x: 20, y: 10 };
}

export function getPixiCanvasSize() {
    return { x: 800, y: 400 };
}

export function getTileSize() {
    const { x: mapSizeX, y: mapSizeY } = getMapSize();
    const { x: canvasSizeX, y: canvasSizeY } = getPixiCanvasSize();

    return { x: canvasSizeX / mapSizeX, y: canvasSizeY / mapSizeY };
}