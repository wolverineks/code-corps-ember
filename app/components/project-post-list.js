import Ember from 'ember';

/**
  `project-post-list` provides a list of posts within the project and allows filtering and paging.

  ## Default usage
  ```Handlebars
    {{project-post-list posts=posts project=project}}
  ```
  ## Adding post filtering
    These additional properties allow for filtering.
  ```Handlebars
    {{project-post-list
      isFiltered=isFiltered
      isFilteringClosedPosts=isFilteringClosedPosts
      isFilteringOpenPosts=isFilteringOpenPosts
      filterByStatus="filterByStatus"
      filterByType="filterByType"
      pageNumber=page
      posts=model
      project=project
      removeTypeFilter="removeTypeFilter"
      selectedTypes=selectedTypes
    }}
  ```

  @class Component
  @module project-post-list
  @extends Ember.Component
 */

export default Ember.Component.extend({
  classNames: ['project-post-list'],

  /**
    @property store
    @type Ember.Service
   */
  store: Ember.inject.service(),

  /**
    Returns information about the posts in order to sort and display posts in
    the control.

    @property meta
    @type
   */
  meta: Ember.computed.alias('posts.meta'),

  /**
    Returns information about the posts to the `pager-control` to handle page
    size.

    @property options
    @type Ember.Computed
   */
  options: Ember.computed('meta', function() {
    return this._normalizeMeta(this.get('meta'));
  }),

  actions: {

    /**
      Action that sends the the selected type to be added to filtering.

      @method filterByType
     */
    filterByType(type) {
      this.sendAction('filterByType', type);
    },

    /**
      Action that sends the the selected type to be removed from filtering.

      @method removeTypeFilter
     */
    removeTypeFilter(type) {
      this.sendAction('removeTypeFilter', type);
    },

    /**
      Action that sends the the selected status for filtering.

      @method filterByStatus
     */
    filterByStatus(status) {
      this.sendAction('filterByStatus', status);
    },
  },

  _normalizeMeta(meta) {
    if (Ember.isPresent(meta)) {
      return {
        currentPage: parseInt(meta.current_page, 10),
        pageSize: parseInt(meta.page_size, 10),
        totalPages: parseInt(meta.total_pages, 10),
        totalRecords: parseInt(meta.total_records)
      };
    }
  },
});
