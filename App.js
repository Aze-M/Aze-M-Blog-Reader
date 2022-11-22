import { StatusBar } from 'expo-status-bar';
import { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, ViewBase, Button } from 'react-native';

const blogPost = {
  title: 'Wow, I am a Test!',
  content: 'This is so cool wow, all the cool stuff like this can be read.',
  date: '2022-11-22'
}

const postStyle = StyleSheet.create({
  container: {
    color: 'white',
  },
  title: {
    height: 48,
    fontSize: 42,
    color: 'white',
    backgroundColor: '#5C1868'
  },
  content: {
    fontSize: 30,
    color: 'white',
    backgroundColor: '#1A1A1A'
  },
  date: {
    textAlign: 'right',
    fontSize: 24,
    height: 48,
    color: 'white',
    backgroundColor: '#404040'
  }
})

class Post extends Component {

  render() {
    return (
      <View style={postStyle.container}>
        <Text style={postStyle.title}>
          {this.props.title}
        </Text>
        <View>
          <Text style={postStyle.content}>
            {this.props.content}
          </Text>
        </View>
        <Text style={postStyle.date}>
          {this.props.date}
        </Text>
      </View>
    )
  }
}

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headText}>Aze-M Blog Reader</Text>
      </View>
      <ScrollView style={styles.body}>
        <Post title={blogPost.title} content={blogPost.content} date={blogPost.date}></Post>
      </ScrollView>
      <View style={styles.footer}>
        <Button title="Refresh" color={'#5C1868'}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 100,
    marginBottom: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  body: {
    flex: 1,
    backgroundColor: '#4a4a4a',
  },
  footer: {
    height: 80,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  baseText: {
    fontSize: 32,
    marginVertical: 16,
    textAlign: 'center',
  },
  headText: {
    fontSize: 48,
  }
});
