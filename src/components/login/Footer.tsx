import Typography from '@mui/material/Typography';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';

const Footer = () => {
    return (
<Box component='footer' sx={{  width: '100%',

    mt: 'auto'}}>
                <Grid container sx={{


                    mt: 'auto',
                    width: '100%',
                    bgcolor: 'third.main',
                    justifyContent: 'center',
                    direction: 'column',
                    alignSelf: 'center',
                    
                }}>
                    <Grid item  >
                        <Typography sx={{ align: 'center', p: 2 }}>Terms of Service</Typography>
                    </Grid>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <Grid item >
                        <Typography sx={{ align: 'center', p: 2 }}>Support</Typography>
                    </Grid>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <Grid item >
                        <Typography sx={{ align: 'center', p: 2 }}>2022 Cognization</Typography>
                    </Grid>
                </Grid>
            </Box>
    );
}

export default Footer;