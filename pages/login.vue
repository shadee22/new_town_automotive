<!--
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->
<template>
  <!--
    This example requires updating your template:

    ```
    <html class="h-full bg-gray-50">
    <body class="h-full">
    ```
  -->
  <div class="flex min-h-full items-center justify-center py-12 px-4  sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-8 ">
      <div class="text-left">
        <h1 class='text-5xl text-prime font-extrabold text-center'> New Town AutoMotive</h1>
        <h2 class="mt-6  text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
        <p class="mt-2  text-lg text-gray-500">
          you can manage all your stocks here
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="submit">
        <div class="-space-y-px rounded-md shadow-sm">
          <div>
            <label class="sr-only">Username</label>
            <input  v-model="form.username" name="username" type="username"  required="" class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Username" />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input id="password" name="password" v-model="form.password" type="text"  required="" class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Password" />
          </div>
        </div>

       

        <div>
          <button type="submit" class="group relative flex w-full justify-center rounded-md border border-transparent bg-prime py-2 px-4 text-sm font-medium text-white hover:bg-prime focus:outline-none focus:ring-2  focus:ring-offset-2">
            Sign in
          </button>
        </div>
         <div class="flex items-center justify-between">
          <div class="flex items-center text-gray-500 text-sm font-medium ">
             <Icon icon='info' class='mr-2'/>Enter credentials properly!
          </div>

          <div class="text-sm">
            <NuxtLink to="support" class="font-medium text-prime hover:text-gray-800">Support</NuxtLink>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return{

    form : { username : '' , password : '', }
    }
    
  },
  methods :{
    submit(){
      // alert('username : '  + this.form.username + ' password : ' + this.form.password)
      this.$store.commit('login' , this.form)
      var auth = this.$store.state.user.authenticated;
      if(auth){
        this.$router.push('/invoices')
      }else{
       this.$swal({
        title: "Please Check Username/Password",
        text: "You are not authorized!",
        type: "warning",
      })
      }

    },

  }
}
</script>