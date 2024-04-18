const { cartypes, cars } = require("../../models");
const { getData, setData, deleteData } = require("../../helper/redis");


exports.getCartypes = async () => {
  const data = await cartypes.findAll({
    include: {
      model: cars,
    },
  });
  return data;
};

exports.getCartype = async (id) => {
  const key = `cartypes:${id}`;
    // check redis and if there are any data return data from redis
    let data = await getData(key);
    if (data) {
      return data;
    }

    // if in the redis not found, we will get from database (postgres) and then save it to redis
    data = await cartypes.findAll({
      where: {
        id,
      },
      include: {
        model: cars,
      },
    });
    if (data.length > 0) {
      // save in the redis if in the postgres is found
      await setData(key, data[0], 300);

      return data[0];
    }
    throw new Error(`Cartype is not found!`);
};

exports.createCartype = async (payload) => {
  
    const data = await cartypes.create(payload);

    const key = `cartypes:${data.id}`;
    await setData(key, data, 300);
     
    return data;
  
};

exports.updateCartype = async (id, payload) => {
  const key = `cartypes:${id}`;
  
    await cartypes.update(payload, {
      where: {
        id,
      },
    });

    const data = await cartypes.findAll({
      where: {
        id,
      },
      include: {
        model: cars,
      },
    });
    if (data.length > 0) {
      await setData(key, data[0], 300);

      return data[0];
    }

    throw new Error(`Cartype is not found!`);
};

exports.deleteCartype = async (id) => {

  const key = `cartypes:${id}`;
  
  await cartypes.destroy({ where: { id } });

    await deleteData(key);

    return null;
};
