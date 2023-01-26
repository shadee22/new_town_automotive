<template>
  <main class="min-h-screen">
    <Navbar />
    <div class="grid h-full grid-cols-12">
      <Sidebar class="col-span-2" />
      <div class="col-span-10 h-full">
        <Table :name="$route.params.tablename" />
      </div>
    </div>
  </main>
</template>
<script>
export default {
  props: ["table_name"],
  middleware: "authenticated",

  setup() {},
};
</script>