import React, { Component } from 'react';
import {Doughnut} from 'react-chartjs-2';

class CardGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pos: 0,
            neg: 0,
            neut: 0
        }
    }
    componentDidMount() {
        fetch(`http://e91e45b4.ngrok.io/video/${this.props.id}`)
            .then(result => result.json())
            .then(json => this.setState({
                pos: json.positivityScore.positive,
                neg: json.positivityScore.positive,
                neut: json.positivityScore.neutral
            }))
    }
    render() {
        const styles = {
            div: {
                marginLeft: 10
            }

        };
        return(
            <div style={styles.div}>
            <Doughnut
                data={{
                    datasets: [{
                        data: [this.state.pos, this.state.neg, this.state.neut],
                        backgroundColor: ['#f1c40f', '#2c3e50', '#ecf0f1']
                    }],
                    labels: [
                        'Positivity',
                        'Negativity',
                        'Neutral'
                    ]
                }}

            />
            </div>
        )
    }
}

export default CardGraph;