<template lang="pug">
  .skills-list
    .skill-title {{skillType}}
    table.skills-table
      skills-item(
        v-for="skill in skills"
        v-if="convertSkillStringToNum(skillType) === skill.type"
        :key="skill.id"
        :skill="skill"
      )
</template>

<script>
import skillsItem from "./skillsItem";

export default {
  components: { skillsItem },
  props: {
    skillType: String,
    skills: Array
  },
  methods: {
    convertSkillStringToNum(skillGroupName) {
      switch (skillGroupName) {
        case "Frontend":
          return 1;
        case "Backend":
          return 2;
        case "Workflow":
          return 3;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.skill-title {
  margin-bottom: 16px;
}

.skills-list {
  margin-right: 100px;
  margin-bottom: 30px;

  &:last-child {
    margin-right: 0;
  }

  tr {
    height: 50px;
  }

  @media screen and (max-width: 768px) {
    margin-right: 0;
  }
}
.skills-table {
  padding-left: 20px;
}
</style>

