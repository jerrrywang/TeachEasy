import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';


class MainGraph extends Component{
    constructor(props){
        super(props);
        this.state = {
            fetched: false,
            chartData: {
                labels: ['Anger', 'Disgust', 'Fear', 'Joy', 'Sadness', 'Surprise'],
                datasets: [{
                    data: [0, 1, 0, 0, 5, 0],
                    label: 'Score',
                    backgroundColor: [
                        'rgba(54, 162, 132, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)',
                        'rgba(255, 99, 132, 0.6)'],
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
            <div style={{height: '300px', width: '800px'}}>
                <Bar
                    data={this.state.chartData}
                    width={80}
                    height={300}
                    options={{
                        title: {
                            display: true,
                            text: 'Average Emotion Levels',
                            fontSize: 25
                        },
                        legend: {
                            display: true,
                            position: 'left',
                            labels: {
                                boxWidth: 0
                            }
                        },
                        animation: {
                            duration: 3000,
                        },
                        maintainAspectRatio: false
                    }}
                />
            </div>
        )
    }
}

export default MainGraph;