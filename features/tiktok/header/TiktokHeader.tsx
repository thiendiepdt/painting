import { forwardRef, memo } from 'react'
import { Box, Container } from '@material-ui/core'
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles'
import Link from 'next/link'
import clsx from 'clsx'

const styles = () => {
  return createStyles({
    root: {
      maxWidth: '1028px',
    },
    logo1: {
      width: '28px',
    },
    logo2: {
      width: '97px',
      position: 'relative',
      top: '-2px',
      marginLeft: '4px',
    },
  })
}

type TiktokHeader = WithStyles<typeof styles>

const TiktokHeader = forwardRef<HTMLDivElement, TiktokHeader>(({ classes }, ref) => {
  return (
    <Container fixed ref={ref} className={clsx(classes.root, 'header-container')}>
      <Box className="header-content">
        <Box className="hamburger-wrapper">
          <Box className="hamburger-menu"></Box>
          <Box className="logo-container">
            <Link href="/tiktok" passHref>
              <a>
                <img src="/tiktok_logo.svg" className={classes.logo1} />
                <img src="/tiktok_logo2.svg" className={classes.logo2} />
              </a>
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  )
})

export default withStyles(styles)(memo(TiktokHeader))
