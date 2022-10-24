<template>
  <div class="container">
    <h3 class="p-3 text-center">부동산 최저 가격표</h3>
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>날짜</th>
          <th>아파트명</th>
          <th>최저가[만원]</th>
          <th>평단가[만원]</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(rec, index) in rec_list" :key="index">
          <td>{{ rec.date }}</td>
          <td>{{ rec.apart.name }}</td>
          <td>{{ rec.price }}</td>
          <td>{{ rec.per_price }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "RecTable",
  props: {
    slice: Number,
  },
  data() {
    return {
      rec_list: {},
    };
  },
  methods: {
    fetchData: function () {
      this.axios
        .get("apart/price/")
        .then((response) => {
          this.rec_list = response.data;
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  async mounted() {
    await this.fetchData();
  },
};
</script>

<style></style>
