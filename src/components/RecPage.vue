<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-12 card">
        <rec-table :slice="0"></rec-table>
      </div>
    </div>
  </div>
</template>

<script>
import RecTable from "./RecTable.vue";
export default {
  name: "MainPage",
  components: {
    RecTable,
  },
};
</script>

<style></style>
