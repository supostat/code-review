import C from '../constants/constants.js';

export default function addUser(name){
  return {
    type: C.ADD_USER,
    name: name
  }
}


export const editUser = (id, name) => ({
  type: C.EDIT_USER,
  id,
  name
})


export const removeUser = (id) => ({
  type: C.REMOVE_USER,
  id
})