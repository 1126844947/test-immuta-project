exports.handler = async (event) => {
    // 无论请求方法如何，都返回模拟数据
    const dataSource = {
        id: "customer_db",
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
            { name: "id", description: "Customer ID", tags: [] },
            { name: "name", description: "Customer name", tags: ["2"] },
            { name: "email", description: "Customer email address", tags: ["3"] },
            { name: "phone", description: "Customer phone number", tags: ["4"] },
            { name: "credit_card", description: "Customer credit card number", tags: ["6"] }
        ]
    };

    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dataSource)
    };
};