<template>
  <main class="min-h-screen">
    <Navbar />
    <div class="grid h-full grid-cols-12">
      <Sidebar class="col-span-2" />
      <div class="col-span-10 h-full">
        <div class="font-bold text-2xl">
          {{ collection }}
        </div>
        <Table />
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "IndexPage",
  data() {
    return {
      collection: [],
    };
  },
  created() {
    this.$router.push("/invoices");
    this.$axios
      .get("get_all_invoices")
      .then((res) => {
        this.collection = res;
      })
      .catch((e) => alert(e));
  },
};
</script>
