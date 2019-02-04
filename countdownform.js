import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import DateTimePickerModule from './datetimepickermodule';

export default class CountDownForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			label: '',
			start: '',
			end: '',
		};

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
		const timer = {
			label: this.state.label,
			start: this.state.start,
			end: this.state.end,
		};
		console.log(timer);
		this.props.onNewTimer(timer);
		this.setState({
			label: '',
			start: '',
			end: '',
		});
	}
	render() {
		return (
			<View>
				<Text style={styles.title}>Ajouter un compte à rebours</Text>
				<Text>Libellé</Text>
				<TextInput
					style={styles.input}
					placeholder="Entrez le nom du compte à rebours"
					onChangeText={this.handleChangeLabel} />
				<View style={{ flexDirection: 'row' }}>
					<View style={{ flex: 1, marginRight: 4 }}>
						<DateTimePickerModule
							title="Date de début"
							onDatePicked={this.handleChangeStart}
							date={this.state.start}
						/>
					</View>
					<View style={{ flex: 1, marginLeft: 4 }}>
					<DateTimePickerModule
							title="Date de fin"
							onDatePicked={this.handleChangeEnd}
							date={this.state.start}
						/>
					</View>
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
		marginBottom: 8,
	}
});
