export default {
  add(context, todo) {
    //async code goes here
    context.commit('register', todo)
  },
  deleteTodo(context, i) {
    //async here
    context.commit('deleteTodo', i)
  }
}
