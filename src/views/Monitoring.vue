
<script>
import axios from 'axios'
import { ref } from 'vue';
import DG from '2gis-maps';
import blueIcon from '@/assets/images/blueIcon.png';
import redIcon from '@/assets/images/redIcon.png';
import greenIcon from '@/assets/images/green.png';
export default {
    data() {
        return {
            map: null,
            markers: [],
            categories: [],
            subcategories: [],
            selected: null,
            mapMarkers: [],
            indicator: 20,
            subcategoryId: null,

            

        };
    },
    name: 'App',

    methods: {
        async initMap() {
            if (!this.map) {
                DG.then(() => {
                    this.map = DG.map('monmap', {
                        center: [43.238366, 76.924189],
                       
                        zoom: 12
                    });
                });
            }
        },
        async loadCategories() {
            axios.get('http://localhost:3000/all-categories')
                .then(response => {
                    this.categories = response.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },

        async loadMarkers() {
            await axios.get('http://localhost:3000/requests')
                .then(response => {
                    this.markers = response.data.data;
                    this.addMarkersToMap();
                    this.indicator = response.data.scale;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        async addMarkersToMap() {
            DG.then(()=>{
                this.markers.forEach(marker => {
                let myIcon= null;
                if(marker.status=="missed"){
                    myIcon = DG.icon({
                    iconUrl: redIcon,
                    iconSize: [30, 30]
                });
                }
                else if(marker.status=="todo"){
                    myIcon = DG.icon({
                    iconUrl: blueIcon,
                    iconSize: [30, 30]
                });
                }
                else{
                    myIcon = DG.icon({
                    iconUrl: greenIcon,
                    iconSize: [20, 30]
                });
                }
                // DG.marker([marker.lat, marker.lng],
                // {icon:myIcon}).addTo(this.map).bindPopup(`<div class="popup">; <h3>${marker.location_name}</h3>
                //      <p>${marker.description}</p> <p>${marker.phonenumber}</p> <p>${marker.status}</p> </div>`);
                
                  
                let mrk = DG.marker([marker.lat, marker.lng],
                {icon:myIcon}).
                addTo(this.map).bindPopup(
                    '<h3 style="color:yellow">Location name:</h3> <h3>'+marker.location_name+'</h3><br>'+
                    'Description: '+marker.description+'<br>'+
                    'Phone number: '+marker.phonenumber+'<br>'+
                    'Status: '+marker.status+'<br>'
                    )
                // console.log(mrk)
                this.mapMarkers.push(mrk);


               
                });
            })
         
        },
        async setFilter() {
          this.clearMarkersFromMap();
          
          console.log(this.markers)
            await axios.get(`http://localhost:3000/requests/${this.subcategoryId}`)
                .then(response => {
                    this.markers = response.data;
                    console.log(this.markers.length);
                    this.addMarkersToMap();
                })
                .catch(error => {
                    console.log(error);
                });
        },
        async getCategories() {
            await axios.get(`http://localhost:3000/subcategories/${this.selected}`)
                .then(response => {
                    this.subcategories = response.data;
                    console.log(this.subcategories);
                })
                .catch(error => {
                    console.log(error);
                });
        },

        async clearMarkersFromMap() {
            this.markers = [];
            DG.then(()=>{
                this.mapMarkers.forEach(marker => {
                marker.remove();
                // this.map.removeLayer(marker);
                });
            })
            // this.markers.forEach(marker => {
            // this.map.removeLayer(marker);
            // });
        },

    },
    computed: {
    boxTop() {
      return `${this.indicator}%`;
    },
  },

    mounted() {
        this.initMap();
        this.loadMarkers();
        this.loadCategories();
    },
};
</script>

<template>
    <main>
  <div>
    <div class="container">
        <div class="filter">
            <select v-model="selected" @change="getCategories">
                <option v-for="category in categories" :value="category.id" :key="category.id">{{category.name}}</option>
            </select>
            <select v-model="subcategoryId" @change="setFilter" >
                <option v-for="subcategory in subcategories" :value="subcategory.id" :key="subcategory.id">{{subcategory.name}}</option>
            </select>
            
        </div>
        <div id="monmap"></div>
        <div class="tracker">
            <div class="scale" :style="{bottom:boxTop}">

            </div>
        </div>
        
    </div>
    

  </div>
</main>
</template>


<style>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.scale{
    position: absolute;
    left: -10%;
    width: 2.5vw;
    background: #AEAEAE;
    height: 1.5vh;
}

.tracker{
    position: absolute;
    top: 20%;
    left: 22%;
    width: 2vw;
    height: 50vh;
    border-radius: 30px;
    background: rgb(175,23,14);
    background: linear-gradient(0deg, rgba(175,23,14,1) 0%, rgba(194,78,28,1) 29%, rgba(175,210,13,0.9949229691876751) 59%, rgba(0,255,8,1) 100%);
}
main{
    padding: 0;
    margin: 0;
    
}
select{
    width: 20rem;
}
#monmap {
  height: 100%;
  width: 100%;
}
.container{
  font-size: 24px;
  width: 80vw;
  height: 100vh;
}

</style>

