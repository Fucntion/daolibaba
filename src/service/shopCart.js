import {setStore, getStore} from '../util/utils';

export default {
  orderdetail: {
    username: "",
    phone: "",
    address: "",
    zipcode: "",
    totalNumber: 0,
    totalAmount: 0.0
  },
  //向购物车中添加商品
  addProduct: function (mall) {

    var ShoppingCart = getStore("ShoppingCart");
    console.log(typeof ShoppingCart)
    if (ShoppingCart === null ||ShoppingCart === 'null' || ShoppingCart == "") {
      //第一次加入商品
      // {"mallid":mall.mallid,'goodsid':mall.goodsid,"title":mall.title,"number":mall.number,"price":mall.price,'spec':mall.specInfo}
      var jsonstr = {"productlist": [mall], "totalNumber": mall.number, "totalAmount": (mall.price * mall.number)};
      console.log(JSON.stringify(jsonstr))
      setStore("ShoppingCart", "'" + JSON.stringify(jsonstr));
    } else {
      var jsonstr = JSON.parse(ShoppingCart.substr(1, ShoppingCart.length));
      var productlist = jsonstr.productlist;
      var result = false;
      //查找购物车中是否有该商品
      for (var i in productlist) {
        if (productlist[i].mallid == mall.mallid) {
          productlist[i].number = parseInt(productlist[i].number) + parseInt(mall.number);//存在就加数量
          result = true;
        }
      }
      if (!result) {   //没有该商品就直接加进去
        productlist.push(mall);
        // {"mallid":mall.mallid,'goodsid':mall.goodsid,"title":mall.title,"number":mall.number,"price":mall.price,'spec':mall.specInfo}
      }


      //重新计算总价
      jsonstr.totalNumber = parseInt(jsonstr.totalNumber) + parseInt(mall.number);
      jsonstr.totalAmount = parseFloat(jsonstr.totalAmount) + (parseInt(mall.number) * parseFloat(mall.price));
      this.orderdetail.totalNumber = jsonstr.totalNumber;
      this.orderdetail.totalAmount = jsonstr.totalAmount;
      //保存购物车
      setStore("ShoppingCart", "'" + JSON.stringify(jsonstr));
    }
  },
  //修改给买商品数量
  updateProductNum: function (mallid, number) {
    var ShoppingCart = getStore("ShoppingCart");
    var jsonstr = JSON.parse(ShoppingCart.substr(1, ShoppingCart.length));
    var productlist = jsonstr.productlist;
    for (var i in productlist) {
      if (productlist[i].mallid == mallid) {
        jsonstr.totalNumber = parseInt(jsonstr.totalNumber) + (parseInt(number) - parseInt(productlist[i].number));
        jsonstr.totalAmount = parseFloat(jsonstr.totalAmount) + ((parseInt(number) * parseFloat(productlist[i].price)) - parseInt(productlist[i].number) * parseFloat(productlist[i].price));
        productlist[i].number = parseInt(number);
        this.orderdetail.totalNumber = jsonstr.totalNumber;
        this.orderdetail.totalAmount = jsonstr.totalAmount;
        setStore("ShoppingCart", "'" + JSON.stringify(jsonstr));
        return;
      }
    }
  },
  //获取购物车中的所有商品
  getProductList: function () {
    var ShoppingCart = getStore("ShoppingCart");
    if (!ShoppingCart) {
      return null
    }
    var jsonstr = JSON.parse(ShoppingCart.substr(1, ShoppingCart.length));
    var productlist = jsonstr.productlist;
    var companyList = [];
    productlist.map(function (product) {
      let existCompay = false, index = 0;
      for (var i = 0; i < companyList.length; i++) {
        if (companyList[i].id == product.company.id) {
          existCompay = true;
          index = i
        }
      }


      product.select = true;//默认全部都是选中的哦
      product.company.select = true;

      if (product.group) {

        if (product.group.now > product.group.end_time) {
          product.select = false;
          product.company.select = false;
          product.company.disabled = false;
          product.disabled = true;
        }

        if (product.group.now < product.group.start_time) {
          product.select = false;
          product.company.select = false;

          product.disabled = true;
        }

      }

      //存在相同的企业
      if (existCompay) {
        companyList[index].malls.push(product)
      } else {
        //公司也是默认全选的
        companyList.push({id: product.company.id, title: product.company.company, select:product.company.select, malls: [product]})
      }

    })

    this.orderdetail.totalNumber = jsonstr.totalNumber;
    this.orderdetail.totalAmount = parseInt(jsonstr.totalAmount * 100) / 100;
    return companyList;
  },

  //不传id则判断购物车中是否存在商品，传id则判断购物车中是否存在某种商品
  existProduct: function (mallid) {
    var ShoppingCart = getStore("ShoppingCart");
    var jsonstr = JSON.parse(ShoppingCart.substr(1, ShoppingCart.length));
    var productlist = jsonstr.productlist;
    var result = false;
    if (mallid != null) {
      for (var i in productlist) {
        if (productlist[i].mallid == mallid) {
          result = true;
        }
      }
    } else {
      if (productlist.length > 0) {
        result = true;
      }
    }
    return result;
  },
  //不传id则删除购物车中所有商品，传id则删除某种商品
  clearProduct: function (mallid) {
    var ShoppingCart = getStore("ShoppingCart");
    var jsonstr = JSON.parse(ShoppingCart.substr(1, ShoppingCart.length));
    var productlist = jsonstr.productlist;
    var list = [];
    if (mallid != null) {
      for (var i in productlist) {
        if (productlist[i].mallid == mallid) {
          jsonstr.totalNumber = parseInt(jsonstr.totalNumber) - parseInt(productlist[i].number);
          jsonstr.totalAmount = parseFloat(jsonstr.totalAmount) - parseInt(productlist[i].number) * parseFloat(productlist[i].price);
        } else {
          list.push(productlist[i]);
        }
      }
    }
    jsonstr.productlist = list;
    this.orderdetail.totalNumber = jsonstr.totalNumber;
    this.orderdetail.totalAmount = jsonstr.totalAmount;
    setStore("ShoppingCart", "'" + JSON.stringify(jsonstr));
  }
};

// product={
//     id:0,
//     name:"",
//     num:0,
//     price:0.0,
// };
