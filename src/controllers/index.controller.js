const { Pool } = require("pg");

config = {
    host: "localhost",
    user: "postgres",
    password: "",
    database: "firstapi",
    port: "5432"
}

const pool = new Pool(config);

const getUsers = async(req, res) => {
    try {
        const response = await pool.query("SELECT * FROM users");
        res.status(200).json(response.rows);
    } catch (error) {
        console.log(error)
    }
};

const getUserById = async(req, res) => {
    try {
        const {id} = req.params;
        const response = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
        res.json(response.rows);
    } catch (error) {
        console.log(error)
    }
};

const createUser = async(req, res) => {
    try {
        const {name, email} = req.body;
        const response = await pool.query("INSERT INTO users (name, email) VALUES ($1, $2)", [name, email]);
        console.log(response);
        res.status(201).json({
            message: "User added Successfully",
            body: {
                user: {name, email}
            }
        })
    } catch (error) {
        console.log(error);
    }

    res.send("user created");
};

const deleteUser = async(req, res) => {
    try {
        const {id} = req.params;
        const response = await pool.query("DELETE FROM users WHERE id = $1", [id]);
        console.log(response);
        res.json(`USER WITH ID ${id} DELETED SUCCESSFULLY`);
    } catch (error) {
        console.log(error) 
    }
};

const updateUser = async(req, res) => {
    try {
        const {id} = req.params;
        const {name, email} = req.body;
        const response = await pool.query("UPDATE users SET name = $1, email = $2 WHERE id = $3", [name, email, id]);
        console.log(response);
        res.send("User Updated Successfully");
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getUsers,
    createUser,
    getUserById,
    deleteUser,
    updateUser
}
