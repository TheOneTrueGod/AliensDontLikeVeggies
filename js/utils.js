export function tileCoordToInteger(tileCoord, mapSize) {
    const { x: tileSizeX } = mapSize;
    return tileCoord.y * tileSizeX + tileCoord.x;
}

export function integerToTileCoord(positionNumber, mapSize) {
    const y = Math.floor(positionNumber / mapSize.x);
    const x = positionNumber % mapSize.x;
    return { x, y };
}