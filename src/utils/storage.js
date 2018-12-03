'use strict';

import { AsyncStorage } from 'react-native';

const _storage = {
  /**
   * 保存
   * */
  save(key, value, callback) {
    return AsyncStorage.setItem(key, JSON.stringify(value), callback);
  }
  /** 
   * 获取
   * */
  get(key) {
    return AsyncStorage.getItem(key).then((value) => {
      const jsonValue = JSON.parse(value);
      return jsonValue;
    })
  }
  /**
   * 更新
   * */
  update(key, value, callback) {
    this.get(key).then((item) => {
      value = typeof value === 'string' ? value : Object.assign({}, item, value);
      return AsyncStorage.setItem(key, JSON.stringify(value), callback);
    })
  }
  /**
   * 删除
   * */
  delete(key, callback) {
    AsyncStorage.removeItem(key, callback);
  }
}

export { _storage as storage }
