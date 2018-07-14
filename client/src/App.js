import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect
} from 'react-router-dom'
import './App.css';
import CardAll from './components/carouselPage/cardFull'
import UploadFinal from './components/uploadPage/uploadFinal';
import InsightsFull from './components/insightsPage/insightsFull'
import Menu from './components/default';



class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            test: ""
        }
    };

    render() {
        return (
            <Router>
                <div>
                    <Route path="/" component={Menu} />
                    <Route path="/upload" component={UploadFinal} />
                    <Route path="/history" component={CardAll} />
                    <Route path="/insights" component={InsightsFull}/>
                </div>
            </Router>
        );
    }
}

export default App;

