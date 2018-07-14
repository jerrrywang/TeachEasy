import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import UploadFull from './uploadFull';

class UploadFinal extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const styles = {
            div: {
                borderRight: '2px solid black',
                paddingRight: 60
            },
            header: {
                marginTop: -70,
                marginLeft: 160,
                marginRight: 140,
                fontFamily: 'Montserrat',
                fontSize: 70,
            },
            paragraph: {
                marginTop: 20,
                marginLeft: 160,
                marginRight: 130,
                lineHeight: 2.5,
                fontFamily: 'Cardo',
            },
            line: {
                display: 'flex',
                flexDirection: 'row',
                width: 0,
                borderLeft: '5 solid black'
            },
            item: {
                display: 'flex',
                alignContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                flexWrap: 'nowrap',
                justifyContent: 'center'
            },
            container: {
                //     margin: 'auto'
                flexGrow: 1,
                height: '90vh'
                //     alignContent: 'center',
                //     alignItems: 'center',
                //     justifyContent: 'center'
            }
        }
        return (
            <Grid style = {styles.container} container>
                <Grid style={styles.item} item xs={6} sm={6} md={6} lg={6}>
                    <div style = {styles.div}>
                        <h1 style = {styles.header}
                            color = 'primary'>
                            Upload a lecture!
                        </h1>
                        <p style = {styles.paragraph}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                </Grid>
                <Grid style={styles.item} item xs={6} sm={6} md={6} lg={6}>
                    <UploadFull />
                </Grid>
            </Grid>
        )
    }
}

export default UploadFinal;