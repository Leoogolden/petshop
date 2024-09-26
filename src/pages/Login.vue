<script setup>
    import axios from 'axios';
    import { list } from 'postcss';
    import { ref } from 'vue'
    import { useRouter } from 'vue-router';
    import { useUserStore } from '../stores/userStore';
    import { useCartStore } from '../stores/cartStore';

  defineProps({
    msg: String,
  })
  const mensajeError = ref('')
  const mail = ref('')
  const pass = ref('')
  const router = useRouter();
  const userStore = useUserStore()
  const cartStore = useCartStore();
  let listaUsuarios = []
  const recibirData = async() => {
    try{
        const response = await axios.get("https://665e469e1e9017dc16ef8783.mockapi.io/Users")
        .then(res=> listaUsuarios = res.data)
        
    }catch (error)
    {
        console.error(error)
    }
  }
  const irParaHome=()=>
  {
    router.push('/home')
  }
  const validarLogin = function()
  {
    if(!estaVacio(mail.value, pass.value))
    {   
        const usuario= listaUsuarios.find(x => x.mail == mail.value && x.password== pass.value)
        if(usuario != undefined)
        {
            userStore.setUser({ ...usuario, role: parseInt(usuario.role) })
            console.log(userStore.user.id, [])
            cartStore.setCart(usuario.id)
            irParaHome();
        }else
        {
            mensajeError.value="Mail y/o contraseña incorrecto"
        }
    }else
    {
        mensajeError.value = "El mail y/o la contraseña esta vacio"
    }
  }
  const estaVacio = function(mail, pass){
    return mail=="" || mail == undefined || pass=="" || pass == undefined
    
  }
  recibirData()

 

</script>

<template>
    <div class="border border-gray-200 p-12 m-10 rounded-md flex items-center ">
        <div>
        
        <h1 class="mb-10 font-bold text-2xl"> Ingrese a su cuenta </h1>

        <div class="grid gap-4">

            <div class="w-80">
                <div class="relative h-10 w-full min-w-[200px]">
                    <input v-model="mail"
                        class="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        placeholder=" "
                    />
                    <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        Email * 
                    </label>
                </div>
            </div>

            <div class="w-80">
                <div class="relative h-10 w-full min-w-[200px]">
                    <input v-model="pass" type="password"
                        class="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        placeholder=" "
                    />
                    <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        Contraseña * 
                    </label>
                </div>
            </div>

            <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full" @click="validarLogin()">Login</button>
            <p>{{mensajeError}}</p>
            <div class="flex justify-between items-center mt-4">
                
                <div class="flex items-center">
                    <input type="checkbox" id="remember" name="remember" class="text-blue-500">
                    <label for="remember" class="text-gray-600 ml-1 text-sm">Recordar usuario</label>
                </div>
                <p class="text-blue-800 text-sm cursor-pointer">¿Olvido su contraseña?</p>
            </div>

        </div>
        </div>
    </div>
  
</template>

<style scoped>
  .read-the-docs {
    color: #888;
  }
</style>