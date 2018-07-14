import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    textField: {
        // marginLeft: theme.spacing.unit,
        // marginRight: theme.spacing.unit,
        width: 500,
    }
});

class UploadTitle extends Component {
    render() {
        const { classes } = this.props;
        return(
            <TextField
                name="title"
                id="multiline-static"
                label="Title"
                placeholder="What was this lecture called?"
                multiline
                rows="2"
                value={this.props.title}
                onChange={this.props.handleChange}
                className={classes.textField}
                margin="normal"
            />
        )
    }
}

UploadTitle.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UploadTitle);

