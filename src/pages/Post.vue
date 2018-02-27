<template>
<div class="page">
<section>

<div class="field is-horizontal">
  <div class="field-label is-normal">
    <label class="label">Title</label>
  </div>
  <div class="field-body">
    <div class="field">
      <div class="control">
        <input class="input" placeholder="" v-model="title"/>
      </div>
    </div>
  </div>

  <div class="field-label"><!--spacer--></div>
</div>

<div class="field is-horizontal">
  <div class="field-label is-normal">
    <label class="label">Content</label>
  </div>
  <div class="field-body">
    <div class="field">
      <div class="control">
        <textarea class="textarea" placeholder="" v-model="body"></textarea>
      </div>
    </div>
  </div>

  <div class="field-label"><!--spacer--></div>
</div>

<div class="field is-horizontal">
  <div class="field-label is-normal">
    <!-- spacer -->
  </div>
  <div class="field-body">
    <div class="field">

      <hr>

      <div class="control">
        <button class="button is-danger" @click="save()"><i class="fa fa-save"></i> Save</button>
        <button class="button is-danger" @click="save()" v-if="id">
          <i class="fa fa-trash"></i> Delete
        </button>
      </div>
    </div>
  </div>

  <div class="field-label"><!--spacer--></div>
</div>

</section>

</div>
</template>

<script>
import Menu from '../menus';

export default {
  data() {
    return {
      id: null,
      title: '',
      body: '',
    };
  },

  methods: {
    // readPost(postId) {
    //   //
    // },

    save() {
      const postData = {
        uid: this.$store.state.user.uid,
        author: this.$store.state.user.displayName,
        authorPhotoURL: this.$store.state.user.photoURL,
        title: this.title,
        body: this.body,
      };

      const firebase = this.$firebase;
      let postKey = this.id;

      if (!postKey) {
        postKey = firebase.database().ref().child('posts').push().key;
        // this.$snackbar.open({ type: 'is-danger', message: 'Error saving' });
      }

      const updates = {};
      updates[`/posts/${postKey}`] = postData;
      updates[`/user-posts/${postData.uid}/${postKey}`] = postData;

      // console.log(updates);
      // return;

      firebase.database().ref().update(updates).then(
        () => {
          this.id = postKey;
          this.$snackbar.open({ type: 'is-success', message: 'Post saved.' });
          this.$router.push(`/posts/${postKey}`);
        })
        .catch(() => {
          this.$snackbar.open({ type: 'is-danger', message: 'Error saving' });
        });
    },
  },

  mounted() {
    this.$store.commit('ui/SHOW_FULLPAGE', false);
    this.$store.commit('ui/SET_MENU', Menu);

    if (this.$route.params.id !== '0') {
      this.id = this.$route.params.id;
      const firebase = this.$firebase;
      firebase.database()
        .ref(`/posts/${this.id}`)
        .once('value')
        .then((snapshot) => {
          const val = snapshot.val();
          if (!val) {
            this.$snackbar.open({ type: 'is-danger', message: 'Error saving' });
            return;
          }
          this.title = val.title;
          this.body = val.body;
        });
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
