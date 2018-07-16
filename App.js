import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';

type Props = {};
export default class App extends Component<Props> {

  state = {
    items: [],
    refreshing: false,
  }

  initPage = 0;

  fetchRepositories(query='react', refreshing = false) {

    const newPage = refreshing ? true : this.initPage + 1;
    
    fetch(`https://api.github.com/search/repositories?q=${query}&page=${newPage}`)
      .then(response => response.json())
      .then(({items}) => {
        this.initPage = newPage;
        if (this.refreshing) {
          this.setState({items: items, refreshing : false});
        } else {
          // 以前のページの検索結果を連結
          this.setState({items: [...this.state.items, ...items], refreshing: false});
        }
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.fetchRepositories()}>
          <Text style={{marginTop: 20}}>fetch</Text>
        </TouchableOpacity>
        <FlatList 
          data={this.state.items}
          renderItem={({item}) => <Text style={{padding: 20}} >{item.name}</Text>}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={() => this.fetchRepositories()}
          onEndReachedThreshold={0.1}
          onRefresh={() => {this.fetchRepositories(true)}}
          refreshing={this.state.refreshing}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
