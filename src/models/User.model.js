import { DataTypes } from 'sequelize';
import sequelize from '../database/database.js';

import Item from './Item.model.js';

const User = sequelize.define('user', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  document: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  phone: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: false
});

User.hasMany(Item, {
  foreignKey: 'userId',
  sourceKey: 'id'
});

Item.belongsTo(User, {
  foreignKey: 'userId',
  targetId: 'id'
});

export default User;
