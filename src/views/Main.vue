<script >
import {useRouter} from 'vue-router'
import { ref } from 'vue';
export default{
    data() {
        return {
        categories:[],
        props: ['categories']

        };

    },

    setup(){
        function log(){
            console.log("clicked");
        }


        return{
            log
            
        }

    },
    computed:{
        getcount(){
            return this.categories.slice(0,3);
        }

    },
    mounted() {
    
        fetch('http://localhost:3000/categories')
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
            <h1>Категория запросов по городам</h1>
        </div>


        <div class="main">
            <div class="info">
                <h5>Сайт "QYZMET" для города является важным инструментом для поддержания связи с жителями и общественностью, для предоставления информации о городе и его жизни</h5>
            </div>

            <div class="popular">
                <div class="title">
                    <h4>Часто представленные:</h4>
                </div>

                <div class="popcategories">
                    
                    <div class="popcategory" v-for="category in getcount" :key="category.id">
                        <router-link :to="{ name: 'subcategories', params: { categoryId: category.id } }">
                        
                        <div class="image">
                        <img :src="'http://localhost:3000/images/' + category.image" alt="" srcset="">
                    </div>
                      

                      <div class="txt">
                        <h4>{{ category.name }}</h4>
                      </div>
                        </router-link>
                    </div>
                </div>

            </div>


            <div class="maincat">
                <div class="title">
                    <h4>Чтобы отправить новый запрос на обслуживание, начните с выбора категории ниже:</h4>
                </div>

                <div class="categories">
                    <div class="category" v-for="category in categories" @click="log" :key="category.id">
                        <router-link :to="{ name: 'subcategories', params: { categoryId: category.id } }">
                            <!-- {{ category.name }} -->
                         
                            <div class="image">
                        <img :src="'http://localhost:3000/images/' + category.image" alt="" srcset="">
                      </div>
                      

                      <div class="txt">
                        <h4>{{ category.name }}</h4>
                      </div>
                        </router-link>
                        
                     
                        
                    </div>
                </div>

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
.header h1{
 font-size: 24px;
}
.main{
    margin-top: 1rem;
    
}
.main .popular{
    margin-top: 1rem;
}

.popcategories{
   
    margin: 0.5rem;
    flex-wrap: wrap;
    display: flex;
    flex-direction: row;
    width: 100%;
}
.popcategory{
   
  margin: 1rem;
  width: 10rem;
  height: 6rem;
  background: #FFFFFF;
  border-bottom: 1px solid #A4A4A4;
  border-radius: 15px;
}
.popcategory .txt{
    text-align: center;

}

.popcategory .image{
    display: flex;
    justify-content: center;
}
.popcategory .image img{
    width: 4rem;
}
.popcategory h4{
    font-size: 12px;
}

a{
    font-size: 15px;
    text-decoration: none;
    color: black;
}




.categories{
   
    margin: 1rem;
    flex-wrap: wrap;
    display: flex;
    flex-direction: row;
    width: 100%;
}
.category{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem;
  width: 14rem;
  height: 10rem;
  background: #FFFFFF;
  border-bottom: 1px solid #A4A4A4;
  border-radius: 15px;
}
.category .txt{
    text-align: center;

}

.category .image{
    display: flex;
    justify-content: center;
    align-items: center;
}
.category .image img{
    width: 6rem;
}
.category:hover{
    cursor: pointer;
}


</style>