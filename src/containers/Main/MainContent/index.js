
import React from 'react';
import { View, Text, Image, ScrollView, FlatList, StyleSheet, Dimensions } from 'react-native';

const wWidth = Dimensions.get('window').width;

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


  /** 渲染Item */
  _renderItem = ({item, index, separators}) => (
    <View style={styles.itemContent}>
      <Image style={styles.image} source={{uri: item.image}}/>
      <View style={styles.textContent}>
        <Text style={styles.titleText} numberOfLines={2}>{item.title}</Text>
        <View style={styles.bottomContent}>
          <Text style={styles.timeText}>{item.time}</Text>
          {
            !!item.tip && <Text style={styles.tipText}>{item.tip}</Text>
          } 
        </View>
      </View>
    </View>
  )

  _renderItemContent = () => (
    <View style={styles.itemContent}>
      <Image style={styles.image} source={{ uri: item.image }} />
      <View style={styles.textContent}>
        <Text style={styles.titleText} numberOfLines={2}>{item.title}</Text>
        <View style={styles.bottomContent}>
          <Text style={styles.timeText}>{item.time}</Text>
          {
            !!item.tip && <Text style={styles.tipText}>{item.tip}</Text>
          }
        </View>
      </View>
    </View>
  )

  _renderItemRecommend = () => {

  }

  _renderItemTopic = () => {

  }

  _keyExtractor = (item, index) => `default_${index}_${item.title}`;

  render() {
    const tabsArray = [
      '推荐', '新闻', '专题', '走进三门',
      '图集', '看电视', '读报纸', '听广播', '时代楷模'
    ]; 
    const contentArray = [
      { title: '习近平的改革之"道"', time: '2018-12-08 10:26', tip: '掌上宣讲所', image: 'http://f.hiphotos.baidu.com/zhidao/pic/item/c75c10385343fbf2d77d69d5b47eca8064388ff7.jpg' },
      { title: '以论坛搭台 促普外科发展', time: '2018-12-08 10:47', tip: '掌上宣讲所', image: 'http://f.hiphotos.baidu.com/zhidao/pic/item/c75c10385343fbf2d77d69d5b47eca8064388ff7.jpg' },
      { title: '美丽三门.农林业全省摄影大赛获奖名单xxxx', time: '2018-12-08 10:24', tip: '掌上宣讲所', image: 'http://f.hiphotos.baidu.com/zhidao/pic/item/c75c10385343fbf2d77d69d5b47eca8064388ff7.jpg' },
      { title: '美丽三门.农林业全省摄影大赛获奖名单xxxx', time: '2018-12-08 10:24', tip: '掌上宣讲所', image: 'http://f.hiphotos.baidu.com/zhidao/pic/item/c75c10385343fbf2d77d69d5b47eca8064388ff7.jpg' },
      { title: '美丽三门.农林业全省摄影大赛获奖名单xxxxxxxsxxxxxxx', time: '2018-12-08 10:24', tip: '掌上宣讲所', image: 'http://f.hiphotos.baidu.com/zhidao/pic/item/c75c10385343fbf2d77d69d5b47eca8064388ff7.jpg' },
      { title: '美丽三门.农林业全省摄影大赛获奖名单xxxxx', time: '2018-12-08 10:24', tip: '掌上宣讲所', image: 'http://f.hiphotos.baidu.com/zhidao/pic/item/c75c10385343fbf2d77d69d5b47eca8064388ff7.jpg' },
      { title: '美丽三门.农林业全省摄影大赛获奖名单xxxxx', time: '2018-12-08 10:24', tip: '掌上宣讲所', image: 'http://f.hiphotos.baidu.com/zhidao/pic/item/c75c10385343fbf2d77d69d5b47eca8064388ff7.jpg' },
      { title: '美丽三门.农林业全省摄影大赛获奖名单xxxxxx', time: '2018-12-08 10:24', tip: '掌上宣讲所', image: 'http://f.hiphotos.baidu.com/zhidao/pic/item/c75c10385343fbf2d77d69d5b47eca8064388ff7.jpg' }
    ];
    return (
      <View style={styles.container}> 
        <ScrollView style={styles.tabScroll} horizontal={true}
          showsHorizontalScrollIndicator={false}
          >
          {
            tabsArray.map(item => ( 
              <Text key={`${item}`}style={styles.tabText}>{item}</Text>
            ))
          }
        </ScrollView>
        <FlatList style={styles.contentList}
          contentContainerStyle={{ paddingTop: 0, paddingBottom: 0 }}
          data={contentArray}
          // extraData={null}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          ItemSeparatorComponent={({ highlighted }) => (
            <View style={[styles.separator, highlighted && { marginLeft: 0 }]} />
          )}
          ListEmptyComponent={null}
          initialNumToRender={8}
          getItemLayout={(data, index) => (
            { length: ITEM_HEIGHT + SEPERATOR_HEIGHT, offset: (ITEM_HEIGHT + SEPERATOR_HEIGHT) * index, index }
          )}
          initialScrollIndex={0}
          refreshing={true}
          onRefresh={()=> {}}
          removeClippedSubviews
        />
      </View>
    );
  }
}

const ITEM_HEIGHT = 120;
const SEPERATOR_HEIGHT = StyleSheet.hairlineWidth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center'
  },
  tabScroll: {
    width: wWidth,
    height: 46,
  },
  tabText: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 20,
    color: '#3c3c3c'
  },
  activeTabText: {
    fontSize: 24,
    color: '#2a5caa'
  },

  contentList: {
    width: wWidth
  },
  separator: {
    height: SEPERATOR_HEIGHT,
    alignSelf: 'stretch',
    backgroundColor: '#e0e0e0'
  },
  itemContent: {
    backgroundColor: 'yellow',
    // flex: 1,
    flexDirection: 'row',
    height: ITEM_HEIGHT,
    width: wWidth,
    paddingHorizontal: 10,
    paddingVertical: 15
  },
  image: {
    width: 100,
    height: 90
  },
  textContent: {
    flex: 1,
    marginLeft: 10,
    flexDirection: 'column'
  },
  titleText: {
    flex: 1,
    fontSize: 20
  },
  bottomContent: {    
    flexDirection: 'row'
  },
  timeText: {
    flex: 1,
    fontSize: 12,
    color: 'grey'
  },
  tipText: {
    alignSelf: 'flex-end',
    fontSize: 10,
    color: 'red'
  }
});

export default MainContent;