define(["jquery","jquery-cookie"],function($){
  function move(){
    $(function(){
      var aBtns = $(".banner").find(".banner-index div")
      var oImg = $(".banner").find(".banner-c .bannerimg")
      var aBtn = $(".banner").find("#leftandright")
      var iNow = 0
      var timer = null
      timer = setInterval(function(){
        iNow++;
        tab()
      },2000)
      aBtns.click(function(){
        iNow = $(this).index();
        tab()
      })
      $(".banner-c").mouseenter(function(){
        clearInterval(timer)
        aBtn.css("display","block")
      })
      $(".banner-c").mouseleave(function(){
        aBtn.css("display","none")
        timer = setInterval(function(){
          iNow++;
          tab()
        },2000)
      })
      $("#left").click(function(){
        iNow--;
        tab();
      })
      $("#right").click(function(){
        iNow++;
        tab();
      })
      $("#left").mouseenter(function(){
        aBtn.css("display","block")
        clearInterval(timer)
        tab();
      })
      $("#right").mouseenter(function(){
        aBtn.css("display","block")
        clearInterval(timer)
        tab();
      })
      function tab(){
        aBtns.removeClass("active").eq(iNow).addClass("active")
        if(iNow == aBtns.size()){
          aBtns.eq(0).addClass("active")
        }
        oImg.animate(
          {
            left:iNow * -998,
          },600,
          function(){
            if(iNow == aBtns.size()){
              iNow = 0
              oImg.css("left",0)
            }
          }
        )
      }
    })
  }
  function off(){
    $(".off").click(function(){
      $(".adv-news").css("display","none")
    })
  }
  function ceiling(){
    var timer = setInterval(function(){
      var distance = document.body.scrollTop||document.documentElement.scrollTop;
      if(distance>=174){
        $(".nav-f").css("position","fixed");
        $(".nav-f").css("top",0);
      }else{
        $(".nav-f").css("position","relative");
        $(".nav-f").css("top",0);
      }
    },1)
    $(".back").click(function(){
      var timer1 = setInterval(function(){
        document.documentElement.scrollTop -= 50
        if(document.documentElement.scrollTop==0){
          clearInterval(timer1)
        }
      },1)
    })
  }
  function footerlist(){
    $.ajax({
      url:"../data/footer.json",
      success:function(arr){
       for(var i=0;i<arr.length;i++){
         var node = $(`<dl class="footerlist-dl fl">
         <dt>${arr[i].dt}</dt>
         <div></div></dl>`)
         node.appendTo($(".footer-list"));
         var childArr = arr[i].childs;
         for(var j=0;j<childArr.length;j++){
           $(`<a href="javascript:;"><dd>${childArr[j].dd}</dd></a>`).appendTo(node.find("div"));
         }
       }
      },
      error:function(msg){
        console.log(msg)
      }
    })
  }
  function tradelist(){
    $.ajax({
      url:"../data/list.json",
      success:function(arr){
        var products = arr.data.products;
        for(var i=0;i<products.length;i++){
          var node = $(`<a href="details.html?productId=${products[i].productId}"><div class="tradeList-item fl">
          <div class="tradeList-img"><img src="${products[i].smallImage}" alt=""></div>
          <p class="tradeList-price"></p>
          <p class="tradeList-infor">${products[i].title}</p>
          </div></a>`)
          node.appendTo($(".tradeList"))
          var price = products[i].price;
          $(` <span class="temai">特卖价</span>
          <span class="tradeListPrice-num">￥${price.salePrice}</span> 
          <span class="originalPrice">￥${price.marketPrice}</span>
          <span class="price-off">${price.saleDiscount}</span>`).appendTo(node.find(".tradeList-price"))
        }
      },
      error:function(msg){
        console.log(msg)
      }
    })
  }
  function navlist(url,name){
    $(name).mouseenter(function(){
      $(".drop-list").css("display","block")
      $(".brand-img").css("display","block")
    })
    $(".drop").mouseenter(function(){
      $(".drop-list").css("display","block")
      $(".brand-img").css("display","block")
    })
    $(".drop").mouseleave(function(){
      $(".drop-list").css("display","none")
      $(".brand-img").css("display","none")
    })
    $(name).mouseenter(function(){
      $(".drop-list-dl").remove()
      $(".brand-img-item").remove()
      $.ajax({
        url:url,
        success:function(obj){
          var sectionList = obj.data.data.sectionList;
          for(var i=1;i<sectionList.length-1;i++){
            var node = $(` <dl class="drop-list-dl clr">
            <dt class="drop-list-dt fl clr">${sectionList[i].category.name}<span class="dropListDt-span fr"> > </span></dt>
            <dd class="drop-list-dd fl"></dd>
            </dl>`)
            node.appendTo($(".drop-list"))
            var children = sectionList[i].category.children
            for(var k=0;k<children.length;k++){
              $(`<a href="javascript:;">${children[k].name}</a>`).appendTo(node.find(".drop-list-dd"))
            }
          }
          var brand = obj.data.data.sectionList[sectionList.length-1].category.children
          for(var j=0;j<brand.length;j++){
            var node2 = $(` 
                <div class="brand-img-item fl">
                  <img src="${brand[j].image}" alt="">
                  <p>${brand[j].name}</p>
                </div>`)
              node2.appendTo($(".brand-imgs-c"))
          }
        },
        error:function(msg){
          console.log(msg)
        }
      })
    })
  }
  return{
    move,
    off,
    ceiling,
    footerlist,
    tradelist,
    navlist,
  }
})