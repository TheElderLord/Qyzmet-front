<script >
import {useRouter} from 'vue-router'
import { ref } from 'vue';
import axios from 'axios';
export default{
    data() {
        return {
        categories:[],

        };

    },
    methods: {
    async downloadExcel(val) {
      try {
        const response = await axios.get(`http://localhost:3000/download-excel/${val}`, {
          responseType: 'blob',
        });
        console.log(response)

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'data.xlsx');
        document.body.appendChild(link);
        link.click();

      } catch (error) {
        console.error(error);
        alert('An error occurred while downloading the Excel file');
      }
    }
  },

    setup(){
      //  const download= async(val)=>{
      //     axios.post(`http://localhost:3000/download-excel/${val}`, {
            
      //     })
      //  }

        return{
            // download
            
        }

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
            <h1>Скачать</h1>

            Всего заявок было: {{categories.total}}
        </div>
        <div class="categories">
          <div class="category" v-for="category in categories.data" 
           :key="category.id" @click="downloadExcel(category.id)">
              
                  <div class="image">
                    
                    <img :src="'http://localhost:3000/images/' + category.image" alt="" srcset="">
                    
            </div>
            

            <div class="txt">
              <h4>{{ category.name }}</h4>
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
.main{
    margin-top: 2rem;
    
}
.main .popular{
    margin-top: 2rem;
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
  height: 10rem;
  background: #FFFFFF;
  border-bottom: 1px solid #A4A4A4;
  border-radius: 15px;
}
.category .txt{
    text-align: center;
    font-size: 14px;


}

.category .image{
    display: flex;
    justify-content: center;
}
.category .image img{
    width: 7rem;
}
.category:hover{
    cursor: pointer;
}


</style>