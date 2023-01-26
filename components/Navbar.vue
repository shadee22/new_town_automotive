<template>
  <main class="py-4 text-left bg-prime flex justify-between">
    <h1 class="text-2xl mx-4 text-white font-extrabold ">
      New Town AutoMotive
    </h1>
    <button  @click="logout" class="text-white px-4 hover:bg-white mx-4 rounded-lg hover:text-prime transition-all">
      Logout
    </button>
  </main>
</template>

<script>
export default {
 
  methods :{
    logout(){
      this.$store.commit('logout');
      this.$router.push('/login');
    }
  }
}
</script>
