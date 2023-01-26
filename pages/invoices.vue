<template>
  <main class="min-h-screen">
    <Navbar />
    <div class="grid h-full grid-cols-12">
      <Sidebar class="col-span-2" />
      <div class="col-span-10 h-full">
        <div v-if="!collection" class="font-bold p-8 text-2xl text-black">
          Loading <span class="animate-ping">...</span>
        </div>

        <div v-if="collection && collection.length == 0" class="p-4 text-2xl text-gray-500 font-bold">
          <p> No Invoices Added!</p>
          <NuxtLink to="/newinvoice">
          <p class="text-lg text-white bg-blue-500 font-semibold my-4 w-fit px-4 py-2 rounded-lg">Add New Invoice </p></NuxtLink>

        </div>
        <ul class="flex flex-wrap gap-2 py-8">
          <li v-for="i in collection" :key="i">
            <a
              class="
                block
                py-5
                px-5
                bg-white
                border border-gray-200
                rounded-lg
                shadow
                hover:bg-gray-50
                transition-all
                divide-y
              "
            >
              <h5
                @click="route_to_invoice(i)"
                class="
                  mb-2
                  cursor-pointer
                  text-xl
                  font-bold
                  tracking-tight
                  text-gray-900
                  dark:text-white
                "
              >
                {{ i }}
              </h5>
              <div class="pt-3 flex gap-2 justify-between">
                <button
                  @click="delete_invoice(i)"
                  class="text-red-500 font-semibold px-4 py-2 rounded-lg"
                >
                  Delete
                </button>
                <button
                  @click="route_to_invoice(i)"
                  class="
                    font-normal
                    text-white
                    font-semi-bold
                    bg-blue-500
                    hover:bg-blue-600
                    px-8
                    py-1
                    rounded-lg
                  "
                >
                  Open
                </button>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "IndexPage",
  data() {
    return {
      table_list: [
        {
          name: "first",
        },
        {
          name: "first",
        },
        {
          name: "first",
        },
      ],
      collection: undefined,
    };
  },
   middleware : 'authenticated',

  async created() {
    // var status = this.$store.getters.auth_status;
    // if (status) {
      await this.$axios
        .$get("/get_all_invoices")
        .then((res) => {
          // console.log('get all invocies response ' , res);
          this.collection = res;
        })
        .catch((e) => {
          console.log("invoice error " + e);
          // alert(e);
        });
    // }else{
    //   this.$router.push('/login')
    // }
  },
  methods: {
    route_to_invoice(name) {
      this.$router.push("invoice/" + name);
    },
    delete_invoice(i) {
      this.$swal({
        title: "Are you sure?",
        text: "You will not be able to recover this Invoice!",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, keep it",
      }).then((result) => {
        if (result.value) {
          this.$axios
            .post("delete_invoice", {
              invoice_name: i,
            })
            .then((res) => {
              console.log("invoice deleted : ", res);
              this.$swal(
                "Deleted!",
                "Your imaginary file has been deleted.",
                "success"
              );
            })
            .catch((e) => {
              console.log(e);
            });
        }
      });
    },
  },
};
</script>
