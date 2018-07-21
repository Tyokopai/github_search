import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
  AppState,
} from 'react-native';

type Props = {};
export default class App extends React.Component<Props> {

  state = {
    items: [],
    refreshing: false,
    text: '',
  }

  initPage = 0;

  fetchRepositories(refreshing = false) {

    const newPage = refreshing ? true : this.initPage + 1;

    fetch(`https://api.github.com/search/repositories?q=${this.state.text}&page=${newPage}`)
      .then(response => response.json())
      .then(({ items }) => {
        this.initPage = newPage;
        if (refreshing) {
          this.setState({ items: items, refreshing: false });
        } else {
          // 以前のページの検索結果を連結
          this.setState({ items: [...this.state.items, ...items], refreshing: false });
        }
      });
  }

  navigationDetail(item) {
    this.props.navigation.navigate('Detail', { item });
  }

  componentDidMount() {
    AppState.addEventListener('change', this.onChangeState);
  }

  componentWillMount() {
    AppState.removeEventListener('change', this.onChangeState);
  }

  // thisを束縛するためにアロー関数を使用
  onChangeState = (appState) => {
    if (appState === 'active') {
      this.fetchRepositories(true);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputWrapper}>
          <TextInput style={styles.input} onChangeText={(text) => this.setState({ text })} />
          <TouchableOpacity onPress={() => this.fetchRepositories(true)}>
            <Text style={styles.searchButton}>Search</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={this.state.items}
          renderItem={({ item }) =>
            <TouchableOpacity style={{ padding: 10 }} onPress={() => this.navigationDetail(item)}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }} >{item.name}</Text>
              <View style={styles.userBlock}>
                <Image style={styles.ownerIcon} source={{ uri: item.owner.avatar_url }} />
                <Text style={styles.ownerName}>{item.owner.login}</Text>
              </View>
            </TouchableOpacity>
          }
          keyExtractor={(item) => item.id.toString()}
          onEndReached={() => this.fetchRepositories()}
          onEndReachedThreshold={0.1}
          onRefresh={() => { this.fetchRepositories(true) }}
          refreshing={this.state.refreshing}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  inputWrapper: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: '#eeeeee',
    borderRadius: 4,
  },
  searchButton: {
    padding: 10,
    marginLeft: 6,
    backgroundColor: '#2796dd',
  },
  ownerIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 5,
  },
  ownerName: {
    fontSize: 14,
  },
  userBlock: {
    flexDirection: 'row',
  },
});
