const convertQueryOperators = (request, response, next) => {
  const operators = {
    gte: ">=",
    lte: "<=",
    gt: ">",
    lt: "<",
    eq: "=",
    neq: "!=",
  }
  if (request.query) {
    for (const key in request.query) {
      const pair = request.query[key]
      if (typeof pair === "object") {
        const newPair = {}
        for (const pairKey in pair) {
          const newKey = operators[pairKey] || pairKey
          newPair[newKey] = pair[pairKey]
        }
        request.query[key] = newPair
      }
    }
  }
  next()
}

export default convertQueryOperators
