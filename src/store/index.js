import axios from 'axios'
export default {
    strict: false,
    state: {
        todoList: [],
        currentFilter: 'all',
        open: true
    },
    getters: {
        filteredTodoList: function (state) {
            let filteredTodoList = [];
            for (let i = 0; i < state.todoList.length; i++) {
                if (state.currentFilter === 'all' || state.currentFilter === state.todoList[i].status) {
                    filteredTodoList.push(state.todoList[i])
                }
            }
            return filteredTodoList;
        }
    },
    mutations: {
        addTodoList: function (state, item) {
            state.todoList.push(item);
        },
        toggleActive: function (state, index) {
            state.todoList[index].status = state.todoList[index].status === 'completed' ? 'active' : 'completed';
        },
        toggleCurrentFilter: function (state, value) {
            state.currentFilter = value;
        },
        initTodos: function (state, list) {
            state.todoList = list;
        },
        changeOpenStatus: function (state, value) {
            state.open = value;
        }
    },
    actions: {
        fetchTodos(context) {
            context.commit("changeOpenStatus", true);
            axios.get("http://5b4dcb2aec112500143a2311.mockapi.io/api/todos")
                .then((response) => {
                    context.commit("changeOpenStatus", false);
                    context.commit("initTodos", response.data);
                })
                .catch(function (error) {
                    context.commit("changeOpenStatus", false);
                    context.commit("initTodos", []);
                });
        },
        postTodos(context, item) {
            context.commit("changeIsShow", true);
            axios.post("http://5b4dcb2aec112500143a2311.mockapi.io/api/todos?id=200", item)
                .then((response) => {
                    context.commit("initTodos", response.data);
                    console.log(response.data);
                })
                .catch(function (error) {
                    context.commit("initTodos", response.data);
                    console.log(error);
                });
        }
    }
}