<template>
  <div class="">
    <h3 class="p-3 text-center">부동산 최저 가격표</h3>
    <div class="d-flex justify-content-between my-2">
      <div class="d-flex">
        <input class="form-control w-auto me-2" type="search" placeholder="아파트명(네이버명)" v-model="addApartName" aria-label="AddRec" />
        <button class="btn btn-outline-success" @click="addApart">아파트추가</button>
      </div>
      <div class="d-flex">
        <input class="form-control w-auto me-2" type="search" placeholder="아파트명" v-model="search" aria-label="SearchRec" />
        <button class="btn btn-outline-success">부동산검색</button>
      </div>
    </div>
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>날짜</th>
          <th>아파트명</th>
          <th>거래방식</th>
          <th>최저가[만원]</th>
          <th>평단가[만원]</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(rec, index) in filteredList" :key="index">
          <!-- <td v-for="(data, index) in rec" :key="index">{{ data }}</td> -->
          <td>{{ rec.date }}</td>
          <td>{{ rec.apart.name }}</td>
          <td>{{ rec.transaction_style }}</td>
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
      recList: [],
      addApartName: "",
      searchApartName: "",
      search: "",
    };
  },
  methods: {
    fetchData() {
      this.axios
        .get("apart/price/")
        .then((response) => {
          this.recList = response.data;
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addApart() {
      this.axios
        .post("apart/", {
          name: this.addApartName,
        })
        .then((response) => {
          console.log(response.data);
          alert(this.addApartName + " 등록완료");
        })
        .catch((error) => {
          console.log(error);
          alert("등록실패");
        });
    },
  },
  computed: {
    filteredList() {
      return this.recList.filter((rec) => {
        return rec.apart.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style></style>
