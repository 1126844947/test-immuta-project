exports.handler = async (event) => {
  // 返回健康检查响应
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ status: "ok" })
  };
};