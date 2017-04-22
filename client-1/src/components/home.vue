<template>
  <div class="home">
    <el-popover ref="popoverregister" placement="left-end" width="400" trigger="click">
      <div class="field">
       <label class="label">Name</label>
       <p class="control">
         <input class="input" type="text" placeholder="Text input" v-model='dataregister.name'>
       </p>
      </div>
      <div class="field">
       <label class="label">email</label>
       <p class="control">
         <input class="input" type="text" placeholder="Text input"  v-model='dataregister.email'>
       </p>
      </div>
      <div class="field">
       <label class="label">password</label>
       <p class="control">
         <input class="input" type="password" placeholder="Text input"  v-model='dataregister.password'>
       </p>
      </div>
      <button class="button is-primary" @click='register()'>Submit</button>

    </el-popover>
    <el-popover ref="popoverlogin" placement="left-end" width="400" trigger="click">
      <div class="field">
       <label class="label">email</label>
       <p class="control">
         <input class="input" type="text" placeholder="Text input"  v-model='datalogin.email'>
       </p>
      </div>
      <div class="field">
       <label class="label">password</label>
       <p class="control">
         <input class="input" type="text" placeholder="Text input" v-model='datalogin.password'>
       </p>
      </div>
      <button class="button is-primary" @click='login()'>Submit</button>

    </el-popover>

  </el-popover>
  <el-popover ref="popovernewquestion" placement="left-end" width="400" trigger="click">
    <div class="field">
     <label class="label">title</label>
     <p class="control">
       <input class="input" type="text" placeholder="Text input" v-model='newQuestion.title'>
     </p>
    </div>
    <div class="field">
     <label class="label">question</label>
     <p class="control">
       <input class="input" type="text" placeholder="Text input" v-model='newQuestion.content'>
     </p>
    </div>
    <button class="button is-primary" @click='newquestion()'>Submit</button>

  </el-popover>



    <div class="columns">
        <div class="column is-1 is-offset-8">
          <a class="button is-primary" v-popover:popoverregister>Register</a>
        </div>
        <div class="column is-1">
          <a class="button is-primary" v-popover:popoverlogin>Login</a>
        </div>
        <div class="column is-1">
          <a class="button is-primary" v-popover:popovernewquestion>New Question</a>
        </div>
    </div>

    <section class="hero is-light is-medium">
 <div class="hero-body">
   <div class="container">
     <h1 class="">
        hacktivoverflow
     </h1>
   </div>
 </div>
</section>
<questioncard v-for='dataquestion in dataquestions' v-bind:propsdataquestion="dataquestion"></questioncard>

  </div>
</template>
<script>
import Questioncard from './questioncard'
export default {
  name: 'home',
  data () {
    return {
      dataquestions: '',
      dataregister: {
        name: '',
        email: '',
        password: ''
      },
      datalogin: {
        email: '',
        password: ''
      },
      newQuestion: {
        title: '',
        content: ''
      },
      backresponce: ''
    }
  },
  components: {
    Questioncard
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      var self = this
      this.axios.get('http://localhost:3000/api/question', {})
      .then(function (response) {
        self.dataquestions = response.data
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    register () {
      var self = this
      this.axios.post('http://localhost:3000/api/user', {
        name: self.dataregister.name,
        email: self.dataregister.email,
        password: self.dataregister.password
      })
      .then(function (response) {
        self.backresponce = response.data
        if (response.data.massage) {
          alert(response.data.massage)
        } else {
          alert(response.data)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    login () {
      var self = this
      this.axios.post('http://localhost:3000/api/login', {
        email: self.datalogin.email,
        password: self.datalogin.password
      })
      .then(function (response) {
        localStorage.setItem('token', response.data)
        alert('login succes')
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    newquestion () {
      let self = this
      this.axios.post('http://localhost:3000/api/question', {
        title: self.newQuestion.title,
        content: self.newQuestion.content
      },
        {
          headers: {
            token: localStorage.getItem('token')
          }
        })
      .then(function (response) {
        console.log(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>
<style scoped>
h1{
  font-size: 80px;
  font-weight: bold;
}
.button{
  width: 129px;
}
.columns{
  background-color: #e8ebf2;
  margin-top: 1px;
  margin-bottom: 1px;
  height: 50px;
}
.column{
padding: 5px;
width: 132px;
}
.container{
  margin-left: 50px;
  margin-right:100px;
  min-width: 1400px;
}
.cardstyle{
  margin: 20px;
}
.box-card[data-v-2db64e16] {
    width: 508px;
}
.el-col.el-col-24.el-col-md-12 {
    width: 42%;
}


</style>
