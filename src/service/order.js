import {setStore,getStore} from '../util/utils';

export default {
    totalNumber:0,
    totalAmount:0.0,
    buyer:{
        username:"",
        phone:"",
        address:"",
        zipcode:""
    },
    //获取购物车中的所有商品
    getProductList:function(){

        var ConfirmOrder = getStore("ConfirmOrder");
        if(!ConfirmOrder){
            return null
        }
        var jsonstr = JSON.parse(ConfirmOrder.substr(1,ConfirmOrder.length));
        let totalNumber=0,totalAmount = 0;
        jsonstr.map(function(company){
            let companyAmountTotal = 0,companyFeeTotal=0;
            company.malls.map(function(mall){
                mall.fee=0;//运费
                totalNumber++;
                companyFeeTotal += mall.fee;
                totalAmount+= parseInt(mall.number)*parseFloat(mall.price);
                companyAmountTotal+= parseInt(mall.number)*parseFloat(mall.price);
            })
            company.amountTotal=companyAmountTotal
            company.feeTotal = companyFeeTotal
        })

        this.totalNumber = totalNumber;
        this.totalAmount = parseInt(totalAmount*100)/100;
        return jsonstr;
    },
    //清空所有商品
    clearProduct:function(){
        setStore("ConfirmOrder",null);
        setStore("ShoppingCart",null);
    }
};

// product={
//     id:0,
//     name:"",
//     num:0,
//     price:0.0,
// };
