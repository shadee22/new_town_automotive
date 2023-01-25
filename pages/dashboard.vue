<template>
  <main class="min-h-screen">
    <Navbar />
    <div class="grid h-full grid-cols-12">
      <Sidebar class="col-span-2" />
      <div class="col-span-10 bg-blue-500" />
      <table></table>
    </div>
  </main>
</template>

<script>
export default {
  setup() {},
};
</script>