<script >
import {useRouter} from 'vue-router'
import { ref } from 'vue';
export default{
    data() {
        return {
        categories:[],
        props: ['id'],
        filter: '',
        dates: [
        { value: 'day', text: 'День' },
        { value: 'week', text: 'Неделя' },
        { value: 'month', text: 'Месяц' },]

        };

    },
    methods: {
        async setFilter() {
      const response = await fetch(`http://localhost:3000/ind/${this.filter}`)
      const data = await response.json()
      this.categories = data;
      console.log(this.categories)
    },
    },

   
    mounted() {
    
        fetch('http://localhost:3000/indicators')
        .then((response) => response.json())
        .then((data) => {
          this.categories = data;
          console.log(this.categories)
        });



    },
}


</script>

<template>

<main>
    <div class="container">
        <div class="header">
            <h1>Показатели</h1>

            Всего заявок было: {{categories.total}}
            <select v-model="filter" @change="setFilter" style="margin-left:20px">
            <option value="" disabled selected>Выберите период</option>
                <option v-for="(date,i) in dates" :value="date.value" :key="i" > {{date.text}}</option> 
            
            </select>
        </div>
        <div class="categories">
          <div class="category" v-for="category in categories.data" @click="log" :key="category.id">
              <router-link :to="{ name: 'subindicators', params: { id: category.id } }">
                  <!-- {{ category.name }} -->
              
                  <div class="image">
                    <div class="imgInner">
                    
                    <div>    
                        <img :src="'http://localhost:3000/images/' + category.image" alt="" srcset="">
                    </div>
                    <div class="imgtxt">
                        <h4>
                      {{ category.num_requests }}
                        </h4>
                     </div>
                    </div>
            </div>
            

            <div class="txt">
              <h4>{{ category.name }}</h4>
            </div>
              </router-link>
              
      
              
          </div>
      </div>


        
        
    </div>
</main>




</template>


<style scoped>

.header{
    border-style: solid;
    border-color: black;
    border-width: 0 0 3px 0;
    border-radius: 0 0 10px 10px;
    padding: 3px;
}
.main{
    margin-top: 1rem;
    
}
.main .popular{
    margin-top: 1rem;
}





.categories{
   
    margin: 1rem;
    flex-wrap: wrap;
    display: flex;
    flex-direction: row;
    width: 100%;
}
.category{
   
  margin: 1rem;
  width: 15rem;
  height: 12rem;
  background: #FFFFFF;
  border-bottom: 1px solid #A4A4A4;
  border-radius: 15px;
}
.category .txt{
    font-size: 14px;
    text-align: center;

}

.category .image{
    margin-top: 1rem;
    display: flex;
    justify-content: center;
}
.category .image img{
    width: 7rem;

}

.category:hover{
    cursor: pointer;
}

.imgtxt{
    position: relative;
    top: -7rem;
    left: 8rem;
}
a{
    text-decoration: none;
    color: black;
}

</style>