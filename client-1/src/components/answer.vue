<template lang="html">
  <div class="answer">
    <div class="box">
      <h3 class="card-title">Title: {{dataanswer.answer_tittle}}</h3>
 <article class="media">
   <div class="media-content">
     <div class="content">
       <p>
         <strong>{{dataanswer.user_name}}</strong>
         <br>
         {{dataanswer.answer_content}}
       </p>
     </div>

      <span class="icon is-medium"> <i class="fa fa-heart" aria-hidden="true"></i> </span>
      <span class="count is-medium"> {{voteCount}} </span>
      <a class="button is-primary" @click='upvote()'> <i class="fa fa-thumbs-up" aria-hidden="true"></i>  up vote</a>
      <a class="button is-primary" @click='downvote()'><i class="fa fa-thumbs-down" aria-hidden="true"></i> down vote</a>
      <a class="button is-primary rightside" @click='senddelete()'><i class="fa fa-trash" aria-hidden="true"></i> delete</a>


   </div>
 </article>
</div>


  </div>

</template>

<script>
export default {
  name: 'answer',
  props: ['propsanswer'],
  data () {
    return {
      dataanswer: this.propsanswer,
      voteCount: 0
    }
  },
  mounted () {
    this.getvote()
  },
  methods: {
    getvote () {
      var self = this
      this.axios.post(`http://localhost:3000/api/votecount`, {
        answer_id: self.dataanswer.answer_id,
        question_id: self.dataanswer.queston_id
      })
      .then(function (response) {
        self.voteCount = response.data.count
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    upvote () {
      var self = this
      this.axios.post(`http://localhost:3000/api/upvote`, {
        answer_id: self.dataanswer.answer_id,
        question_id: self.dataanswer.queston_id
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
    },
    downvote () {
      var self = this
      this.axios.post(`http://localhost:3000/api/downvote`, {
        answer_id: self.dataanswer.answer_id,
        question_id: self.dataanswer.queston_id
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
    },
    senddelete () {
      var self = this
      this.axios.delete(`http://localhost:3000/api/answer/${self.dataanswer.answer_id}`,
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
.icon{
  margin-right: 2px;
}
.count{
  margin-right: 10px;
  width: 20px
}
.rightside{
  margin-left: 340px
}
</style>
