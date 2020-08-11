<template>
  <b-container class="mt-4">
    <b-row>
      <b-col sm="8">
        <b-form-textarea
          id="textarea"
          v-model="text"
          placeholder="Enter something..."
          rows="3"
          max-rows="6"
        ></b-form-textarea>
      </b-col>
      <b-col sm="4" id="submit-container">
        <b-button variant="primary" @click="onSubmit" class="mt-2"
          >Submit</b-button
        >
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      text: ''
    }
  },
  methods: {
    onSubmit() {
      this.$emit('newItem', { text: this.text })
      this.text = ''
    }
  }
}
</script>

<style scoped>
#submit-container {
  display: flex;
  align-items: flex-end;
}
</style>
