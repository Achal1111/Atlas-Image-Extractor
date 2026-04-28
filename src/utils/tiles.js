export function parseCoordinates(coordinatesInput) {
  try {
    const parsed = JSON.parse(coordinatesInput)
    if (!Array.isArray(parsed)) {
      return { tiles: [], error: 'Coordinates must be a JSON array.' }
    }

    const normalizedTiles = parsed.map((tile, index) => {
      const id = tile?.id ?? `tile-${index + 1}`
      const x = Number(tile?.x)
      const y = Number(tile?.y)
      const width = Number(tile?.width)
      const height = Number(tile?.height)

      if (
        Number.isNaN(x) ||
        Number.isNaN(y) ||
        Number.isNaN(width) ||
        Number.isNaN(height)
      ) {
        throw new Error(`Tile at index ${index} has invalid numeric values.`)
      }

      return { id: String(id), x, y, width, height }
    })

    return { tiles: normalizedTiles, error: '' }
  } catch (error) {
    return {
      tiles: [],
      error: error instanceof Error ? error.message : 'Invalid JSON format.',
    }
  }
}

export function getBoundedTiles(tiles, atlasSize, hasAtlas) {
  if (!hasAtlas) return []

  return tiles.filter((tile) => {
    const right = tile.x + tile.width
    const bottom = tile.y + tile.height

    return (
      tile.x >= 0 &&
      tile.y >= 0 &&
      tile.width > 0 &&
      tile.height > 0 &&
      right <= atlasSize.width &&
      bottom <= atlasSize.height
    )
  })
}
