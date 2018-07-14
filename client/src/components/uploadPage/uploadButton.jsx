import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    button: {
        // margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});

class UploadButton extends Component {
    constructor(props) {
        super(props);
    }
    handleClick(path) {
        this.props.history.push(path)
    }
    render() {
        const { classes } = this.props;
        return(
            <Button style={{marginTop: 50}}
                    type="submit"
                    variant="extendedFab"
                    aria-label="upload"
                    className={classes.button}
                    onSubmit = {() => {this.handleClick('/upload')}}>
                Upload!
            </Button>
        )
    }
}
UploadButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UploadButton);