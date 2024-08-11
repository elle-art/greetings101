// API functions for backend user data
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../users.json');

const readUsersDataFile = () => {
    const data = fs.readFileSync(usersFilePath, 'utf-8');
    return JSON.parse(data);
};

const users = readUsersDataFile();

const writeUsersDataFile = (data) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(data, null, 2), 'utf-8');
};

// Display all users
const getAllUsers = (req, res) => {
    const hashedUsers = users.map(user => ({
        ...user,
        password: bcrypt.hashSync(user.password, 10)
    }));
    res.json(hashedUsers);
};

//Display user by ID
const getUserById = (req, res) => {
    const { id } = req.params;
    const user =  users.find(user => user.id === parseInt(id));
    if (user) {
        const hashedUser = { ...user, password: bcrypt.hashSync(user.password, 10) };
        res.json(hashedUser);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// Login
const login = (req, res) => {
    const { email, password } = req.body;
    const user = users.find(user => user.email === email);

    if (user && bcrypt.compareSync(password, user.password)) {
        res.json({ message: 'Login successful', user: { id: user.id, name: user.name, email: user.email, yearJoined: user.yearJoined, preferences: user.preferences, courses: user.courses, }});
    } else {
        res.status(401).json({ message: 'Invalid credentials '});
    }
};

// New user signup
const signup = (req, res) => {
    const { name, email, password } = req.body;
    const id = users.length > 0 ? users[users.length - 1].id + 1 : 1;
    const currentYear = new Date().getFullYear();
    
    const exists = users.find(user => user.email === email);
    if (exists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = { 
        id, 
        name, 
        email, 
        password: bcrypt.hashSync(password, 10), 
        yearJoined: currentYear, 
        preferences: {
            darkModePref: "'light'",
            pfpId: "default",
            pfColor: "default"
          },
        courses: {
            activeCourses: [
                {
                    id: "span101",
                    lessonsCompleted: 0
                },
                {
                    id: "asl101",
                    lessonsCompleted: 0
                },
            ],
            coursesCompleted: []
        },

    } 

    users.push(newUser);

    writeUsersDataFile(users);


    res.status(201).json({ message: 'Signup successful' });
};

// Update user
const updateUserInfo = (req, res) => {
    const { id } = req.params;
    const user =  users.find(user => user.id === parseInt(id));

    if (user) {
        const newUserInfo = req.body;
        user.name = newUserInfo.name || user.name;
        user.email = newUserInfo.email ||  user.email;
        user.password = newUserInfo.password || user.password;
        user.preferences = {...user.preferences, ...newUserInfo.preferences};

        res.json({ message: 'User updated', user});
    } else {
        res.status(404).json({ message: 'User not found'})
    }
};

// Delete user by email
const deleteUser = (req, res) => {
    const { email } = req.params;
    const index = users.findIndex(user => user.email === email);
    if (index !== -1) {
        users.splice(index, 1);
        res.json({ message: 'User deleted successfully'});
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    login,
    signup,
    updateUserInfo,
    deleteUser,
  };