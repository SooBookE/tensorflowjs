<template>
  <div>
    Tensorflow의 Tensor
    <p>
      <button v-for="i in 3" :key="i" @click="ch = 'tf' + i">
        TF예제{{ i }}
      </button>
    </p>
  </div>
  <component :is="ch"></component>
</template>

<script>
/* eslint-disable */
import tf1 from "@/components/tf1.vue";
import tf2 from "@/components/tf2.vue";
import tf3 from "@/components/tf3.vue";

export default {
  name: "tfjs",
  data() {
    return {
      ch: "tf1",
    };
  },
  methods: {},
  components: {
    tf1,
    tf2,
    tf3,
  },
};
</script>

<style></style>
