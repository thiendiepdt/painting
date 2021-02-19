import { useEffect, useRef, useState } from 'react'
import { MapData, Texture, TextureMap } from './types'
import { MINIMAP_GROUND_PROPERTIES } from './Config'

export const useDrawDontStarveTogetherMap = () => {
  const canvas = useRef<HTMLCanvasElement>()
  const textureRef = useRef<HTMLDivElement>()
  const [file, setFile] = useState<File>()
  const [pixel, setPixel] = useState<number>(2)
  const [isDrawing, setIsDrawing] = useState<boolean>(false)
  const [isReady, setIsReady] = useState<boolean>(false)
  const ctxRef = useRef<CanvasRenderingContext2D>()
  const textureMap = useRef<TextureMap>({})

  const readFile = async () => {
    return new Promise<MapData>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = async (e) => {
        const mapData: string = e.target.result as string
        const data = mapData.split('\n').map((row) => row.split(',').map(Number))
        resolve(data)
      }
      reader.onerror = (e) => {
        reject(e)
      }
      reader.readAsText(file)
    })
  }

  const loadCtx = (texture: Texture) => {
    return new Promise<void>((resolve) => {
      texture.canvas = document.createElement('canvas')
      textureRef.current.appendChild(texture.canvas)
      const img = new Image()
      img.onload = function () {
        const image = this as HTMLImageElement
        texture.canvas.width = image.width
        texture.canvas.height = image.height
        texture.canvas.getContext('2d').drawImage(image, 0, 0)
        resolve()
      }
      img.onerror = function (e) {
        console.warn(e)
        resolve()
      }
      img.src = texture.url
    })
  }

  const drawTexture = async ({ canvas: _canvas, points }: Texture) => {
    for (const point of points) {
      const { sx, sy, x, y } = point
      // Div background image có repeat do đó với canvas ta phải tính ngược lại vị trí
      let left = sx * pixel
      while (left >= _canvas.width) {
        left -= _canvas.width
      }
      let top = sy * pixel
      while (top >= _canvas.height) {
        top -= _canvas.height
      }
      ctxRef.current.drawImage(_canvas, left, top, pixel, pixel, x, y, pixel, pixel)
    }
  }

  const draw = async () => {
    const ctx = (ctxRef.current = canvas?.current?.getContext('2d'))
    if (!file || !textureRef.current || !ctx) return
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    const data = await readFile()
    // Tính kích thước của canvas
    const maxRow = Math.max(...data.map((row) => row.length))
    ctx.canvas.height = data.length * pixel
    ctx.canvas.width = maxRow * pixel
    // Fill màu nền
    ctx.fillStyle = 'grey'
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    Object.values(textureMap.current).forEach((texture) => {
      texture.points = []
    })
    data.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        if (textureMap.current[col]) {
          textureMap.current[col].points.push({
            sx: colIndex, // Vị trí cắt texture
            sy: rowIndex, // Vị trí cắt texture
            x: colIndex * pixel, // Vị trí đặt point trên trục Ox của canvas chính
            y: rowIndex * pixel, // Vị trí đặt point trên trục Oy của canvas chính
          })
        }
      })
    })
    const textures = Object.values(textureMap.current)
    for (const texture of textures) {
      drawTexture(texture).catch()
    }
  }

  useEffect(() => {
    if (file) {
      setIsDrawing(true)
      draw().finally(() => {
        setIsDrawing(false)
      })
    }
  }, [file, pixel])

  const init = async () => {
    textureMap.current = MINIMAP_GROUND_PROPERTIES.reduce<TextureMap>((prev, curr) => {
      prev[curr.id] = {
        url: curr.noise_texture,
        points: [],
        canvas: null,
      }
      return prev
    }, {})
    const textures = Object.values(textureMap.current)
    await Promise.all(textures.map((texture) => loadCtx(texture)))
    setIsReady(true)
  }

  useEffect(() => {
    init().catch(console.warn)
  }, [])

  return [
    {
      canvas,
      textureRef,
      pixel,
      isDrawing,
      isReady,
      file,
    },
    {
      setFile,
      setPixel,
    },
  ]
}
