<script>
    import axios from 'axios'
import { ref } from 'vue';
import DG from '2gis-maps';
    

export default {
  props: ['subcategoryId','categoryId'],
  data() {
    return {
        expands: 0,
        data:[],
        coords: [],
        map :null,
        questions:[],
        answers:[],
        colors: ['black','white','white','white'],


        name :'',
        surname :'',
        email:'',
        num:'',
        description :'',
        location :'',
   
        
    }
  },
  computed: {
    countChanged() {
      console.log(this.expands);
    }
  },
  created() {
    this.getData()
    this.initMap()
    this.getQuestions()
   
  },
 
  methods: {
    async getData() {
      const response = await fetch(`http://localhost:3000/categories/${this.categoryId}/${this.subcategoryId}`)
      const data = await response.json()
      this.data = data
      console.log(this.data[0].name)

      // Add a showDesc property to each subcategory object and set it to false by default
    
    },
    async getQuestions(){
      const response = await fetch(`http://localhost:3000/questions/${this.subcategoryId}`)
      const data = await response.json()
      this.questions = data
      
    //   console.log(this.questions)
    //   this.questions.forEach(element => {
    //     if(element.answers.length>0){
    //         element.forEach(element => {
    //             console.log(element)
    //         });
    //     }
    //   });
    },
    async initMap(){
        DG.then(() => {
        this.map = DG.map('map', {
        center: [43.238366, 76.924189],
        zoom: 13
      });
      
      
      this.map.on('click', (e) => {
        
        const latLng = e.latlng;
        const newCoords = [latLng.lat, latLng.lng];

        this.coords.forEach(marker => {
        this.map.removeLayer(marker);
          });   
        
        const newMarker = DG.marker(newCoords).addTo(this.map).bindPopup('Вы кликнули по мне!');
      
        // DG.marker([this.coords]).addTo(this.map).bindPopup('Вы кликнули по мне!');
       
        this.coords.push(newMarker);

        console.log(this.coords[this.coords.length-1].getLatLng().lat);
        console.log(this.coords[this.coords.length-1].getLatLng().lng);
      });
    });
    },

    async addMarker() {
      const marker = {
        lat: this.coords[this.coords.length-1].getLatLng().lat,
        lng: this.coords[this.coords.length-1].getLatLng().lng,
        name: this.name,
        surname: this.surname,
        email: this.email,
        num: this.num,
        user_id: 1,
        location_name: this.location,
        status:"Todo",
        description: this.description,
        subcategory_id: this.data[0].id,
        answers: this.answers.toString()
      };
      console.log(marker);
      
      await axios.post('http://localhost:3000/create', marker);
      this.coords = [];
        this.name = '';
        this.surname = '';
        this.email = '';
        this.num = '';
        this.description = '';
        this.location = '';
        this.coords.forEach(marker => {
        this.map.removeLayer(marker);
     });
    },
   

    increment(){
        if(this.expands+1>3){
            return;
        }
        
        this.expands++;
        this.changeColor(this.expands)
    },
    decrement(){
        if(this.expands-1<0){
            return;
        }
        this.expands--;
        this.changeColor(this.expands)
    },
    changeColor(index){
        this.expands = index;
        this.colors = ['white','white','white','white'];
        this.colors[index] = 'black';
    }
    
    
  }
}
</script>

<template>
    <main>
      <div class="container">
        <div class="header" >
            <h1>Категория запросов по городам</h1>
            <h2>{{data[0].name}}</h2>
        </div>
        <div class="togglers">
            <div class="where" @click="changeColor(0)">Где?
                <div class="circle" :style="{backgroundColor: colors[0]}">

                </div>
            </div>
            <div class="line">
                    
            </div>
            <div class="what" @click="changeColor(1)">
                Что?
                <div class="circle" :style="{backgroundColor: colors[1]}">
                    
                </div>
                
            </div>
            <div class="line">
                    
            </div>
            <div class="who"  @click="changeColor(2)">Кто?
                <div class="circle" :style="{backgroundColor: colors[2]}">
                    
                </div>
            </div>
            <div class="line">
                    
            </div>
            <div class="concl" @click="changeColor(3)">Общее
                <div class="circle" :style="{backgroundColor: colors[3]}">
                    
                </div>
            </div>
        </div>

        <div class="elements">
            
        <div class="first" v-if="expands==0 ">
            <h3>Укажите место здесь</h3>
            <div id="map"></div>
            <div class="address">
            
            <input type="text"  v-model="location" placeholder="Напишите адрес здесь">
            </div>

        </div>



        <div class="second" v-if="expands==1 " >
           <div class="questions">
                <div class="question" v-for="(question, index) in questions" :key="question.id">
                        <h4>{{question.questions}}</h4>
                     <input type="text" placeholder="Напишите здесь" v-if="question.answers==null"
                     v-model="answers[index]">
                    <select v-if="question.answers!=null" v-model="answers[index]">
                        <option v-for="answer in question.answers" :key="answer.id" >{{answer}}</option>
                    </select>
                </div>
           </div>

           <!-- <div class="answers" v-for="answer in answers" :key="answer.id">
                <h4>{{answer}}</h4>
           </div> -->

        </div>



        <div class="third" v-if="expands==2 ">
            <div class="title">
                <h5>Пожалуйста, укажите свою контактную информацию ниже, чтобы вы могли получать 
                    обновления по вашему запросу на обслуживание. Мы не передаем вашу контактную 
                    информацию другим пользователям.</h5>
            </div>
            <div class="fill">
                <div class="up">
                    <div class="name">
                        <h4 for="name">Имя</h4>
                        <input type="text" placeholder="Напишите здесь" name="name" v-model="name">
                    </div>
                    <div class="surname">
                        <h4 for="surname">Фамилия</h4>
                        <input type="text" placeholder="Напишите здесь" name="surname" v-model="surname">
                    </div>
                    
                </div>
                <div class="below">
                    <div class="email">
                        <h4 for="email">Email</h4>
                        <input type="text" placeholder="Напишите здесь" name="email" v-model="email">
                    </div>
                    <div class="phone">
                        <h4 for="phone">Телефон</h4>
                        <input type="text" placeholder="Напишите здесь" name="phone" v-model="num">
                    </div>
                </div>
            </div>


        </div>
        <div class="fourth" v-if="expands==3">
            <div class="info">
                <div class="up">
                    <div class="name">
                        Имя: {{name}}
                    </div>
                    <div class="surname">
                        Фамилия: {{surname}}
                    </div>
                </div>
                <div class="below">
                    <div class="email">
                        Email: {{email}}
                    </div>
                    <div class="phone">
                        Телефон: {{num}}
                    </div>
                    <div class="adress">
                        Адрес: {{location}}
                    </div>
                    <div class="status">
                        Статус: Todo
                    </div>
                    <div class="description">
                        Комментарии: {{description}}
                </div>
            </div>
           


        </div>
    </div>
    <div class="controls">
        <div class="previous">
            <button @click="decrement">Назад</button>
        </div>
        
        <div class="next" v-if="this.expands!=3">
            <button @click="increment">Вперед</button>
        </div>
        <div class="submit" v-if="this.expands==3">
            <button @click="addMarker">
                Отправить
            </button>
        </div>
        
    </div>


      </div>
      </div>
    </main>
  </template>
  
 
  
  
<style scoped>
main{
    background: #D6D6D6;;
}

.togglers{
    width: 100%;
    display: flex;
    margin-top: 20px;
    margin-bottom: 20px;
    background-color: white;
    border-radius: 1rem;
    height: 4rem;
    align-items: center;
    text-align: left;
    padding: 0 5rem;
    
}
.togglers .circle{
    
    width: 1.5rem;
    height: 1.5rem;
    background-color: white;
    border: 3px solid black;
    border-radius: 100%;
}
.togglers .line{
    width: 100%;
    height: 3px;
    background-color: black;
    margin-top: 1rem;
}
.togglers .where{
    margin: 0.5rem;
    cursor: pointer;
}
.togglers .what{
    margin: 0.5rem;
    cursor: pointer;
}
.togglers .who{
    margin: 0.5rem;
    cursor: pointer;
}
.togglers .concl{
    margin: 0.5rem;
    cursor: pointer;
}


/* .togglers > div{
    padding: 1.5rem;
    background-color: rgb(255, 255, 255);
    width: 10rem;
    text-align: center;
    border-radius:  0 10px 10px  0  ;
} */
.elements{
    width: 100%;
    
}
.elements > div{
    width: 100%;
    height: 50vh;
}

.first{
    

}
.second{
    
}
.third{
    padding: 1rem;
}
.fourth{
    display: flex;
    align-items: center;
    padding: 2rem;
    font-size: 24px;
    margin-left: 2rem;
    line-height: 1.5;
}


.controls{
    margin-top: 5rem;
    display: flex;
    justify-content: space-around;
}
.controls button{
    font-size: 18px;
    border: none;
    width: 10rem;
    background-color: rgb(255, 255, 255);
    padding: 1rem;
    text-align: center;
    border-radius:1rem ;
    border: 1px solid rgb(0, 0, 0);

}
.map{
    
}
#map {
    height: 100%;
    width: 100%;
  }

.address{
    margin:0.5rem;
}
.address input{
    width: 100%;
    height: 2rem;
    border-radius: 0.5rem;
    border: none;
    padding: 0.5rem;
    font-size: 1rem;
}
.second{
    padding: 1rem;
    font-size: 18px;
}

.second .title{
    margin: 0.5rem;
}
.second  input{
    
    width: 100%;
    height: 2rem;
    border-radius: 2rem;
    font-size: 20px;
    padding: .5rem;
}
.second select{
    margin: 1rem;
    width: 100%;
    height: 2rem;
    font-size: 18px;
}
.third h5{
   text-align: center;
}
.third .fill{
    margin: 1rem;
}
.third .fill .up{
    padding: 1rem;
    display: flex;
    font-size: 18px;

}
.third .fill > div{
  

}
.third .fill .up .surname{
   margin-left: 3rem;

}
.third .fill .up input{
    width: 30rem;
    height: 3rem;
    border-radius: 2rem;
    padding: 0.5rem;
}
.third .fill .below{
   font-size: 18px;
   margin-top: 1rem;
   display: block;
}
.third .fill .below >div{
    margin: 1rem;
 }
.third .fill .below input{
    margin-top: 1rem;
    width: 30rem;
    height: 3rem;
    border-radius: 2rem;
    padding: 0.5rem;
}

</style>
  