<template>
<div class="page">
<router-link to="/posts/0" class="button is-primary is-outlined">
    <i class="fa fa-plus"></i>
    Add New Post
</router-link>
<hr>
<section>
  <b-table :data="posts" :mobile-cards="true">
    <template slot-scope="props">
      <b-table-column field="title" label="Title">
        {{ props.row.title }}
      </b-table-column>

      <b-table-column field="author" label="Author">
        {{ props.row.author }}
      </b-table-column>

      <b-table-column field="categories" label="Categories">
      </b-table-column>

      <b-table-column field="tags" label="Tags">
      </b-table-column>

      <b-table-column field="comments" label="Comments">
      </b-table-column>

      <b-table-column field="date" label="Date" centered>
      </b-table-column>

      <b-table-column label="" style="text-align:right">
      <router-link :to="'/posts/' + props.row.id" class="button is-primary is-outlined">
        <span class="icon"><i class="fa fa-pencil"></i></span>&nbsp;Edit
      </router-link>
      </b-table-column>
    </template>

    <template slot="empty">
      <section class="section">
        <div class="content has-text-grey has-text-centered">
          <p>
            <b-icon
              icon="emoticon-sad"
              size="is-large">
            </b-icon>
          </p>
          <p>Nothing here.</p>
        </div>
      </section>
    </template>
  </b-table>
</section>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Menu from '@/menus';

export default {
  data() {
    return {
      posts: [],
      recentPostsRef: null,
      page: 0,
      limit: 40,
    };
  },

  computed: Object.assign(
    {},
    mapGetters('ui', ['fullpage']),
  ),

  methods: Object.assign(
    {
      fetch(page) {
        this.page = page;

        // const start = this.limit * this.page;
        // const end = start + this.limit;
        const firebase = this.$firebase;
        this.recentPostsRef = firebase.database().ref('posts')
          .limitToLast(this.limit);
          // .startAt(start);
        this.recentPostsRef.on('child_added', (data) => {
          const obj = {
            id: data.key,
            title: data.val().title,
            author: data.val().author || 'Anonymous',
          };
          this.posts.push(obj);
        });

        this.recentPostsRef.on('child_changed', (data) => {
          const obj = this.posts.filter(post => (post.id === data.key));
          if (obj.length) {
            obj[0].title = data.val().title;
          }
        });

        this.recentPostsRef.on('child_removed', (data) => {
          const objs = this.posts.map(post => post.id);
          const idx = objs.indexOf(data.key);
          if (idx !== -1) {
            this.$delete(this.posts, idx);
          }
        });
      },
    },
    mapActions('ui', ['toggleSidebar', 'toggleFullPage']),
  ),

  mounted() {
    this.$store.commit('ui/SET_MENU', Menu);

    this.fetch(this.page);
  },

  destroyed() {
    // console.log('tear down');
    this.recentPostsRef.off();
  },
};
</script>

<style lang="scss" scoped>
</style>
