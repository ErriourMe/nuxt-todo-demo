<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="form-group">
          <input v-model="form.name" type="text" class="form-control" />
          <button @click="send()">Создать</button>
        </div>
      </div>
    </div>

    <div class="row">
      <div v-for="(todo, i) in todos" :key="`todo-${i}`" class="col-12">
        <div class="container">
          <div class="row">
            <div class="col-12 col-md-6">
              {{ todo.name }}
            </div>
            <div class="col-12 col-md-6 d-flex justify-content-end">
              <button type="button" class="btn btn-primary" @click="edit(i)">
                Редактировать
              </button>
              <button type="button" class="btn btn-danger" @click="remove(i)">
                Удалить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        completed: false,
      },
      todos: {},
    }
  },
  mounted() {
    this.$axios.get('http://starter-pack.io/api/tasks').then((res) => {
      this.todos.push(this.form)
    })
  },
  methods: {
    edit(i) {},
    remove(i) {},
    send() {
      this.$axios.post('http://starter-pack.io/api/tasks').then((res) => {
        this.todos = res.data
      })
    },
  },
}
</script>
