import bcrypt from "bcryptjs";

const users = [
    {
        name: "Admin",
        email: "admin@bookends.website",
        password: bcrypt.hashSync('swordfish', 10),
        isAdmin: true
    },
    {
        name: "Jane Doe",
        email: "jane@bookends.website",
        password: bcrypt.hashSync('potato', 10),
        isAdmin: false
    },
    {
        name: "John Doe",
        email: "john@bookends.website",
        password: bcrypt.hashSync('pomegranate', 10),
        isAdmin: false
    },
];

export default users;