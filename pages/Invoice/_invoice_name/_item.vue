<template>
  <main class="min-h-screen">
    <Navbar />
    <div class="grid h-full grid-cols-12">
      <Sidebar class="col-span-2" />
      <div class="col-span-10 py-8 h-full pr-4">
        <div class="font-bold text-2xl pb-6 flex items-center gap-4">
          <NuxtLink
            :to="'/invoice/' + $route.params.invoice_name"
            class="
              text-white
              px-4
              py-2
              rounded-full
              bg-blue-600
              hover:bg-blue-700
              text-sm text-semibold
            "
            >Go back
          </NuxtLink>
          Editing : Invoice - {{ $route.params.invoice_name }} | Item Code :
          {{ $route.params.item }}
        </div>
        <div v-show="loaded">
          <form @submit.prevent="edit_form" class="">
            <div class="flex gap-4 flex-wrap font-semibold">
              <div
                v-for="(value, name, index) in form"
                :key="index"
                class="grid"
              >
                {{ name.split("_").join(" ") }}
                <input
                  :class="'rounded-lg border border-gray-400 p-2 disabled:text-gray-500 disabled:bg-gray-200 disabled:hover:cursor-not-allowed'"
                  v-model="form[name]"
                  :disabled="name == 'no'"
                  required
                />
              </div>
            </div>
            <div class="flex">
              <div
                @click="delete_item_from_invoice"
                class="
                  text-base
                  cursor-pointer
                  my-6
                  font-semibold
                  px-4
                  py-2
                  rounded-lg
                  text-red-500
                  mr-4
                "
              >
                Delete
              </div>
              <button
                type="submit"
                class="
                  text-base
                  my-6
                  font-semibold
                  px-4
                  py-2
                  rounded-lg
                  text-white
                  bg-blue-500
                "
              >
                Edit Item
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
export default {
  props: ["table_name"],
  data() {
    return {
      form: [],
      total_value: [],
      edited_form: {},
      loaded: false,
      order: {
        no: "",
        item: "",
        item_model: "",
        model_version: "",
        item_color: "",
        quantity: "",
        cartons: "",
        availability: "",
        dispatch: "",
        wholesale_price: "",
        retail_price: "",
      },
    };
  },
  middleware: "authenticated",
  mounted() {
    function orderJSON(json, order) {
      let ordered = {};
      Object.keys(order).forEach(function (key) {
        if (json[key] !== undefined) {
          ordered[key] = json[key];
        }
      });
      return ordered;
    }

    // var name = this.$route.params.invoice_name;
    // this.$axios
    //   .post("get_all_data_for_invoice", {
    //     invoice_name: name,
    //   })
    //   .then((res) => {
    //     console.log('totoal' , res)
    //     this.total_value = res;
    //   })
    //   .catch((e) => {
    //     alert(e);
    //   });
    this.$axios
      .post("/load_current_item", {
        invoice_name: this.$route.params.invoice_name,
        item_code: this.$route.params.item,
      })
      .then((res) => {
        this.form = orderJSON(res?.data?.data, this.order);
        this.loaded = true;
      })
      .catch((e) => {
        alert(e);
        this.$router.push("/invoices");
      });
  },
  methods: {
    delete_item_from_invoice() {
      this.$axios
        .post("/delete_item_from_invoice", {
          invoice_name: this.$route.params.invoice_name,
          item_code: this.$route.params.item,
        })
        .then((res) => {
          console.log(res);
          this.$router.push('/invoice/'+ this.$route.params.invoice_name)
        })
        .catch((e) => {
          // alert(e)
          // console.log(e);
        });
    },
    edit_form() {
      // this.form
      // $route.params.invoice_name

      // url :edit_item

      this.$axios
        .post("/edit_item", {
          invoice_name: this.$route.params.invoice_name,
          edited_data: this.form,
        })
        .then((res) => {
          if (res.status == 200) {
            alert("Edited Succussfully");
            this.$router.push("/invoicew/" + this.$route.params.invoice_name);
          }
        })
        .catch((e) => alert(e));
    },
  },
};
</script>