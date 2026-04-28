function AtlasUploader({ atlasUrl, atlasFileName, atlasSize, onAtlasFileChange }) {
  return (
    <section className="panel">
      <h2>1) Load Atlas</h2>
      <input type="file" accept="image/*" onChange={onAtlasFileChange} />
      {atlasUrl ? (
        <p className="meta">
          Loaded: <strong>{atlasFileName}</strong> ({atlasSize.width} x {atlasSize.height})
        </p>
      ) : (
        <p className="meta">No atlas image loaded yet.</p>
      )}
    </section>
  )
}

export default AtlasUploader
