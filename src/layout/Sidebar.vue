<template>
  <div>
    <aside class="menu app-sidebar" :class="{'animate-is-hidden': !this.$store.state.ui.sidebar }">
      <ul class="menu-list"
        v-for="(menuItem, index) in this.$store.state.ui.menu"
        :key="'item' + index">

        <menu-item-link
          :item="menuItem" :index="index"
          :expanded="isExpanded(menuItem)">
        </menu-item-link>

        <menu-item-router-link
          :item="menuItem"
          :index="index"
          :expanded="isExpanded(menuItem)">
        </menu-item-router-link>

        <expanding v-if="menuItem.children && menuItem.children.length" class="subitems">
          <ul v-show="isExpanded(menuItem)">
            <li v-for="(subItem, subItemIndex) in menuItem.children"
              :key="subItemIndex">
              <menu-item-link
                :item="subItem" :index="subItemIndex"></menu-item-link>
              <menu-item-router-link
                :item="subItem" :index="subItemIndex"></menu-item-router-link>
            </li>
          </ul>
        </expanding>

      </ul>
    </aside>
    <div class="sidebar-bg " :class="{ 'is-hidden': !this.show }" @click="toggleSidebar()"></div>
  </div>
</template>

<script>
import Expanding from 'vue-bulma-expanding';
import { mapActions } from 'vuex';

export default {
  components: {
    Expanding,

    menuItemLink: {
      props: ['item', 'index', 'expanded'],
      template: `
      <li v-if="item.path==''">
        <a :href="item.url" :aria-expanded="expanded" @click="$parent.toggle(index, item)">
          <span class="icon is-small"><i :class="['fa', item.meta.icon]"></i></span> {{item.name}}
          <span class="icon is-small is-angle" v-if="item.children && item.children.length">
            <i class="fa fa-angle-down"></i>
          </span>
        </a>
      </li>
      `,
    },
    menuItemRouterLink: {
      props: ['item', 'index', 'expanded'],
      template: `
      <li v-if="item.path!=''">
        <router-link :exact="true" :to="item.path" :aria-expanded="expanded" @click="$parent.toggle(index, item)">
          <span class="icon is-small"><i :class="['fa', item.meta.icon]"></i></span> {{item.name}}
          <span class="icon is-small is-angle" v-if="item.children && item.children.length">
            <i class="fa fa-angle-down"></i>
          </span>
        </router-link>
      </li>
      `,
    },
  },

  computed: {
    show() {
      return this.$store.state.ui.sidebar;
    },
  },

  methods: Object.assign({
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

    /*
    shouldExpandMatchItem(route) {
      const matched = route.matched;
      const lastMatched = matched[matched.length - 1];
      let parent = lastMatched.parent || lastMatched;
      const isParent = parent === lastMatched;

      if (isParent) {
        const p = this.findParentFromMenu(route);
        if (p) {
          parent = p;
        }
      }

      if ('expanded' in parent.meta && !isParent) {
        this.expandMenu({
          item: parent,
          expanded: true,
        });
      }
    },

    generatePath(item, subItem) {
      return `${item.component ? item.path + '/' : ''}${subItem.path}`;
    },

    findParentFromMenu(route) {
      const menu = this.$store.state.ui.menu;
      for (let i = 0, l = menu.length; i < l; i += 1) {
        const item = menu[i];
        const k = item.children && item.children.length;
        if (k) {
          for (let j = 0; j < k; j += 1) {
            if (item.children[j].name === route.name) {
              return item;
            }
          }
        }
      }
      return null;
    },
    */
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
    }
  }
}

</style>
