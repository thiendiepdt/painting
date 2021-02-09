import { forwardRef, HTMLAttributes, memo } from 'react'
import { Box } from '@material-ui/core'
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

const styles = () => {
  return createStyles({
    root: {
      zIndex: 1,
      position: 'relative',
      // width: '300px',
      // height: '200px',
      padding: '1.5rem 4rem',
      fontSize: '1.25rem',
      textAlign: 'center',
      backgroundColor: 'transparent',
      outline: 'none',
      border: 'none',
      cursor: 'pointer',
      borderRadius: '3rem',
      animation: '$colorShift 13s ease infinite forwards',
      boxShadow: '0 0px 15px currentColor',
      display: 'inline-flex',
      textDecoration: 'none',
      fontWeight: 400,

      '&:before': {
        content: '""',
        zIndex: 1,
        position: 'absolute',
        left: '0',
        top: '0',
        width: '100%',
        height: '100%',
        border: '4px solid currentColor',
        borderRadius: '30px',
      },
      '&:after': {
        content: '""',
        zIndex: -2,
        position: 'absolute',
        left: '3px',
        top: '3px',
        width: '100%',
        height: '100%',
        transition: 'all 0.3s 0.2s',
        borderRadius: '30px',
      },
      '&:hover': {
        '&:after': {
          transition: 'all 0.3s',
          left: '0',
          top: '0',
          borderRadius: '30px',
        },

        '& $children': {
          color: '#ffffff',
          borderRadius: '30px',
        },
        '& $blob': {
          transform: 'translateZ(0) scale(1.7)',
        },
      },
    },
    children: {
      width: '100%',
      height: '100%',
      color: 'currentColor',
    },
    inner: {
      zIndex: -1,
      overflow: 'hidden',
      position: 'absolute',
      left: '0',
      top: '0',
      width: '100%',
      height: '100%',
      borderRadius: '30px',
      background: '#ffffff',
    },
    blobs: {
      position: 'relative',
      display: 'block',
      height: '100%',
      filter: 'url("#goo")',
    },
    blob: {
      position: 'absolute',
      top: '2px',
      width: '25%',
      height: '100%',
      background: 'currentColor',
      borderRadius: '100%',
      transform: 'translate3d(0, 150%, 0) scale(1.7)',
      transition: 'transform 0.4s ease',

      '&:nth-child(1)': {
        left: '0%',
        transitionDelay: '0s',
      },
      '&:nth-child(2)': {
        left: '30%',
        transitionDelay: '0.08s',
      },
      '&:nth-child(3)': {
        left: '60%',
        transitionDelay: '0.16s',
      },
      '&:nth-child(4)': {
        left: '90%',
        transitionDelay: '0.24s',
      },
    },
    '@keyframes colorShift': {
      '0%': { color: 'hsl(0, 100%, 40%)' },
      '10%': { color: 'hsl(36, 100%, 40%)' },
      '20%': { color: 'hsl(72, 100%, 30%)' },
      '30%': { color: 'hsl(108, 100%, 30%)' },
      '40%': { color: 'hsl(144, 100%, 30%)' },
      '50%': { color: 'hsl(180, 100%, 20%)' },
      '60%': { color: 'hsl(211, 100%, 40%)' },
      '70%': { color: 'hsl(247, 100%, 40%)' },
      '80%': { color: 'hsl(277, 100%, 50%)' },
      '90%': { color: 'hsl(301, 100%, 40%)' },
      '100%': { color: 'hsl(350, 100%, 40%)' },
    },
  })
}

type BlobComponentProps = WithStyles<typeof styles> & HTMLAttributes<HTMLDivElement>

const BlobComponent = forwardRef<HTMLDivElement, BlobComponentProps>(({ classes, children }) => {
  return (
    <Box className={clsx(classes.root, 'blob')}>
      <span className={classes.children}>{children}</span>
      <span className={classes.inner}>
        <span className={classes.blobs}>
          <span className={classes.blob} />
          <span className={classes.blob} />
          <span className={classes.blob} />
          <span className={classes.blob} />
        </span>
      </span>
    </Box>
  )
})

export default withStyles(styles)(memo(BlobComponent))
