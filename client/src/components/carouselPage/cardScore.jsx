import React, { Component } from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

class CardScore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0
        }
    }
    componentDidMount() {
        fetch(`http://e91e45b4.ngrok.io/videoscores/${this.props.id}`)
            .then(result => result.json())
            .then(json => this.setState({score: Math.round(json.aggScore)}))
    }
    //
    render() {
        const styles = {
            score: {
                fontFamily: 'Roboto',
                fontWeight: 700,
                fontSize: 30
            }
        }
        return (
            <CardContent>
                <Typography style={styles.score} variant="headline" component="h2">
                    {this.state.score}
                </Typography>
            </CardContent>
        )
    }
}

export default CardScore;
