import { DataTypes } from 'sequelize';
import sequelize from '../database/database.js';

const Item = sequelize.define('item', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Untitled'
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: 0.0
  },
  category: {
    type: DataTypes.STRING,
    defaultValue: 'Uncategorized'
  },
  description: {
    type: DataTypes.TEXT,
    defaultValue: 'No description available'
  },
  image: {
    type: DataTypes.TEXT,
    defaultValue: 'https://tinyurl.com/2g6t3ejb'
  }
}, {
  timestamps: false
});

export default Item;
