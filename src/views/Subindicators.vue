<script>
export default {
  props: ['id'],  
  data() {
    return {
      subindicators: [],
      filter: '',
      dates: [
        { value: 'day', text: 'День' },
        { value: 'week', text: 'Неделя' },
        { value: 'month', text: 'Месяц' },]
    }
  },
  created() {
    this.fetchSubcategories()
  },
  methods: {
    async fetchSubcategories() {
      const response = await fetch(`http://localhost:3000/indicators/${this.id}`)
      const data = await response.json()
      this.subindicators = data
      
      this.subindicators.forEach(item => {
        item.expansion = false
        
      })

      // Add a showDesc property to each subcategory object and set it to false by default
    
    },
    async setFilter() {
      const response = await fetch(`http://localhost:3000/indicators/${this.id}/${this.filter}`)
      const data = await response.json()
      this.subindicators = data
      console.log(this.subindicators)
    },
    toggleDesc(subindicator) {
        
        // Toggle the showDesc property value for the clicked subcategory
        subindicator.expansion = !subindicator.expansion
        
      }
   
  }
}
</script>


<template>
    <main>
        <div class="container">
            <div class="header">
                <h1>Показатели</h1>
                Всего {{subindicators.total}}
                <select v-model="filter" @change="setFilter" style="margin-left:20px">
                <option value="" disabled selected>Выберите период</option>
                    <option v-for="(date,i) in dates" :value="date.value" :key="i" > {{date.text}}</option>
              
              </select>
             
            </div>

            <div class="items" >

                <div class="item" @click="toggleDesc(it)" v-for="it in subindicators.data" :key="it.id">
                  <div class="inner">  
                  <div class="name">
                        <h3>{{it.name}}</h3>
                    </div>
                    <div class="right">
                    <div class="count">
                        <h3>{{it.requests.length}}</h3>
                    </div>
                    <div class="exp">
                      <span class="material-symbols-outlined">
                        expand_more
                        </span>
                    </div>
                  </div>
                </div>

                    <div class="expansion" v-show="it.expansion" :class="{ expanded: it.expansion }" :style="{ height: it.expansion ? 'auto' : '0' }">
                          <div class="info" v-for="item in it.requests" :key="item.id">
                                <div class="location">{{item.location}}</div>
                          </div>
                    </div>
                </div>
            </div>



        </div>
    </main>
    
</template>


<style lang="scss" scoped>
.items{
    margin-top: 5rem;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
}
.item{
    cursor: pointer;
    margin: 1rem;
    height: 3rem;
    width: 65vw;
    padding: .5rem;
    border-radius: 1rem;
    border: 1px solid #ccc;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
}
.name{
  text-align: left;
}
.inner{

}
.right{
  display: flex;
  justify-content: center;
  float: right;
  margin-top: -1rem;
  
}
.expansion.expanded{
  .exp{
    transform: rotate(180deg);
  }
}


</style>