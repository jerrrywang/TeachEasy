import React, { Component } from 'react';
import { Radar } from 'react-chartjs-2';


class EmotionRadar extends Component{
    constructor(props){
        super(props);
        this.state = {
            fetched: false,
            chartData: {
                labels: ['Anger', 'Disgust', 'Fear', 'Joy', 'Sadness', 'Surprise'],
                datasets: [{
                    data: [0, 1, 0, 0, 5, 0],
                    label: 'Score',
                    backgroundColor: 'rgba(255, 99, 132, 0.6)',
                    borderColor: 'rgba(255, 99, 132, 0.8)',
                    pointBorderColor: 'rgba(255, 99, 132, 0.8)',
                }]
            }
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
        }).then((response) => {
            return response.json();
        }).then((analytics) => {
            let newData = Object.values(analytics.averageEmotion);
            newData = newData.map((num) => Math.round(num));
            let newSet = [...this.state.chartData.datasets];
            newSet[0].data = newData;
            let newChartData = Object.assign({datasets: newSet}, this.state.chartData);
            this.setState({chartData: newChartData});
        }).catch(err => {console.log('Error occurred when fetching data: ' + err)})
    }

    render(){
        return (
            <div style={{height: '500px', width: '800px'}}>
                <Radar
                    data={this.state.chartData}
                    width={800}
                    height={500}
                    options={{
                        title: {
                            display: true,
                            text: 'Average Emotion Levels',
                            fontSize: 25
                        },
                        legend: {
                            display: false,

                        },
                        animation: {
                            duration: 5000,

                        },
                        maintainAspectRatio: false
                    }}
                />
            </div>
        )
    }
}

export default EmotionRadar;