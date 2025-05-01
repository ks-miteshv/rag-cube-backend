cube(`thread_message_analytics`, {
  sql: `
      SELECT 
        t.id AS threadId,
        t."organizationId" as organizationId,
        t."assistantId",
        COUNT(m.id) AS thread_message_count
      FROM kb_threads t
      LEFT JOIN kb_messages m ON t.id = m."threadId"
      GROUP BY t.id, t."assistantId"
    `,

  measures: {
    avgMessagesPerThread: {
      type: `avg`,
      sql: `thread_message_count`,
      format: `number`,
    },

    threadCount: {
      type: `count`,
    },

    totalMessages: {
      type: `sum`,
      sql: `thread_message_count`,
    },
  },

  dimensions: {
    threadid: {
      sql: `threadId`,
      type: `string`,
      primaryKey: true,
    },

    assistantid: {
      sql: `"assistantId"`,
      type: `string`,
    },

    organizationid: {
      sql: `organizationId`,
      type: `string`,
    },

    messagecount: {
      sql: `thread_message_count`,
      type: `number`,
    },
  },
});
