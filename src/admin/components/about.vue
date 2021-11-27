<template lang="pug">
  .about-section
    h2 Page «About me»
    form.form#about(@submit.prevent="save")
      .status {{msgSkills}}
      .about-list
        skills-list(
          v-for="skillType in skillsTypes"
          :key="skillType"
          :skillType="skillType"
          :skills="skills"
        )
      input(name="" value="Save" class="about-save" type="submit")

</template>
<script>
import { mapActions, mapGetters } from "vuex";
import skillsList from "./skillsList";
export default {
  components: {
    skillsList,
  },
  data() {
    return {
      skillsTypes: ["Frontend", "Backend", "Workflow"],
    };
  },
  computed: {
    ...mapGetters(["skills", "default", "msgSkills"]),
  },
  methods: {
    ...mapActions(["fetchSkills", "saveSkills"]),
    save: function() {
      const data = this.skills;

      this.saveSkills(data, this.default);
    },
  },
  mounted: function() {
    this.fetchSkills();
  },
};
</script>
<style lang="scss" scoped>
.about-section {
  position: relative;

  h1 {
    color: #566358;
    font-size: 21px;
  }
}

.about-save {
  padding: 16px 20px;
  background-color: $green;
  border-radius: 5px;
  border: none;
  color: white;
  outline: none;
  font-weight: 500;

  &:hover {
    cursor: pointer;
  }
}

.about-list {
  display: flex;
  flex-wrap: wrap;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    flex-wrap: nowrap;
  }
}
</style>
