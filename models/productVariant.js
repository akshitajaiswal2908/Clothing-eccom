module.exports = (sequelize, DataTypes) => {
  const ProductVariant = sequelize.define('ProductVariant', {
    variant_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    product_id: DataTypes.INTEGER,
    color: DataTypes.STRING,
    size: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    stock: DataTypes.INTEGER,
    image_url: DataTypes.STRING
  }, {
    tableName: 'product_variants',
    timestamps: false
  });

  ProductVariant.associate = (models) => {
    ProductVariant.belongsTo(models.Product, { foreignKey: 'product_id' });
    models.Product.hasMany(ProductVariant, { foreignKey: 'product_id' });
  };

  return ProductVariant;
};
