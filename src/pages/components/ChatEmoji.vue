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

        <!-- <span class="u-editor-send" @click="sendTextMsg">发 送</span> -->
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
*{
  box-sizing: border-box;
}
  .m-chat-emoji {
    display: flex;
    flex-direction: column;
    height: 448/@rem;
    left: 0;
    width: 100%;
    border-top: 1px solid #d5d5d5;
    background-color: #ffffff;
    .emoji-channel {
      justify-content: flex-end;
      position: relative;
      width: 100%;
      height: 48/@rem;
      margin: 0 30/@rem;
      .u-editor-send{
        float: right;
        width: 28/@rem;
        height:28/@rem;
        color: #fff;
        background-color: #0091e4;
      }
      .emoji-album {
        display: inline-block;
        padding: 1px 3px;
        width: 42/@rem;
        height: 42/@rem;
        border-right: 1px solid #d5d5d5;
        img {
          margin: 0;
          display: block;
          width: inherit;
          height: inherit;
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
      height: 400/@rem;
      overflow-y: auto;
      .cnt {
        position: relative;
        display: block;
        margin: 0.4rem auto;
        text-align: left;
      }
      .emoji-item {
        display: inline-block;
        width: 44/@rem;
        height: 44/@rem;
        padding: 4px;
        vertical-align: middle;
        /*border: 1px solid #fff;*/
        /*margin-left: -1px;*/
        /*margin-bottom: -1px;*/
        img {
          width: inherit;
          height: inherit;
        }
      }
      .pinup-item {
        width: 44px;
        height: 44px;
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
