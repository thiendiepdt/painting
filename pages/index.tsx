import Head from 'next/head'
import styles from '../styles/Home.module.css'
import BlobComponent from '../components/BlobComponent'
import Goo from '../components/BlobComponent/Goo'
import { Box, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Link from 'next/link'

const useHomeStyles = makeStyles((theme) => {
  return {
    appRoot: {
      margin: theme.spacing(2),
    },
    appContainer: {
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    appTitle: {
      fontFamily: 'Pacifico',
    },
  }
})

export default function Home(): JSX.Element {
  const classes = useHomeStyles()

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Goo />
        <Grid container justify="center" spacing={2}>
          <Grid item>
            <BlobComponent>
              <Box className={classes.appContainer}>
                <Typography variant="h3" className={classes.appTitle}>
                  Vẽ Vời
                </Typography>
              </Box>
            </BlobComponent>
          </Grid>
          <Grid item>
            <Link href="/dst-map" passHref>
              <a>
                <BlobComponent>
                  <Box className={classes.appContainer}>
                    <Typography variant="h3" className={classes.appTitle}>
                      {'DST Map'}
                    </Typography>
                  </Box>
                </BlobComponent>
              </a>
            </Link>
          </Grid>
          <Grid item>
            <Link href="/tiktok" passHref>
              <a>
                <BlobComponent>
                  <Box className={classes.appContainer}>
                    <Typography variant="h3" className={classes.appTitle}>
                      {'Tiktok Clip'}
                    </Typography>
                  </Box>
                </BlobComponent>
              </a>
            </Link>
          </Grid>
        </Grid>
      </main>
    </div>
  )
}
