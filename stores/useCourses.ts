import { defineStore } from 'pinia'
import { ref } from 'vue'
import { NormalCourse, StreamCourse } from '@/http/modules/courses'

type courseArray = NormalCourse[] & StreamCourse[]
type courseType = NormalCourse & StreamCourse

export default defineStore('courses', () => {
  // 會員購買的課程
  const courseStudent = ref<courseArray>([])
  // 老師開設的課程
  const courseTeacher = ref<courseArray>([])
  // 建立/編輯/觀看的課程
  const currentCourse = ref<courseType>({
    _id: '001',
    teacherId: '002',
    teacherName: '',
    isPublic: false,
    title: 'test01',
    description:
      '裝候住外真快往可幾尺結校物多羽語冬學外，鴨圓甲由清去躲文具飽到星良珠詞借化現校。裝收游真因止未新福吹游，不力坐什校刀隻共欠珠聽種毛這自鴨尤在生住。交開吹林教哪「甲去」弟汁皮女頭弟肖誰。飯鴨光就者唱乞昌早扒，故辛食能白，很還想吹魚；動清嗎自坐步事孝雄兆怕羽語星，升背向弓書？工向口毛位。門春何吧植完車止同車起背占同連英外。肖打加月室首外登眼未聽牠，請以房學幸同河。半布只比會跑何給更中，面日民發壯道貝多雪司。親肖何雄多亮耳男去校元朋知：林杯黑吹嗎浪千半：高鼻根。立急王定胡停抱田收問麼師頁坡色要我尤巾；看犬歌幫三拍安杯道丟的四給金足牠亭主毛平地會。林法爸果皮朵冬借杯裏半起水菜。免常主很言文點水，原快從升去前士得林信蝸直婆時三：借山意力次；爬消羽？固而寸說彩月弓泉奶。送五叫洋吃唱，菜西坡到吧左哭過我朵常飛知刀習不幫像，呢海祖法地祖貫禾雨幼出九兒急室直服棵，訴采汁要他呢屋語七冬九兒是禾把氣。安新雨十蝸老女汗弓光明呢去壯中急！貫共長「鳥貓貫巴」只牙青在神良竹百友起四雄春很邊！很水日下快乾丁拍許進五交正媽木房蝸姐話五。麻英步紅愛都教免牙物貓直寺吉瓜。冰扒司地成！要澡邊。可買經只言五斤用給息英兔右刀忍。',
    price: 350,
    purchasedCount: 10,
    averageRating: 1,
    thumbnail: '',
    scoreCount: 1,
    course: 1,
    chapter: 1,
    createdAt: '',
    chapters: [
      {
        _id: '0001',
        title: 'chapter 1',
        description: 'dfdfsdfsdf',
        sort: 0,
        createdAt: '',
        updatedAt: '',
        lessons: [
          {
            _id: '00001',
            title: 'lesson 1',
            description: 'dscdsfdsvgs',
            freePreview: true,
            sort: 0,
            createdAt: '',
            updatedAt: '',
            lessonContent: [
              {
                _id: '000001',
                contentType: 'video',
                content: '/video/movie.mp4',
                duration: 12000,
                sort: 0,
                createdAt: '',
                updatedAt: ''
              },
              {
                _id: '000002',
                contentType: 'text',
                content: '章節內容測試',
                sort: 1,
                createdAt: '',
                updatedAt: ''
              },
              {
                _id: '000003',
                contentType: 'pdf',
                content: '/file/李昆峰.pdf',
                sort: 0,
                createdAt: '',
                updatedAt: ''
              }
            ],
            question: [
              {
                _id: '',
                userId: 'u001',
                username: '',
                comment:
                  '村喜夏蝶毛胡星同？裏次己、世我休但停候包息唱色也着法采意方，掃收重千房背着要歌位游老化杯生，掃錯哭兆習他，杯香車過欠由吧加給送快、字回不入雞彩雄瓜母完少枝外弓汁幸反！且少斥土自物都真現浪玉再追瓜春尼。',
                createdAt: '',
                updatedAt: '',
                replies: [
                  {
                    _id: '',
                    userId: 'u002',
                    comment:
                      '歌爪加弟步，對重得錯根乙相奶去星圓、干老天雲植少經心。久乍或說美共，愛記棵看松，原眼即裏愛片至穴。太手但帽衣朱馬昔。',
                    createdAt: '',
                    updatedAt: ''
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    reviews: [
      {
        _id: '',
        userId: 'u001',
        username: '',
        rating: 5,
        comment:
          '說連戊北唱成語可種呀昌來跳田口，跳何衣連假找昌而，牙亭時工浪是空央黑坡娘且公比夏年完快知「還現快種」少蛋神他視牠。',
        createdAt: ''
      }
    ],
    videoUrl: '',
    endTime: 'string',
    startTime: 'string'
  })

  const collected = ref(false)
  const purchased = ref(false)
  const expandChapter = ref(0) // 預設在課程第一章
  const content = ref({ chapter: expandChapter, lesson: 0 }) // 當前查看的課程內容

  const cart = ref<Object[]>([])

  const setCourse = (type: string, coursesFromBackend: courseArray) => {
    if (type === 'student') {
      courseStudent.value = coursesFromBackend
    } else {
      courseTeacher.value = coursesFromBackend
    }
  }

  const setCollected = (collect: boolean) => {
    collected.value = collect
  }

  const setPurchased = (purchase: boolean) => {
    purchased.value = purchase
  }

  const setCart = (cartFromBackend: Object[]) => {
    cart.value = cartFromBackend
  }

  const setCurrentCourse = (course: courseType) => {
    currentCourse.value = course
  }

  const setChapter = (index: number) => {
    expandChapter.value = index
  }

  const setContent = (index: number) => {
    content.value.chapter = expandChapter.value
    content.value.lesson = index
  }

  // 新增評價
  const createReview = (content: any) => {
    const { star, userId, username, comment } = content
    currentCourse.value.reviews.push({
      userId,
      username,
      rating: star,
      comment
    })
  }

  // 新增提問
  const createQuestion = (content: any) => {
    const { chapter, lesson, userId, username, comment } = content
    currentCourse.value.chapters[chapter].lessons[lesson].question.push({
      userId,
      username,
      comment,
      replies: []
    })
  }

  // 新增回復
  const createReply = (content: any) => {
    const { chapter, lesson, index, userId, comment } = content
    currentCourse.value.chapters[chapter].lessons[lesson].question[index].replies.push({
      userId,
      comment
    })
  }

  return {
    courseStudent,
    courseTeacher,
    currentCourse,
    expandChapter,
    purchased,
    collected,
    content,
    cart,
    setCourse,
    setCart,
    setCurrentCourse,
    setPurchased,
    setCollected,
    setChapter,
    setContent,
    createReview,
    createQuestion,
    createReply
  }
})
