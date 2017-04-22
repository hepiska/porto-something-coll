<template lang="html">
  <div class="answers">
    <el-popover ref="popover4" placement="" width="800" trigger="click">
      <el-row :gutter='5'>
        <el-col :md="10"  v-for='answer in dataanswers' class="givmargin">
          <p>{{answer.title}}</p>
            <answer v-bind:propsanswer='answer'></answer>
        </el-col>
        <el-col :md="10"   class="givmargin">
          <el-card class="box-card" :body-style="{ padding: '5px' }">
            <div class="box">
              <div class="field">
                <label class="label">Title</label>
                <p class="control">
                  <input class="input" type="text" placeholder="Text input" v-model='newanswer.title'>
                </p>
              </div>
          <article class="media">
            <div class="media-content">
              <div class="content">
                <div class="field">
                   <label class="label">Message</label>
                   <p class="control">
                     <textarea class="textarea" placeholder="Textarea" v-model='newanswer.content'></textarea>
                   </p>
                  </div>
              </div>
            </div>
          </article>
          <button class="button is-primary" @click='postAnswer()'>Submit</button>
        </div>
         </el-card>
        </el-col>

      </el-row>

    </el-popover>

    <el-button class='button is-primary' v-popover:popover4>Answers</el-button>


  </div>

</template>

<script>
import Answer from './answer'
export default {
  name: 'answers',
  components: {
    Answer
  },
  props: ['propsquestionid'],
  data () {
    return {
      questionid: this.propsquestionid,
      dataanswers: [],
      newanswer: {
        title: '',
        content: ''
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      var self = this
      this.axios.get(`http://localhost:3000/api/answerofquestion/${self.questionid}`, {})
      .then(function (response) {
        self.dataanswers = response.data
        console.log(self.dataanswers)
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    postAnswer () {
      var self = this
      this.axios.post(`http://localhost:3000/api/answer`, {
        title: self.newanswer.title,
        content: self.newanswer.title,
        question_id: self.questionid
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
.givmargin{
  margin: 5px;
}
.button{
  margin: 5px;
}
</style>
