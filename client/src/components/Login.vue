<template>
  <div class="container">
      <div class="row">
          <div class="col-md-6 mt-5 mx-auto">
              <form v-on:submit.prevent="login">
                  <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
                  <div class="form-group">
                      <label for="email">Email Address</label>
                      <input type="email" v-model="email" class="form-control" name="email" placeholder="Enter email">
                  </div>
                  <div class="form-group">
                      <label for="password">Password</label>
                      <input type="password" v-model="password" class="form-control" name="password" placeholder="Enter Password">
                  </div>
                  <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
              </form>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios' //HTTP 클라이언트 라이브러리 중 하나
import router from '../router'
import EventBus from './EventBus'
export default {
    data(){
        return{
            email:'',
            password:''
        }
    },

    methods:{
        login(){
            axios.post('/users/login',{
                email:this.email,
                password:this.password
            }).then(res =>{
                localStorage.setItem('usertoken', res.data)
                this.email=''
                this.password=''
                router.push({name: 'Profile'})
                this.emitMethod()
            }).catch(err =>{
                console.log(err)
                console.log(err.response.data[1].error_code)

                var err_code = err.response.data[1].error_code
                //사용자 체크
                if(err_code =='no_user'){
                    this.email=''
                    this.password=''
                    alert('User does not Exist!')
                }
                //비밀번호 체크
                else if(err_code =='wrong_password'){
                    this.password=''
                    alert('Wrong Password!')
                }
                router.push({name:'Login'})
             })                 
        },
        emitMethod(){
            EventBus.$emit('logged-in','loggedin')// 이벤트 발행
        }

    }

}
</script>

<style>

</style>