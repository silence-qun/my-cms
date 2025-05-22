const mongoose = require('mongoose')

const uri = 'mongodb://localhost:27017/local'

// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
//   if (err) {
//     console.log(err)
//     throw err
//   }
//   console.log('connection successful')

//   const parentSchema = new mongoose.Schema({ name: String, age: Number, address: String })

//   const studentSchema = new mongoose.Schema({ name: String, age: Number, address: String, married: Boolean, parents: parentSchema })

//   mongoose.model('student', studentSchema)

//   const Student = mongoose.model('student')

//   const student = new Student({
//     name: 'zhangsan',
//     age: 20,
//     address: 'tianjing',
//     married: false,
//     parents: {
//       name: 'lisi',
//       age: 50,
//       address: 'dalian',
//     },
//   })

//   student.save((err) => {
//     if (err) {
//       console.log(err)
//       throw err
//     }
//     console.log('save successful')
//   })
// })

const parentSchema = new mongoose.Schema({ name: String, age: Number, address: String })

const studentSchema = new mongoose.Schema({ name: String, age: Number, address: String, married: Boolean, parents: parentSchema })

// mongoose.model('student', studentSchema)

const Student = mongoose.model('student', studentSchema)

const student = new Student({
  name: 'zhangsan',
  age: 20,
  address: 'tianjing',
  married: false,
  parents: {
    name: 'lisi',
    age: 50,
    address: 'dalian',
  },
})

mongoose
  .connect(uri)
  .then(() => {
    console.log('connection successful')

    return student.save()
  })
  .then(() => {
    console.log('save successful')
    return Student.find({ name: 'zhangsan' }, { age: 1, address: 1, _id: 0 })
  })
  .then((docs) => {
    console.log(docs)
    // docs.forEach((doc) => {
    //   Student.deleteOne({ _id: doc._id })
    // })
    return Student.deleteOne({ age: 20 })
    // return Student.deleteMany({ age: 20 })

    // mongoose.connection.close()
  })
  .then(() => {
    console.log('delete successful')
    return mongoose.connection.close()
  })
  .then(() => {
    console.log('connection closed')
  })
  .catch((err) => {
    console.log(err)
  })
