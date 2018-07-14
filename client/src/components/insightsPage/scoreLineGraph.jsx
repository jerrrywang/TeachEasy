import React, { Component } from 'react';
import { Scatter } from 'react-chartjs-2';


class ScoreLineGraph extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
        }
    }

    componentDidMount(){
        fetch(`http://e91e45b4.ngrok.io/videoscores/${this.props.id}`, { //CHANGE THIS TO NGROK LINK
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "app_id": "2f35f886",
                "app_key": "e026f72801a50407fe178a5140d4b611"
            }
        }).then((response) => {
            return response.json();
        }).then((analytics) => {
            let coords = analytics.timedScore.map((point) => {
                return {x: point.timeStamp/1000, y: Math.round(point.score*100)/100}
            });
            this.setState({data: coords});
        }).catch((err) => {console.log('An error occurred while getting score data: ' + err)})
    }

    render(){
        return(
            <div style={{height: '300px', width: '800px'}}>
                <Scatter
                    width={80}
                    height={300}
                    data={{datasets: [{
                            data: this.state.data,
                            label: 'Score',
                            backgroundColor: 'rgba(131, 153, 219, 0.6)',
                            pointBackgroundColor: '#8399db',
                            pointBorderColor: '#8399db',
                            pointHoverBackgroundColor: '#4b72e5',
                            spanGaps: true,
                        }]
                    }}
                    options={{
                        title: {
                            display: true,
                            text: 'Score Distribution',
                            fontSize: 25
                        },
                        legend: {
                            display: true,
                            text: 'Time',
                            position: 'left',
                            labels: {
                                boxWidth: 0
                            }
                        },
                        animation: {
                            easing: 'easeInOutElastic',
                            duration: 1000,
                        },
                        showLines: true,
                        maintainAspectRatio: false,
                        hoverMode: "nearest",
                    }}

                />
                Time (Seconds)
            </div>
        )
    }
}

export default ScoreLineGraph;