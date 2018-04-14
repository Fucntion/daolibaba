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
        methods: (str,len) => {
            return str.slice(0,len);
        }
    },
    {
        name:'filtermoney',
        methods:(value)=>{
            return "￥" + value;
        }
    },
    {
        name:'cutPrice',
        methods(str,idx){
            str +=''
            
            var index = str.indexOf('.');
            
            if(index<0){
                if(idx==0){
                    return str;    
                }
                return '';
            }
            var rt =null;
            if(idx==0){
                rt = str.substr(0,index);
                
            }
            if(idx==1){
                rt =str.substr(index)
               
            }
            
            return rt
           
        }
    }

];