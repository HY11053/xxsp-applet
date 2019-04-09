//获取应用实例
var app = getApp();
Page({
    data: {
        page:5
    },
    //品牌详情页
    toBrandArticle(event){
        let index = event.currentTarget.dataset.index
        console.log(event)
        swan.navigateTo({
            url: '/pages/brandarticle/brandarticle?index='+index,
        })
    },
    toIndex(event){
        swan.navigateTo({
            url: '/pages/index/index',
        })
    },

    onLoad: function (options) {
        // 监听页面加载的生命周期函数
        let realPath=options.keyword;
        this.setData({keyword:options.keyword})
        console.log(realPath)
    },
    onReady: function() {
        // 监听页面初次渲染完成的生命周期函数
    },
    onShow: function() {
        // 监听页面加载的生命周期函数
        var that=this
        //品牌列表
        swan.request({
            url: app.globalData.baseUrl+"search/?keyword="+that.data.keyword, //请求地址
            method: 'GET',
            dataType: 'json',
            success: function (res) {
                that.setData({ brands:res.data });
            },
            fail: function (err) {
                console.log('错误码：' + err.errCode);
                console.log('错误信息：' + err.errMsg);
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
        var that = this;
        // 显示加载图标
        swan.showLoading({
            title: '正在加载中',
        })
        that.setData({page:that.data.page+5})
        swan.request({
            url: app.globalData.baseUrl+"search/?take=5&orderby=click&skip="+that.data.page+"&keyword="+that.data.keyword,
            method: 'GET',
            dataType: 'json',
            success: function (res) {
                var brands_list = that.data.brands;
                for (var i = 0; i < res.data.length; i++) {
                    brands_list.push(res.data[i]);
                }
                // 设置数据
                that.setData({
                    brands: that.data.brands
                })
                // 隐藏加载框
                swan.hideLoading();
            }
        })

    },
    onShareAppMessage: function () {
        // 用户点击右上角转发
    }
});