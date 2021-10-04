require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const path = require('path')


const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())


// Routes
app.use('/api', require('./routes/userRouter'));
app.use('/api/administration', require('./routes/administrationRouter'));
app.use('/api/sales', require('./routes/salesRouter'));
app.use('/api/purchase', require('./routes/purchaseRouter'));
app.use('/api/inventory', require('./routes/inventoryRouter'));
app.use('/api/department', require('./routes/departmentRouter'));



// Connect to mongodb
const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) throw err;
    console.log('Connected to MongoDB')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})