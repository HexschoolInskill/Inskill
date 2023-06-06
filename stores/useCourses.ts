import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'

interface review {
  userId: string
  rating: number
  comment: string
  createAt?: Date
}

interface reply {
  userId: string
  comment: string
}

interface question {
  userId: string
  comment: string
  reply: reply[]
}

interface content {
  _id: string
  contentType: string
  content: string
  duration?: number
  sort: number
}

interface lession {
  _id: string
  title: string
  description: string
  freePreview: boolean
  sort: number
  lessionContent: content[]
  question: question[]
}

interface chapter {
  _id: string
  title: string
  description: string
  sort: number
  lessions: lession[]
}

interface course {
  _id: string
  teacherId: string
  isPublic: boolean
  title: string
  description: string
  price: number
  purchasedCount: number
  thumbnail: string
  chapters: chapter[]
  reviews: review[]
}

type courseArray = course[]

export default defineStore('courses', () => {
  // 會員購買的課程
  const courseStudent = ref<courseArray>([])
  // 老師開設的課程
  const courseTeacher = ref<courseArray>([])
  // 建立/編輯/觀看的課程
  let currentCourse = reactive<course>({
    _id: '001',
    teacherId: '002',
    isPublic: false,
    title: 'test01',
    description:
      '裝候住外真快往可幾尺結校物多羽語冬學外，鴨圓甲由清去躲文具飽到星良珠詞借化現校。裝收游真因止未新福吹游，不力坐什校刀隻共欠珠聽種毛這自鴨尤在生住。交開吹林教哪「甲去」弟汁皮女頭弟肖誰。飯鴨光就者唱乞昌早扒，故辛食能白，很還想吹魚；動清嗎自坐步事孝雄兆怕羽語星，升背向弓書？工向口毛位。門春何吧植完車止同車起背占同連英外。肖打加月室首外登眼未聽牠，請以房學幸同河。半布只比會跑何給更中，面日民發壯道貝多雪司。親肖何雄多亮耳男去校元朋知：林杯黑吹嗎浪千半：高鼻根。立急王定胡停抱田收問麼師頁坡色要我尤巾；看犬歌幫三拍安杯道丟的四給金足牠亭主毛平地會。林法爸果皮朵冬借杯裏半起水菜。免常主很言文點水，原快從升去前士得林信蝸直婆時三：借山意力次；爬消羽？固而寸說彩月弓泉奶。送五叫洋吃唱，菜西坡到吧左哭過我朵常飛知刀習不幫像，呢海祖法地祖貫禾雨幼出九兒急室直服棵，訴采汁要他呢屋語七冬九兒是禾把氣。安新雨十蝸老女汗弓光明呢去壯中急！貫共長「鳥貓貫巴」只牙青在神良竹百友起四雄春很邊！很水日下快乾丁拍許進五交正媽木房蝸姐話五。麻英步紅愛都教免牙物貓直寺吉瓜。冰扒司地成！要澡邊。可買經只言五斤用給息英兔右刀忍。',
    price: 350,
    purchasedCount: 10,
    thumbnail: '',
    chapters: [
      {
        _id: '0001',
        title: 'chapter 1',
        description: 'dfdfsdfsdf',
        sort: 0,
        lessions: [
          {
            _id: '00001',
            title: 'lession 1',
            description: 'dscdsfdsvgs',
            freePreview: true,
            sort: 0,
            lessionContent: [
              {
                _id: '000001',
                contentType: 'video',
                content: '/video/movie.mp4',
                duration: 12000,
                sort: 0
              },
              {
                _id: '000002',
                contentType: 'text',
                content: '章節內容測試',
                sort: 1
              },
              {
                _id: '000003',
                contentType: 'pdf',
                content: '/file/李昆峰.pdf',
                sort: 0
              }
            ],
            question: [
              {
                userId: 'u001',
                comment:
                  '村喜夏蝶毛胡星同？裏次己、世我休但停候包息唱色也着法采意方，掃收重千房背着要歌位游老化杯生，掃錯哭兆習他，杯香車過欠由吧加給送快、字回不入雞彩雄瓜母完少枝外弓汁幸反！且少斥土自物都真現浪玉再追瓜春尼。',
                reply: [
                  {
                    userId: 'u002',
                    comment:
                      '歌爪加弟步，對重得錯根乙相奶去星圓、干老天雲植少經心。久乍或說美共，愛記棵看松，原眼即裏愛片至穴。太手但帽衣朱馬昔。'
                  }
                ]
              }
            ]
          },
          {
            _id: '00002',
            title: 'lession 2',
            description: 'gbkjbljnkjlj',
            freePreview: false,
            sort: 0,
            lessionContent: [
              {
                _id: '000003',
                contentType: 'pdf',
                content: '/video/movie.mp4',
                sort: 0
              }
            ],
            question: []
          }
        ]
      },
      {
        _id: '0002',
        title: 'chapter 2',
        description: 'dfdfsdfsdf',
        sort: 1,
        lessions: []
      },
      {
        _id: '0003',
        title: 'chapter 3',
        description: 'dfdfsdfsdf',
        sort: 2,
        lessions: []
      }
    ],
    reviews: [
      {
        userId: 'u001',
        rating: 5,
        comment:
          '說連戊北唱成語可種呀昌來跳田口，跳何衣連假找昌而，牙亭時工浪是空央黑坡娘且公比夏年完快知「還現快種」少蛋神他視牠。'
      },
      {
        userId: 'u002',
        rating: 1,
        comment:
          '弓眼斗收，買候着東外蝶身自珠麻害眼祖戶，鳥婆兄犬院星去風細但視，圓尾入像愛足幾加勿爪生他足。神高道，口得林寫吉今乞松唱毛貓、歌要至犬好汁，院司安眼冒朱。'
      },
      {
        userId: 'u003',
        rating: 3,
        comment:
          '世各明子，里尼喝旦學教。急兄意知五汗女乾兄抓斥「也英」定節欠麻合路耳祖以花入品兒吃快心戊面問。林送小十京王下不麼休，包了買午尤亮半長兆快。媽步愛。休他去外根六珠。'
      },
      {
        userId: 'u004',
        rating: 5,
        comment:
          '正笑看新笑教筆星每孝書央奶樹汁兆出奶乍，呢男蛋苦哪戶河玉師：隻童打耍記把黃言民鼻校頁，抄故姊風笑上寸兆麼上屋快林向裝火意清，旦福因亭燈。'
      }
    ]
  })

  const expandChapter = ref(0) // 預設在課程第一章
  const content = ref({ chapter: expandChapter, lession: 0 }) // 當前查看的課程內容

  const cart = ref<Object[]>([])

  const setCourse = (type: string, coursesFromBackend: courseArray) => {
    if (type === 'student') {
      courseStudent.value = coursesFromBackend
    } else {
      courseTeacher.value = coursesFromBackend
    }
  }

  const setCart = (cartFromBackend: Object[]) => {
    cart.value = cartFromBackend
  }

  const setCurrentCourse = (course: course) => {
    currentCourse = course
  }

  const setChapter = (index: number) => {
    expandChapter.value = index
  }

  const setContent = (index: number) => {
    content.value.chapter = expandChapter.value
    content.value.lession = index
  }

  return {
    courseStudent,
    setCourse,
    courseTeacher,
    currentCourse,
    expandChapter,
    content,
    cart,
    setCart,
    setCurrentCourse,
    setChapter,
    setContent
  }
})
