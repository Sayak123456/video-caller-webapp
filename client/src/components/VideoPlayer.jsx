import React, {useContext} from 'react'
import { Button,Grid,Typography,Paper,Fab } from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import { withStyles } from "@material-ui/core/styles";
import {Assignment,Phone,PhoneDisabled,MicOffRounded,VideocamOffRounded} from '@material-ui/icons';
import {SocketContext} from '../SocketContext';

const useStyles = makeStyles((theme)=>({
    video: {
        width: '550px',
        [theme.breakpoints.down('xs')]: {
          width: '300px',
        },
      },
    gridContainer: {
        margin: '-4px 0px 0px 15px',
        justifyContent: 'center',
        [theme.breakpoints.down('xs')]: {
          flexDirection: 'column',
        },
      },
    paper: {
        padding: '10px',
        border: '2px',
        margin: '10px',
        background: 'transparent',
      },
    root: {
        marginLeft: '20px',
        '& > *': {
          margin: theme.spacing(1),
        },
      },
}))

const WhiteTextTypography = withStyles({
    root: {
      color: "#FFFFFF"
    }
  })(Typography);

const VideoPlayer = () => {
    const {name,callAccepted,myVideo,userVideo,callEnded,stream,call,toggleAudio,toggleVideo} = useContext(SocketContext);
    const classes=useStyles();
    return (
        <Grid container className={classes.gridContainer}>
            {
                stream && (
                <Paper className={classes.paper}>
                    <Grid item xs={12} md={6}>
                        <WhiteTextTypography variant="h5" gutterBottom>{name || 'Name'}</WhiteTextTypography>
                        <video playsInline muted ref={myVideo} autoPlay className={classes.video} onClick={toggleVideo}/>
                        <div className={classes.root}>
                            <Fab color="inherit" onClick={toggleAudio}>
                                <MicOffRounded />
                            </Fab>
                            <Fab color="secondary" onClick={toggleVideo}>
                                <VideocamOffRounded />
                            </Fab>
                        </div>
                    </Grid>
                </Paper>
                )
            }
            {
                callAccepted && !callEnded && (
                <Paper className={classes.paper}>
                    <Grid item xs={12} md={6}>
                        <WhiteTextTypography variant="h5" gutterBottom>{call.name || 'Name'}</WhiteTextTypography>
                        <video playsInline ref={userVideo} autoPlay className={classes.video} />
                    </Grid>
                </Paper>
                )
            } 
        </Grid>
    )
}

export default VideoPlayer
