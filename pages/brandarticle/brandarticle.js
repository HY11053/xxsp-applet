var app = getApp();
let wxParser = require('../../wxParser/index');
Page({
    data: {
        showModal: false
    },
    telSubmit: function() {
        this.setData({
            showModal: true
        })
    },
    preventTouchMove: function() {
    },
    closeMod: function() {
        this.setData({
            showModal: false
        })
    },
    //内容详情页
    toArticle(event){
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
    toIndex(event){
        swan.navigateTo({
            url: '/pages/index/index',
        })
    },
    toBrandList(event){
        let realPath = event.currentTarget.dataset.realpath
        console.log(event)
        swan.navigateTo({
            url: '/pages/blists/blists?real_path='+realPath,
        })
    },
    formSubmitHandle: function(e) {
        var  that =this
        if ( e.detail.value.username== '') {
            swan.showToast({
                title:'姓名不能为空',
                duration: 2000,
                mask: true,
                icon: 'none'
            });
            return false;
        }
        // 判断手机号是否正确
        if (!(/^1[34578]\d{9}$/.test(e.detail.value.iphone))) {
            swan.showToast({
                title:'请输入正确的手机号码',
                duration: 2000,
                mask: true,
                icon: 'none'
            });
            return false;
        }
        swan.request({
            url: "https://mip.51xxsp.com/phone/complate/", //请求地址
            method: 'POST',
            dataType: 'json',
            data:{
                username:e.detail.value.username,
                iphone:e.detail.value.iphone,
                content:e.detail.value.content,
                host:'https://mip.51xxsp.com/index.php/brand/'+that.data.thisarticleinfos.id+'/?referer=baidu_applet',
                realm:'mip.51xxsp.com',
                job:'guestbook',
                title:'火爆餐饮网',
                cla:that.data.thistypeinfos.typename,
                combrand:that.data.thisarticleinfos.brandname,
                resolution:'',
            },
            success: function (res) {
                swan.showToast({
                    title:'电话提交成功 我们将尽快与你们联系',
                    duration: 2000,
                    mask: true,
                    icon: 'none'
                });
            },
            fail: function (err) {
                console.log('错误码：' + err.errCode);
                console.log('错误信息：' + err.errMsg);
            }
        });
    },
    formSubmitHandle2: function(e) {
        var  that =this
        if ( e.detail.value.tusername== '') {
            swan.showToast({
                title:'姓名不能为空',
                duration: 2000,
                mask: true,
                icon: 'none'
            });
            return false;
        }
        // 判断手机号是否正确
        if (!(/^1[34578]\d{9}$/.test(e.detail.value.tiphone))) {
            swan.showToast({
                title:'请输入正确的手机号码',
                duration: 2000,
                mask: true,
                icon: 'none'
            });
            return false;
        }
        swan.request({
            url: "https://mip.51xxsp.com/phone/complate/", //请求地址
            method: 'POST',
            dataType: 'json',
            data:{
                username:e.detail.value.tusername,
                iphone:e.detail.value.tiphone,
                content:e.detail.value.tcontent,
                host:'https://mip.51xxsp.com/index.php/brand/'+that.data.thisarticleinfos.id+'/?referer=baidu_applet-mod',
                realm:'mip.51xxsp.com',
                job:'guestbook',
                title:'火爆餐饮网',
                cla:that.data.thistypeinfos.typename,
                combrand:that.data.thisarticleinfos.brandname,
                resolution:'',
            },
            success: function (res) {
                swan.showToast({
                    title:'电话提交成功 我们将尽快与你们联系',
                    duration: 2000,
                    mask: true,
                    icon: 'none'
                });
            },
            fail: function (err) {
                console.log('错误码：' + err.errCode);
                console.log('错误信息：' + err.errMsg);
            }
        });
    },
    //拨打电话
    makePhoneCall(e) {
        let phoneNumber=e.currentTarget.dataset.phoneNumber
        swan.makePhoneCall({
            phoneNumber,
            fail: err => {
                swan.showModal({
                    title: '拨打失败',
                    content: '请检查是否输入了正确的电话号码',
                    showCancel: false
                });
            }
        });
    },
    onLoad: function (options) {
        this.setData({id:options.index})
    },
    onReady: function() {
        // 监听页面初次渲染完成的生命周期函数
    },
    onShow: function() {
        // 监听页面加载的生命周期函数
        var that=this
        console.log(that.data.id)
        //单页文档接口请求
        swan.request({
            url: app.globalData.baseUrl+"getbrandarticle/?id="+that.data.id, //请求地址
            method: 'GET',
            dataType: 'json',
            success: function (res) {
                that.setData({ thisarticleinfos:res.data });
                //console.log(res.data.body)
                swan.setPageInfo && swan.setPageInfo({
                    title:that.data.thisarticleinfos.title+app.globalData.baseName,
                    keywords: that.data.thisarticleinfos.keywords,
                    description:that.data.thisarticleinfos.description,
                    articleTitle: that.data.thisarticleinfos.title,
                    releaseDate:that.data.thisarticleinfos.created_at,
                    // 单张图时值可以是字符串
                    image: that.data.thisarticleinfos.litpic,
                    success: function () {
                        console.log(that.data.thisarticleinfos.title);
                        console.log('品牌文档页面基础信息设置完成');
                    }
                });
                let ht=res.data.body;
                wxParser.parse({
                    bind: 'richText',
                    html:ht ,
                    target: that,
                    enablePreviewImage: false, // 禁用图片预览功能
                });
                swan.setNavigationBarTitle({
                    title: that.data.thisarticleinfos.brandname+'加盟'
                });
            },
            fail: function (err) {
                console.log('错误码：' + err.errCode);
                console.log('错误信息：' + err.errMsg);
            }
        });
        //品牌资讯
        swan.request({
            url: app.globalData.baseUrl+"articles/?take=5&orderby=id&litpic=1&brandid="+that.data.id, //请求地址
            method: 'GET',
            dataType: 'json',
            success: function (res) {
                that.setData({ brandnews:res.data });
            },
            fail: function (err) {
                console.log('错误码：' + err.errCode);
                console.log('错误信息：' + err.errMsg);
            }
        });
        //相关品牌推荐
        swan.request({
            url: app.globalData.baseUrl+"brandarticles/?take=4&orderby=click&litpic=1&tid=1&aid="+that.data.id, //请求地址
            method: 'GET',
            dataType: 'json',
            success: function (res) {
                that.setData({ brandarticles:res.data });
                //console.log(that.data)
            },
            fail: function (err) {
                console.log('错误码：' + err.errCode);
                console.log('错误信息：' + err.errMsg);
            }
        });
        //文档栏目数据请求
        swan.request({
            url: app.globalData.baseUrl+"arctype/?bid="+that.data.id, //请求地址
            method: 'GET',
            dataType: 'json',
            success: function (res) {
                that.setData({ thistypeinfos:res.data });
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
    },
    onShareAppMessage: function () {
        // 用户点击右上角转发
    }
});