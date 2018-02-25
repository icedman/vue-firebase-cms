<template name='Sidebar'>
  <div>
    <aside class="menu app-sidebar" :class="{'animate-is-hidden': !this.$store.state.ui.sidebar }">
      <ul class="menu-list"
        v-for="(menuItem, index) in this.$store.state.ui.menu"
        :key="'item' + index">

        <li>
          <a :aria-expanded="isExpanded(menuItem)"
            :class="linkActiveStyle(menuItem)" @click="clickItem(index, menuItem)">
            <span class="icon is-small">
              <i :class="['fa', menuItem.meta.icon]"></i></span> {{menuItem.name}}
            <span class="icon is-small is-angle" v-if="menuItem.children && menuItem.children.length">
              <i class="fa fa-angle-down"></i>
            </span>
          </a>
        </li>

        <expanding v-if="menuItem.children && menuItem.children.length" class="subitems">
          <ul v-show="isExpanded(menuItem)">
            <li v-for="(subItem, subItemIndex) in menuItem.children"
              :key="subItemIndex">
              <a @click="clickItem(subItemIndex, subItem)">
                <span class="icon is-small">
                  <i :class="['fa', subItem.meta.icon]"></i></span> {{subItem.name}}
                <span class="icon is-small is-angle" v-if="subItem.children && subItem.children.length">
                  <i class="fa fa-angle-down"></i>
                </span>
              </a>
            </li>
          </ul>
        </expanding>

      </ul>
    </aside>
    <div class="sidebar-bg" :class="{ 'is-hidden': !this.show }" @click="toggleSidebar()"></div>
  </div>
</template>

<script>
import Expanding from 'vue-bulma-expanding';
import { mapActions } from 'vuex';

export default {
  name: 'Sidebar',

  components: {
    Expanding,
  },

  computed: {
    show() {
      return this.$store.state.ui.sidebar;
    },
  },

  methods: Object.assign({
    linkActiveStyle(item) {
      if (item.path === this.$route.path) {
        return 'router-link-exact-active';
      }
      return null;
    },

    expandMenu(item) {
      // item.meta.expanded = true;
      const menu = [...this.$store.state.ui.menu];
      menu[item.index].meta.expanded = item.expanded;
      this.$store.commit('ui/SET_MENU', menu);
    },

    isExpanded(item) {
      return item.meta.expanded;
    },

    toggle(idx, item) {
      this.expandMenu({
        index: idx,
        expanded: !item.meta.expanded,
      });
    },

    clickItem(idx, item) {
      if (item.path && item.path !== '') {
        this.$router.push(item.path);
      } else if (item.url && item.url !== '') {
        window.location = item.url;
      }
      this.toggle(idx, item);
    },
  },
  mapActions('ui', ['toggleSidebar']),
  ),
};
</script>

<style lang="scss" scoped>
@import '~bulma/sass/utilities/_all';

.app-sidebar {
  height: 100%;
  position: fixed;
  top: 50px;
  left: 0;
  bottom: 0;
  padding: 20px 0 50px;
  width: 200px;
  min-width: 45px;
  max-height: 100vh;
  height: calc(100% - 50px);
  z-index: 2;
  background: #FFF;
  box-shadow: 0 2px 3px rgba(17, 17, 17, 0.1), 0 0 0 1px rgba(17, 17, 17, 0.1);
  overflow-y: auto;
  overflow-x: hidden;
  transition: left 200ms;
}

.app-sidebar.animate-is-hidden {
  left: -200px;
}

.app-sidebar .subitems {
  padding-left: 8px;
}

.sidebar-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.7;
  z-index: 1;
}

@media (min-width:768px) {
  .sidebar-bg {
    display: none;
  }
}
</style>

<style lang="scss">
.app-sidebar {
  .menu-label {
    padding-left: 5px;
  }

  li a {
    &[aria-expanded="true"] {
      .is-angle {
        transform: rotate(180deg);
      }
    }
  }

  li a + ul {
    margin: 0 10px 0 15px;
  }

  .icon {
    vertical-align: baseline;
    &.is-angle {
      position: absolute;
      right: 10px;
      transition: transform .377s ease;
      transform-origin: 25% 50%;
    }
  }
}

</style>
