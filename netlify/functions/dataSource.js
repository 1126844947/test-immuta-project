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
        catalogMetadata: {
            id: "1",
            name: "Customer Database"
        },
        description: "Customer information database with PII data",
        tags: {
            "REST_Catalog_Root.PII": {
                id: "2"
            }
        },
        dictionary: {
            "id": {
                id: "id",
                description: "Customer ID",
                tags: {}
            },
            "name": {
                id: "name",
                description: "Customer name",
                tags: {
                    "REST_Catalog_Root.PII": {
                        id: "2"
                    }
                }
            },
            "email":
            {
                id: "email",
                description: "Customer email address",
                tags: {
                    "REST_Catalog_Root.PII.Email": {
                        id: "3"
                    }
                }
            },
            "phone":
            {
                id: "phone",
                description: "Customer phone number",
                tags: {
                    "REST_Catalog_Root.PII.Phone": {
                        id: "4"
                    }
                }
            },
            "credit_card":
            {
                id: "credit_card",
                description: "Customer credit card number",
                tags: {
                    "REST_Catalog_Root.Financial.CreditCard": {
                        id: "6"
                    }
                }
            }
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