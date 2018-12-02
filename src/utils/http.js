let defaultReqData = {
    serviceType: '',
    param: {}
};

const common_url = 'http://192.168.1.1';
const common_timeOut = 5000;

/**
 * Get请求
 * 
 * @param {Object} arg 
 * @param {string} arg.serviceType 路径
 * @param {number} arg.timeOut 超时
 * @param {Object} arg.params  参数
 * @param {Function} arg.success arg.success arg.error 回调
 */
let fetchGet = (arg) => {
    const { serviceType, timeOut, params, success, fail, error } = arg;

    let url = common_url + serviceType;
    if (params) {
        let paramsArray = [];
        //拼接参数
        Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
        if (url.search(/\?/) === -1) {
            url += '?' + paramsArray.join('&')
        } else {
            url += '&' + paramsArray.join('&')
        }
    }
    console.log('request', url, params)
    // fetch 请求
    _fetch(fetch(url, {
        headers: {
            //看后台需求决定配置参数
        }
    }), timeOut)
        .then(response => response.json())
        .then(responseJson => { 
            console.log('result',responseJson);
            if (responseJson.code == 200) { // 200为请求成功
                success && success(responseJson.data)
            } else {
                fail && fail(responseJson.msg)//可以处理返回的错误信息
            }
        })
        .catch(e => {
            console.log(e)
            error && error(e)
        });
}

/**
 * Post请求
 * 
 * @param {Object} arg 
 * @param {string} arg.serviceType 路径
 * @param {number} arg.timeOut 超时
 * @param {Object} arg.params  参数
 * @param {Function} arg.success arg.success arg.error 回调
 */
let fetchPost = (arg) => {
    const { serviceType, timeOut, params, success, fail, error } = arg;
    let url = common_url + serviceType;

    console.log('request', url, params)
    _fetch(fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params)
    }), timeOut)
        .then(response => response.json())
        .then(responseJson => {
            console.log(responseJson)
            if (responseJson.code == 200) {
                success && success(responseJson.data)
            } else {
                fail && fail(responseJson.msg)
            }
        })
        .catch(e => {
            console.log(e)
            error && error(error)
        })
}

/**
 * 上传图片请求
 * 
 * @param {Object} arg 
 * @param {string} arg.serviceType 路径
 * @param {number} arg.timeOut 超时
 * @param {number} arg.images  图片
 * @param {Object} arg.params  参数
 * @param {Function} arg.success arg.success arg.error 回调
 */
let fetchUpload = (arg) => {
    const { serviceType, timeOut, images, params, success, fail, error } = arg;
    let url = common_url + serviceType;
    console.log('request', url, images)
    let formData = new FormData();
    if (params) {
        formData = params;
    }
    for (var i = 0; i < images.length; i++) {
        var uri = images[I]
        var date = new Date()
        var name = date.getTime() + '.png'//用时间戳保证名字的唯一性
        let file = { uri: uri, type: 'multipart/form-data', name: name }
        formData.append('file', file)
    }
    console.log('formData', url, formData)
    _fetch(fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        },
        body: formData
    }), timeOut)
        .then(response => response.json())
        .then(responseJson => { 
            console.log(responseJson) 
            if (responseJson.code == 200) { 
                success && success(responseJson.data)
            } else {
                fail && fail()
            }
        })
        .catch(e => {
            console.log(e)
            error && error(error)
        });
}

function _fetch(fetch_promise, timeout = 10000) {
    let timeout_fn = null;

    //这是一个可以被reject的promise
    let timeout_promise = new Promise(function (resolve, reject) {
        timeout_fn = function () {
            reject('timeout promise');
        };
    });

    //这里使用Promise.race，以最快 resolve 或 reject 的结果来传入后续绑定的回调
    let abortable_promise = Promise.race([
        fetch_promise,
        timeout_promise
    ]);

    setTimeout(function () {
        timeout_fn();
    }, timeout);

    return abortable_promise;
}

export {
    fetchGet,
    fetchPost,
    fetchUpload
}