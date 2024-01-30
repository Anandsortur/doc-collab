import mongoose  from 'mongoose';

const Connection = async (username = 'user1', password = 'admin') => {
    const URL = `mongodb+srv://${username}:${password}@google-docs-clone.rq3e9tn.mongodb.net/?retryWrites=true&w=majority`;

    try {
        await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true });
        console.log('Database connected successfully');
    } catch (error) {   
        console.log('Error while connecting with the database ', error);
    }
}

export default Connection;