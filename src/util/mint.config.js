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
            duration: 3000,
            iconClass: !success ? ' this-icon mintui-success' : ''
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
    confim(msg) {
        return MessageBox.confirm(msg);
    }
}