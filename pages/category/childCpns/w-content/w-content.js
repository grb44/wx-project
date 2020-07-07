// pages/category/childCpns/w-content/w-content.js
const type =['pop','new','sell']
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    subcategories:{
         type:Array
    },
    categoryDetail:{
      type:Array
    }
  },

  data: {
    currentIndex:0

  },
  lifetimes:{
    ready(){

    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tabClick(e) {
      console.log(this.properties.categoryDetail)

  }}
})
