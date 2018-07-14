import React, { Component } from 'react';
import { Scatter } from 'react-chartjs-2';

class EmotionLineGraph extends Component{
    constructor(props){
        super(props);
        this.state = {
            angerData: [],
            disgustData: [],
            fearData: [],
            joyData: [],
            sadnessData: [],
            surpriseData: [],
        }
    }

    componentDidMount(){
        fetch(`http://e91e45b4.ngrok.io/video/${this.props.id}`, { //CHANGE THIS TO NGROK LINK
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "app_id": "2f35f886",
                "app_key": "e026f72801a50407fe178a5140d4b611"
            }
        }).then((response) => response.json()
        ).then((analytics) => {
            console.log(analytics);
            let angerCoords = analytics.frames.map((frame) => {
                return {x: frame.timeStamp/1000, y: Math.round(frame.emotions.anger*100)/100}
            });
            let disgustCoords = analytics.frames.map((frame) => {
                return {x: frame.timeStamp/1000, y: Math.round(frame.emotions.disgust*100)/100}
            });
            let fearCoords = analytics.frames.map((frame) => {
                return {x: frame.timeStamp/1000, y: Math.round(frame.emotions.fear*100)/100}
            });
            let joyCoords = analytics.frames.map((frame) => {
                return {x: frame.timeStamp/1000, y: Math.round(frame.emotions.joy*100)/100}
            });
            let sadnessCoords = analytics.frames.map((frame) => {
                return {x: frame.timeStamp/1000, y: Math.round(frame.emotions.sadness*100)/100}
            });
            let surpriseCoords = analytics.frames.map((frame) => {
                return {x: frame.timeStamp/1000, y: Math.round(frame.emotions.surprise*100)/100}
            });
            this.setState({
                angerData: angerCoords,
                disgustData: disgustCoords,
                fearData: fearCoords,
                joyData: joyCoords,
                sadnessData: sadnessCoords,
                surpriseData: surpriseCoords});
        }).catch((err) => {console.log('An error occurred while getting emotion data: ' + err)})
    }

    render(){
        return(
            <div style={{height: '300px', width: '800px'}}>
                <Scatter
                    width={80}
                    height={300}
                    data={{datasets: [{
                            data: this.state.angerData,
                            label: 'Anger Level',
                            backgroundColor: 'rgba(131, 153, 219, 0)',
                            pointBackgroundColor: '#0241fc',
                            pointBorderColor: '#0241fc',
                            borderColor: '#0241fc',
                            borderWidth: 1,
                            pointRadius: 2,
                            spanGaps: true,
                        },
                            {
                                data: this.state.disgustData,
                                label: 'Disgust Level',
                                backgroundColor: 'rgba(131, 153, 219, 0)',
                                pointBackgroundColor: '#fc01c5',
                                pointBorderColor: '#fc01c5',
                                borderColor: '#fc01c5',
                                borderWidth: 1,
                                pointRadius: 2,
                                spanGaps: true,
                            },
                            {
                                data: this.state.fearData,
                                label: 'Fear Level',
                                backgroundColor: 'rgba(131, 153, 219, 0)',
                                pointBackgroundColor: '#00fc7a',
                                pointBorderColor: '#00fc7a',
                                borderColor: '#00fc7a',
                                borderWidth: 1,
                                pointRadius: 2,
                                spanGaps: true,
                            },
                            {
                                data: this.state.joyData,
                                label: 'Joy Level',
                                backgroundColor: 'rgba(131, 153, 219, 0)',
                                pointBackgroundColor: '#fc5300',
                                pointBorderColor: '#fc5300',
                                borderColor: '#fc5300',
                                borderWidth: 1,
                                pointRadius: 2,
                                spanGaps: true,
                            },
                            {
                                data: this.state.sadnessData,
                                label: 'Sadness Level',
                                backgroundColor: 'rgba(131, 153, 219, 0)',
                                pointBackgroundColor: '#fcc100',
                                pointBorderColor: '#fcc100',
                                borderColor: '#fcc100',
                                borderWidth: 1,
                                pointRadius: 2,
                                spanGaps: true,
                            },
                            {
                                data: this.state.surpriseData,
                                label: 'Surprise Level',
                                backgroundColor: 'rgba(131, 153, 219, 0)',
                                pointBackgroundColor: '#8399db',
                                pointBorderColor: '#8399db',
                                borderColor: '#8399db',
                                borderWidth: 1,
                                pointRadius: 2,
                                spanGaps: true,
                            },
                        ]
                    }}
                    options={{
                        title: {
                            display: true,
                            text: 'Emotion Distribution',
                            fontSize: 25
                        },
                        legend: {
                            display: true,
                            text: 'Time',
                            position: 'left',
                            labels: {
                                boxWidth: 10
                            }
                        },
                        showLines: true,
                        maintainAspectRatio: false
                    }}
                />
                Time (Seconds)
            </div>
        )
    }
}

export default EmotionLineGraph;