<template>
  <div class="container">
      <div class="row">
          <div class="col-md-6 mt-5 mx-auto">
              <form v-on:submit.prevent="register">
                  <h1 class="h3 mb-3 font-weight-normal">Register</h1>
                  <div class="form-group">
                      <label for="first_name">First name</label>
                      <input type="text" v-model="first_name" class="form-control" name="first_name" placeholder="Enter First name">
                  </div>
                   <div class="form-group">
                      <label for="last_name">Last name</label>
                      <input type="text" v-model="last_name" class="form-control" name="last_name" placeholder="Enter last name">
                  </div>
                   <div class="form-group">
                      <label for="email">Email Address</label>
                      <input type="email" v-model="email" class="form-control" name="email" placeholder="Enter email">
                  </div>
                  <div class="form-group">
                      <label for="password">Password</label>
                      <input type="password" v-model="password" class="form-control" name="password" placeholder="Enter Password">
                  </div>
                  <button class="btn btn-lg btn-primary btn-block" type="submit">Register</button>
              </form>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios' //HTTP 클라이언트 라이브러리 중 하나
import router from '../router' //../ 상위 위치로 이동
export default {
    data(){
        return{
            first_name: '',
            last_name: '',
            email:'',
            password:''
        }
    },

    methods:{
        register(){
            axios.post('/users/register',
            {
                first_name: this.first_name,
                last_name: this.last_name,
                email:this.email,
                password:this.password
            }).then(res =>{
                this.first_name = ''
                this.last_name = ''
                this.email =''
                this.password =''
                router.push({name: 'Login'})
            }).catch(err =>{
                console.log(err)
            })
        }
     }
    }
</script>
