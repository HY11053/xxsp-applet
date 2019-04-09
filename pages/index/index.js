//获取应用实例
var app = getApp();
Page({
  data: {
    imgdatas: [
        {id:228,imgurl:"https://m.51xxsp.com/51xxsp/images/133113481.jpg"},
        {id:419,imgurl:"https://m.51xxsp.com/51xxsp/images/133113481232.jpg"},
        {id:1228,imgurl:"https://m.51xxsp.com/51xxsp/images/1331134812.jpg"},
        {id:7694,imgurl:"https://m.51xxsp.com/51xxsp/images/1331134813.jpg"},
    ],
      currentTab:0,
      page:0,
      basename:app.globalData.baseName
  },
    //滑动切换
    swiperTab: function (e) {
        var that = this;
        that.setData({
            currentTab: e.detail.current
        });
    },
    //点击切换
    clickTab: function (e) {
        var that = this;
        if (this.data.currentTab === e.target.dataset.current) {
            return false;
        } else {
            that.setData({
                currentTab: e.target.dataset.current
            })
        }
    },
    //搜索事件触发
    searchBtn:function()
    {
        this.setData({btn:true})
    },
    formSubmitHandle: function(e) {
        if ( e.detail.value.search== '') {
            swan.showToast({
                title:'搜索内容不能为空',
                duration: 2000,
                mask: true,
                icon: 'none'
            })
        }else{
            let search =e.detail.value.search
            swan.navigateTo({
                url: '/pages/search/search?keyword='+search,
            })
        }
    },
    chengeBrands:function(e){
        var that = this;
        // 显示加载图标
        swan.showLoading({
            title: '正在加载中',
        })
        that.setData({page:that.data.page+4})
        swan.request({
            url: app.globalData.baseUrl+"brandarticles/?take=4&orderby="+e.target.dataset.type+"&skip="+that.data.page,
            method: 'GET',
            dataType: 'json',
            success: function (res) {
                var cbrand_list=[] ;
                for (var i = 0; i < res.data.length; i++) {
                    cbrand_list.push(res.data[i]);
                }
                //console.log(cbrand_list)
                // 设置数据
                if (e.target.dataset.type==='click'){
                    that.setData({
                        cbrands:cbrand_list
                    })
                }else {
                    that.setData({
                        newbrands:cbrand_list
                    })
                }
                // 隐藏加载框
                swan.hideLoading();
            }
        })
    },
    /**
     *
     * @param event
     *   //swiper 高度自适用
     viewHeight: function (e) {
        //获取图片真实宽度
        var width = e.detail.width;
        var height = e.detail.height;
        //宽高比
        var scale= width / height;
        //计算的高度值
        var itemHeight = 750 / scale;
        console.log(itemHeight)
        this.setData({
            itemHeight: itemHeight
        })
    },
     */
    //内容详情页
    toArticle(event){
        // console.log(event);
        //获取点击跳转对应的下标
        let index = event.currentTarget.dataset.index
        swan.navigateTo({
            url: '/pages/article/article?index='+index,
        })
    },
    //品牌详情页
    toBrandArticle(event){
        let index = event.currentTarget.dataset.index
        swan.navigateTo({
            url: '/pages/brandarticle/brandarticle?index='+index,
        })
    },
    //品牌列表页
    toBrandList(event){
        let realPath = event.currentTarget.dataset.realpath
        //console.log(event)
        swan.navigateTo({
            url: '/pages/blists/blists?real_path='+realPath,
        })
    },
    //排行榜列表页
    toPaihangbang(event){
        let realPath = event.currentTarget.dataset.realpath
        swan.navigateTo({
            url: '/pages/paihangbang/paihangbang?real_path='+realPath,
        })
    },
    //文档列表页
    toNlist(event){
        let realPath = event.currentTarget.dataset.realpath
        swan.navigateTo({
            url: '/pages/nlists/nlists?real_path='+realPath,
        })
    },
    onLoad: function () {
        // 监听页面加载的生命周期函数
        var that=this
        //滚动推荐
        swan.request({
            url: app.globalData.baseUrl+"brandarticles/?take=3&orderby=id&flags=c", //请求地址
            method: 'GET',
            dataType: 'json',
            success: function (res) {
                that.setData({ abrands:res.data });
            },
            fail: function (err) {
                console.log('错误码：' + err.errCode);
                console.log('错误信息：' + err.errMsg);
            }
        });
        //精品推荐
        swan.request({
            url: app.globalData.baseUrl+"brandarticles/?take=4&orderby=click", //请求地址
            method: 'GET',
            dataType: 'json',
            success: function (res) {
                that.setData({ cbrands:res.data });
            },
            fail: function (err) {
                console.log('错误码：' + err.errCode);
                console.log('错误信息：' + err.errMsg);
            }
        });
        //新品推荐
        swan.request({
            url: app.globalData.baseUrl+"brandarticles/?take=4&orderby=id", //请求地址
            method: 'GET',
            dataType: 'json',
            success: function (res) {
                that.setData({ newbrands:res.data });
            },
            fail: function (err) {
                console.log('错误码：' + err.errCode);
                console.log('错误信息：' + err.errMsg);
            }
        });
        //品牌新闻
        swan.request({
            url: app.globalData.baseUrl+"articles/?take=5&orderby=id&brandpic=1&typeid=5",
            method: 'GET',
            dataType: 'json',
            success: function (res) {
                that.setData({ newarticles:res.data });
            },
            fail: function (err) {
                console.log('错误码：' + err.errCode);
                console.log('错误信息：' + err.errMsg);
            }
        });
        //加盟指南
        swan.request({
            url: app.globalData.baseUrl+"articles/?take=5&orderby=id&brandpic=1&typeid=1", //请求地址
            method: 'GET',
            dataType: 'json',
            success: function (res) {
                that.setData({ zhinanarticles:res.data });
            },
            fail: function (err) {
                console.log('错误码：' + err.errCode);
                console.log('错误信息：' + err.errMsg);
            }
        });
        //投资分析
        swan.request({
            url: app.globalData.baseUrl+"articles/?take=5&orderby=id&brandpic=1&typeid=2", //请求地址
            method: 'GET',
            dataType: 'json',
            success: function (res) {
                that.setData({ touziarticles:res.data });
            },
            fail: function (err) {
                console.log('错误码：' + err.errCode);
                console.log('错误信息：' + err.errMsg);
            }
        });
        //经营管理
        swan.request({
            url: app.globalData.baseUrl+"articles/?take=5&orderby=id&brandpic=1&typeid=4", //请求地址
            method: 'GET',
            dataType: 'json',
            success: function (res) {
                that.setData({ jingyingarticles:res.data });
            },
            fail: function (err) {
                console.log('错误码：' + err.errCode);
                console.log('错误信息：' + err.errMsg);
            }
        });
    },
    onReady: function() {
        // 监听页面初次渲染完成的生命周期函数
    },
    onShow: function() {
        // 监听页面显示的生命周期函数
        swan.setPageInfo && swan.setPageInfo({
            title: '火爆餐饮网-零食、餐饮加盟招商一站式连锁加盟创业综合服务平台',
            keywords: '餐饮加盟,零食店加盟,餐饮招商加盟,休闲食品加盟,餐饮加盟品牌,餐饮品牌,零食加盟品牌,休闲食品品牌排行榜',
            description: '火爆餐饮网致力打造国内安全可靠的零食、餐饮、酒水饮料、酒店等行业加盟创业商机平台，为投资者甄选优质加盟创业项目，实时提供零食、餐饮、酒水饮料、酒店、教育等招商加盟创业信息，让投资者快速找到适合自己的创业加盟品牌，轻松开店创业',
            articleTitle: '火爆餐饮网-零食、餐饮加盟招商一站式连锁加盟创业综合服务平台',
            success: function () {
                console.log('首页基础信息设置完成');
            }
        });
    },
    onHide: function() {
        // 监听页面隐藏的生命周期函数
    },
    onUnload: function() {
        // 监听页面卸载的生命周期函数
    },
    onPullDownRefresh: function() {
        // 监听用户下拉动作
    },
    onReachBottom: function() {
        // 页面上拉触底事件的处理函数
    },
    onShareAppMessage: function () {
        // 用户点击右上角转发
    },

});
