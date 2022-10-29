export const loggedUser = (users, currUser) => {
  return users[0]._id == currUser._id ? users[1] : users[0];
};
