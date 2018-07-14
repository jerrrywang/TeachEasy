import React, { Component } from 'react';
import CardOne from './cardOne';

class CardAll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            all: []
        }
    }
    componentDidMount() {
        fetch('http://e91e45b4.ngrok.io/videos/all')
            .then(result => result.json())
            .then(json => this.setState({all: json}))
    };
    render () {
        const styles = {
            div: {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                height: '90vh'
            },
            card: {

            }
        };
        return (
            <div style={styles.div}>
                {this.state.all.map(video => {
                    console.log(video);
                    return <CardOne history={this.props.history} video={video} />
                })
                }
            </div>
        )
    }
}

export default CardAll;