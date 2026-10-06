// In-memory store simulating a DB (swap with MongoDB/DynamoDB adapter easily)
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

const users = [
  {
    id: uuidv4(),
    userId: 'admin01',
    password: bcrypt.hashSync('Admin@123', 10),
    name: 'Alice Admin',
    email: 'alice@mploychek.com',
    department: 'HR',
    role: 'Admin',
    status: 'Active',
    joinedDate: '2021-03-15',
  },
  {
    id: uuidv4(),
    userId: 'user01',
    password: bcrypt.hashSync('User@123', 10),
    name: 'Bob Smith',
    email: 'bob@mploychek.com',
    department: 'Engineering',
    role: 'General User',
    status: 'Active',
    joinedDate: '2022-07-01',
  },
  {
    id: uuidv4(),
    userId: 'user02',
    password: bcrypt.hashSync('User@123', 10),
    name: 'Carol Jones',
    email: 'carol@mploychek.com',
    department: 'Finance',
    role: 'General User',
    status: 'Inactive',
    joinedDate: '2023-01-20',
  },
];

// Employment records per user
const records = {
  admin01: [
    { id: uuidv4(), type: 'Leave', description: 'Annual Leave', date: '2024-01-10', status: 'Approved' },
    { id: uuidv4(), type: 'Payslip', description: 'December 2023', date: '2024-01-05', status: 'Generated' },
  ],
  user01: [
    { id: uuidv4(), type: 'Leave', description: 'Sick Leave', date: '2024-02-14', status: 'Approved' },
    { id: uuidv4(), type: 'Payslip', description: 'January 2024', date: '2024-02-01', status: 'Generated' },
    { id: uuidv4(), type: 'Training', description: 'Angular Workshop', date: '2024-03-01', status: 'Completed' },
  ],
  user02: [
    { id: uuidv4(), type: 'Leave', description: 'Casual Leave', date: '2024-03-05', status: 'Pending' },
    { id: uuidv4(), type: 'Payslip', description: 'February 2024', date: '2024-03-01', status: 'Generated' },
  ],
};

module.exports = { users, records };
