cube(`kb_messages`, {
  sql_table: `public.kb_messages`,

  data_source: `default`,

  joins: {
    kb_threads: {
      sql: `${CUBE}.thread_id = ${kb_threads}.id`, // adjust column names as needed
      relationship: `belongsTo`,
    },
  },

  dimensions: {
    id: {
      sql: `id`,
      type: `string`,
      primary_key: true,
    },

    feedback: {
      sql: `feedback`,
      type: `string`,
    },

    status: {
      sql: `status`,
      type: `string`,
    },

    threadid: {
      sql: `${CUBE}."threadId"`,
      type: `string`,
    },

    assistantid: {
      sql: `${CUBE}."assistantId"`,
      type: `string`,
    },

    userid: {
      sql: `${CUBE}."userId"`,
      type: `string`,
    },

    role: {
      sql: `role`,
      type: `string`,
    },

    organizationid: {
      sql: `${CUBE}."organizationId"`,
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

    deletedat: {
      sql: `${CUBE}."deletedAt"`,
      type: `time`,
    },

    completedat: {
      sql: `${CUBE}."completedAt"`,
      type: `time`,
    },
  },

  measures: {
    count: {
      type: `count`,
      description: "Total number of messages (prompts)",
    },
    avgPromptsPerThread: {
      type: `number`,
      sql: `COUNT(*) * 1.0 / (SELECT COUNT(DISTINCT id) FROM public.kb_threads)`,
      format: "number",
      title: "Avg. Prompts per Thread",
    },
  },

  pre_aggregations: {
    // Pre-aggregation definitions go here.
    // Learn more in the documentation: https://cube.dev/docs/caching/pre-aggregations/getting-started
  },
});
