import { makeStyles, Container, Paper, Box, Typography, Divider, Backdrop, CircularProgress } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import Footer from './partials/Footer';
import Header from './partials/Header';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh'
    },

    title: {
      padding: theme.spacing(2),
      background: theme.palette.background.title
    },

    continer: {
      flexGrow: 1,
      display: 'flex',
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: theme.palette.primary.main,
      background: '#fff'
    },
    content: {
      flexGrow: 1,
      borderBottom: 'none',
    }
  }
});

export default function Main({ children, title, loading }) {
  const classes = useStyles();

  if (loading) {
    return (
      <Backdrop className={classes.backdrop} open={loading} >
        <CircularProgress color='inherit' />
      </Backdrop>
    );
  }

  return (
    <div className={classes.root}>
      <Header />
      <Container maxWidth='lg' component='main' className={classes.continer}>
        <Paper square variant='outlined' className={classes.content}>
          {
            title &&
            <>
              <Box className={classes.title}>
                <Typography variant="h5">
                  <FormattedMessage id={title} defaultMessage={title} />
                </Typography>
              </Box>
              <Divider />
            </>
          }

          {children}
        </Paper>
      </Container>
      <Footer />
    </div>
  )
}