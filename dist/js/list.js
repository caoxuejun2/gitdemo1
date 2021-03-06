require.config({
  paths:{
    "jquery":"jquery-1.11.3",
    "jquery-cookie": "jquery.cookie",
    "parabola":"parabola",
    "index":"index",
    "other":"other"
  },
  shim:{
    "jquery-cookie":["jquery"],
    parabola:{ 
      exports:'_'
    }
  }
})
require(['index','other'],function(index,other){
  index.ceiling();
  index.footerlist();
  index.tradelist();
  index.navlist("../data/navJson1.json",".classify-a1");
  index.navlist("../data/navJson2.json",".classify-a2");
  index.navlist("../data/navJson3.json",".classify-a3");
  index.navlist("../data/navJson4.json",".classify-a4");
  index.navlist("../data/navJson5.json",".classify-a5");
  index.navlist("../data/navJson6.json",".classify-a6");
  index.navlist("../data/navJson7.json",".classify-a7");
  index.navlist("../data/navJson8.json",".classify-a8");
  index.navlist("../data/navJson9.json",".classify-a9");
  index.navlist("../data/navJson10.json",".classify-a10");
  index.navlist("../data/navJson11.json",".classify-a11");
  other.shoppingClick();
})