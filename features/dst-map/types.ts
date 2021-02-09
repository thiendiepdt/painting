export type MapData = number[][]

export interface MapPoint {
  sx: number
  sy: number
  x: number
  y: number
}

export interface Texture {
  url: string
  points: MapPoint[]
  canvas: HTMLCanvasElement
}

export type TextureMap = Record<string, Texture>
