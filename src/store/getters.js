import moment from 'moment'

export default {
  allTodos(state) {
    return state.todos
  },
  total(state) {
    return state.todos.length
  },
  totalTime(state) {
    let total = 0
    state.todos.forEach(todo => {
      let a = moment.utc()
      let b = todo.date
      total += a.diff(b, 'seconds')
    })
    return formatTotalTime(total)
  },
  completedTodos(state) {
    return state.completed
  },
  userId(state) {
    return state.userId
  },
  message(state) {
    return state.message
  }
}

function formatTotalTime(total) {
  total = Math.floor(total/60)
  if (total == 1) {
    //exactly 1 minute
    return total + ' minute'
  }
  else if (total < 60) {
    // less than an hour
    return total + ' minutes'
  } else if (total > 60 < 3600) {
    let hours = Math.floor(total / 60)
    // exactly one hour
    if (hours == 1) {
      return hours + ' hour'
    } else {
      return hours + ' hours'
    }
  } else if (total > 3600) {
    return 'over a day'
  }
}
