window.onload = function(){
  imgLocation("container","box");
  //实现滑动加载效果
  var imgData={"data":[{"src":"0.jpg"},{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"},{"src":"4.jpg"},{"src":"5.jpg"},{"src":"6.jpg"},{"src":"7.jpg"},{"src":"8.jpg"}]}
  window.onscroll = function(){
    if (checkFlag()) {
      var cParent = document.getElementById("container");
      for (var i = 0; i < imgData.data.length; i++) {
        var cContent = document.createElement("div");
        cContent.className = "box";
        cParent.appendChild(cContent);
        var boximg = document.createElement("div");
        boximg.className = "img_box";
        cContent.appendChild(boximg);
        var img = document.createElement("img");
        img.src= "img/"+imgData.data[i].src;
        boximg.appendChild(img);
      }
      imgLocation("container","box");
    }
  }
}
function checkFlag(){//页面最底高度
  var cParent = document.getElementById("container");
  var cContent = getChildElement(cParent,"box");
  var lastContentHeight = cContent[cContent.length - 1].offsetTop;
  var srollTop = document.documentElement.scrollTop;
  var pageHeight = document.documentElement.clientHeight;
  if (lastContentHeight<srollTop+pageHeight) {
    return true;
  }
}

function imgLocation(parent,content){
  //将父级空间内所有content全部取出
  var cParent = document.getElementById(parent);
  var cContent= getChildElement(cParent,content);
  var imgWidth = cContent[0].offsetWidth;
  var num= Math.floor(document.documentElement.clientWidth/imgWidth);
  cParent.style.cssText = "width:"+imgWidth*num+"px";
  //定义数组，承载所有图片的高度，然后将下一排图片放在高度最低的图片下面。
  var boxHeightArr = [];
  for (var i = 0; i < cContent.length; i++) {
    if (i<num) {
      boxHeightArr[i] = cContent[i].offsetHeight;
    }else{
      var minHeight = Math.min.apply(null,boxHeightArr);//得到最小高度
      var minIndex = getMinHeightLocation(boxHeightArr,minHeight);//得到最小高度图片所在位置（高度数列中的编号）
      cContent[i].style.position = "absolute";
      cContent[i].style.top = minHeight+"px";
      cContent[i].style.left = cContent[minIndex].offsetLeft+"px";//让图片的左边坐标等于最小高度处的图片的左坐标
      boxHeightArr[minIndex] +=cContent[i].offsetHeight;
    }
  }

}
function getMinHeightLocation(boxHeightArr,minHeight){
  for(var i in boxHeightArr){
    if (boxHeightArr[i] == minHeight) {
      return i;
    }
  }
}
function getChildElement(parent,content){
  var contentArr = [];
  var allContent = parent.getElementsByTagName("*");
  for (var i = 0; i < allContent.length; i++) {
    if (allContent[i].className == content) {
      contentArr.push(allContent[i]);
    }
  }
  return contentArr;
}
