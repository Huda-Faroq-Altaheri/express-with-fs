const fs = require('fs');
const { nanoid } = require('nanoid');
const path = require('path');
const filePath = path.join(__dirname + '../../../../DB/data.json');
// const filePath=path.resolve(__dirname+'../../../../DB/data.json');

const allUser = (req, res, next) => {
    try {
        const fileData = JSON.parse(fs.readFileSync(filePath));
        res.json({ message: "allUser", data: fileData });

    } catch (error) {
        res.json({ message: "Error", data: error });
    }
}

const addUser = (req, res, next) => {
    try {
        const { userName, email, password, age } = req.body;
        let fileData = JSON.parse(fs.readFileSync(filePath));
        const user = fileData.find((el) => {
            if (el.email == email) {
                return el;
            }
        })
        if (user) {
            res.json({ message: "email is already exist" });
        } else {
            const dataObject = {
                id: nanoid(),
                userName,
                email,
                password,
                age
            }
            fileData.push(dataObject);
            fs.writeFileSync(filePath, JSON.stringify(fileData));
            console.log(fileData);
            res.json({ message: "Added Done", data: fileData });
        }
    } catch (error) {
        res.json({ message: "Error", data: error });
    }
}
const updateUser = (req, res, next) => {
    try {
        const { id } = req.params;
        const { userName, password, age } = req.body;
        const fileData = JSON.parse(fs.readFileSync(filePath));
        let userIndex;
        const user = fileData.find((el, i) => {
            if (el.id == id) {
                userIndex = i;
                return el;
            }
        })
        if (user) {
            fileData[userIndex].userName = userName;
            fileData[userIndex].password = password;
            fileData[userIndex].age = age;
            console.log(fileData);
            fs.writeFileSync(filePath, JSON.stringify(fileData));
            res.json({ message: "Updated Done", data: fileData })
        } else {
            res.json({ message: "in-valid id" })
        }
    } catch (error) {
        res.json({ message: "Error", data: error })
    }
}

const deleteUser = (req, res) => {
    try {
        const { id } = req.params;
        const fileData = JSON.parse(fs.readFileSync(filePath));
        let userIndex;
        const user = fileData.find((el, i) => {
            if (el.id == id) {
                userIndex = i
                return el;
            }
        })
        if (user) {
            fileData.splice(userIndex, 1);
            fs.writeFileSync(filePath, JSON.stringify(fileData));
            res.json({ message: "Deleted Done", data: fileData });
        }
        else {
            res.json({ message: "in-valid id" });
        }
    } catch (error) {
        res.json({ message: "Error", data: error })
    }
}
const searchByKey = (req, res) => {
    try {
        const { searchKey } = req.params;
        const fileData = JSON.parse(fs.readFileSync(filePath));
        const user = fileData.find((el) => {
            return el.id == searchKey ||
                el.userName == searchKey.toLowerCase() ||
                el.email == searchKey.toLowerCase() ||
                el.age == searchKey;
        })
        if (user) {
            fs.writeFileSync(filePath, JSON.stringify(fileData));
            res.json({ message: "Done", data: user });
        }
        else {
            res.json({ message: "seach key is not found" });
        }
    } catch (error) {
        res.json({ message: "Error", data: error })
    }
}
const allUserReversed = (req, res, next) => {
    try {
        const fileData = JSON.parse(fs.readFileSync(filePath));
        res.json({ message: "allUser", data: fileData.reverse()});

    } catch (error) {
        res.json({ message: "Error", data: error });
    }
}
module.exports = {
    allUser,
    addUser,
    updateUser,
    deleteUser,
    searchByKey,
    allUserReversed,
}