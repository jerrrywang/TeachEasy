import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

class Menu extends Component {
    constructor(props) {
        super(props);

    };
    handleRouteClick(path) {
        this.props.history.push(path);
    }

    render() {
        const styles = {
            menu: {
                background: "#254558"
            },
            button1: {
                marginRight: 40,
                background: "#b1a296"
            },
            button2: {
                marginRight: 20,
                background: "#b1a296"
            }
        };
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AppBar style={styles.menu} position="static">
                    <Toolbar>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            TeachEZ
                        </Typography>
                        <Button variant="contained"
                                style = {styles.button1}
                                onClick={() => this.handleRouteClick('/upload')}>
                            Upload
                        </Button>
                        <Button variant="contained"
                                style = {styles.button2}
                                onClick={() => this.handleRouteClick('/history')}>
                            History
                        </Button>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

Menu.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Menu);