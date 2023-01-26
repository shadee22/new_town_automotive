<template>
  <main class="w-full h-full">
    <div class="px-3 py-4 overflow-y-auto rounded dark:bg-gray-800">
      <ul class="">
        <li
          v-for="sidebar in sidebars"
          :key="sidebar"
          class="
            hover:bg-gray-100 hover:cursor-pointer
            flex
            items-center
            py-2
            pr-4
            w-full
            transition-all
            rounded-lg
            font-semibold
          "
          @click="$router.push('/'+sidebar.name.toLowerCase().replace(' ' ,''))"
        >
          <Icon :icon="sidebar.name" class="mx-2" />
          <span class="">{{ sidebar.name }}</span>
        </li>
      </ul>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      sidebars: [
        // {name : 'Current Table' },
        { name: "Invoices" },
        { name: "New Invoice" },
        // { name: "Create Table" },
      ],
    };
  },
};
</script>