// pages/person/person.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    // success代表已经是接单员了, 
    // fail代表曾经申请过但是没通过
    // loading代表目前有正在审核中的
    // null代表从未申请过
    personReceiveState: '',
    admin: false,
  },

  applyOrder() {
    const userInfo = wx.getStorageSync('userInfo');
    if (!userInfo) {
        wx.showToast({
          icon: 'none',
          title: '请先登录!',
        })
        return;
    }
    const {
        personReceiveState
    } = this.data;
    if (personReceiveState === 'success') {
        wx.showModal({
            title: '提示',
            content: '您已经是接单员了, 请勿重复申请!',
            showCancel: false
        })
    } else if (personReceiveState === 'fail') {
        wx.showModal({
            title: '提示',
            content: '您之前提交的申请未通过审核, 您可以继续申请, 如有疑问请联系管理员: 18331092918',
            success: (res) => {
                const {
                    confirm
                } = res;
                if (confirm) {
                    wx.navigateTo({
                        url: '../applyOrder/applyOrder',
                    })
                }
            }
        })
    } else if (personReceiveState === 'loading') {
        wx.showModal({
            title: '提示',
            content: '您之前申请的内容正在审核中, 请耐心等待! 如加急审核请添加管理员微信: 18331092918',
            showCancel: false,
        })
    } else if (personReceiveState === 'null') {
        wx.navigateTo({
          url: '../applyOrder/applyOrder',
        })
    }
  },

  toAbout() {
    wx.navigateTo({
        url: '../aboutAs/aboutAs',
    })
  },

  getWXCustomer() {
    wx.setClipboardData({
        data: '18776585280',
        success: () => {
            wx.showToast({
                title: '复制微信成功',
            })
        }
    })
  },

  updateInfo() {
    if (this.data.hasUserInfo) {
        wx.navigateTo({
            url: '../updateInfo/updateInfo',
        })
    }
  },

  getPhoneNumber(e) {
    console.log(e);
    wx.cloud.callFunction({
        name: 'getUserPhone',
        data: {
            cloudID: e.detail.cloudID,
        },
        success: (res) => {
            console.log(res);
            wx.setStorageSync('phone', res.result.list[0].data.phoneNumber);
        },
        fail: (err) => {
            console.log(err);
        }
    })
  },

    // 新接口
  getUserProfile() {
    wx.getUserProfile({
        desc: '获取用户信息',
        success: (res) => {
            this.setData({
                userInfo: res.userInfo,
                hasUserInfo: true
            })
            wx.setStorageSync('userInfo', res.userInfo);
        }
    })
  },

   // 老接口
  getUserInfo(e) {
    this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
      if (wx.getUserProfile) {
        this.setData({
            canIUseGetUserProfile: true
        })
      }
      const userInfo = wx.getStorageSync('userInfo');
      this.setData({
          hasUserInfo: !!userInfo,
          userInfo: userInfo,
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.onLoad();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})