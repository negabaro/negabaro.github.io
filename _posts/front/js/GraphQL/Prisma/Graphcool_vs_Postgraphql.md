# Graphcool vs Postgraphql

Custom endpoints. Graphcool has almost no limitations, which allows for JS usage. PostgraphQL is limited by the database.
CreateOrUpdate. There is Upsert in Postgres, but you can’t use it in PostgraphQL. In Graphcool it is out-of-box.
Nested mutation. PostgraphQL doesn’t create or update related nodes, it can only be done by separate queries.
Raw SQL query. Currently, Graphcool cannot map the database scheme for the GraphQL scheme.
Filtration. Graphcool provides a wide array of settings, can compare rows, dates, arrays, while PostgraphQL can only compare keys or values.
Automatization. Graphcool possesses automated triggers for createdAt/updatedAt fields, relation operations. The same operations need to be performed by hand in PostgraphQL.
Calculated fields. Graphcool does not support calculated fields as of now. They are only supported through separate resolvers.
Cascade delete. Graphcool doesn’t support cascade delete due to the specifics of the database.
Data aggregation. Graphcool does not work with internal database functions that could aggregate data according to your needs.
Conclusion
As you see, Graphcool is an interesting and powerful framework. However, since it has become open-source only recently, it still has some problems that are being solved through the cooperation of developers and users.

The work continues to ensure other databases support, data aggregation and cascade delete.

As a developer, I think Graphcool is best suited for small and middle-sized projects and for rapid prototyping, as it offers many features out-of-box (nested mutations, flexible filtration system, templates, custom mutation written on JS/TS) and does not require in-depth SQL knowledge.

https://hackernoon.com/graphcool-framework-analysis-and-its-use-case-319173a9aea4
