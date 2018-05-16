import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  AsyncStorage,
  TouchableOpacity
} from 'react-native';

import Repo from './Repo';
import NewRepoModal from './NewRepoModal';
 
export class Repos extends Component {

  state = {
    modalVisible: false,
    repos: [ 
      { 
        id: 1,
        thumbnail: 'https://scontent.fgig4-1.fna.fbcdn.net/v/t1.0-1/p160x160/10991262_355261081327902_4953862547176122636_n.jpg?_nc_cat=0&_nc_eui2=AeGN67GSSx1OSgRnNJMyfw7Ej0RqESMw1Hn1_FdMchm1rJXHh3Rm46hE5kreMi8-tx8pQYfZyDHnj2daQFkcAKVZfI214RaBUQ9cvWzb2vTzQQ&oh=cbe73244805468221302d8b7ed50b169&oe=5B8B7D63',
        title: 'Meu repo #1',
        author: 'Thiago Lovatine'
      },
      {
        id: 2,
        thumbnail: 'https://scontent.fgig4-1.fna.fbcdn.net/v/t1.0-1/p160x160/10991262_355261081327902_4953862547176122636_n.jpg?_nc_cat=0&_nc_eui2=AeGN67GSSx1OSgRnNJMyfw7Ej0RqESMw1Hn1_FdMchm1rJXHh3Rm46hE5kreMi8-tx8pQYfZyDHnj2daQFkcAKVZfI214RaBUQ9cvWzb2vTzQQ&oh=cbe73244805468221302d8b7ed50b169&oe=5B8B7D63',
        title: 'Meu repo #2',
        author: 'Thiago Lovatine'
      }
    ]
  }; 

  async componentDidMount(){
    const repos = JSON.parse(await AsyncStorage.getItem('repositories')) || [];

    this.setState({ repos });
  }

  _addRepository = async (newRepoText) => {
    const repoCall = await fetch('https://api.github.com/repos/${newRepoText}');

    const response = await repoCall.json();

    console.log(response);

    const repository = {
      id: response.id,
      thumbnail: response.owner.avatar_url,
      title: response.name,
      author: response.owner.login
    }

    this.setState({
      modalVisible: false,
      repos: [
        ...this.state.repos,
        repository
      ]
    });

    await AsyncStorage.setItem('@MiniCurso:repositories', JSON.stringify(this.state.repos));
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
        <Text style={styles.headerText}>Minicurso React Native</Text>
        <TouchableOpacity onPress={() => this.setState({modalVisible: true}) }>
          <Text style={styles.btnRepo}>+</Text>
        </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.repoList}>
          { this.state.repos.map(repo =>  <Repo data={repo} key={repo.id} /> )}
        </ScrollView>

        <NewRepoModal 
          onAdd={this._addRepository} 
          onCancel={() => this.setState({modalVisible : false})} 
          visible={this.state.modalVisible} 
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
  },
  header : {
    height: (Platform.OS === 'ios') ? 70 : 50,
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  repoList: {
    padding: 20
  },
  btnRepo :{
    fontSize: 24,
    fontWeight: 'bold'
  }
});
