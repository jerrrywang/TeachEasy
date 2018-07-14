import React, { Component } from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

class CardTitle extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const styles = {
            line: {
                marginTop: 20
            },
            title: {
                textAlign: 'center',
                fontFamily: 'Roboto',
                fontWeight: 700,
                fontSize: 30
            }
        };
        return (
                <CardContent>
                    <Typography style={styles.title} variant="headline" component="h1">
                        {this.props.title}
                    </Typography>
                    <hr style={styles.line} />
                </CardContent>
        )
    }
}

export default CardTitle;
