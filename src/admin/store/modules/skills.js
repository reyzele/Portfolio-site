import axios from "axios";

const skills = {
  state: {
    msgSkills: "",
    data: [],
    default: false,
    changedSkills: [],
  },
  getters: {
    skills(state) {
      return state.data;
    },
    default(state) {
      return state.default;
    },
    msgSkills(state) {
      return state.msgSkills;
    },
  },
  mutations: {
    saveAll(state, data) {
      state.data.forEach((element) => {
        if (element.id === data.id) {
          element.percents = data.value;
          state.changedSkills.push(
            Object.assign(
              {},
              {
                id: element._id,
                percents: element.percents,
              }
            )
          );
        }
      });
    },
    addSkill(state, skill) {
      state.data.push(skill);
    },
    removeSkill(state, skillId) {
      state.data = state.data.filter((item) => item.id !== skillId);
    },
  },
  actions: {
    fetchSkills({ state }) {
      axios.get("/api/about").then((rs) => {
        state.data = rs.data.skills;
        state.default = rs.data.default;
      });
      state.changedSkills = [];
      state.msgSkills = "";
    },
    saveSkills({ state }) {
      const { data, default: _default, changedSkills } = state;

      if (_default) {
        data.forEach((item) => {
          axios({
            method: "post",
            url: `/api/about`,
            data: {
              type: item.type,
              name: item.name,
              percents: item.percents,
            },
          }).then((rs) => {
            state.msgSkills = rs.data.status;
          });
        });
      } else {
        changedSkills.forEach((item) => {
          axios({
            method: "put",
            url: `/api/about/${item.id}`,
            data: {
              percents: item.percents,
            },
          }).then((rs) => {
            state.msgSkills = rs.data.status;
          });
        });
      }

      state.changedSkills = [];
    },
  },
};

export default skills;
