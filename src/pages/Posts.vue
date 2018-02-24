<template>
  <div class="page">

    <button class="button is-secondary">
        <i class="fa fa-plus"></i>
        Add New  Post
    </button>
    <hr>
    <section>
      <b-table :data="data" :mobile-cards="true">

          <template slot-scope="props">
              <b-table-column field="id" label="ID" width="40" numeric>
                  {{ props.row.id }}
              </b-table-column>

              <b-table-column field="first_name" label="First Name">
                  {{ props.row.first_name }}
              </b-table-column>

              <b-table-column field="last_name" label="Last Name">
                  {{ props.row.last_name }}
              </b-table-column>

              <b-table-column field="date" label="Date" centered>
                  <span class="tag is-success">
                      {{ new Date(props.row.date).toLocaleDateString() }}
                  </span>
              </b-table-column>

              <b-table-column label="Gender">
                  <b-icon pack="fas"
                      :icon="props.row.gender === 'Male' ? 'mars' : 'venus'">
                  </b-icon>
                  {{ props.row.gender }}
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
    const data = [
      { id: 1, first_name: 'Jesse', last_name: 'Simmons', date: '2016/10/15 13:43:27', gender: 'Male' },
      { id: 2, first_name: 'John', last_name: 'Jacobs', date: '2016/12/15 06:00:53', gender: 'Male' },
      { id: 3, first_name: 'Tina', last_name: 'Gilbert', date: '2016/04/26 06:26:28', gender: 'Female' },
      { id: 4, first_name: 'Clarence', last_name: 'Flores', date: '2016/04/10 10:28:46', gender: 'Male' },
      { id: 5, first_name: 'Anne', last_name: 'Lee', date: '2016/12/06 14:38:38', gender: 'Female' },
    ];

    return {
      data,
    };
  },

  computed: Object.assign(
    {},
    mapGetters('ui', ['fullpage']),
  ),

  methods: Object.assign(
    {},
    mapActions('ui', ['toggleSidebar', 'toggleFullPage']),
  ),

  mounted() {
    this.$store.commit('ui/SET_MENU', Menu);
  },
};
</script>

<style lang="scss" scoped>
.page {
  margin: 20px;
}
</style>
