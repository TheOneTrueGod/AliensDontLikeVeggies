export function getMapSize() {
    return { x: 20, y: 15 };
}

export function getCanvasSize() {
    return { x: 800, y: 600 };
}

export function getTileSize() {
    const { x: mapSizeX, y: mapSizeY } = getMapSize();
    const { x: canvasSizeX, y: canvasSizeY } = getCanvasSize();

    return { x: canvasSizeX / mapSizeX, y: canvasSizeY / mapSizeY };
}