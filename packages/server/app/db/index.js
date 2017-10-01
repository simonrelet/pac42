import db from './db';
import find from 'lodash.find';

const getUsers = () => db.users;
const getUser = user => find(db.users, user);

export default {
  getUsers,
  getUser,
};
