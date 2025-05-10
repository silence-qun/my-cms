// pages/home-profile/index.js
import { getUserInfo } from '../../service/api_login'

Page({
  data: {},

  handleGetUser: async function () {
    const userInfo = await getUserInfo()
    console.log(userInfo)
  },

  handleGetPhoneNumber: function (event) {
    console.log(event.detail.code)  // 动态令牌
  }
})