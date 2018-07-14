import React, { Component } from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

class CardDesc extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const styles = {
            descProper: {
                marginTop: 10
            },
            desc: {
                fontFamily: 'Lora',
                fontSize: 20,
                marginTop: 30
            }
        };
        return (
            <CardContent style={styles.descProper}>
                <hr />
                <Typography style={styles.desc} variant="headline" component="p">
                    {this.props.desc}
                </Typography>
            </CardContent>
        )
    }
}

export default CardDesc;