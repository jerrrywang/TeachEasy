import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    button: {
        // margin: theme.spacing.unit,
    },
    input: {
        display: 'none'
    }
});

class FileButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: 'Choose a lecture to analyze!'
        }
    }
    last(string) {
        const arr = string.split('\\');
        return arr[arr.length - 1];
    };

    giveName(e) {
        this.setState({file: this.last(e.target.value)})
    };

    render() {
        const { classes } = this.props;
        return (
            <div style={{marginTop: 50}}>
                <input
                    name="avatar"
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                    style={styles.input}
                    onChange={(e) => this.giveName(e)}
                />
                <label htmlFor="contained-button-file">
                    <Button variant="contained" component="span" className={classes.button}>
                        {this.state.file}
                    </Button>
                </label>
            </div>
        );
    }
}

FileButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FileButton);
