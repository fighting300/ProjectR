
import React from "react";
import { View, Text, Image, ScrollView, FlatList, StyleSheet, Dimensions } from "react-native";

const wWidth = Dimensions.get("window").width;

class MainContent extends React.Component {
  static navigationOptions = {
    title: '掌上三门',
    headerStyle: {
      backgroundColor: '#2a5caa',

    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontSize: 24,
      fontWeight: 'normal',
    },
    headerLeft: <Text>Account</Text>,
    headerRight: <Text>Search</Text>,
    headerLeftContainerStyle: null,
    headerRightContainerStyle: null
  };

  _keyExtractor = (item, index) => item.title;

  /** 渲染Item */
  _renderItem = (item, separators) => {
    <View style={styles.itemContent}>
      <Image style={styles.image} source={{uri: item.image}}/>
      <View>
        <Text>{item.title}</Text>
        <Text>{item.time}</Text>
        {
          !!item.tip && <Text>{item.tip}</Text>
        } 
      </View>
    </View>
  }

  render() {
    const tabsArray = [
      "推荐", "新闻", "专题", "走进三门",
      "图集", "看电视", "读报纸", "听广播", "时代楷模"
    ]; 
    const contentArray = [
      { title: '习近平的改革之"道"', time: '2018-12-08 10:26', tip: '掌上宣讲所', image: '' },
      { title: '以论坛搭台 促普外科发展', time: '2018-12-08 10:47', tip: '掌上宣讲所', image: '' },
      { title: '美丽三门.农林业全省摄影大赛获奖名单', time: '2018-12-08 10:24', tip: '掌上宣讲所', image: '' }
    ];
    return (
      <View style={styles.container}> 
        <ScrollView style={styles.tabScroll} horizontal={true}>
          {
            tabsArray.map(item => ( 
              <Text key={`${item}`}style={styles.tabText}>{item}</Text>
            ))
          }
        </ScrollView>
        <FlatList style={styles.contentList}
          data={contentArray}
          extraData={null}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: "center", 
    justifyContent: "center"
  },
  tabScroll: {
    width: wWidth,
    height: 60,
    backgroundColor: 'red'
  },
  
  tabText: {
    marginLeft: 1,
    padding: 10,
    fontSize: 20,
    color: '#3c3c3c'
  },
  activeTabText: {
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 20,
    color: '#2a5caa'
  },

  contentList: {
    backgroundColor: 'yellow',
    paddingVertical: 20,
    paddingHorizontal: 12,
    width: Dimensions.get('window').width
  },
  itemContent: {
    height: 120,
    paddingLeft: 10,
    paddingRight: 15,
    backgroundColor: 'red'
  },
  image: {
    width: 100,
    height: 80,
    paddingLeft: 10

  }
});

export default MainContent;