exports.handler = async (event) => {
    // 打印请求信息，以便在Netlify日志中查看Immuta发送的请求
    console.log('=== Immuta DataSource Request ===');
    console.log('Request Method:', event.httpMethod);
    console.log('Request Path:', event.path);
    console.log('Request Headers:', event.headers);
    console.log('Request Body:', event.body);
    console.log('=== End Request Info ===');

    // 根据Immuta文档构建正确的数据源响应格式
    const dataSource = {
        // 数据源基本信息
        name: "Customer Database",
        description: "Customer information database with PII data",

        // 数据源级别的标签（对象格式）
        tags: {
            "REST_Catalog_Root.PII": {
                id: "2"
            }
        },

        // 列信息
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
                    "REST_Catalog_Root.PII": {
                        id: "2"
                    }
                }
            },
            {
                name: "email",
                description: "Customer email address",
                tags: {
                    "REST_Catalog_Root.PII.Email": {
                        id: "3"
                    }
                }
            },
            {
                name: "phone",
                description: "Customer phone number",
                tags: {
                    "REST_Catalog_Root.PII.Phone": {
                        id: "4"
                    }
                }
            },
            {
                name: "credit_card",
                description: "Customer credit card number",
                tags: {
                    "REST_Catalog_Root.Financial.CreditCard": {
                        id: "6"
                    }
                }
            }
        ],

        // 目录元数据
        catalogMetadata: {
            source: "REST_Catalog",
            lastUpdated: new Date().toISOString(),
            version: "1.0"
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