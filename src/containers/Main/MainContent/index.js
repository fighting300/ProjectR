
import React from 'react';
import { View, Text, Image, 
  ImageBackground, 
  ScrollView, 
  FlatList, 
  TouchableHighlight,
  ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { fetchGet } from '../../../utils/http';
import { APIS, APP } from '../../../constants/API';
import { TypeName } from '../../../constants/Config';
import { Resource } from '../../../constants/Resource';
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';

const wWidth = Dimensions.get('window').width;

// 请求参数 '/GetIndexPage?pageNo=1 &appId=110108&appKey=d0006&projectId=3 &modilarId=113175&styleId=304' 
// 详情请求 '/GetContentDetail?contentId=1921829 &appId=110108&appKey=d0006&projectId=3'
class MainContent extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;
    console.log('navigator', navigation, navigationOptions);
    return {
      title: '掌上三门',
      headerStyle: {
        backgroundColor: '#2a5caa',

      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontSize: 24,
        fontWeight: 'normal',
      },
      headerLeft: <Icon.Button name="user" color="white" backgroundColor="transparent" onPress={() => {
        navigation.navigate('Account')
      }} />,
      headerRight: <Icon.Button name="search" color="white" backgroundColor="transparent" onPress={() => {
        navigation.navigate('Account')
      }} />,
      headerLeftContainerStyle: null,
      headerRightContainerStyle: null
    }
  };


  constructor(props) {
    super(props);
    this.state = {
      pageNo: 1,
      modilarId: 113175,
      styleId: 304,

      Focus: [],
      IndexContent: [],
      isLoading: true,
      isRefreshing: false,
      showFoot: 0  // 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中
    }
  }

  componentWillMount() {

  }

  shouldComponentUpdate(nextState, nextProps) {
    const stateNames = [
      'Focus',
      'IndexContent',
      'isLoading',
      'isRefreshing',
      'showFoot'
    ];
    const propsNames = [
    ];
    const isStateChange = stateNames.some(name => this.state[name] != nextState[name]);
    const isPropsChange = propsNames.some(name => this.props[name] != nextProps[name]);
    if (isStateChange || isPropsChange) {
    }
    return isStateChange || isPropsChange;
  }

  componentWillReceiveProps(nextState, nextProps) {
    console.log('componentWillReceiveProps')
  }

  componentDidMount() {
    this.onFetch()

  }
  
  /** 下拉刷新 */
  _onRefresh = () => {
    console.log('_onRefresh')
    this.setState({
      isRefreshing: true,
      pageNo: 1
    }, () => {
      this.onFetch(); 
    })
  }

  /** 上拉刷新 */
  _onEndReached = ({distanceFromEnd}) => {
    console.log('_onEndReached', this.state, distanceFromEnd);
    const { showFoot, pageNo, modilarId, styleId } = this.state;
    //如果是正在加载中或没有更多数据了，则返回
    if (showFoot !== 0) {
      return;
    }
    if (pageNo !== 1 && pageNo >= 100) {
      return;
    } else {
      this.state.pageNo++;
    }
    //底部显示正在加载更多数据
    this.setState({ showFoot: 2 });
    if (this.state.pageNo > 1) {
      this.onFetch(); 
    }
  }

  /** 网络请求 */
  onFetch = () => {
    const { pageNo, modilarId, styleId } = this.state;
    const params = {
      pageNo,
      modilarId,
      styleId,
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
        if (!Data) return;
        const { Focus: LoadFocus, IndexContent: LoadIndexContent } = Data;
        const { Focus, IndexContent, pageNo, isRefreshing } = this.state;
        let FocusData = [], IndexContentData = [];
        const curIndex = isRefreshing ? 0 : IndexContent.length;
        LoadFocus.map((focusItem, index) => {
          FocusData.push({
            index: index,
            ...focusItem
          });
        });
        LoadIndexContent.map(( contentItem, index) => {
          IndexContentData.push({
            index: curIndex + index,
            ...contentItem
          });
        })
        let foot = 0;
        if ( pageNo >= 100 ) {
          foot = 1; // listView底部显示没有更多数据了
        }
        console.log('response detail', this.state, isRefreshing ? LoadFocus : Focus.concat(LoadFocus), );
        this.setState({
          Focus: isRefreshing ? FocusData : Focus.concat(FocusData), 
          IndexContent: isRefreshing ? IndexContentData : IndexContent.concat(IndexContentData),
          isLoading: false,
          isRefreshing: false,
          showFoot: foot
        })
        
      }
    })
  }

  /** 初始loading View */
  _renderLoadingView() {
    return (
      <View style={styles.container}>
        <ActivityIndicator animating={true} color='blue'size="large"/>
      </View>
    );
  }

  /** 上拉展示Footer */
  _renderFooter = () => {
    const { showFoot } = this.state;
    
    if (showFoot === 1) { // 无数据
      return (
        <View style={styles.footer}>
          <Text style={styles.footerText}>没有更多数据了</Text>
        </View>
      );
    } else if (showFoot === 2) { // 正在加载
      return (
        <View style={styles.footer}>
          <ActivityIndicator />
          <Text style={styles.footerText}>正在加载更多数据...</Text>
        </View>
      );
    } else if (showFoot === 0) { // 空View
      return (
        <View style={styles.footer}></View>
      );
    }

  }

  /** Page 黑点提示 */
  _renderDotIndicator() {
    const { Focus } = this.state;
    return <PagerDotIndicator style={{justifyContent: 'flex-end'}} pageCount={Focus.length} />;
  }


  _renderFocus = () => {
    const { Focus } = this.state;
    const isFocus = !!Focus && Focus.length > 0;
    // console.count('!!Focus', Focus, isFocus, Focus.length)
    return (
      <IndicatorViewPager style={styles.pageContent} autoPlayEnable={true}
        indicator={this._renderDotIndicator()}>
        {
          !isFocus ?
            <Image style={styles.pageImage} source={{ uri: Resource.defaultImage }} /> :
            (
              Focus.map((focusItem) => {
                return (
                  <View key={`default_Focus_${focusItem.Id}`}>
                    <ImageBackground style={styles.pageImage} source={{ uri: focusItem.ImgUrl }}>
                      <View style={styles.pageTextView}>
                        <Text style={styles.pageText} numberOfLines={1}>{focusItem.Title}</Text>
                      </View>
                    </ImageBackground>
                  </View>
                )
              })
            )
        }
      </IndicatorViewPager>
    )
  }

  /** 渲染广告 Item */
  _renderItem = ({ item, index, separators }) => {
    // console.log('item', item, index, item.Title, this.state.IndexContent.length)
    const { DisplayMode } = item;
    let curCell;
    if (DisplayMode === TypeName.Main_TypeBigImg) {
      curCell = this._renderItemTopic(item, index);
    } else if (DisplayMode === TypeName.Main_TypeImg) {
      // 渲染多图模式
      curCell = this._renderItemRecommend(item, index);
    } else {
      curCell = this._renderItemContent(item, index);
    }
    return (<TouchableHighlight onPress={this.handlePress(item)}>
      { curCell }
    </TouchableHighlight>)
  } 

  handlePress = item => (event) => {
    this.props.navigation.navigate('Detail', { item });
  }

  /** 渲染普通Item内容 */
  _renderItemContent = (item, index) => (
    <View style={styles.itemContent} >
      <Image style={styles.image} source={{ uri: item.ImgUrl }} />
      <View style={styles.textContent}>
        <Text style={[styles.titleText, {flex: 1}]} numberOfLines={2}>{item.Title}</Text>
        <View style={styles.bottomContent}>
          <Text style={[styles.timeText, {flex: 1}]}>{item.IssueTime}</Text>
          {
            !!item.Tags && <Text style={styles.tipText}>{item.Tags}</Text>
          }
        </View>
      </View>
    </View>
  )

  /** 渲染多图Item内容 */
  _renderItemRecommend = (item, index) => (
    <View style={styles.imageContent}>
      <Text style={styles.titleText} numberOfLines={1}>{item.Title}</Text>
      <View style={styles.imgView}>
        {
          item.ImgUrls.map((imageItem, curIndex) =>
            (<Image key={`default_ImageItem_${item.Id}_${curIndex}`} style={[styles.imageItem, curIndex != 0 ? { marginLeft: 5 } : {}]} source={{ uri: imageItem }} />)
          )
        }
      </View>
      <Text style={styles.timeText}>{item.IssueTime}</Text>
    </View>
  )
  

  /** 渲染大图Item内容 */
  _renderItemTopic = (item, index) => (<Image style={styles.itemBigImg} source={{ uri: item.ImgUrl }} />)
  
  _keyExtractor = (item, index) => `default_${item.Id}_${index}`;

  _renderListEmptyComponent = () => {
    console.log('_renderListEmptyComponent')
    return (<View style={styles.emptyContent}><Text style={{fontSize: 16}}>暂无数据下拉刷新</Text></View>)
  };

  render() {
    const { Focus, IndexContent, isLoading } = this.state;
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
          ListEmptyComponent={this._renderListEmptyComponent}
          ListFooterComponent={this._renderFooter}
          initialNumToRender={8}
          getItemLayout={(item, index) => (
            { length: ITEM_HEIGHT + SEPERATOR_HEIGHT, offset: (ITEM_HEIGHT + SEPERATOR_HEIGHT) * index, index }
          )}
          initialScrollIndex={0}
          ListHeaderComponent={this._renderFocus}
          refreshing={isLoading}
          onEndReachedThreshold={0.1}
          onEndReached={this._onEndReached}
          onRefresh={this._onRefresh}
          removeClippedSubviews
        />
      </View>
    );
  }
}

const ITEM_HEIGHT = 120;
const IMAGE_HEIGHT = 140;
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

  emptyContent: { 
    height: '100%', 
    width: '100%', 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: 'red'
  },

  pageContent: {
    height: 200,
    width: wWidth
  },
  pageImage: {
    width: '100%', 
    height: '100%',
    justifyContent: 'flex-end'
  },
  pageTextView: {
    backgroundColor: '#505050',
    width: wWidth,
    height: 30,
    justifyContent: 'center'
  },
  pageText: {
    color: 'white',
    fontSize: 16,
    paddingLeft: 10,
    marginRight: 100
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
    fontSize: 20
  },
  bottomContent: {    
    flexDirection: 'row'
  },
  timeText: {
    fontSize: 12,
    color: 'grey'
  },
  tipText: {
    alignSelf: 'flex-end',
    fontSize: 10,
    color: 'red',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: 'red'
  },

  imageContent: {
    flex: 1,
    flexDirection: 'column',
    height: IMAGE_HEIGHT,
    width: wWidth,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  imgView: {
    flex: 1,
    marginTop: 3,
    marginBottom: 3,
    flexDirection: 'row'
  },
  imageItem: {
    width: (wWidth - 40)/3
  },

  itemBigImg: {
    flex: 1,
    flexDirection: 'row',
    height: ITEM_HEIGHT,
    width: wWidth,
    marginTop: 15,
    marginBottom: 15
  },

  footer: {
    flexDirection: 'row',
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  footerText: { 
    color: '#999999', 
    fontSize: 14, 
    marginTop: 5, 
    marginBottom: 5
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