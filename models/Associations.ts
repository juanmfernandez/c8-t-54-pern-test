import { User } from './Users';
import { Cart } from './Carts';
import { Order } from './Orders';
import { Product } from './Products';
import { Categories } from './Categories';
import { Colour } from './Colours';

//
User.hasMany(Order, { foreignKey: "userId" });
User.hasMany(Product, { foreignKey: 'userId' }); // Association para Favorites.

// 
Cart.belongsTo(User, { foreignKey: "userId" });
Cart.belongsToMany(Product, { through: "ProductsInCart", foreignKey: "cartId", otherKey: "productId", });

//
Categories.hasMany(Product, { foreignKey: "categoryId" });

// 
Order.belongsToMany(Product, { through: 'ProductsInOrder', foreignKey: 'orderId', otherKey: 'productId' });

//
Product.hasMany(Colour, { foreignKey: 'productId' });

//
Colour.belongsToMany(Product, { through: "ProductColours", foreignKey: "colourId", otherKey: "productId" })


export { User, Cart, Categories, Order, Colour, Product };