const { connect } = require('mongoose');

const connectToDatabase = async (uri) => {
    await connect(uri);
    console.log('Database connected');
} 

module.exports = {connectToDatabase};