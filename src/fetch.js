import axios from 'axios';
import qs from 'qs';

/**
 * @method 封装请求
 * @param params
 * @returns {Promise}
 *
 * 用法
 * fetch(url,{method:"",body:{}}).then(response=>{}).catch((err)=>{})
 */
window.fetch = (url,params) =>{
    let param = {};
    if(params.method.toLocaleLowerCase() == "post"){
        param = {
            url : url,
            method : params.method,
            headers : {'Content-Type': 'application/x-www-form-urlencoded'},
            data: qs.stringify(params.body),
        }
    }else{
        param = {
            url : url + "?" + qs.stringify(params.body),
            method : params.method,
        }
    }
    if(params.responseType){
        param.responseType = params.responseType;
    }
    return new Promise((resolve,reject)=>{
        axios(param).then(response=>{
            const data = response.data;
            resolve(data);
        }).catch(error =>{
            if(error.response){
                const data = error.response.data;
                reject(data);
            }
        })
    })
};
