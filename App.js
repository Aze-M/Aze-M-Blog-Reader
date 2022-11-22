import { StatusBar } from 'expo-status-bar';
import { Component, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, ViewBase, Button, Pressable } from 'react-native';

const mainCLR = '#5C1868';
const mainContentCLR = '#1A1A1A';
const neutralBgCLR = '#fff';
const neutralTextBgCLR = '#404040';
const mainTextCLR = 'black';
const postTextCLR = 'white';
let buttonBgCLR = '#5C1868';
let buttonBgCLRPressed = '#5D1969';

const postStyle = StyleSheet.create({
  container: {
    color: postTextCLR,
    marginVertical: 16,
  },
  title: {
    paddingLeft: 16,
    height: 48,
    fontSize: 36,
    color: postTextCLR,
    backgroundColor: mainCLR,
    overflow: 'hidden',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  content: {
    paddingLeft: 16,
    fontSize: 30,
    color: postTextCLR,
    backgroundColor: mainContentCLR
  },
  date: {
    paddingRight: 16,
    textAlign: 'right',
    fontSize: 24,
    height: 48,
    color: postTextCLR,
    backgroundColor: neutralTextBgCLR,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  }
})


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 100,
    marginBottom: 5,
    backgroundColor: neutralBgCLR,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  body: {
    flex: 1,
    backgroundColor: neutralBgCLR,
  },
  footer: {
    height: 80,
    backgroundColor: neutralBgCLR,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerButton: {
    height: 60,
    paddingHorizontal: 20,
    backgroundColor: buttonBgCLR,
    borderRadius: 10,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  baseText: {
    fontSize: 32,
    textAlign: 'center',
    color: mainTextCLR,
    white: {
      fontSize: 32,
      textAlign: 'center',
      color: postTextCLR,
    }
  },
  headText: {
    fontSize: 48,
    color: mainTextCLR,
  }
});

function parseHTMLtoEXPO(html) {
  const RGXbrp = /(<br|<p)[^>]*>./g
  const RGXAny = /<[^>]*>./g

  let step_1 = html.replace(RGXbrp, "\n")

  let step_2 = step_1.replace(RGXAny, "")


  return step_2
}

class PostContainer extends Component {

  componentDidMount() {
    this.props.gen()
  }

  render() {
    return (
      <ScrollView style={styles.body}>
        {this.props.posts}
      </ScrollView>
    )
  }
}


class Post extends Component {

  render() {
    return (
      <View style={postStyle.container}>
        <Text style={postStyle.title}>
          {this.props.title}
        </Text>
        <View>
          <Text style={postStyle.content}>
            {parseHTMLtoEXPO(this.props.content)}
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
  const [posts, setPosts] = useState([])

  function genNewPosts() {
    setPosts([])
    fetch('https://blg.aze-m.com/posts')
      .then((res) => {
        console.log(res)
        return res.json()
      }, () => { return new Error("Could not get Posts.") })
      .then((json) => {
        console.log(json)
        tmp = json.map((elem, idx) => {
          return <Post title={elem.title} content={elem.content} date={elem.date} key={idx} />
        })
        setPosts(tmp)
        console.log(posts);
      }, () => { return new Error("Could not generate Posts.") })
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headText}>Aze-M Blog Reader</Text>
      </View>
      <PostContainer gen={genNewPosts} posts={posts} />
      <View style={styles.footer}>
        <Pressable style={({pressed}) => [{backgroundColor: pressed ? buttonBgCLRPressed : buttonBgCLR},styles.footerButton]} onPress={() => genNewPosts()}><Text style={styles.baseText.white} color={postTextCLR}>Refresh</Text></Pressable>
      </View>
    </View>
  );
}
