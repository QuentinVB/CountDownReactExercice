import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import DateTimePickerModule from './datetimepickermodule';

export default class AddScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            label: '',
            start: '',
            end: '',
        };
        const { navigation } = this.props;
        this.onNewTimer = navigation.getParam('onNewTimer');



        this.handleChangeLabel = this.handleChangeLabel.bind(this);
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }
    handleChangeLabel(text) {
        this.setState({ label: text });
    }

    handleChangeStart(date) {
        this.setState({ start: date.toString() });
    }

    handleChangeEnd(date) {
        this.setState({ end: date.toString() });
    }

    handleSave() {
        if (
            this.state.label && this.state.start && this.state.end && new Date(this.state.start) < new Date(this.state.end)) {
            const timer = {
                label: this.state.label,
                start: this.state.start,
                end: this.state.end,
            };
            this.onNewTimer(timer);

            this.setState({
                label: '',
                start: '',
                end: '',
            });

            this.props.navigation.navigate('Home')
        }
    }
    render() {
        return (
            <View style={{ flex: 2,
                
                justifyContent: 'flex-start',
               }}>
                <Text style={styles.title}>Ajouter un compte à rebours</Text>

                <View style={{ flex:1, flexDirection: 'row',  alignItems:'center',height: 50,}}>
                    <Text>Libellé</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Entrez le nom du compte à rebours"
                        onChangeText={this.handleChangeLabel} />
                </View>
                <View style={{ flex:1, flexDirection: 'row' , justifyContent: 'space-evenly', minHeight: 50}}>
                    <View style={styles.datePicker}>
                        <DateTimePickerModule
                            title="Date de début"
                            onDatePicked={this.handleChangeStart}
                            date={this.state.start}
                        />
                    </View>
                    <View>
                        <DateTimePickerModule
                            title="Date de fin"
                            onDatePicked={this.handleChangeEnd}
                            date={this.state.start}
                        /></View>
                </View>
                <Button
                    title="Ajouter"
                    onPress={this.handleSave} />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        marginTop: 24,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        margin: 2,
    },
    datePicker:{
        maxWidth:"45%",
    }

});

