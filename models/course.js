import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema

const lessonSchema = new mongoose.Schema(
  {
    title: {
      type: 'string',
      trim: true,
      minLength: 3,
      maxLength: 320,
      required: true,
    },
    slug: {
      type: 'string',
      lowercase: true,
    },
    content: {
      type: {},
      minLength: 200,
    },
    video_link: {
      free_preview: {
        type: Boolean,
        default: false,
      },
    },
  },
  { timestamps: true }
)

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: 'string',
      trim: true,
      minLength: 3,
      maxLength: 320,
      required: true,
    },
    slug: {
      type: 'string',
      lowercase: true,
    },
    description: {
      type: {},
      minLength: 200,
      required: true,
    },
    price: {
      type: Number,
      default: 9.99,
    },
    image: {},
    category: String,
    published: {
      type: Boolean,
      default: false,
    },
    paid: {
      type: Boolean,
      default: true,
    },
    instructor: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
    lessons: [lessonSchema],
  },
  { timestamps: true }
)

export default mongoose.model('Course', courseSchema)
