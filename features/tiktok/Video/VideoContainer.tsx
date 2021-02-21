import { FC, useEffect, useRef, useState } from 'react'
import Video from './Video'
import { TiktokVideo } from '../types'

const VideoContainer: FC = () => {
  const videoContainerRef = useRef<HTMLDivElement>()
  const [maxSize, setMaxSize] = useState(0)
  const [videos, setVideos] = useState<TiktokVideo[]>([
    {
      id: 1,
      src: '/tiktok/videos/60327314.mp4',
      width: 540,
      height: 960,
      visible: false,
      ratio: -1,
      play: false,
    },
    {
      id: 2,
      src: '/tiktok/videos/60328ab3.mp4',
      width: 720,
      height: 540,
      visible: false,
      ratio: -1,
      play: false,
    },
    {
      id: 3,
      src: '/tiktok/videos/60327314.mp4',
      width: 540,
      height: 960,
      visible: false,
      ratio: -1,
      play: false,
    },
    {
      id: 4,
      src: '/tiktok/videos/60328ab3.mp4',
      width: 720,
      height: 540,
      visible: false,
      ratio: -1,
      play: false,
    },
  ])

  useEffect(() => {
    setMaxSize(window.innerHeight - 70 - 60)
  }, [])

  const onIntersecting = (id: number, ratio: number) => {
    setVideos((state) => {
      return state.map((video) => {
        if (video.id === id) {
          return {
            ...video,
            ratio,
            visible: true,
          }
        } else {
          return video
        }
      })
    })
  }

  const onOutSide = (id: number) => {
    setVideos((state) => {
      return state.map((video) => {
        if (video.id === id) {
          return {
            ...video,
            ratio: -1,
            visible: false,
          }
        } else {
          return video
        }
      })
    })
  }

  useEffect(() => {
    let playing = -1
    let max = 0
    videos.forEach((video, index) => {
      if (video.play) {
        playing = index
      }
      if (video.ratio > videos[max].ratio) {
        max = index
      }
    })
    if (playing !== max) {
      setVideos((state) => {
        return state.map((_video) => {
          if (_video.id === max) {
            return {
              ..._video,
              play: true,
            }
          } else {
            if (_video.play) {
              return {
                ..._video,
                play: false,
              }
            }
            return _video
          }
        })
      })
    }
  }, [videos])

  return (
    <div ref={videoContainerRef}>
      {videos.map(({ id, src, width, height, visible, play }) => (
        <Video
          className="video"
          key={id}
          src={src}
          width={width}
          height={height}
          maxSize={maxSize}
          visible={visible}
          onIntersecting={(ration) => {
            onIntersecting(id, ration)
          }}
          onOutside={() => {
            onOutSide(id)
          }}
          playing={play}
        />
      ))}
    </div>
  )
}

export default VideoContainer
