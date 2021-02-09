import { FC } from 'react'
import { Box } from '@material-ui/core'
import TiktokHeader from '../../features/tiktok/header/TiktokHeader'

const TiktokPage: FC = () => {
  return (
    <Box className="main-page">
      <TiktokHeader />
    </Box>
  )
}

export default TiktokPage
