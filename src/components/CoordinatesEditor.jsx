function CoordinatesEditor({
  coordinatesInput,
  onCoordinatesChange,
  parseError,
  parsedCount,
  hasAtlas,
  boundedCount,
  invalidTileCount,
}) {
  return (
    <section className="panel">
      <h2>2) Coordinates JSON</h2>
      <textarea
        value={coordinatesInput}
        onChange={(event) => onCoordinatesChange(event.target.value)}
        spellCheck={false}
        aria-label="Coordinates JSON"
      />
      {parseError ? (
        <p className="error">{parseError}</p>
      ) : (
        <p className="meta">
          Parsed tiles: <strong>{parsedCount}</strong>
          {hasAtlas ? (
            <>
              {' '}
              | Valid in bounds: <strong>{boundedCount}</strong>
              {invalidTileCount > 0 ? <> | Ignored out-of-bounds: {invalidTileCount}</> : null}
            </>
          ) : null}
        </p>
      )}
    </section>
  )
}

export default CoordinatesEditor
