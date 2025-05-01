cube(`kb_messages`, {
  sql_table: `public.kb_messages`,

  data_source: `default`,

  joins: {
    kb_threads: {
      sql: `${CUBE}."threadId" = ${kb_threads}."id"`,
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
    countMessagesByThread: {
      type: `count`,
      sql: `(SELECT count(km.*), kt."assistantId" FROM kb_messages km LEFT JOIN kb_threads kt ON kt.id = km."threadId" GROUP BY kt."assistantId" )`,
      title: `Count by Assistant`,
      description: `Total number of messages (prompts) by assistant`,
    },
    avgPromptsPerThread: {
      type: `number`,
      sql: `COUNT(*) * 1.0 / (SELECT COUNT(DISTINCT id) FROM public.kb_threads)`,
      format: "number",
      title: "Avg. Prompts per Thread",
    },
    avgTimeChattingAcrossThreads: {
      type: "number",
      sql: `
        (
          SELECT AVG(thread_duration)
          FROM (
            SELECT
              EXTRACT(EPOCH FROM MAX("createdAt") - MIN("createdAt")) / 60.0 AS thread_duration
            FROM public.kb_messages
            GROUP BY "threadId"
            HAVING COUNT(*) > 1
          ) t
        )
      `,
      title: "Avg. Time Chatting (All Threads)",
      format: "number",
    },
    timeChatting: {
      type: "number",
      sql: `
        EXTRACT(EPOCH FROM MAX("createdAt") - MIN("createdAt")) / 60.0
      `,
      title: "Time Chatting (min)",
      format: "number",
    },
  },

  pre_aggregations: {
    // Pre-aggregation definitions go here.
    // Learn more in the documentation: https://cube.dev/docs/caching/pre-aggregations/getting-started
  },
});
