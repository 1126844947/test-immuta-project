exports.handler = async (event) => {
  // 返回符合Immuta文档要求的标签数据
  const tags = {
    "REST_Catalog_Root": {
      "id": "1"
    },
    "REST_Catalog_Root.PII": {
      "id": "2"
    },
    "REST_Catalog_Root.PII.Email": {
      "id": "3"
    },
    "REST_Catalog_Root.PII.Phone": {
      "id": "4"
    },
    "REST_Catalog_Root.Financial": {
      "id": "5"
    },
    "REST_Catalog_Root.Financial.CreditCard": {
      "id": "6"
    },
    "REST_Catalog_Root.Financial.BankAccount": {
      "id": "7"
    },
    "REST_Catalog_Root.Healthcare": {
      "id": "8"
    },
    "REST_Catalog_Root.Healthcare.MedicalRecord": {
      "id": "9"
    },
    "REST_Catalog_Root.Public": {
      "id": "10"
    }
  };

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(tags)
  };
};