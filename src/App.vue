<template>
  <div id="app">
    <div class="box shadow p-5" :class="loading ? 'loading' : ''">
      <div class="flex mb-5">
        <div class="w-1/2 px-3">
          <label class="text-xs text-gray-600">Баланс</label>
          <input
            type="number"
            v-model="balance"
            placeholder="Баланс"
            class="ui fluid search selection dropdown"
          />
        </div>
        <div class="w-1/2 px-3">
          <label class="text-xs text-gray-600">Хослол сонгох</label>
          <select class="ui fluid search selection dropdown" v-model="selectedPair">
            <option
              v-for="(pair,pair_index) in pairs"
              :key="pair_index"
              placeholder="Хослол сонгох"
            >{{pair.text}}</option>
          </select>
        </div>
      </div>
      <div class="flex mb-5">
        <div class="w-1/2 px-3">
          <label class="text-xs text-gray-600">Өсгөх хүү %</label>
          <input
            type="number"
            v-model="percent"
            placeholder="Өсгөх хүү"
            class="ui fluid search selection dropdown"
          />
        </div>
        <div class="w-1/2 px-3">
          <label class="text-xs text-gray-600">Өсгөх хүү /Доллар/</label>
          <input
            type="number"
            :value="balance/100*percent"
            placeholder="Өсгөх хүү /Доллар/"
            class="ui fluid search selection dropdown"
            disabled
          />
        </div>
      </div>
      <div class="flex mb-5">
        <div class="w-1/2 px-3">
          <label class="text-xs text-gray-600">Pip хэмжээ</label>
          <input
            type="number"
            v-model="pips"
            placeholder="Pip хэмжээ"
            class="ui fluid search selection dropdown"
          />
        </div>
        <div class="w-1/2 px-3">
          <label class="text-xs text-gray-600">Lot хэмжээ</label>
          <input
            type="number"
            v-model="lot"
            placeholder="Lot хэмжээ"
            class="ui fluid search selection dropdown"
          />
        </div>
      </div>
      <div class="flex mb-5">
        <div class="w-1/2 px-3">
          <label class="text-xs text-gray-600">Үр дүн /Доллар/</label>
          <input
            type="number"
            placeholder="Үр дүн /Доллар/"
            v-model="profitPerLot"
            class="ui fluid search selection dropdown"
            disabled
          />
        </div>
      </div>
      <div class="error" v-if="errors">
        <p>- {{errors}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ModelSelect } from "vue-search-select";
export default {
  name: "app",
  watch: {
    selectedPair(newVal, oldVal) {
      this.loading = true;
      axios
        .get(
          "https://cors-anywhere.herokuapp.com/https://www.freeforexapi.com/api/live?pairs=" +
            newVal
        )
        .then(rs => {
          this.selectedPairRate = rs.data.rates[newVal].rate;
          this.calc();
          this.errors = null;
          this.loading = false;
        });
    },
    lot(newVal, oldVal) {
      this.calc();
    },
    pips(newVal, oldVal) {
      this.calc();
    }
  },
  data() {
    return {
      pairs: [
        { value: "EURUSD", text: "EURUSD" },
        { value: "EURGBP", text: "EURGBP" },
        { value: "GBPUSD", text: "GBPUSD" },
        { value: "USDJPY", text: "USDJPY" },
        { value: "AUDUSD", text: "AUDUSD" },
        { value: "USDCHF", text: "USDCHF" },
        { value: "NZDUSD", text: "NZDUSD" },
        { value: "USDCAD", text: "USDCAD" }
      ],
      selectedPair: null,
      selectedPairRate: 0,
      percent: 3,
      pips: 20,
      lot: 0.01,
      lose: 0,
      balance: 0,
      profitPerLot: 0,
      loading: false,
      errors: null
    };
  },
  methods: {
    calc() {
      if (this.selectedPair) {
        if (this.selectedPair == "USDJPY") {
          this.profitPerLot =
            ((this.pips * 0.01) / this.selectedPairRate) * (100000 * this.lot);
        } else {
          this.profitPerLot =
            ((this.pips * 0.0001) / this.selectedPairRate) *
            (100000 * this.lot);
        }
      } else {
        this.errors = "Хослол сонгоно уу";
      }
    }
  },
  components: {
    ModelSelect
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.box {
  margin-top: 60px;
  width: 600px;
}

input {
  max-height: 38px;
}

.loading {
  opacity: 0.5;
  cursor: progress;
  pointer-events: none;
}

.error p {
  font-size: 12px;
  position: relative;
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  color: #856404;
  background-color: #fff3cd;
  border-color: #ffeeba;
}
</style>
