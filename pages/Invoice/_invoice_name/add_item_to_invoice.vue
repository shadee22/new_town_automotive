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
          Add Item to : {{ $route.params.invoice_name }} 
        </div>
        <form @submit.prevent="save_item" class="">
          <div class="flex gap-4 flex-wrap font-semibold">
            <div v-for="(value, name, index) in form" :key="index">
              {{ name.split("_").join(" ") }} :
              <input
                :class="'rounded-lg border border-gray-400 p-2'"
                v-model="form[name]"
                required
              />
            </div>
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
            add Item to table
          </button>
        </form>
      </div>
    </div>
  </main>
</template>
<script>
export default {
  props: ["invoice_name"],
  data() {
    return {
      max_value: 0,
      form: {
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
    var name = this.$route.params.invoice_name;
    this.$axios
      .post("get_all_data_for_invoice", {
        invoice_name: name,
      })
      .then((res) => {
        console.log("totoal ", res);
        this.max_value = Math.max(...res.data.arr.map((a) => parseInt(a.no)));
        // this.total_value['sum'] = (...this.total_value['array'])
        this.form['no'] = this.max_value + 1
      })
      .catch((e) => {
        alert(e);
      });
  },
  created() {
    if (this.$route.params.table_name) {
    }
  },
  methods: {
    async save_item() {
      this.form.no = this.form.no.toString()
      await this.$axios
        .post("/save_item_to_table", {
          invoice_name: this.$route.params.invoice_name,
          form: this.form,
        })
        .then((res) => {
          console.log('response is ' , res)
          if (res.status == 200) {
            alert("item added succusfully");
            console.log('saving form' , this.form.no)
            console.log('max' , this.max_value)
            var new_value = parseInt(this.form.no) + 1
            console.log('new value' , new_value)
            this.form = {
              no: new_value,
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
            };
          }
        })
        .catch((e) => alert(e));
    },
  },
};
</script>