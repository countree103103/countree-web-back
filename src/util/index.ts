function initEntityFromObject(entity: any, body: any): void {
  for (const key in body) {
    // if (Object.prototype.hasOwnProperty.call(entity, key)) {
    //   entity[key] = body[key];
    //   console.log('add!');
    // } else {
    //   console.log('no!', key);
    // }
    entity[key] = body[key];
  }
}

export { initEntityFromObject };
