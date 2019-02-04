import React from 'react';
import { StyleSheet, View, ScrollView, Button } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import CountDownList from './countdownlist';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    const now = new Date();
    const inTwoMinutes = new Date();
		inTwoMinutes.setMinutes(inTwoMinutes.getMinutes() + 2);
    this.state = {
			timers: [
				{
					label: 'Forum PI',
					start: new Date('2018-09-10'),
					end: new Date('2019-03-01'),
        },
        {
					label: 'Dans 2 minutes',
					start: now,
					end: inTwoMinutes,
				}

			],
		};

		this.handleNewTimer = this.handleNewTimer.bind(this);
		this.handleDeleteTimer = this.handleDeleteTimer.bind(this);

  }

  static navigationOptions = {
    title: 'Count Down',
  };

  handleNewTimer(timer) {
		const timerIndex = this.state.timers.findIndex(existingTimer => existingTimer.label === timer.label);

		if (timerIndex === -1) {
			const timers = Array.from(this.state.timers);
			timers.push(timer);
			this.setState({
				timers: timers,
			});
    }
  }
  
  handleDeleteTimer(timer)
  {
    const timerIndex = this.state.timers.findIndex(existingTimer => existingTimer.label === timer.label);
    const timers = Array.from(this.state.timers);
    timers.splice(timerIndex,1)
    this.setState({
      timers: timers,
    });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <CountDownList timerslist={this.state.timers} onDeleteTimer={this.handleDeleteTimer}/>
        <View style={styles.buttonContainer}>
        <Button
          style 
          title="Ajouter"
          onPress={() => this.props.navigation.navigate('Add',{
            onNewTimer:this.handleNewTimer
          })}
        /></View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  buttonContainer:{
    flex: 1,
    justifyContent: 'center',
  }
});
