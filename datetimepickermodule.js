import React, { Component } from 'react';
import { StyleSheet,Text, Button, View } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';

export default class DateTimePickerModule extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        displayDate: this.props.date,
        isDateTimePickerVisible: false,
    };

    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (date) => {
        this.props.onDatePicked(date);
        this.setState({displayDate:date});
        this._hideDateTimePicker();
    };

    render() {
        return(
        <View>
            <Button 
                title={this.props.title}
                style={styles.dateButton} 
                onPress={this._showDateTimePicker}/>
            <Text>{this.state.displayDate.toLocaleString('fr-FR')}</Text>
            <DateTimePicker
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this._handleDatePicked}
                onCancel={this._hideDateTimePicker}
                mode='datetime'
            />
        </View>)
    }
}

const styles = StyleSheet.create({
    dateButton: {
        color: 'white',
        borderWidth: 1,
        backgroundColor: 'blue',
        padding: 5,
    },
    innerButton:{
        color: 'white',
    }
});