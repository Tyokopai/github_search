import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

type Props = {};
export default class App extends Component<Props> {

  onPressFetch() {
    fetch('https://api.github.com/search/repositories?q=react')
      .then(response => response.json())
      .then(response => console.log(response));
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.onPressFetch()}>
          <Text>fetch</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
