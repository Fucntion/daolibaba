import { MessageBox, Toast, Indicator } from 'mint-ui';
 
export default {
    alertMsg(msg) {
        Toast({
            message: msg,
            duration: 3000
        });
    },
    messagesBox(msg, success) {
        Toast({
            message: msg,
            duration: 33000,
            iconClass: !success ? 'iconfont icon-tipssuccess' : 'iconfont icon-cuowuhttp'
        });
    },
    loading(msg) {
        Indicator.open({
            text: msg || '加载中...',
            spinnerType: 'fading-circle'
        });
    },
    close() {
        Indicator.close();

    },
    confirm(msg) {
        return MessageBox.confirm(msg);
    }
}