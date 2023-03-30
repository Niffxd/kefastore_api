import User from '../models/User.model.js';
import Item from '../models/Item.model.js';

const urlJSON = 'https://jsonplaceholder.typicode.com/users';

let users = [];

const getDataFromJSON = async () => {
  if (!users.length) {
    const data = await fetch(urlJSON)
      .then(res => res.json());
    users.push(data.map(user => {
      return {
        id: user.id,
        name: user.name,
        username: user.username ? user.username : 'Anonymous',
        password: user.username ? user.password : 1234,
        email: user.email ? user.email : 'anonymous@example.org',
        document: user.document ? user.document : 'anonymous@document',
        phone: user.phone,
        verified: user.verified ? user.verified : false
      };
    }));
  }
  return users;
};

export const getUsers = async (req, res) => {
  const { id } = req.params;
  try {
    await getDataFromJSON();
    if (!id) {
      users = [...users, ...await User.findAll()];
      return res.status(200).send(users.flat());
    } else {
      const user = users.flat().filter(user => user.id === parseInt(id));
      if (!user.length) {
        return res.status(404).send({ message: 'User not found' });
      } else {
        return res.status(200).send(user[0]);
      }
    }
  } catch (err) {
    return res.status(404).send({ message: 'No users found' });
  }
};

export const createUser = async (req, res) => {
  const { name, username, password, email, document, phone } = req.body;

  try {
    if (!name || !username || !password || !email) {
      return res.status(412).send({ message: 'Name, username, password and email must be present' });
    } else {
      await User.create({
        name,
        username,
        password,
        email,
        document,
        phone
      });
      return res.status(201).send({ message: 'User created successfully' });
    }
  } catch (err) {
    return res.status(500).send({ message: 'Error creating user' });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const lengthUsers = users.length;
  users = users.flat().filter(user => user.id !== parseInt(id));
  if (lengthUsers !== users.length) {
    try {
      await User.destroy({
        where: { id }
      });
      return res.status(204).send({ message: 'user deleted from database successfully' });
    } catch (err) {
      return res.status(204).send({ message: 'user deleted' });
    }
  } else {
    return res.status(500).send({ message: 'user not found' });
  }
};

export const putUser = async (req, res) => {
  const { id } = req.params;
  const { name, username, password, email, document, phone } = req.body;

  try {
    const changeUser = await User.findPk({
      where: id
    });
    changeUser.name = name;
    changeUser.username = username;
    changeUser.password = password;
    changeUser.email = email;
    changeUser.document = document;
    changeUser.phone = phone;
    await changeUser.save();
    return res.status(201).send({ message: 'user updated' });
  } catch (err) {
    return res.status(500).send({ message: 'error updating user' });
  }
};

export const getItems = async (req, res) => {
  try {
    const { id } = req.params;
    const items = await Item.findAll({
      where: { userId: id }
    });
    return res.status(200).send(items);
  } catch (err) {
    return res.status(500).send({ message: 'error getting items' });
  }
};
