<template>
  <!-- component -->
  <!-- This is an example component -->
  <div class="p-4 overflow-auto relative">
    <div class="font-bold text-2xl pb-2 flex items-center gap-4">
      <p>{{ name }}</p>
      <!-- <div class="font-bold text-2xl">{{ filtered }}</div> -->
      <button
        class="
          text-base
          font-semibold
          px-4
          py-2
          rounded-lg
          text-white
          bg-blue-500
        "
        @click="$router.push(`/invoice/${name}/add_item_to_invoice`)"
      >
        + Add Item
      </button>
    </div>
    <!-- {{filtered}} -->
    <div class="pb-2">
      <label for="table-search" class="sr-only">Search </label>
      <div class="relative mt-1">
        <div
          class="
            absolute
            inset-y-0
            left-0
            flex
            items-center
            pl-3
            pointer-events-none
          "
        >
          <svg
            class="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
        <input
          type="text"
          id="table-search"
          v-model="search_input"
          class="
            bg-gray-50
            border border-gray-300
            text-gray-900 text-sm
            rounded-lg
            focus:ring-blue-500 focus:border-blue-500
            block
            w-80
            pl-10
            p-2.5
            dark:bg-gray-700
            dark:border-gray-600
            dark:placeholder-gray-400
            dark:text-white
            dark:focus:ring-blue-500
            dark:focus:border-blue-500
          "
          placeholder="Search for items"
        />
      </div>
      <div class="flex gap-4">
        <div class="text-gray-400 text-sm py-2 font-semibold">
          Availabilty :
          {{
            search_input == "" || filtered.length == 0
              ? "No Item Selected"
              : filtered_totals.ava
          }}
        </div>
        <div class="text-gray-400 text-sm py-2 font-semibold">
          Dispath :
          {{
            search_input == "" || filtered.length == 0
              ? "No Item Selected"
              : filtered_totals.disp
          }}
        </div>
      </div>
    </div>
    <div v-if="data.length >= 0" class="font-bold p-8 text-2xl text-black">
      Loading <span class="animate-ping">...</span>
    </div>
    <table
      v-else
      class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
    >
      <thead
        class="
          text-xs text-gray-700
          uppercase
          bg-gray-50
          dark:bg-gray-700 dark:text-gray-400
        "
      >
        <tr>
          <th v-for="(i, value) in form" scope="col" :key="i" class="px-6 py-3">
            {{ value }}
          </th>
        </tr>
      </thead>
      <!-- Default -->
      <tbody v-if="search_input === '' || filtered.length == 0">
        <tr
          v-for="(obj, index) in data?.data?.arr"
          :key="index"
          @click="select_product(obj)"
          class="
            bg-white
            border-b
            dark:bg-gray-800 dark:border-gray-700
            hover:bg-gray-100
            transition-all
            cursor-pointer
            dark:hover:bg-gray-600
          "
        >
          <th
            scope="row"
            class="
              px-6
              py-4
              font-medium
              text-gray-900
              dark:text-white
              whitespace-nowrap
            "
          >
            {{ obj["no"] }}
          </th>
          <td class="px-6 py-4">{{ obj["item"] }}</td>
          <td class="px-6 py-4">{{ obj["item_model"] }}</td>
          <td class="px-6 py-4">{{ obj["model_version"] }}</td>
          <td class="px-6 py-4">{{ obj["item_color"] }}</td>
          <td class="px-6 py-4">{{ obj["quantity"] }}</td>
          <td class="px-6 py-4">{{ obj["cartons"] }}</td>
          <td class="px-6 py-4">{{ obj["availability"] }}</td>
          <td class="px-6 py-4">{{ obj["dispatch"] }}</td>
          <td class="px-6 py-4">{{ obj["wholesale_price"] }}</td>
          <td class="px-6 py-4">{{ obj["retail_price"] }}</td>
        </tr>
      </tbody>
      <!-- Searching -->
      <tbody v-if="search_input !== ''">
        <tr
          v-for="obj in filtered"
          :key="obj"
          class="
            bg-white
            border-b
            dark:bg-gray-800 dark:border-gray-700
            hover:bg-gray-50
            dark:hover:bg-gray-600
          "
        >
          <th
            scope="row"
            class="
              px-6
              py-4
              font-medium
              text-gray-900
              dark:text-white
              whitespace-nowrap
            "
          >
            {{ obj["no"] }}
          </th>
          <td class="px-6 py-4">{{ obj["item"] }}</td>
          <td class="px-6 py-4">{{ obj["item_model"] }}</td>
          <td class="px-6 py-4">{{ obj["model_version"] }}</td>
          <td class="px-6 py-4">{{ obj["item_color"] }}</td>
          <td class="px-6 py-4">{{ obj["quantity"] }}</td>
          <td class="px-6 py-4">{{ obj["cartons"] }}</td>
          <td class="px-6 py-4">{{ obj["availability"] }}</td>
          <td class="px-6 py-4">{{ obj["dispatch"] }}</td>
          <td class="px-6 py-4">{{ obj["wholesale_price"] }}</td>
          <td class="px-6 py-4">{{ obj["retail_price"] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>




<script>
export default {
  props: ["name"],
  data() {
    return {
      search_input: "",
      form: {
        no: "",
        item: "",
        item_model: "",
        model_version: "",
        Item_color: "",
        quantity: "",
        cartons: "",
        availability: "",
        dispatch: "",
        wholesale_price: "",
        retail_price: "",
      },
      data: [],
      // data: [
      //   {
      //     product_name: "iphone 12",
      //     color: "blue",
      //     category: "phone",
      //     price: "200rs",
      //   },
      //   {
      //     product_name: "Samsung Galaxy S21",
      //     color: "gray",
      //     category: "phone",
      //     price: "300rs",
      //   },
      //   {
      //     product_name: "OnePlus 8",
      //     color: "green",
      //     category: "phone",
      //     price: "400rs",
      //   },
      // ],
    };
  },
  computed: {
    filtered() {
      // var search = this.search_input;
      // var filtered = this.data.filter((a) => {
      //   return a.product_name
      //     .toLowerCase()
      //     .includes(this.search_input.toLowerCase());
      // });
      // for (var i in el) {
      if (this.data?.data?.arr) {
        var el_filter = this.data?.data?.arr.filter((a) => {
          return (
            a["retail_price"]
              .toLowerCase()
              .includes(this.search_input?.toLowerCase()) ||
            a["item"].toLowerCase().includes(this.search_input.toLowerCase()) ||
            a["no"].toLowerCase().includes(this.search_input.toLowerCase()) ||
            a["model_version"]
              .toLowerCase()
              .includes(this.search_input.toLowerCase()) ||
            a["item_model"]
              .toLowerCase()
              .includes(this.search_input.toLowerCase()) ||
            a["quantity"]
              .toLowerCase()
              .includes(this.search_input.toLowerCase()) ||
            a["wholesale_price"]
              .toLowerCase()
              .includes(this.search_input.toLowerCase())
          );
        });
        return el_filter;
      }

      // filtered.push(el_filter);
      // }
      // el_filter = this.data;
    },
    filtered_totals() {
      var sum = 0;
      var availability_total = this.filtered
        ?.map((a) => {
          return parseFloat(a.availability);
        })
        .reduce((total, num) => total + num, 0);
      var dispatch_total = this.filtered
        ?.map((a) => {
          return parseFloat(a.dispatch);
        })
        .reduce((total, num) => total + num, 0);
      return {
        ava : availability_total,
        disp : dispatch_total,
      };
    },
  },
  created() {
    this.$axios
      .post("get_all_data_for_invoice", {
        invoice_name: this.name,
      })
      .then((res) => {
        // console.log(res)
        this.data = res;
      })
      .catch((e) => {
        alert(e);
      });
  },
  methods: {
    select_product(i) {
      this.$router.push("/invoice/" + this.name + "/" + i.no);
      // alert('invoice/'+ this.name + '/'+ i.no)
    },
    // get_all_data_for_invoice
    tell() {
      return "hello hello";
    },
  },
};
</script>