import {User} from './users';
import {Book} from './book';
import Review from './review'; // last


// A User can write many reviews
User.hasMany(Review, { foreignKey: 'userId', as: 'reviews' });
Review.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// A Book can have many reviews
Book.hasMany(Review, { foreignKey: 'bookId', as: 'reviews' });
Review.belongsTo(Book, { foreignKey: 'bookId', as: 'book' });

export {
  User,
  Book,
  Review,
};
