module.exports = {
  queryRewrite: (query, { securityContext }) => {
    // List of cubes you want to filter by organizationId
    const cubesToFilter = [
      "kb_threads",
      "kb_messages",
      "thread_message_analytics",
    ];

    // Helper function to extract cube names from query
    const getCubesFromQuery = (query) => {
      const members = [
        ...(query.measures || []),
        ...(query.dimensions || []),
        ...(query.timeDimensions?.map((td) => td.dimension) || []),
      ];
      // Extract the part before the dot (cube name)
      return [...new Set(members.map((m) => m.split(".")[0]))];
    };

    const cubesInQuery = getCubesFromQuery(query);
    const organizationId = securityContext?.organizationId;

    // If any relevant cube is in the query, add organizationId filter
    if (
      securityContext &&
      organizationId &&
      cubesInQuery.some((cube) => cubesToFilter.includes(cube))
    ) {
      // You may need to adjust the member name per cube if the field is named differently
      query.filters = [
        ...(query.filters || []),
        {
          member: `${cubesInQuery[0]}.organizationid`, // assumes field is named organizationId in each cube
          operator: "equals",
          values: [organizationId],
        },
      ];
    }

    return query;
  },
};
