
import firebase from './firebase';
const u = navigator.userAgent; // 获取浏览器的userAgent
const isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // Android设备
const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; // ios设备
const ua = navigator.userAgent; // 获取浏览器的userAgent
const isIE = window.ActiveXObject != undefined && ua.indexOf("MSIE") != -1; // IE浏览器
const isFirefox = ua.indexOf("Firefox") != -1; // 火狐浏览器
const isOpera = window.opr != undefined; // Opera浏览器
const isChrome = ua.indexOf("Chrome") && window.chrome; // Chrome浏览器
const isSafari = ua.indexOf("Safari") != -1 && ua.indexOf("Version") != -1; // Safari浏览器
const axios = require('axios').default;
const createIframe = (function() {
    let iframe;
    return function() {
      if (iframe) {
        return iframe;
      } else {
        iframe = document.createElement('iframe')
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        return iframe;
      }
    }
  })()

const baseScheme = "project.dianquan://";
const createScheme = function(options, isLink) {
    let urlScheme = baseScheme;
    for(let item in options) {
      urlScheme = urlScheme + item + '=' + encodeURIComponent(options[item]) + '&';
    }
    urlScheme = urlScheme.substring(0, urlScheme.length - 1);
    return encodeURIComponent(urlScheme);
  }

const createDynamicLink = (id) =>{
    let link = "https://dianquan.page.link/?link=https://www.dianquan.page.link/someresource&apn=com.example.android&amv=3&ibi=com.example.ios&isi=1234567&ius=exampleapp"
    const db = firebase.firestore();
    const generateDynamicLink = firebase.functions().httpsCallable('generateDynamicLink');
    generateDynamicLink({pinInd:id}).then(result => {
        window.location = result.data;window.location.replace(result.data);
        console.log(result.data)
    })
}
export default function openApp (id) {
   console.log(id);
    return createDynamicLink(id);
    // return createDynamicLink;
}

