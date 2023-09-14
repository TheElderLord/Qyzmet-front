<script>
export default {
  props: ['categoryId'],
  data() {
    return {
      subcategories: []
    }
  },
  created() {
    this.fetchSubcategories()
  },
  methods: {
    async fetchSubcategories() {
      const response = await fetch(`http://localhost:3000/categories/${this.categoryId}`)
      const data = await response.json()
      this.subcategories = data

      // Add a showDesc property to each subcategory object and set it to false by default
      this.subcategories.forEach(subcategory => {
        subcategory.subcategories.forEach(item=>{
        item.showDesc = false
        console.log(item.name)
        console.log(item.showDesc)

      });
        
      })
    },
    toggleDesc(subcategory) {
        
      // Toggle the showDesc property value for the clicked subcategory
      subcategory.showDesc = !subcategory.showDesc
      
    }
  }
}
</script>

<template>
    <main>
      <div class="title">
        <div v-for="subcategory in subcategories" :key="subcategory.id">
          <h1>{{ subcategory.name }}</h1>
        </div>
      </div>
  
      <div class="subcategories" v-for="subcategory in subcategories" :key="subcategory.id">
        
        <div class="subcategory" v-for="item in subcategory.subcategories" :key="item.id"  @click="toggleDesc(item)">
        
          <div class="txt">
            <h4>{{ item.name }}</h4>
            
           
          </div>
  
          <div class="desc" v-show="item.showDesc" :class="{ expanded: item.showDesc }">
           
            <!-- <h5>{{ item.desc }}</h5> -->
           <div class="txt">
                {{item.desc}}
           </div>
           <div class="createbut">
            <router-link :to="{ name: 'createpost', params: { categoryId: subcategory.id , subcategoryId:item.id, subcategoryName:item.name } }">
          
                Создать запрос
              </router-link>
           </div>
          
          </div>
       
        </div>
        
      </div>
    </main>
  </template>
  
 
  
  
<style scoped>
.title{
    margin: 2rem;
}
.subcategories{
    margin: 1rem;
    flex-wrap: wrap;
    display: flex;
    flex-direction: column;
    width: 100%;
}
.subcategory{
   
   margin: 1.5rem;
   margin-top: 3rem;
   width: 90%;
   height: 3rem;
   background: #FFFFFF;
   border-bottom: 1px solid #A4A4A4;
   border-radius: 15px 15px 0 0 ;
   font-size: 22px;
 }
 .subcategory .txt{
    display: flex;
    align-items: center;
    text-align: left;
    margin-left: 2rem;
    margin-top: 0.5rem;

}

.subcategory .image{
    display: flex;
    justify-content: center;
}
 

 .subcategory .image img{
    width: 12rem;
}
.subcategories .subcategory .desc{
    border-radius: 0 0 15px 15px;
    background-color: rgb(255, 255, 255);
    
}
.subcategories .subcategory .desc .createbut a{
   
    color: rgb(255, 255, 255);
    padding: 0.3rem;
    width: 20rem;
    height: 3rem;
    text-decoration: none;
    margin-left: 2rem;
    font-size: 22px;
    border: 2px solid #129f62;
    background-color: rgb(33, 191, 117);
    border-radius: 1rem;
    
   
    
}
.subcategories .subcategory .desc .createbut{
  margin-top: 0.5rem;
}
.desc{
  height: 4rem;
  font-size: 18px;
}
.desc.expanded{
  margin-bottom: 2rem;
  padding-bottom: 2rem;
}


</style>
  