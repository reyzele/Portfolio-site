<template lang="pug">
  div.works
    h2 Page «Works»
    form.form#upload(@submit.prevent="sendFile" enctype="multipart/form-data")  
      .works-title Add project
      .status {{msgfile}}      
      .works-row
        input(type='text' v-model="name" class='works-input' placeholder="Name of project" required)
      .works-row      
        input(type='text' v-model="tech" class='works-input' placeholder="Technology" required)  
      .works-row      
        input(type='text' v-model="link" class='works-input' placeholder="Link to project" required)  
      .works-row 
        .work-upload     
          label
              input(:photo="photo" class="works-open" type="file" accept="image/*" @change="fileChange($event.target.files)" ref="upload")
              img(src="/images/upload_pic.png")
              span Upload picture       
      input(class="works-save" type="submit" value="Add")  
</template>

<script>
export default {
  data: () => {
    return {
      name: '',
      tech: '',
      link: '',
      photo: null,
      msgfile: ''
    };
  },
  methods: {
    sendFile: function() {
      let formData = new FormData();
      console.log(this.photo);
      
      formData.append('photo', this.photo, this.photo.name);
      formData.append('tech', this.tech);
      formData.append('name', this.name);
      formData.append('link', this.link);
      
      this.axios.post('/admin/slides', formData)
      .then(rs => {
        this.msgfile = rs.data.msg;
        if (rs.data.status === 'Ok') {
          this.name = '';
          this.tech = '';
          this.link = '';
          this.photo = null;
          this.$refs.upload.value = null;
        }
      });
    },
    fileChange: function(file) {
      this.photo = file[0];
    }
  }
};
</script>

<style lang="scss" scoped>
.works {
  position: relative;
}
.works-row {
  position: relative;
  margin-top: 1.3rem;

  input {
    width: 80%;
    max-width: 25rem;
    padding: 0.5rem 1rem;
    border: none;
    outline: none;
    border-radius: 5px;
  }
}
.works-save {
  margin-top: 1.5rem;
  width: 119px;
  height: 46px;
  background-color: $green;
  border-radius: 5px;
  border: none;
  color: white;
  outline: none;

  &:hover {
    cursor: pointer;
  }
}
.work-upload {
  display: inline-block;
  overflow: hidden;
  padding: 8px 4px;
  color: $green;
  font-weight: 400;
  text-align: center;

  &:hover {
    cursor: pointer;
  }

  input[type='file'] {
    display: none;
  }
  label {
    display: block;
    cursor: pointer;
  }
  img {
    width: 35px;
    height: 35px;
    vertical-align: middle;
  }
  span {
    margin-left: 1rem;
  }
}
</style>
