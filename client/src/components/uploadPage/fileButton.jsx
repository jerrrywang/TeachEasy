import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';

const styles = theme => ({
button: {
  margin: theme.spacing.unit,
}
});

function FileButton(props) {
const { classes } = props;

return (
    <div>
        <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            multiple
            type="file"
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" component="span" className={classes.button}>
              Choose a lecture to analyze!
            </Button>
          </label>
    </div>
);
}

FileButton.propTypes = {
classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FileButton);

{/*<div>*/}
    {/*<Button variant="fab" color="primary" aria-label="add" className={classes.button}>*/}
        {/*<input type="file"/>*/}
    {/*</Button>*/}
{/*</div>*/}