import{
  getCategory,
  getSubcategory,
  getCategoryDetail
}from'../../service/category.js'


Page({

  data: {
    categories:[],
    categoryData:{},
    currentIndex:0
  },
  onLoad: function (options) {
    this._getCategory() 
  },
  // _getData(){
  //   _getCategory()
  // },
  _getCategory(){
    getCategory().then(res => {
      
      const categories = res.data.category.list

      const categoryData = {}
      for(let i=0;i < categories.length;i++){
        categoryData[i] = {
          subcategories:[],
          categoryDetail:[]
        }
      }

      this.setData({
        categories:res.data.category.list,
        categoryData:categoryData
      })

      this._getSubcategory(0)

      this._getCategoryDetail(0)
    })
  },
  _getSubcategory(currentIndex){
    const maitkey = this.data.categories[currentIndex].maitKey;
    getSubcategory(maitkey).then(res=>{
      const tempCategoryData = this.data.categoryData;
      tempCategoryData[currentIndex].subcategories = res.data.list;
      this.setData({
        categoryData: tempCategoryData
      })
    })
  },


  _getCategoryDetail(currentIndex){
    const miniWallKey = this.data.categories[currentIndex].miniWallkey;

    this._getRealCategoryDetail(currentIndex, miniWallKey, 'pop')

  },
  _getRealCategoryDetail(index, miniWallKey, type){
    getCategoryDetail(miniWallKey, type).then(res=>{
      const categoryData = this.data.categoryData;
      categoryData[index].categoryDetail = res;
      this.setData({
        categoryData: categoryData
      })

    })

  },
  menuClick(e){
    const currentIndex = e.detail.currentIndex;
    this.setData({
      currentIndex
    })
    this._getSubcategory(currentIndex);
    this._getCategoryDetail(currentIndex)

    
  },

  
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})