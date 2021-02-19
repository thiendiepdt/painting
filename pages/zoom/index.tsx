import { FC, useRef, WheelEvent } from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  root: {
    width: '500px',
    height: '500px',
    marginLeft: '50px',
    backgroundImage: 'url(/levels/textures/Ground_noise.png)',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
}))

const ZoomPage: FC = ({ children }) => {
  const classes = useStyles()
  const containerRef = useRef<HTMLDivElement>()
  const middleMouseRef = useRef({
    active: false,
    top: 0,
    left: 0,
    zoom: 1,
  })

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    if (!event.ctrlKey) {
      if (event.deltaY > 0) {
        if (middleMouseRef.current.zoom > 1) {
          middleMouseRef.current.zoom /= 1.1
        }
      } else {
        if (middleMouseRef.current.zoom < 2) {
          middleMouseRef.current.zoom *= 1.1
        }
      }
      const zoom = middleMouseRef.current.zoom
      containerRef.current.style.backgroundSize = `${zoom * 100}% ${zoom * 100}%`
    }
  }

  return (
    <div ref={containerRef} className={classes.root} onWheel={handleWheel}>
      {children}
    </div>
  )
}

export default ZoomPage
