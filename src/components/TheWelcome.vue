<script setup>
import {db} from '../firebase.js'
import {getDocs , collection, deleteDoc, doc} from 'firebase/firestore'
import {ref, onMounted} from 'vue'
import AddOrUpdate from './AddOrUpdate.vue'


const tasks = ref([])

const show =ref(false)

const data = ref({})

const isNew = ref(true)

onMounted(async() => {
  let tasksCollection = await getDocs(collection(db, 'tasks'))
  tasksCollection.forEach((task) => {
    tasks.value.push({...task.data() , id: task.id})
  })
})

function toggleComponent(docData = {}, isNewDoc = true) {
  data.value = docData
  isNew.value = isNewDoc
  show.value = !show.value
}
async function deleteRecord(id){
  await deleteDoc(doc(db, 'tasks', id))
}

function recarregarPagina(){
  setTimeout(function() {
  location.reload()
  }, 100)
}
</script>

<template>
  <div>
    <AddOrUpdate @close="toggleComponent" v-if="show" :data="data" :isNew="isNew"/>
    <div class="addbutton">
    <button @click="toggleComponent()" >Add New</button>
  </div>
  <div class="blocoTarefas">
    <div v-for="task in tasks" :key="task.id" @click="toggleComponent(task, false)">
      <div class="tarefas"><p class="nometarefa">TAREFA: {{task.name}}</p><p class="desctarefa">
      DESCRIÇÃO DA TAREFA:<br> {{task.description}}</p><p><button @click.stop="deleteRecord(task.id), recarregarPagina()" class="delbutton">Delete</button></p></div>
    </div>
  </div>
  </div>
</template>
<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500&family=Roboto:wght@300&display=swap');
body{
  font-family: 'Roboto', sans-serif;
}
.nometarefa{
  background-color: #fff;
  color: #000;
  padding: 15px;
  text-align:center;
  font-weight:800;
  border-radius:5px;
}
.desctarefa{
  background-color: #7c7c7c;
  color: #fff;
  padding: 15px;
  text-align:left;
  font-weight:800;
  margin-top:-1%;
  border-radius:5px;
}
  .blocoTarefas{
    margin-top: 25px;
    align-items:center;
    justify-content: center;
    display: flex;
    flex-direction:column;
    width:100%;
}
  .tarefas{
    padding:30px;
    justify-content: center;
    align-items: left;
    display: flex;
    flex-direction:column;
    background-color:#2e2e2e;
    width:500px;
    margin-bottom: 15px;
    box-shadow: 10px 10px 20px 0px rgba(0, 0, 0, 0.5);
    border-radius: 15px;
  }
  .delbutton{
    width:100%;
    padding-top:5px;
    padding-bottom:5px;
    font-size: 18px;
    margin-top:-15px;
  }
  .delbutton:hover{
    background-color: #2e2e2e;
    color: #fff;
  }
  .addbutton{
    align-items:center;
    justify-content:center;
    text-align:center;
  }
  .addbutton button{
    padding: 15px;
    background-color: #2e2e2e;
    color: #fff;
    border-radius: 15px;
  }
  @media screen and (max-width: 768px){
    .tarefas{
    padding:30px;
    justify-content: center;
    align-items: left;
    display: flex;
    flex-direction:column;
    background-color:#2e2e2e;
    width:200px;
    margin-bottom: 15px;
    box-shadow: 10px 10px 20px 0px rgba(0, 0, 0, 0.5);
    border-radius: 15px;
  }
}
</style>
