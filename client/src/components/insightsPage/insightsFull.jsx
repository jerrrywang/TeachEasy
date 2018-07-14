import React, { Component } from 'react';
import MainGraph from './mainGraph';
import ScoreLineGraph from './scoreLineGraph';
import EmotionLineGraph from './emotionLineGraph';
import EmotionRadar from './emotionRadar';
import Score from './score';
import Grid from '@material-ui/core/Grid';

class InsightsFull extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        console.log(this.props)
    }
    render() {
        const styles = {
            div: {
                flexGrow: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly'
            },
            itemTop: {
                display: 'flex',
                alignContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                flexWrap: 'nowrap',
                justifyContent: 'center',
                marginTop: 50,
                marginBottom: 50
            },
            item: {
                display: 'flex',
                alignContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                flexWrap: 'nowrap',
                justifyContent: 'center',
                marginBottom: 100
            }
        }
        return (
            <Grid container>
                <Grid style={styles.itemTop} item sm={12} md={12} lg={12}>
                        <Score id={this.props.location.state.id} />
                </Grid>
                <Grid style={styles.item} item sm={12} md={12} lg={12}>
                        <EmotionRadar id={this.props.location.state.id}/>
                </Grid>
                <Grid style={styles.item} item sm={12} md={12} lg={12}>
                        <MainGraph id={this.props.location.state.id}/>
                </Grid>
                <Grid style={styles.item} item sm={12} md={12} lg={12}>
                        <ScoreLineGraph id={this.props.location.state.id}/>
                </Grid>
                <Grid style={styles.item} item sm={12} md={12} lg={12}>
                        <EmotionLineGraph id={this.props.location.state.id}/>
                </Grid>
            </Grid>
        )
    }
}

export default InsightsFull;