/*
 * 会话列表
 */
import store from '../'

// 如果会话对象不是好友，需要更新好友名片
function updateSessionAccount (sessions) {
  let accountsNeedSearch = []
  sessions.forEach(item => {
    if (item.scene === 'p2p') {
      // 如果不存在缓存资料
      if (!store.state.userInfos[item.to]) {
        accountsNeedSearch.push(item.to)
      }
    }
  })
  if (accountsNeedSearch.length > 0) {
    store.dispatch('searchUsers', {
      accounts: accountsNeedSearch
    })
  }
}


// onSessions只在初始化完成后回调
export function onSessions (sessions) {
  updateSessionAccount(sessions)
  store.commit('updateSessions', sessions)

  let content = {
    type: 8, // 自定义消息类型为5，此处的消息类型必须和其他平台的图文消息类型一致
    data: {
      // title: brandInfo.title, // 消息标题
      // describe: brandInfo.describe, // 消息描述
      // link_url: brandInfo.link_url, // 点击跳转的URL
      // image_url: brandInfo.image_url // 消息中的图片地址
      title: '暖冬季欢乐送', // 消息标题
      describe: '家具满1000元减100元再返100元现金券！点击查看详情！', // 消息描述
      link_url: 'https://www.jianshu.com/p/dadd344b6413', // 点击跳转的URL
      image_url: 'https://netease.im/res/image/download/section1.png?v=002' // 消息中的图片地址
    }
  };
  // console.log(content)
  // store.commit('sendMsg01', {
  //   type: 'custom',
  //   scene: 'p2p',
  //   to: 'a2940bf18c1c49a08d5738ab4f5b2eac',
  //   // pushContent: this.pushContent,
  //   content: content
  // });
 
}


export function onUpdateSession (session) {
  let sessions = [session]
  updateSessionAccount(sessions)
  store.commit('updateSessions', sessions)
}

export function deleteSession ({state, commit}, sessionId) {
  const nim = state.nim
  sessionId = sessionId || ''
  let scene = null
  let account = null
  if (/^p2p-/.test(sessionId)) {
    scene = 'p2p'
    account = sessionId.replace(/^p2p-/, '')
  } else if (/^team-/.test(sessionId)) {
    scene = 'team'
    account = sessionId.replace(/^team-/, '')
  }
  if (account && scene) {
    nim.deleteSession({
      scene,
      to: account,
      done: function deleteServerSessionDone (error, obj) {
        if (error) {
          alert(error)
          return
        }
        nim.deleteLocalSession({
          id: sessionId,
          done: function deleteLocalSessionDone (error, obj) {
            if (error) {
              alert(error)
              return
            }
            commit('deleteSessions', [sessionId])
          }
        })
      }
    })
  }
}

export function setCurrSession ({state, commit, dispatch}, sessionId) {
  const nim = state.nim
  if (sessionId) {
    commit('updateCurrSessionId', {
      type: 'init',
      sessionId
    })
    if (nim) {
      // 如果在聊天页面刷新，此时还没有nim实例，需要在onSessions里同步
      nim.setCurrSession(sessionId)
      commit('updateCurrSessionMsgs', {
        type: 'init',
        sessionId
      })
      // 发送已读回执
      dispatch('sendMsgReceipt')
    }
  }
}

export function resetCurrSession ({state, commit}) {
  const nim = state.nim
  nim.resetCurrSession()
  commit('updateCurrSessionMsgs', {
    type: 'destroy'
  })
}
