export default [
  {
    //截取银行卡的后四位
    // name: 'cardFormat',
    // methods: (value) => {
    //     return value.slice(-4);
    // }
  },
  {
    //截取银行卡的后四位
    name: 'cutstr',
    methods: (str, len) => {
      return str.slice(0, len);
    }
  },
  {
    name: 'filtermoney',
    methods: (value) => {
      return "￥" + value;
    }
  },
  {
    name: 'orderStauts',
    methods: (val) => {
      let str= ''
      switch (val){
        case 0:
          str = '待付款'
          break;
        case 1:
          str = '待发货'
          break;
        case 2:
          str = '待收货'
          break;
        case 4:
          str = '待评价'
          break;
        case 5:
          str = '已评价'
        case 6:
          str = '退款/售后'
        case -1:
          str = '订单失败'
          break;
        default:
          str = '状态异常'
          break;
      }

       return str;
    }
  },
  {
    name: 'cutPrice',
    methods(str, idx) {
      str += ''

      var index = str.indexOf('.');

      if (index < 0) {
        if (idx == 0) {
          return str;
        }
        return '';
      }
      var rt = null;
      if (idx == 0) {
        rt = str.substr(0, index);

      }
      if (idx == 1) {
        rt = str.substr(index)

      }

      return rt

    }
  }

];
