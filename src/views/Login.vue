<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import first from '@/assets/images/1.png';
import second from '@/assets/images/2.png';
import third from '@/assets/images/3.png';
import fourth from '@/assets/images/4.png';
import fifth from '@/assets/images/5.png';
import sixth from '@/assets/images/6.png';




export default {
  data() {
    return {
      images: [
        first,
        second,
        third,
        fourth,
        fifth,
        sixth
        
      ],
      currentIndex: 0,
      intervalId: null,
      email: '',
      password: '',
      textIndex: 0,
      text:[
        "Улучшим город вместе",
        "Вы сообщаете - мы решаем ",
        "Делай добро, Бро! ",
        "Город в котором захочется жить ",
        "Это мой город ",
        "От мечты к победе",
        "Единство, уважение, прогресс",
        "Будущее создается сегодня",
        "Даже один человек может изменить город!Вклад каждого важен!"

      ],

    };
  },

  mounted() {
    // Start auto-play when the component is mounted
    this.startAutoPlay();
    this.autoSwitchText();
  },
  methods: {
    login(){
      const router = useRouter();
      axios.post('http://localhost:3000/login', {
        email: this.email,
        password: this.password
      })
      .then((response) => {
        console.log(response);
        if(response.status==200){
          this.$router.push('/');
        }
        else{
          alert("Неверный логин или пароль");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    },
    goToImage(index) {
      this.currentIndex = index;
    },
    currentImage() {
      console.log(this.images[this.currentIndex]);
      return this.images[this.currentIndex];
    },
    autoSwitchText(){
      this.intervalId = setInterval(() => {
        if(this.textIndex === this.text.length - 1){
        this.textIndex = 0;
      }
      else{
        this.textIndex = this.textIndex + 1;
      }
    }, 3000);
    },
    startAutoPlay() {
      // Set an interval to automatically switch to the next image every 3 seconds
      this.intervalId = setInterval(() => {
        if(this.currentIndex === this.images.length - 1){
        this.goToImage(0);
      }
      else{
        this.goToImage(this.currentIndex + 1);
      }
    }, 3000);
    },
    stopAutoPlay() {
      // Clear the interval to stop auto-play
      clearInterval(this.intervalId);
    }
  },
  beforeDestroy() {
    // Clean up the interval when the component is destroyed
    this.stopAutoPlay();
  }

};
</script>

<template>
  <main>
    <div class="whole">
    <div class="slide">
      <div class="slideText">
        <h4>{{text[textIndex]}}</h4>
      </div>
    <div class="slideshow">
      <transition name="fade">
        <img :src="images[currentIndex]" alt="Slideshow Image" key="currentImage" />
      </transition>
     </div>
    <ul class="dots">
      <li v-for="(image, index) in images" :key="index" @click="goToImage(index)" :class="{ active: index === currentIndex }"></li>
    </ul>
  </div>


    <div class="container">
    
    <div class="formdiv">
      <header>
        <h1>Авторизация</h1>  
    </header>
    <form @submit.prevent="login">
      <div class="labels">
      <label>
        <span>Почта</span>
        <input type="email" v-model="email" placeholder="Укажите почту">
      </label>
      <label>
        <span>Пароль</span>
        <input type="password" v-model="password" placeholder="Пароль">
      </label>
    </div>

      <div class="controls">
        <input type="submit" value="Войти" />
        
        <router-link  to="/register" >
          <div class="reg"> Регистрация</div>
        </router-link>
      
      </div>
      
    </form>
  </div>

    
  </div>
</div>
  </main>
</template>
 
<style scoped>
main{
  margin: 0;
  padding: 0;
  background-color: #F5F5F5;;
}
.container{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background: #F0F0F0;
  float: right;
  width: 30vw;
  height: 100vh;
  border-radius: 3%;
}
header{
  margin-top: 2rem;
  text-align: center;
}

input[type="text"], input[type="password"], input[type="email"]{
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 2px solid #271d53;
  border-radius: 10px;
  box-sizing: border-box;
}
input[type="submit"]{
  width: 100%;
  background-color: #271d53;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}
.reg{
  background-color: rgb(110, 170, 110);
  width: 100%;
  text-align: center;
  text-decoration: none;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}
 a{
  text-decoration: none;
  color: white;
}
.formdiv{
  margin-top: 2rem;
}
.labels{
  margin-top: 3rem;
}
.slide{
  display: flex;
  justify-content: center;
  float: left;
  width: 70vw;
  height: 100vh;
  background-color: #F5F5F5;
  border-radius: 3%;
  
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.slideshow {
  position: relative;
}

.dots {
  position: absolute;
  left: 30%;
  bottom: 20px;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  list-style-type: none;
  padding: 0;
  margin: 0;
}
.whole{
  display: flex;
}
.slide img{
  width: 100%;
  height: 90%;
  object-fit: cover;
}
.slideText{
  position: absolute;
  top: 85%;
  left: 40%;
  z-index: 1;

}

.dots li {
  cursor: pointer;
  margin-right: 8px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #ccc;
  transition: background-color 0.3s;
}

.dots li.active {
  background-color: #333;
}

</style>