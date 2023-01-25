<template>
  <main class="min-h-screen">
    <Navbar />
    <div class="grid h-full grid-cols-12">
      <Sidebar class="col-span-2" />
      <div class="col-span-10">
        <div class="font-bold text-2xl py-2">New Invoice</div>
        <form @submit="create_new_invoice">
          <div class="w-full md:w-1/2 mb-6 md:mb-0">
            <input
              class="
                border
                w-full
                text-gray-700
                rounded-lg
                py-3
                px-2
                mb-3
                leading-tight
                focus:outline-none focus:bg-white
              "
              v-model="invoice_name"
              required
              type="text"
              placeholder="Invoice Name"
            />
          </div>
          <button
            type="submit"
            class="bg-prime px-8 py-2 font-bold text-white rounded-lg"
          >
            Create new Invoice
          </button>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      invoice_name: "",
    };
  },
  methods: {
    async create_new_invoice() {
      alert("created  : " + this.invoice_name);
      await this.$axios
        .post("create_new_invoice", {
          invoice_name: this.invoice_name,
        })
        .then((res) => console.log(res))
        .catch((e) => {
          alert('something wrong while creating invoice')
          console.log("saving invoice error", e)
        });
    },
  },
};
</script>