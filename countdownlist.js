import React from 'react';
import { StyleSheet, FlatList, Button, View } from 'react-native';
import CountDownItem from './countdownitem';

export default class CountDownList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.list}>
                <FlatList
                    data={this.props.timerslist}
                    keyExtractor={(item) => item.label}
                    renderItem={({ item }) => <CountDownItem timer={item} onDeleteTimer={this.props.onDeleteTimer} />}
                    // ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: '#eee' }} 
                    //}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    list: {
        borderColor: 'black',
        borderWidth: 1,
    },
});
