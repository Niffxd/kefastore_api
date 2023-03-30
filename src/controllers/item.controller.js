import Item from '../models/Item.model.js';

const urlJSON = 'https://fakestoreapi.com/products';

let items = [];

const getDataFromJSON = async () => {
  if (!items.length) {
    const data = await fetch(urlJSON)
      .then(res => res.json());
    items.push(data.map(user => {
      return {
        id: user.id,
        title: user.title,
        price: user.price ? user.price : 0,
        category: user.category ? user.category : 'Uncategorized',
        description: user.description ? user.description : 'No description available',
        image: user.image ? user.image : 'https://tinyurl.com/2g6t3ejb'
      };
    }));
  }
  return items;
};

export const getItems = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      await getDataFromJSON();
      return res.status(200).send(items.flat());
    } else {
      const item = items.flat().filter(item => item.id === parseInt(id));
      if (!item.length) {
        return res.status(404).send({ message: 'item not found' });
      } else {
        return res.status(200).send(item[0]);
      }
    }
  } catch (err) {
    return res.status(404).send({ message: 'No items found' });
  }
};

export const createItem = async (req, res) => {
  const { title, description, price } = req.body;

  try {
    if (!title || !description || !price) {
      return res.status(412).send({ message: 'title, description and price must be present' });
    } else {
      await Item.create({
        title,
        description,
        price
      });
      return res.status(201).send({ message: 'Item created successfully' });
    }
  } catch (err) {
    return res.status(500).send({ message: 'Error creating item' });
  }
};

export const deleteItem = async (req, res) => {
  const { id } = req.params;
  const lengthItems = items.length;
  items = items.flat().filter(item => item.id !== parseInt(id));
  if (lengthItems !== items.length) {
    try {
      await Item.destroy({
        where: { id }
      });
      return res.status(204).send({ message: 'Item deleted from database successfully' });
    } catch (err) {
      return res.status(204).send({ message: 'Item deleted' });
    }
  } else {
    return res.status(500).send({ message: 'Item not found' });
  }
};

export const putItem = async (req, res) => {
  const { id } = req.params;
  const { title, price, category, description, image } = req.body;

  try {
    const changeUser = await Item.findPk({
      where: id
    });
    changeUser.title = title;
    changeUser.price = price;
    changeUser.category = category;
    changeUser.description = description;
    changeUser.image = image;
    await changeUser.save();
    return res.status(201).send({ message: 'Item updated' });
  } catch (err) {
    return res.status(500).send({ message: 'error updating Item' });
  }
};
