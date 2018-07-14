import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = {
    score: {
        fontFamily: 'Roboto',
        fontWeight: 700,
        fontSize: 80,
        textAlign: 'center'
    },
    top: {
        fontFamily: 'Roboto',
        fontWeight: 700,
        fontSize: 30,
        textAlign: 'center'
    },
    desc: {
        fontFamily: 'Lora',
        fontSize: 20
    },
    card: {
        maxWidth: 800,
        maxHeight: 500
    },
    line: {
        marginTop: -8,
        marginBottom: 4
    }
};

class Score extends Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0
        }
    }
    check(score) {
        if(score > 60) {
            return "You're an amazing lecturer!"
        }
        else if (score > 50) {
            return "Great Work! But there's still a little room for improvement."
        }
        else if (score > 45) {
            return "Nothing special here. Just your generic lecture."
        }
        else if (score > 40) {
            return "Not a great lecture. You need to step up your game."
        }
        else {
            return "Zzz... You are a terrible lecturer."
        }
    };
    componentDidMount() {
        fetch(`http://e91e45b4.ngrok.io/videoscores/${this.props.id}`)
            .then(result => result.json())
            .then(json => this.setState({score: Math.round(json.aggScore)}))
    }
    render() {
        const { classes } = this.props;
        return(
        <Card style={styles.card} className={classes.card}>
            <CardContent>
                <Typography style={styles.top} variant="headline" component="h1">
                    Score
                </Typography>


                <Typography style={styles.score} variant="headline" component="h1">
                    {this.state.score}
                    <hr style={styles.line}/>
                </Typography>
                <Typography style={styles.desc} component="p">
                    {this.check(this.state.score)}
                </Typography>

            </CardContent>
        </Card>
        )
    }
}
Score.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Score);