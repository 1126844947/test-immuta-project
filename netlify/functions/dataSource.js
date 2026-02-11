exports.handler = async (event) => {
    // 打印请求信息，以便在Netlify日志中查看Immuta发送的请求
    console.log('=== Immuta DataSource Request ===');
    console.log('Request Method:', event.httpMethod);
    console.log('Request Path:', event.path);
    console.log('Request Headers:', event.headers);
    // 如果 event.body 是 JSON 字符串，先尝试解析；否则直接读取 catalogMetadata
    let catalogMetadata;
    try {
        const parsed = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
        catalogMetadata = parsed.catalogMetadata;
    } catch (e) {
        catalogMetadata = undefined;
    }
    console.log('Request Body catalogMetadata:', catalogMetadata);
    console.log('=== End Request Info ===');

    // 根据Immuta文档构建正确的数据源响应格式
    const dataSource = {
        catalogMetadata: {
            id: "PLAYER_DATA_ZQ",
            name: "\"snk\".\"SANDBOX\".\"SOU_PRIVATE\".\"PLAYER_DATA_ZQ\""
        },
        description: "zq created for testing",
        tags: {
            "REST_Catalog_Root.PII": {
                id: "2"
            }
        },
        dictionary: {
            "PLAYER_ID": {
                catalogMetadata: {
                    id: "PLAYER_ID",
                },
                description: "PLAYER ID",
                tags: {}
            },
            "name": {
                catalogMetadata: {
                    id: "name",
                },
                description: "Customer name",
                tags: {
                    "REST_Catalog_Root.PII": {
                        id: "2"
                    }
                }
            },
            "email":
            {
                catalogMetadata: {
                    id: "email",
                },
                description: "Customer email address",
                tags: {
                    "REST_Catalog_Root.PII.Email": {
                        id: "3"
                    }
                }
            },
            "phone":
            {
                catalogMetadata: {
                    id: "phone",
                },
                description: "Customer phone number",
                tags: {
                    "REST_Catalog_Root.PII.Phone": {
                        id: "4"
                    }
                }
            },
            "credit_card":
            {
                catalogMetadata: {
                    id: "credit_card",
                },
                description: "Customer credit card number",
                tags: {
                    "REST_Catalog_Root.Financial.CreditCard": {
                        id: "6"
                    }
                }
            }
        }
    };

    if (catalogMetadata?.id === dataSource.catalogMetadata.id) {
        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataSource)
        };
    }

    const errorMessage = `DataSource not found: ${JSON.stringify(event.body)}`;

    return {
        statusCode: 500,
        headers: {
            "Content-Type": "application/json"
        },
        body: errorMessage
    };
};