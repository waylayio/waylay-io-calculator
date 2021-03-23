 var billing = {
  tenant: {
    price: 5,
    unit: "fixed per month",
    metricName: "Tenant price"
  },
  requestCharge: {
    price: parseFloat(1/1000000),
    unit: "requests",
    metricName: "Number of Executions"
  },
  chargeGbSecond: {
    price: 0.00002,
    unit: "GB-s",
    metricName: "Total compute"
  },
  taskTransitions: {
    price: parseFloat(0.025/1000),
    unit: "steps",
    metricName: "Task transitions"
  },
  taskLogCost: {
    price: 5,
    unit: "GB",
    metricName: "Task log size"
  },
  networkEgress: {
    price: parseFloat(0.15/10000000),
    unit: "GB",
    metricName: "Network Egress"
  },
  messages: {
    price: parseFloat(0.3/1000000),
    unit: "messages",
    metricName: "Number of messages"
  },
  assets: {
    price: parseFloat(0.2/100),
    unit: "assets",
    metricName: "Assets"
  },
  alarms: {
    price: parseFloat(1/1000),
    unit: "alarms",
    metricName: "Alarms"
  },
  metricsScanned: {
    price: parseFloat(1/100000000),
    unit: "metrics",
    metricName: "Metrics scanned"
  },
  metricsStored: {
    price: parseFloat(1/10000000),
    unit: "metrics",
    metricName: "Metrics stored"
  },
  dbResourceSizeCost: {
    price: 25,
    unit: "GB",
    metricName: "Resource database size"
  },
  objectDbSizeCost: {
    price: 25,
    unit: "GB",
    metricName: "Object storage database size"
  },
  payloadDbSizeCost: {
    price: 25,
    unit: "GB",
    metricName: "Message storage database size"
  },
  objectReads: {
    price: 0.15,
    unit: "GB",
    metricName: "Object reads"
  },
  objectWrites: {
    price: 0.15,
    unit: "GB",
    metricName: "Object writes"
  },
  payloadReads: {
    price: parseFloat(0.1/100000),
    unit: "message",
    metricName: "Message reads"
  },
  mlCost: {
    price: 1,
    unit: "per minute",
    metricName: "Machine Learning time"
  },
  mqttBroker: {
    price: 100,
    unit: "broker",
    metricName: "MQTT Broker instance"
  },
  mqttDevice: {
    price: 0.2,
    unit: "device",
    metricName: "MQTT Devices"
  },
  coupon:  {
    price: 0,
    unit: "coupon",
    metricName: "Coupon"
  }
 }

 var discounts = [
  [30000, 0.1],
  [20000, 0.075],
  [10000, 0.05]
 ]