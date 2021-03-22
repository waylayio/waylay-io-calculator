 var billing = {
  tenant: 5,
  requestCharge: parseFloat(1/1000000),
  chargeGBSecond: 0.00002,
  taskTransitions: parseFloat(0.025/1000),
  taskLogCost: 5,
  networkEgress: parseFloat(0.15/10000000),
  messages: parseFloat(0.3/1000000),
  assets: parseFloat(0.2/100),
  alarms: parseFloat(1/10000),
  metricsScanned: parseFloat(0.06/100000),
  metricsStored: parseFloat(25/15000000),
  dbResourceSizeCost: 25,
  objectDbSizeCost: 25,
  payloadDbSizeCost: 25,
  objectReads: 0.15,
  objectWrites: 0.15,
  payloadReads: parseFloat(0.1/100000),
  mlCost: 1,
  mqttBroker: 100,
  mqttDevice: 0.2,
  coupon: 0
 }

 var discounts = [
  [30000, 0.1],
  [20000, 0.075],
  [10000, 0.05]
 ]