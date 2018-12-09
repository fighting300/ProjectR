
import React from 'react';
import { View, Text, Image, ScrollView, FlatList, StyleSheet, Dimensions } from 'react-native';
import { fetchGet } from '../../../utils/http';
import { APIS, APP } from '../../../constants/API';

const wWidth = Dimensions.get('window').width;

// 请求参数 '/GetIndexPage?pageNo=1 &appId=110108&appKey=d0006&projectId=3 &modilarId=113175&styleId=304' 
// 详情请求 '/GetContentDetail?contentId=1921829 &appId=110108&appKey=d0006&projectId=3'
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

  constructor(props) {
    super(props);
    this.state = {
      pageNo: 1,
      Focus: [],
      IndexContent: []
    }
  }

  componentWillMount() {
    const { pageNo } = this.state;
    const params = {
      pageNo,
      modilarId: 113175,
      styleId: 304,
      ...APP
    }
    console.log('request params', params);
    this.fetchContent(params);
  }

  fetchContent = (params) => {
    fetchGet({
      serviceType: APIS.DMain_Recommend,
      params,
      success: (response) => {
        const { Data } = response;
        if (!Data)  return;
        const { Focus, IndexContent } = Data;
        this.setState({
          Focus, IndexContent
        })
        console.log('response detail', Focus, IndexContent);
      }
    })
  }
  /** 渲染Item */
  _renderItem = ({item, index, separators}) => (
    <View style={styles.itemContent}>
      <Image style={styles.image} source={{ uri: item.ImgUrl}}/>
      <View style={styles.textContent}>
        <Text style={styles.titleText} numberOfLines={2}>{item.Title}</Text>
        <View style={styles.bottomContent}>
          <Text style={styles.timeText}>{item.IssueTime}</Text>
          {
            !!item.Tags && <Text style={styles.tipText}>{item.Tags}</Text>
          } 
        </View>
      </View>
    </View>
  )

  _renderItemContent = () => (
    <View style={styles.itemContent}>
      <Image style={styles.image} source={{ uri: item.ImgUrl }} />
      <View style={styles.textContent}>
        <Text style={styles.titleText} numberOfLines={2}>{item.Title}</Text>
        <View style={styles.bottomContent}>
          <Text style={styles.timeText}>{item.IssueTime}</Text>
          {
            !!item.Tags && <Text style={styles.tipText}>{item.Tags}</Text>
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
    const { Focus, IndexContent } = this.state;
    const tabsArray = [
      '推荐', '新闻', '专题', '走进三门',
      '图集', '看电视', '读报纸', '听广播', '时代楷模'
    ]; 
    const contentArray = IndexContent;
    
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
    flex: 1,
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

[
  { Title: '习近平的改革之"道"', IssueTime: '12-08 10:26', Tags: '掌上宣讲所', ImgUrl: 'http://f.hiphotos.baidu.com/zhidao/pic/item/c75c10385343fbf2d77d69d5b47eca8064388ff7.jpg' },
  { Title: '以论坛搭台 促普外科发展', IssueTime: '12-08 10:47', Tags: '掌上宣讲所', ImgUrl: 'http://f.hiphotos.baidu.com/zhidao/pic/item/c75c10385343fbf2d77d69d5b47eca8064388ff7.jpg' },
  { Title: '美丽三门.农林业全省摄影大赛获奖名单xxxx', IssueTime: '12-08 10:24', Tags: '掌上宣讲所', ImgUrl: 'http://f.hiphotos.baidu.com/zhidao/pic/item/c75c10385343fbf2d77d69d5b47eca8064388ff7.jpg' },
  { Title: '美丽三门.农林业全省摄影大赛获奖名单xxxx', IssueTime: '12-08 10:24', Tags: '掌上宣讲所', ImgUrl: 'http://f.hiphotos.baidu.com/zhidao/pic/item/c75c10385343fbf2d77d69d5b47eca8064388ff7.jpg' },
  { Title: '美丽三门.农林业全省摄影大赛获奖名单xxxxxxxsxxxxxxx', IssueTime: '12-08 10:24', Tags: '掌上宣讲所', ImgUrl: 'http://f.hiphotos.baidu.com/zhidao/pic/item/c75c10385343fbf2d77d69d5b47eca8064388ff7.jpg' },
  { Title: '美丽三门.农林业全省摄影大赛获奖名单xxxxx', IssueTime: '12-08 10:24', Tags: '掌上宣讲所', ImgUrl: 'http://f.hiphotos.baidu.com/zhidao/pic/item/c75c10385343fbf2d77d69d5b47eca8064388ff7.jpg' },
  { Title: '美丽三门.农林业全省摄影大赛获奖名单xxxxx', IssueTime: '12-08 10:24', Tags: '掌上宣讲所', ImgUrl: 'http://f.hiphotos.baidu.com/zhidao/pic/item/c75c10385343fbf2d77d69d5b47eca8064388ff7.jpg' },
  { Title: '美丽三门.农林业全省摄影大赛获奖名单xxxxxx', IssueTime: '12-08 10:24', Tags: '掌上宣讲所', ImgUrl: 'http://f.hiphotos.baidu.com/zhidao/pic/item/c75c10385343fbf2d77d69d5b47eca8064388ff7.jpg' }
];