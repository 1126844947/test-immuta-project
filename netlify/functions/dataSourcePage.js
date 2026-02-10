exports.handler = async (event) => {
  // 从请求路径中提取数据源ID
  const path = event.path;
  const id = path.split('/').pop();

  // 返回符合Immuta文档要求的数据源页面数据
  const dataSource = {
    id: id || "customer_db",
    name: "Customer Database",
    description: "Customer information database with PII data",
    tags: ["2"],
    catalogMetadata: {
      source: "REST_Catalog",
      lastUpdated: new Date().toISOString(),
      version: "1.0"
    },
    schema: {
      database: "customer_db",
      type: "postgresql",
      connectionString: "jdbc:postgresql://localhost:5432/customer_db",
      host: "localhost",
      port: 5432,
      username: "immuta_user"
    },
    columns: [
      {
        name: "id",
        description: "Customer ID",
        tags: []
      },
      {
        name: "name",
        description: "Customer name",
        tags: ["2"]
      },
      {
        name: "email",
        description: "Customer email address",
        tags: ["3"]
      },
      {
        name: "phone",
        description: "Customer phone number",
        tags: ["4"]
      },
      {
        name: "credit_card",
        description: "Customer credit card number",
        tags: ["6"]
      }
    ],
    page: {
      total: 1,
      size: 1,
      number: 0
    }
  };

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dataSource)
  };
};