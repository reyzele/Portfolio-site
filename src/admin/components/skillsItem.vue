<template lang="pug">
  tr
    td.first-cell {{skill.name}}
    td.second-cell
      input(type="text" :value="skill.percents" ref="skillInput" @change=`saveSkill(skill.id)`)
      span %
</template>

<script>
import { mapMutations } from "vuex";
export default {
  props: {
    skill: Object
  },
  data: () => {
    return {};
  },
  methods: {
    ...mapMutations(["removeSkill", "saveAll"]),
    removeExistedSkill(skillId) {
      this.removeSkill(skillId);
    },
    saveSkill(skillId) {
      if (this.$refs.skillInput.value == "") {
        this.$refs.skillInput.value = 0;
      }
      let data = {
        id: skillId,
        value: this.$refs.skillInput.value
      };
      this.saveAll(data);
    }
  }
};
</script>
<style lang="scss" scoped>
span {
  margin-left: 10px;
  font-weight: 400;
}

input {
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  width: 50px;
  height: 32px;
  border: none;
  border-radius: 5px;
  outline: none;
}
.first-cell {
  font-weight: 400;
  padding-right: 1rem;
}
</style>



