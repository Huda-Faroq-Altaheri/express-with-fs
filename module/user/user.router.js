const {
    allUser,
    addUser,
    updateUser,
    deleteUser,
    searchByKey,
    allUserReversed 
} = require('./controller/user.controller');

const router = require('express').Router();

router.get('/users', allUser);
router.post('/addUser', addUser);
router.put('/update/:id', updateUser);
router.delete('/deleteUser/:id', deleteUser);
router.get('/users/search/:searchKey', searchByKey);
router.get('/users/reversed', allUserReversed);
module.exports = router;