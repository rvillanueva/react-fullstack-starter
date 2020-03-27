'use strict';

export default function(sequelize, DataTypes) {
  const Thing = sequelize.define('thing', {
    _id: {
      primaryKey: true,
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    }
  });
  return Thing;
}
