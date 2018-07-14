import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    textField: {
        // marginLeft: theme.spacing.unit,
        // marginRight: theme.spacing.unit,
        width: 500,
    }
});

class UploadDescription extends Component {
    render() {
        const { classes } = this.props;
        return(
            <TextField
                name="description"
                id="multiline-static"
                label="Description"
                multiline
                placeholder="What was the subject of this lecture? Any additional details?"
                rows="5"
                value={this.props.description}
                onChange={this.props.handleChange}
                className={classes.textField}
                margin="normal"
            />
        )
    }
}

UploadDescription.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UploadDescription);
