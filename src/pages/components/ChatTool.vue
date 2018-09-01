<template>
    <div class="chat-tool">
        <div class="tool-content">
            <div class="tool-wrap">
    <!--<span v-if="!isRobot" class="u-editor-icon u-editor-plus" @change="sendFileMsg">
          <i class="u-icon-img"><img :src="icon2"></i>
          <input type="file" ref="fileToSent">
        </span> -->
                <span class="tool-item" @change="sendFileMsg">
                    <img :src="icon1">
                    <input type="file" ref="fileToSent">
                </span>
                <span class="tool-des">照片</span>
            </div>
            <div class="tool-wrap">
                <span class="tool-item">
                    <img :src="icon2">
                </span>
                <span class="tool-des">拍照</span>
                <input type="file" accept="image/*" capture="camera">
            </div>
            <!-- <div class="tool-wrap">
                <span class="tool-item">
                    <img :src="icon1">
                </span>
                <span class="tool-des">优惠券</span>
            </div>
            <div class="tool-wrap">
                <span class="tool-item">
                    <img :src="icon1">
                </span>
                <span class="tool-des">品牌</span>
            </div> -->
        </div>
    </div>
</template>
<script>
import config from '../../configs'
export default {
    name: 'ChatTool',
    props:{
        type: String,
        scene: String,
        to: String
    },
    data(){
        return {
            icon1: `${config.resourceUrl}/im/chat-editor-1.png`,
            icon2: `${config.resourceUrl}/im/chat-editor-2.png`
        }
    },
    methods:{
        sendFileMsg () {
            if (this.invalid) {
                this.$toast(this.invalidHint)
                return
            }
            let ipt = this.$refs.fileToSent
            if (ipt.value) {
                if (this.type === 'session') {
                this.$store.dispatch('sendFileMsg', {
                    scene: this.scene,
                    to: this.to,
                    fileInput: ipt
                })
                } else if (this.type === 'chatroom') {
                this.$store.dispatch('sendChatroomFileMsg', {
                    fileInput: ipt
                })
                }
            }
            }
    }

}
</script>
<style lang="less" scoped>
@rem: 50rem;

.chat-tool {
    display: flex;
    flex-direction: column;
    // height: 448/@rem;
    height: 398/@rem;
    width: 100%;
    border-top: 1px solid #d5d5d5;
    background-color: #ffffff;
    .tool-content{
        width: 100%;
        display: flex;
        justify-content: space-around;
        // justify-content: space-between;
        padding: 0 60/@rem 35/@rem; 
        .tool-wrap{
            display: flex;
            flex-direction: column;
            margin-top:30/@rem;
            input[type="file"] {
                position: absolute;
                display: inline-block;
                left: 0;
                top: 0;
                width: inherit;
                height: inherit;
                opacity: 0;
                font-size: 16/@rem;
            }
        }
        .tool-item{
            position: relative;
            width: 120/@rem;
            height: 120/@rem;
            border-radius: 26/@rem;
            border:1px solid #d9d9d9;
            display: flex;
            justify-content: center;
            align-items: center; 
            img{
                width: 60/@rem;
                height: 60/@rem;
            }
        
        }   
        .tool-des{
            display: inline-block;
            font-size: 22/@rem;
            color: #666666;
            line-height:22/@rem;
            margin-top: 19/@rem;
            text-align: center;
        }  
    }
}
</style>

