'use strict'

const connectDB = require('./db')
const { ObjectID } = require('mongodb')

module.exports = {
    createCourse: async (root, { input }) => {
        const defauls = {
            teacher: '',
            topic: ''
        }
        const newCourse = {
            ...defauls,
            ...input
        }
        let db
        let course
        try {
            db = await connectDB()
            course = await db.collection('courses').insertOne(newCourse)
            newCourse._id = course.insertedId
        } catch (error) {
            console.error(error)
        }
        return newCourse
    },
    editCourse: async (root, { input }) => {
        let db
        let course
        try {
            db = await connectDB()
            course = await db.collection('courses').updateOne({
                _id: ObjectID(input.id)
            },
                { $set: input }
            )
            course = await db.collection('courses').findOne({ _id: ObjectID(input.id) })
        } catch (error) {
            console.error(error)
        }
        return course
    },
    deleteCourse: async (root, { id }) => {
        let db
        let course
        try {
            db = await connectDB()
            course = await db.collection('courses').deleteOne({
                _id: ObjectID(id)
            })
        } catch (error) {
            console.error(error)
        }
        return course.deleteCount === 1 ? id : `Does not exist a course with id ${id}`
    },
    createStudent: async (root, { input }) => {
        let db
        let student
        try {
            db = await connectDB()
            student = await db.collection('students').insertOne(input)
            input._id = student.insertedId
        } catch (error) {
            console.error(error)
        }
        return input
    },
    editStudent: async (root, { input }) => {
        let db
        let student
        try {
            db = await connectDB()
            student = await db.collection('students').updateOne({
                _id: ObjectID(input.id)
            },
                { $set: input }
            )
            student = await db.collection('students').findOne({ _id: ObjectID(input.id) })
        } catch (error) {
            console.error(error)
        }
        return student
    },
    deleteStudent: async (root, { id }) => {
        let db
        let student
        try {
            db = await connectDB()
            student = await db.collection('students').deleteOne({
                _id: ObjectID(id)
            })
        } catch (error) {
            console.error(error)
        }
        return student.deleteCount === 1 ? id : `Does not exist a student with id ${id}`
    },
}