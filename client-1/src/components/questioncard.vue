<template>
  <div class="questioncard">
  <el-card class="box-card" :body-style="{ padding: '5px' }">
    <div class="box">
    <h3 class="card-title">Title: {{dataquestion.title}}</h3>
  <article class="media">
    <div class="media-content">
      <div class="content">
        <p>
        <strong>{{dataquestion.user_name}}</strong>
          <br>
          {{dataquestion.content}}
        </p>
      </div>
        <answers v-bind:propsquestionid="dataquestion.queston_id"></answers>
    </div>
  </article>
</div>
 </el-card>

  </div>
</template>
<script>
import Answers from './answers'
export default {
  name: 'questioncard',
  components: {
    Answers
  },
  props: ['propsdataquestion'],
  data () {
    return {
      dataquestion: this.propsdataquestion
    }
  },
  methods: {

  }
}
</script>
<style scoped>
.card-title{
font-size: 20px;
text-align: left;
}
.box-card{
  border: solid;
  border-color: #b3b6bc;
}
.box{
  padding: 10px;
}
.setborder{
  border: solid;
  border-color: #b3b6bc;
}


</style>
