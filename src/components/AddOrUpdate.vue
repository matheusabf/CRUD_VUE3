<script setup>
import {defineComponent, ref, onMounted} from 'vue'
import {db} from '../firebase.js'
import {collection , addDoc , doc , updateDoc} from 'firebase/firestore'

const props = defineProps({
    data: Object,
    isNew: Boolean
})
defineComponent({
    name: 'AddOrUpdate'
})

const emits = defineEmits(['close'])

onMounted(() => {
    task.value ={...task.value, ...props.data}
})

const task = ref({
    name: '',
    description: ''
})

async function addOrUpdate() {
    if(props.isNew){
        await addDoc(collection(db, 'tasks'), task.value).then((res) => {
            emits('close')
        })
    }
    else {
    await updateDoc(doc(db, 'tasks', props.data.id), task.value).then ((res) =>{
        emits('close')
    })
    }
}
function recarregarPagina(d){
  setTimeout(function() {
  location.reload()
  }, 100)
}
</script>

<template>
    <transition name="modal">
    <div class="modal-overlay">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <p class="nometarefa" @click="addOrUpdate()">{{isNew ? 'CRIAR TAREFA: ' : 'EDITAR: '}}{{task.name}}</p>
                    <p>NOME DA TAREFA
                    <input type="text" placeholder="Enter name" v-model="task.name"/>
                    DESCRIÇÃO DA TAREFA
                    <textarea placeholder="Enter description" v-model="task.description"/></p>
                    <button @click="emits('close')">Close</button>
                    <button @click="addOrUpdate(), recarregarPagina(isNew)" >{{isNew ? 'Add' : 'Update'}}</button>
                </div>
            </div>
    </div>
    </transition>
</template>

<style>
    .modal-overlay {
        position:absolute;
        top:0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rba(0,0,0,0.3);
        transition: opacity .3 ease;
    }
    .modal-wrapper {
        display:flex;
        justify-content: center;
        align-items: center;
        height: 100%;
    }

    .modal-container {
        background:#2e2e2e;
        width: 300px;
        padding: 50px;
        border-radius:15px;
        border: 10px solid #000;
        color: #fff;
        font-weight: 800;
        text-align:center;
    }
    input , textarea {
        width: 90%;
        margin: auto;
        margin-bottom: 20px;
        overflow: hidden;
        background-color: #fff;
        padding: 15px;
        border-radius: 15px;
    }
</style>