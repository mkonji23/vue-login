<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark rounded">
        <button class="navbar-toggle"
         type="button"
         data-toggle="collapse"
         data-target="#navbar1"
         aria-controls="navbar1"
         aria-expanded="false"
         aria-label="Toggle navigation">
            <span class="navbar-toggle-icon"></span>
         </button>

         <div class="collapse navbar-collapse justify-content-md-center" id="navbar1">
             <ul class="navbar-nav">
                 <li class="nav-item">
                     <router-link class="nav-link" to="/">Home</router-link>
                 </li>
                 
                 <li v-if="auth==''" class="nav-item">
                     <router-link class="nav-link" to="/login">Login</router-link>
                 </li>

                 <li v-if="auth==''" class="nav-item">
                     <router-link class="nav-link" to="/register">Register</router-link>
                 </li>

                 <li v-if="auth=='loggedin'" class="nav-item">
                     <router-link class="nav-link" to="/profile">Profile</router-link>
                 </li>

                 <li v-if="auth=='loggedin'" class="nav-item">
                     <router-link class="nav-link" v-on:click.native="logout" to="/login" href="" >Logout</router-link>
                 </li>
             </ul>
         </div>
    </nav>

</template>

<script>
import EventBus from './EventBus'

EventBus.$on('logged-in',test=>{
    console.log(test)
})
export default {
    data(){
        //데이터 선언하는거임
        return{
            auth:'',
            user:''
        }
    },
     
    //함수 정의
    methods:{
        logout(){
            localStorage.removeItem('usertoken')
            this.auth =''
        }
    },

     mounted(){
        // $on 이벤트 청취?
        // => 함수정의하는 거임/
        EventBus.$on('logged-in', status=>{
            this.auth = status
        })
        
    }
  
      
    
}
</script>