cube(`kb_threads`, {
  sql_table: `public.kb_threads`,
  data_source: `default`,

  joins: {
    kb_messages: {
      relationship: `hasMany`,
      sql: `${CUBE}.id = ${kb_messages}.threadId`,
    },
  },

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

    // New approach that doesn't rely on complex filtering
    firstMessageTime: {
      type: `min`,
      sql: `(
        SELECT MIN(m."createdAt")
        FROM public.kb_messages AS m
        WHERE m."threadId" = ${CUBE}.id
      )`,
      title: `First Message Time`,
      description: `Time of the first message in thread`,
    },

    lastMessageTime: {
      type: `max`,
      sql: `(
        SELECT MAX(m."createdAt")
        FROM public.kb_messages AS m
        WHERE m."threadId" = ${CUBE}.id
      )`,
      title: `Last Message Time`,
      description: `Time of the last message in thread`,
    },

    // Thread duration in seconds
    threadDurationSeconds: {
      type: `number`,
      sql: `
        EXTRACT(EPOCH FROM (
          (${lastMessageTime}) - (${firstMessageTime})
        ))
      `,
      title: `Thread Duration (sec)`,
      description: `Duration of thread in seconds`,
    },

    // Thread duration in minutes
    threadDurationMinutes: {
      type: `number`,
      sql: `${threadDurationSeconds} / 60.0`,
      title: `Thread Duration (min)`,
      format: `number`,
      description: `Duration of thread in minutes`,
    },

    // Average thread duration in seconds
    avgThreadDurationSeconds: {
      type: `avg`,
      sql: `
        EXTRACT(EPOCH FROM (
          (
            SELECT MAX(m."createdAt")
            FROM public.kb_messages AS m
            WHERE m."threadId" = ${CUBE}.id
          ) - (
            SELECT MIN(m."createdAt")
            FROM public.kb_messages AS m
            WHERE m."threadId" = ${CUBE}.id
          )
        ))
      `,
      title: `Average Thread Duration (sec)`,
      description: `Average duration of threads in seconds`,
    },

    // Average thread duration in minutes
    avgThreadDurationMinutes: {
      type: `number`,
      sql: `${avgThreadDurationSeconds} / 60.0`,
      title: `Average Thread Duration (min)`,
      format: `number`,
      description: `Average duration of threads in minutes`,
    },
  },

  pre_aggregations: {},
});
