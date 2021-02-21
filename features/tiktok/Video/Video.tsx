import { FC, HTMLAttributes, useEffect, useMemo, useRef } from 'react'

interface VideoProps extends HTMLAttributes<HTMLDivElement> {
  src: string
  width: number
  height: number
  maxSize: number
  visible: boolean
  onIntersecting: (ratio: number) => void
  onOutside: () => void
  playing: boolean
}

const Video: FC<VideoProps> = ({
  src,
  width,
  height,
  maxSize,
  visible,
  onIntersecting,
  onOutside,
  playing,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>()
  const videoRef = useRef<HTMLVideoElement>()
  const { videoWidth, videoHeight } = useMemo(() => {
    let videoWidth = width
    let videoHeight = height
    const ratio = width / height

    if (width > height) {
      videoWidth = maxSize
      videoHeight = maxSize / ratio
    } else {
      videoHeight = maxSize
      videoWidth = maxSize * ratio
    }
    return {
      videoWidth,
      videoHeight,
    }
  }, [maxSize])

  useEffect(() => {
    const threshold: number[] = []
    for (let i = 0; i <= 1; i += 0.01) {
      threshold.push(i)
    }
    const observer = new IntersectionObserver(
      function (entries) {
        // isIntersecting is true when element and viewport are overlapping
        // isIntersecting is false when element and viewport don't overlap
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onIntersecting(entry.intersectionRatio)
          } else {
            onOutside()
          }
        })
      },
      { threshold }
    )

    observer.observe(containerRef.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (videoRef.current) {
      if (playing) {
        if (videoRef.current.paused) {
          videoRef.current.play().catch(console.warn)
        }
      } else {
        videoRef.current.pause()
      }
    }
  }, [playing])

  return (
    <div ref={containerRef} style={{ width: videoWidth, height: videoHeight }} {...props}>
      {visible && (
        <video ref={videoRef} src={src} width={videoWidth} height={videoHeight} muted={true} />
      )}
    </div>
  )
}

export default Video
