import React from 'react';
import { TouchableNativeFeedback, StyleSheet, Text, View, Button } from 'react-native';

export default class CountDownItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      flexProgress: 0,
      flexTotal: 1,
      remaining: 0,
      showDelete: false
    };
    this.handleInterval = this.handleInterval.bind(this);
    this.handleItemTap = this.handleItemTap.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    this.intervalId = setInterval(this.handleInterval, 100);
  }



  componentDidMount() {
    this.handleInterval();
  }
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  handleInterval() {
    const timer = this.props.timer;
    const progress = Math.min(1, (Date.now() - timer.start) / (timer.end - timer.start));
    const total = 1 - progress;

    var remaining = Date.parse(timer.end) - Date.now();
    this.setState({
      flexProgress: progress,
      flexTotal: total,
      remaining: remaining
    });


  }

  formatDate(timestamp) {
    const sec_num = Math.floor(parseInt(timestamp, 10) / 1000);
    const month = Math.floor(sec_num / (3600 * 24 * 31));
    const days = Math.floor(sec_num / (3600 * 24));
    const hours = Math.floor(sec_num / 3600) % 24;
    const minutes = Math.floor(sec_num / 60) % 60;
    const seconds = sec_num % 60;
    //const decisecond = Math.floor(parseInt(timestamp, 10) / 10) % 60;

    const values = [
      { value: month, name: " mois " },
      { value: days, name: " jours " },
      { value: hours, name: " heures " },
      { value: minutes, name: " minutes " },
      { value: seconds, name: " secondes" },
    ]
    /*
      .map(v => v.value < 10 ? "0" + v.value : v)
      .filter((v,i) => (v.value !== "00" )|| i > 0)
      //.map(v=> v.value !== NaN && v.name !== undefined ? v.value+v.name: "");
*/
    return values;

  }

  handleItemTap() {
    this.setState({
      showDelete: !this.state.showDelete
    });
  }

  handleDelete() {
    this.props.onDeleteTimer(this.props.timer);
  }

  renderDeleteButton() {
    if (this.state.showDelete) {
      return (
        <View >
          <Button
            style={{color:'#ff0000'}}
            title="delete"
            onPress={this.handleDelete}
          />
        </View>
      )
    } else {
      return null;
    }
  }

  render() {
    return (
      <TouchableNativeFeedback
        onPress={this.handleItemTap}
        background={TouchableNativeFeedback.SelectableBackground()}>
        <View style={styles.container}>
          <View>
            <View style={styles.titleContainer}>
              <Text style={styles.label}>{this.props.timer.label}</Text>
            </View>

            <Text style={styles.startDate}>jusqu'au {this.props.timer.end.toLocaleString('fr-FR')}</Text>
            {/*<Text style={styles.startDate}>({this.formatDate(this.state.remaining)})</Text>*/}
            <Text style={styles.startDate}>reste {this.state.remaining<0?0:this.state.remaining}ms</Text>
            <View style={styles.progressContainer}>
              <View style={{
                flex: this.state.flexProgress,
                height: 8,
                backgroundColor: 'skyblue'
              }} />
              <View style={{
                flex: this.state.flexTotal,
                height: 8,
                backgroundColor: 'lightgrey'
              }} />
            </View>
          </View>
          {this.renderDeleteButton()}
        </View>
      </TouchableNativeFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginBottom: 16,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  label: {
    fontSize: 16,
  },
  startDate: {
    fontSize: 12,
    color: '#999',
    marginLeft: 8,
  },
  progressContainer: {
    flexDirection: 'row',
  },

});
