import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

import Card from '@material-ui/core/Card';
import CardTitle from './cardTitle';
import CardDesc from './cardDesc';
import CardScore from './cardScore';
import CardGraph from './cardGraph';

const styles = {
    card: {
        maxWidth: 345,
        maxHeight: 530
    },
};
class CardOne extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0
        }
    };

    handleClick(path) {
        console.log(this.props);
        this.props.history.push(
            {
            pathname: path,
            state: {id: this.props.video.kid,
                    score: this.state.score}
        }
        )
    }
    render() {
    const { classes } = this.props;
    const styles = {
        title: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        },
        button: {
            marginLeft: 15,
            marginRight: 80
        }
    };
    return (
        <div>
            <Card className={classes.card}>
                <CardTitle style = {styles.title} title={this.props.video.title}/>
                <CardGraph id={this.props.video.kid}/>
                <CardDesc desc={this.props.video.description}/>


                <CardActions style={{
                    flexGrow: 1
                }}>
                    <Button style={styles.button}
                            variant="contained"
                            color="primary"
                            onClick={() => this.handleClick('/insights')} >
                        More insights!
                    </Button>
                    <CardScore
                               style={styles.score}
                               id={this.props.video.kid}/>
                </CardActions>
            </Card>
        </div>
    );
}

}

CardOne.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardOne);