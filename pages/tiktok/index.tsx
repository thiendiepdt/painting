import { FC } from 'react'
import { Box } from '@material-ui/core'
import TiktokHeader from '../../features/tiktok/header/TiktokHeader'
import VideoContainer from '../../features/tiktok/Video/VideoContainer'

const TiktokPage: FC = () => {
  return (
    <Box className="main-page">
      <TiktokHeader />
      <VideoContainer />
    </Box>
  )
}

export default TiktokPage
