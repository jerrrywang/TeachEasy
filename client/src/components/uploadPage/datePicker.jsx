import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        // marginLeft: theme.spacing.unit,
        // marginRight: theme.spacing.unit,
        // marginTop: 50,
        // margin: "auto",
        width: 500,
        marginTop: 50
    },
});

class DatePicker extends Component {
    render() {
        const {classes} = this.props;

        return (
            <TextField
                name="date"
                id="date"
                label="Date of lecture"
                type="date"
                defaultValue="2017-07-13"
                className={classes.textField}
                onChange={this.props.handleChange}
                value={this.props.date}
                InputLabelProps={{
                    shrink: true,
                }}
            />
        );
    }
}

DatePicker.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DatePicker);