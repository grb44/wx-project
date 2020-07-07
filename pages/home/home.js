import {
  getMultiData,
  getGoodsData,
  getCategoryDetail


} from '../../service/home.js'

const types = ['pop','new','sell']
const TOP_DISTANCE = 1000;

Page({


  data: {
    banners:[],
    recommends:[],
    titles:['流行','新款','精选'],
    goods:{
      pop:{page:0, list:[]},
      new:{page:0, list:[]},
      sell:{page:0, list:[]}
    }  ,
    currenType:'pop',
    showBckTop:false ,
    isTabFixed:false
  },
  onLoad: function (options) {  
   this._getMultiData()   


   this._getGoodsData('pop')
   this._getGoodsData('new')
   this._getGoodsData('sell')
    
  },
  //.....................网络请求..............
  _getMultiData(){
    getMultiData().then(res =>{
    
      const banners = res.data.data.banner.list;
      const recommends = res.data.data.recommend.list;
      this.setData({
        banners,
        recommends    
      })
    })
  }, 
  _getGoodsData(type) {
    const page = this.data.goods[type].page + 1;
    getGoodsData(type, page).then(res=>{
      // console.log(res)
      const list = res.data.data.list;
      const oldList = this.data.goods[type].list;  
      oldList.push(...list)
      const typeKey = `goods.${type}.list`;
      const pageKey = `goods.${type}.page`;
      this.setData({
      [typeKey] : oldList,
      [pageKey] : page
      })
    })
  
  },
  //.....................事件监听..............
  handleTabClick(event){
    const index = event.detail.index;
    this.setData({
      currenType:types[index]
    })
  },
  onReachBottom(){
    this._getGoodsData(this.data.currenType)
  },
 
  onPageScroll(options){
    const scrollTop = options.scrollTop;
    const flag = scrollTop >=TOP_DISTANCE;
    if(flag!= this.data.showBckTop){
      this.setData({
        showBckTop:flag
      })

    }
    

  }
})