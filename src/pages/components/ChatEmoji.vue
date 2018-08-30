<template>
  <div class="m-chat-emoji">
    <div class="emoji-content">
      <div class="cnt">
        <span class="emoji-item" :class="{'pinup-item':item.type==='pinup'}" v-for="item in currEmoji.list" @click.stop="selectEmoji(item)">
          <img :src="item.img">
        </span>
      </div>
    </div>
    <div class="emoji-channel">
      <span class="emoji-album" :class="{active: item.name==currAlbum}" v-for="item in emoji" @click.stop="selectAlbum(item)">
        <img :src="item.album">
      </span><span v-if="type==='session'" class="emoji-album" :class="{active: item.name==currAlbum}" v-for="item in pinup" @click.stop="selectAlbum(item)">
        <img :src="item.album">
      </span>

        <span class="u-editor-send" @click.stop="sendTextMsg">发 送</span>
      </span>
    </div>
  </div>
</template>

<script>
import emojiObj from '../../configs/emoji'

function genEmojiList (type, emojiList) {
  let result = {}
  for (let name in emojiList) {
    let emojiMap = emojiList[name]
    let list = []
    for (let key in emojiMap) {
      list.push({
        type,
        name,
        key,
        img: emojiMap[key].img
      })
    }
    if (list.length > 0) {
      result[name] = {
        type,
        name,
        list,
        album: list[0].img
      }
    }
  }
  return result
}

export default {
  props: {
    type: String,
    scene: String,
    to: String
  },
  data () {
    return {
      currType: 'emoji',
      currAlbum: 'emoji'
    }
  },
  computed: {
    emoji () {
      return genEmojiList('emoji', emojiObj.emojiList)
    },
    pinup () {
      return genEmojiList('pinup', emojiObj.pinupList)
    },
    currEmoji () {
      if (this.currType === 'emoji') {
        return this.emoji[this.currAlbum]
      } else if (this.currType === 'pinup') {
        return this.pinup[this.currAlbum]
      }
      return []
    }
  },
  methods: {
    sendTextMsg(){
      this.$emit('send-msg')
    },
    selectAlbum (album) {
      this.currType = album.type
      this.currAlbum = album.name
    },
    selectEmoji (emoji) {
      if (this.currType === 'emoji') {
        // 由触发父组件事件，增加表情文案
        this.$emit('add-emoji', emoji.key)
      } else if (this.currType === 'pinup') {
        if (this.type === 'session') {
          this.$store.dispatch('sendMsg', {
            type: 'custom',
            scene: this.scene,
            to: this.to,
            pushContent: '[贴图表情]',
            content: {
              type: 3,
              data: {
                catalog: this.currAlbum,
                chartlet: emoji.key
              }
            }
          })
        } else if (this.type === 'chatroom') {
          this.$store.dispatch('sendChatroomMsg', {
            type: 'custom',
            pushContent: '[贴图表情]',
            content: {
              type: 3,
              data: {
                catalog: this.currAlbum,
                chartlet: emoji.key
              }
            }
          })
        }
        this.$emit('hide-emoji')
      }
    }
  }
}
</script>

<style lang="less">
@rem: 50rem;
  .m-chat-emoji {
    display: flex;
    flex-direction: column;
    height: 398/@rem;
    // height: 448/@rem;
    left: 0;
    width: 100%;
    border-top: 1px solid #d5d5d5;
    background-color: #ffffff;
    // 表情下面的选项卡
    .emoji-channel {
      display: flex;
      // justify-content: flex-end;
      position: relative;
      // width: 100%;
      // height: 70/@rem;
      border: 1px solid #d5d5d5;
      .u-editor-send{ // 发送按钮
        position: absolute;
        right:0;
        // justify-content: flex-end;
        width: 100/@rem;
        height: 70/@rem;
        color: #fff;
        background-color: #0079ff;
        font-size: 24/@rem;
        line-height: 70/@rem; 
        text-align: center;
      }
      .emoji-album { // 筛选表情
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100/@rem;
        height: 70/@rem;
        border-right: 1px solid #d5d5d5;
        img {
          display: block;
          width: 56/@rem;
          height:56/@rem;
        }
        &.active {
          background-color: #f0f0f0;
        }
      }
    }
    .emoji-content {
      flex:1;
      position: relative;
      width: 100%;
      // height: 400/@rem;
      height: 350/@rem;
      overflow-y: auto;
      .cnt {
        position: relative;
        display: block;
        margin: 34/@rem auto;
        text-align: left;
      }
      .emoji-item {
        display: inline-block;
        width: 64/@rem;
        height: 60/@rem;
        padding: 6/@rem 8/@rem;
        vertical-align: middle;
        /*border: 1px solid #fff;*/
        /*margin-left: -1px;*/
        /*margin-bottom: -1px;*/
        img {
          width: 48/@rem;
          height: 48/@rem;
        }
      }
      .pinup-item {
        width: 100/@rem;
        height: 104/@rem;
        img {
          width: 88/@rem;
          height: 88/@rem;
        }
      }
    }

    @media screen and (min-width: 300px) and (max-width: 420px) {
      .emoji-content .cnt {
        width: 300px;
      }
    }

    @media screen and (min-width: 420px) and (max-width: 600px) {
      .emoji-content .cnt {
        width: 420px;
      }
    }

    @media screen and (min-width: 600px) and (max-width: 720px) {
      .emoji-content .cnt {
        width: 600px;
      }
    }

    @media screen and (min-width: 720px) and (max-width: 1080px) {
      .emoji-content .cnt {
        width: 720px;
      }
    }

    @media screen and (min-width: 1080px){
      .emoji-content .cnt {
        width: 1080px;
      }
    }
  }
</style>
