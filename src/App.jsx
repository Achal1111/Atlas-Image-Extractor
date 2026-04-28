import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import AtlasUploader from './components/AtlasUploader'
import CoordinatesEditor from './components/CoordinatesEditor'
import TilePreviewPanel from './components/TilePreviewPanel'
import { MAX_TILE_PREVIEW, SAMPLE_COORDINATES } from './constants/atlas'
import { getBoundedTiles, parseCoordinates } from './utils/tiles'
import './App.css'

function App() {
  const [atlasFileName, setAtlasFileName] = useState('')
  const [atlasUrl, setAtlasUrl] = useState('')
  const [atlasSize, setAtlasSize] = useState({ width: 0, height: 0 })
  const [coordinatesInput, setCoordinatesInput] = useState(SAMPLE_COORDINATES)
  const [selectedTileId, setSelectedTileId] = useState('')
  const downloadCanvasRef = useRef(null)

  useEffect(
    () => () => {
      if (atlasUrl) {
        URL.revokeObjectURL(atlasUrl)
      }
    },
    [atlasUrl],
  )

  const onAtlasFileChange = useCallback((event) => {
    const [file] = event.target.files ?? []
    if (!file) return

    const fileUrl = URL.createObjectURL(file)
    const image = new Image()
    image.onload = () => {
      setAtlasSize({ width: image.naturalWidth, height: image.naturalHeight })
      setAtlasUrl(fileUrl)
      setAtlasFileName(file.name)
    }
    image.src = fileUrl
  }, [])

  const parsedTiles = useMemo(() => {
    return parseCoordinates(coordinatesInput)
  }, [coordinatesInput])

  const boundedTiles = useMemo(() => {
    return getBoundedTiles(parsedTiles.tiles, atlasSize, Boolean(atlasUrl))
  }, [parsedTiles.tiles, atlasSize, atlasUrl])

  const invalidTileCount = parsedTiles.tiles.length - boundedTiles.length

  const selectedTile =
    boundedTiles.find((tile) => tile.id === selectedTileId) ?? boundedTiles[0] ?? null

  const downloadSelectedTile = useCallback(() => {
    if (!atlasUrl || !selectedTile || !downloadCanvasRef.current) return

    const canvas = downloadCanvasRef.current
    canvas.width = selectedTile.width
    canvas.height = selectedTile.height
    const context = canvas.getContext('2d')
    if (!context) return

    const image = new Image()
    image.onload = () => {
      context.clearRect(0, 0, canvas.width, canvas.height)
      context.drawImage(
        image,
        selectedTile.x,
        selectedTile.y,
        selectedTile.width,
        selectedTile.height,
        0,
        0,
        selectedTile.width,
        selectedTile.height,
      )

      const downloadLink = document.createElement('a')
      downloadLink.href = canvas.toDataURL('image/png')
      downloadLink.download = `${selectedTile.id}.png`
      downloadLink.click()
    }
    image.src = atlasUrl
  }, [atlasUrl, selectedTile])

  return (
    <main className="app-shell">
      <header>
        <h1>Atlas Image Extractor</h1>
        <p>
          Upload one large atlas image, provide tile coordinates, and fetch hundreds or
          thousands of sub-images without sending each image separately.
        </p>
      </header>

      <AtlasUploader
        atlasUrl={atlasUrl}
        atlasFileName={atlasFileName}
        atlasSize={atlasSize}
        onAtlasFileChange={onAtlasFileChange}
      />

      <CoordinatesEditor
        coordinatesInput={coordinatesInput}
        onCoordinatesChange={setCoordinatesInput}
        parseError={parsedTiles.error}
        parsedCount={parsedTiles.tiles.length}
        hasAtlas={Boolean(atlasUrl)}
        boundedCount={boundedTiles.length}
        invalidTileCount={invalidTileCount}
      />

      <TilePreviewPanel
        atlasUrl={atlasUrl}
        boundedTiles={boundedTiles}
        selectedTile={selectedTile}
        onSelectTile={setSelectedTileId}
        onDownloadSelectedTile={downloadSelectedTile}
        maxTilePreview={MAX_TILE_PREVIEW}
      />
      <canvas ref={downloadCanvasRef} className="hidden-canvas" />
    </main>
  )
}

export default App
