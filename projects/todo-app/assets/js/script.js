// Selecionando elementos do DOM
const todoInput = document.getElementById("todo-input");
const addButton = document.getElementById("add-button");
const todoList = document.querySelector(".todo-list");
const filters = document.querySelectorAll(".filter");
const clearButton = document.querySelector(".clear-btn");
const pendingCount = document.querySelector(".pending-count");
const themeToggle = document.querySelector(".theme-toggle");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = "all";
let editingId = null;

if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark-mode");
  themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// Função para salvar tarefas no localStorage
const saveTodos = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

// Função para gerar ID único
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Função para atualizar contador de tarefas pendentes
const updatePendingCount = () => {
  const pendingTasks = todos.filter((todo) => !todo.completed).length;
  pendingCount.textContent = pendingTasks;
};

// Função para criar elemento de tarefa
const createTodoElement = (todo) => {
  const li = document.createElement("li");
  li.classList.add("todo-item");
  if (todo.completed) li.classList.add("completed");
  li.dataset.id = todo.id;

  const checkbox = document.createElement("div");
  checkbox.classList.add("todo-checkbox");
  if (todo.completed) checkbox.classList.add("checked");
  checkbox.innerHTML = '<i class="fas fa-check"></i>';

  const todoText = document.createElement("span");
  todoText.classList.add("todo-text");
  todoText.textContent = todo.text;

  const actions = document.createElement("div");
  actions.classList.add("todo-actions");

  const editButton = document.createElement("button");
  editButton.classList.add("todo-edit");
  editButton.innerHTML = '<i class="fas fa-edit"></i>';

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("todo-delete");
  deleteButton.innerHTML = '<i class="fas fa-trash"></i>';

  actions.appendChild(editButton);
  actions.appendChild(deleteButton);

  li.appendChild(checkbox);
  li.appendChild(todoText);
  li.appendChild(actions);

  return li;
};

// Função para renderizar tarefas
const renderTodos = () => {
  todoList.innerHTML = "";

  let filteredTodos = todos;

  if (currentFilter === "pending") {
    filteredTodos = todos.filter((todo) => !todo.completed);
  } else if (currentFilter === "completed") {
    filteredTodos = todos.filter((todo) => todo.completed);
  }

  if (filteredTodos.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "Nenhuma tarefa encontrada";
    emptyMessage.style.textAlign = "center";
    emptyMessage.style.color = "var(--text-color)";
    emptyMessage.style.padding = "20px 0";
    todoList.appendChild(emptyMessage);
    return;
  }

  filteredTodos.forEach((todo) => {
    const todoElement = createTodoElement(todo);
    todoList.appendChild(todoElement);
  });

  updatePendingCount();
};

// Função para adicionar nova tarefa
const addTodo = () => {
  const todoText = todoInput.value.trim();

  if (!todoText) {
    todoInput.classList.add("error");
    setTimeout(() => todoInput.classList.remove("error"), 500);
    return;
  }

  if (editingId) {
    // Modo de edição
    const index = todos.findIndex((todo) => todo.id === editingId);
    if (index !== -1) {
      todos[index].text = todoText;
      editingId = null;
      addButton.innerHTML = '<i class="fas fa-plus"></i>';
    }
  } else {
    // Nova tarefa
    const newTodo = {
      id: generateId(),
      text: todoText,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    todos.unshift(newTodo); // Adiciona no início da lista
  }

  todoInput.value = "";
  saveTodos();
  renderTodos();
};

// Função para alternar estado de conclusão da tarefa
const toggleTodoStatus = (id) => {
  const index = todos.findIndex((todo) => todo.id === id);
  if (index !== -1) {
    todos[index].completed = !todos[index].completed;
    saveTodos();
    renderTodos();
  }
};

// Função para editar tarefa
const editTodo = (id) => {
  const todo = todos.find((todo) => todo.id === id);
  if (todo) {
    todoInput.value = todo.text;
    todoInput.focus();
    editingId = id;
    addButton.innerHTML = '<i class="fas fa-save"></i>';
  }
};

// Função para excluir tarefa
const deleteTodo = (id) => {
  todos = todos.filter((todo) => todo.id !== id);
  saveTodos();
  renderTodos();
};

// Função para limpar todas as tarefas
const clearAllTodos = () => {
  if (confirm("Tem certeza que deseja excluir todas as tarefas?")) {
    todos = [];
    saveTodos();
    renderTodos();
  }
};

// Função para alternar tema claro/escuro
const toggleTheme = () => {
  document.body.classList.toggle("dark-mode");
  const isDarkMode = document.body.classList.contains("dark-mode");
  localStorage.setItem("darkMode", isDarkMode);

  if (isDarkMode) {
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }
};

// Event Listeners
addButton.addEventListener("click", addTodo);

todoInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTodo();
});

todoList.addEventListener("click", (e) => {
  const target = e.target;
  const todoItem = target.closest(".todo-item");

  if (!todoItem) return;

  const id = todoItem.dataset.id;

  // Verificar se clicou no checkbox
  if (target.closest(".todo-checkbox")) {
    toggleTodoStatus(id);
  }

  // Verificar se clicou no botão de editar
  if (target.closest(".todo-edit")) {
    editTodo(id);
  }

  // Verificar se clicou no botão de excluir
  if (target.closest(".todo-delete")) {
    deleteTodo(id);
  }
});

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    // Remover classe active de todos os filtros
    filters.forEach((f) => f.classList.remove("active"));

    // Adicionar classe active ao filtro clicado
    filter.classList.add("active");

    // Atualizar filtro atual
    currentFilter = filter.dataset.filter;

    // Renderizar tarefas com o novo filtro
    renderTodos();
  });
});

clearButton.addEventListener("click", clearAllTodos);
themeToggle.addEventListener("click", toggleTheme);

// Inicializar app
renderTodos();
