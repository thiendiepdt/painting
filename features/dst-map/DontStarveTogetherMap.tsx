import { ChangeEvent, FC } from 'react'
import { Input, FormControlLabel, Box, Typography, Slider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useDrawDontStarveTogetherMap } from './hooks'

const useStyles = makeStyles((theme) => ({
  root: {},
  labelInput: {
    paddingRight: theme.spacing(2),
  },
  canvasContainer: {
    marginTop: theme.spacing(2),
  },
  slider: {
    marginTop: theme.spacing(6),
    marginLeft: theme.spacing(3),
    width: '100px',
  },
}))

const DontStarveTogetherMap: FC = () => {
  const classes = useStyles()
  const [
    { pixel, textureRef, canvas, isDrawing },
    { setFile, setPixel },
  ] = useDrawDontStarveTogetherMap()

  const marks = [
    {
      value: 2,
      label: '2px',
    },
    {
      value: 4,
      label: '4px',
    },
    {
      value: 6,
      label: '6px',
    },
  ]

  const handleSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files[0])
  }

  return (
    <Box className={classes.root} pt={1} pb={1}>
      <Box>
        <FormControlLabel
          classes={{
            label: classes.labelInput,
          }}
          labelPlacement="start"
          control={<Input type="file" onChange={handleSelectFile} />}
          label="Chọn file lua"
        />
      </Box>
      <Box>
        <Slider
          className={classes.slider}
          aria-labelledby="discrete-slider-always"
          step={2}
          min={2}
          max={6}
          marks={marks}
          value={pixel}
          onChangeCommitted={(e, value) => {
            setPixel(value as number)
          }}
          valueLabelDisplay="on"
        />
      </Box>
      {isDrawing && <Typography>Đang vẽ</Typography>}
      {!isDrawing && (
        <Box className={classes.canvasContainer}>
          <canvas ref={canvas} />
          <div ref={textureRef} style={{ display: 'none' }} />
        </Box>
      )}
    </Box>
  )
}

export default DontStarveTogetherMap
