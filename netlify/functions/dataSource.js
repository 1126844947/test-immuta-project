exports.handler = async (event) => {
    // 打印请求信息，以便在Netlify日志中查看Immuta发送的请求
    console.log('=== Immuta DataSource Request ===');
    console.log('Request Method:', event.httpMethod);
    console.log('Request Path:', event.path);
    console.log('Request Headers:', event.headers);
    console.log('Request Body:', event.body);
    console.log('=== End Request Info ===');

    // 无论请求方法如何，都返回模拟数据
    const dataSource = {
        name: "Customer Database",
        description: "Customer information database with PII data",
        tags: {
            "2": {
                id: "2",
                name: "REST_Catalog_Root.PII",
                description: "Personally Identifiable Information"
            }
        },
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
                tags: {}
            },
            {
                name: "name",
                description: "Customer name",
                tags: {
                    "2": {
                        id: "2",
                        name: "REST_Catalog_Root.PII",
                        description: "Personally Identifiable Information"
                    }
                }
            },
            {
                name: "email",
                description: "Customer email address",
                tags: {
                    "3": {
                        id: "3",
                        name: "REST_Catalog_Root.PII.Email",
                        description: "Email Address"
                    }
                }
            },
            {
                name: "phone",
                description: "Customer phone number",
                tags: {
                    "4": {
                        id: "4",
                        name: "REST_Catalog_Root.PII.Phone",
                        description: "Phone Number"
                    }
                }
            },
            {
                name: "credit_card",
                description: "Customer credit card number",
                tags: {
                    "6": {
                        id: "6",
                        name: "REST_Catalog_Root.Financial.CreditCard",
                        description: "Credit Card Number"
                    }
                }
            }
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