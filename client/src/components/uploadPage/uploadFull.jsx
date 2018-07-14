import React, { Component } from 'react';
import UploadButton from './uploadButton';
import UploadDescription from './uploadDescription';
import UploadTitle from './uploadTitle';
import FileButton from './chooseFile';
import DatePicker from './datePicker'

class UploadFull extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            date: ""
        }
    }
    handleTitleChange(e) {
        e.preventDefault();
        this.setState({title: e.target.value})
    }
    handleDescChange(e) {
        e.preventDefault();
        this.setState({description: e.target.value})
    }
    handleDateChange(e) {
        e.preventDefault();
        console.log(e.target.value);
        this.setState({date: e.target.value})
    }
    render() {
        const styles = {
            form: {
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between',
                alignItems: 'center'
            }
        }
        return (
            <form style={styles.form} autoComplete="off" method="post" encType="multipart/form-data" action="http://e91e45b4.ngrok.io">
                <UploadTitle
                        handleChange = {(e) => this.handleTitleChange(e)}
                        title={this.state.title}
                    />
                <UploadDescription handleChange={(e) => this.handleDescChange(e)}
                                   description={this.state.description}
                />
                <DatePicker handleChange={(e) => this.handleDateChange(e)}
                            date={this.state.date}/>
                <FileButton />
                <UploadButton />
            </form>
        )
    }
}

export default UploadFull;