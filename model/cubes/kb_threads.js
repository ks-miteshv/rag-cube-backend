cube(`kb_threads`, {
  sql_table: `public.kb_threads`,
  data_source: `default`,
  joins: {},
  dimensions: {
    id: {
      sql: `id`,
      type: `string`,
      primary_key: true,
    },
    organizationid: {
      sql: `${CUBE}."organizationId"`,
      type: `string`,
    },
    userid: {
      sql: `${CUBE}."userId"`,
      type: `string`,
    },    
    assistantid: {
      sql: `${CUBE}."assistantId"`,
      type: `string`,
    },
    createdat: {
      sql: `${CUBE}."createdAt"`,
      type: `time`,
    },
    updatedat: {
      sql: `${CUBE}."updatedAt"`,
      type: `time`,
    },
    archivedat: {
      sql: `${CUBE}."archivedAt"`,
      type: `time`,
    },
    deletedat: {
      sql: `${CUBE}."deletedAt"`,
      type: `time`,
    },
  },
  measures: {
    count: {
      type: `count`,
    },
  },
  pre_aggregations: {
    // Pre-aggregation definitions go here.
    // Learn more in the documentation: https://cube.dev/docs/caching/pre-aggregations/getting-started
  },
  preAggregations: {
    main: {
      measures: [kb_threads.count],
    },
    thread_count_rollup: {
      measures: [kb_threads.count],
      dimensions: [kb_threads.id],
      refreshKey: {
        every: `1 hour`,
      },
    },
  },
});
