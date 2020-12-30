<template>
  <div class="container">
    <div class="row py-3">
      <div class="col-12">
        <div class="btn-group w-100">
          <input v-model="form.name" type="text" class="form-control" />
          <button class="btn btn-danger" @click="send()">Создать</button>
        </div>
      </div>
    </div>

    <div class="row">
      <div v-for="(todo, i) in todos" :key="`todo-${i}`" class="col-12 mt-2">
        <div class="px-2 py-1 card">
          <div class="row">
            <div class="col-12 col-md-6 d-flex align-items-center">
              <input type="checkbox" @change="put(i, !todo.completed)" />
              <div class="ml-3">
                <input
                  v-if="todo.editing"
                  v-model="todos[i].name"
                  class="form-control"
                  type="text"
                />
                <template v-else>
                  {{ todo.name }}
                </template>
              </div>
            </div>
            <div class="col-12 col-md-6 d-flex justify-content-end">
              <button
                v-if="todo.editing"
                class="btn btn-success"
                @click="patch(i, todo.completed)"
              >
                Сохранить
              </button>
              <button
                v-else
                type="button"
                class="btn btn-primary"
                @click="edit(i)"
              >
                Редактировать
              </button>
              <button
                type="button"
                class="btn btn-danger ml-2"
                @click="remove(i)"
              >
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
      this.todos = res.data.data
    })
  },
  methods: {
    edit(i) {
      this.todos[i].editing = true
      this.$set(this.todos, i, this.todos[i])
    },
    remove(i) {
      this.todos.splice(i, 1)
    },
    send() {
      this.$axios
        .post('http://starter-pack.io/api/tasks', this.form)
        .then((res) => {
          this.todos.push(this.form)
        })
    },
    put(i, completed) {
      this.$axios.put(`http://starter-pack.io/api/tasks/${this.todos[i].id}`, {
        name: this.todos[i].name,
        completed,
      })

      this.todos[i].editing = false
      this.todos[i].completed = completed
      this.$set(this.todos, i, this.todos[i])
    },
  },
}
</script>
