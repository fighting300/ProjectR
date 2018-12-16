
import React from 'react';
import { View, Text, ImageBackground, WebView, ActivityIndicator, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TypeName } from '../../../constants/Config';

const wWidth = Dimensions.get('window').width;

class Detail extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;
    const { item } = params;
    let title = '详 情', backgroundColor = 'white', hintColor = 'black';
    if (!!item && item.Template === TypeName.Main_TemplateTopic) {
      title = item.Tags || item.Title;
      backgroundColor = '#2a5caa';
      hintColor = 'white'
    }
    console.log(item, title, item.Template === TypeName.Main_TemplateTopic);

    return {
      title: title,
      headerStyle: {
        backgroundColor,
      },
      headerTintColor: hintColor,
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: 'normal',
      },
      headerLeft: <Icon.Button name="chevron-circle-left" color={hintColor} size={24} backgroundColor="transparent" onPress={() => {
        navigation.goBack();
      }} />,
      headerRight: 
        <TouchableOpacity style={styles.headerRight} onPress={() => { alert('TODO:跳转评论') }}> 
          <Text style={styles.headerRightText}>评论</Text> 
        </TouchableOpacity>,
      headerLeftContainerStyle: null,
      headerRightContainerStyle: null
    }
  };


  constructor(props) {
    super(props);
    this.state = {
      modilarId: 113175,
      styleId: 304
    }
  }

  componentWillMount() {

  }

  shouldComponentUpdate(nextState, nextProps) {
    const stateNames = [
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

  }

  render() {
    const { navigation: { state : { params } } } = this.props;
    let curParam = this.props.navigation.getParam('item');

    return (
      <View style={styles.container}>
        <WebView style={styles.webView}
          source={{ uri: !!curParam && curParam.LinkUrl }} 
          renderLoading={() => (<ActivityIndicator style={styles.indicator}  />)} 
          startInLoadingState={true} />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  webView: {
    width: wWidth
  },
  indicator: {
    flex: 1
  },

  headerLeft: {
    marginLeft: 10,
  },
  headerRight: {
    backgroundColor: '#2a5caa',
    borderRadius: 14,
    width: 60,
    height: 28,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerRightText: {
    color: 'white',
    fontSize: 14
  }

});

export default Detail;
