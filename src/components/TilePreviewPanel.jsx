function TilePreviewPanel({
  atlasUrl,
  boundedTiles,
  selectedTile,
  onSelectTile,
  onDownloadSelectedTile,
  maxTilePreview,
}) {
  const tilesForPreview = boundedTiles.slice(0, maxTilePreview)
  const hasMoreTiles = boundedTiles.length > maxTilePreview

  return (
    <section className="panel">
      <h2>3) Preview and Extract</h2>
      {!atlasUrl ? (
        <p className="meta">Load an atlas image first.</p>
      ) : boundedTiles.length === 0 ? (
        <p className="meta">No valid coordinates to preview.</p>
      ) : (
        <>
          <div className="actions">
            <label>
              Selected tile:
              <select
                value={selectedTile?.id ?? ''}
                onChange={(event) => onSelectTile(event.target.value)}
              >
                {boundedTiles.map((tile) => (
                  <option key={tile.id} value={tile.id}>
                    {tile.id} ({tile.x}, {tile.y}, {tile.width}, {tile.height})
                  </option>
                ))}
              </select>
            </label>
            <button type="button" onClick={onDownloadSelectedTile}>
              Download selected tile
            </button>
          </div>

          <div className="tile-grid">
            {tilesForPreview.map((tile) => (
              <button
                key={`${tile.id}-${tile.x}-${tile.y}`}
                type="button"
                className={`tile-card ${selectedTile?.id === tile.id ? 'active' : ''}`}
                onClick={() => onSelectTile(tile.id)}
              >
                <div
                  className="tile-image"
                  style={{
                    width: tile.width,
                    height: tile.height,
                    backgroundImage: `url(${atlasUrl})`,
                    backgroundPosition: `${-tile.x}px ${-tile.y}px`,
                  }}
                />
                <span>{tile.id}</span>
              </button>
            ))}
          </div>

          {hasMoreTiles ? (
            <p className="meta">
              Showing first {maxTilePreview} previews for performance. Full set remains
              selectable in the dropdown.
            </p>
          ) : null}
        </>
      )}
    </section>
  )
}

export default TilePreviewPanel
