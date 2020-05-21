const u = navigator.userAgent; // 获取浏览器的userAgent
const isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // Android设备
const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; // ios设备
const ua = navigator.userAgent; // 获取浏览器的userAgent
const isIE = window.ActiveXObject != undefined && ua.indexOf("MSIE") != -1; // IE浏览器
const isFirefox = ua.indexOf("Firefox") != -1; // 火狐浏览器
const isOpera = window.opr != undefined; // Opera浏览器
const isChrome = ua.indexOf("Chrome") && window.chrome; // Chrome浏览器
const isSafari = ua.indexOf("Safari") != -1 && ua.indexOf("Version") != -1; // Safari浏览器
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
export default function openApp () {
    console.log("kkkk")
    let localUrl = createScheme();
    let openIframe = createIframe();

    if (isIos) {
      // 判断是否是ios
      console.log("1111");
      window.location.href = localUrl;
      const loadDateTime = Date.now();
      setTimeout(function() {
        const timeOutDateTime = Date.now();
        if (timeOutDateTime - loadDateTime < 1000) {
          window.location.href = "https://apps.apple.com/us/app/%E7%82%B9%E5%9C%88/id1483535140";
        }
      }, 25);
    } else if (isAndroid) {
        console.log("22222");
      // 判断是否是安卓
      if (isChrome) {
        console.log("333");
        // Chrome浏览器用iframe打不开
        window.location.href = localUrl;
      } else {
        // 抛出scheme
        console.log("444");
        openIframe.src = localUrl;
      }
      setTimeout(function() {
        window.location.href = "https://apps.apple.com/us/app/%E7%82%B9%E5%9C%88/id1483535140";
      }, 500);
    } else {
      // 给winphone用户准备
      console.log("555");
      openIframe.src = localUrl;
      setTimeout(function() {
        window.location.href = "https://apps.apple.com/us/app/%E7%82%B9%E5%9C%88/id1483535140";
      }, 500);
    }
  }

