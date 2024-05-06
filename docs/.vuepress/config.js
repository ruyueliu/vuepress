module.exports = {
  title: '阿月的博客',
  description: '后端技术栈分享',
  locales: {
          '/': {
              lang: 'zh-CN'
          }
       },
  theme:'reco',
  themeConfig:{
    nav: [{text: "主页", link: "/"      },
        { text: "设计模式", link: "/设计模式" },
//        { text: "面试",
//          items: [
//            { text: "html", link:"/web/html/"},
//            { text: "css", link:"/web/css/"},
//            ]
//        },
      ],
      sidebar:[
          {
              title: '设计模式',
              collapsable: true,
              sidebarDepth: 1,
              children: [
                  '/设计模式/设计模式｜策略模式.md',
                  '/设计模式/设计模式｜工厂模式.md',
                  '/设计模式/设计模式｜观察者模式（Observer Pattern）.md',
                  '/设计模式/设计模式｜发布-订阅模式（Publish-Subscribe Pattern）.md',
                  '/设计模式/设计模式｜状态机模式（State Machine Pattern）.md',
                  '/设计模式/设计模式｜责任链模式（Chain of Responsibility Pattern）.md',
                  '/设计模式/设计模式｜命令模式（Command Pattern）.md',
                  '/设计模式/设计模式｜单例模式（Singleton Pattern）.md',
                  '/设计模式/设计模式｜装饰器模式（Decorator Pattern）.md',
                  '/设计模式/设计模式｜建造者模式（Builder Pattern）.md',
                  '/设计模式/设计模式｜适配器模式（Adapter Pattern）.md',
                  '/设计模式/设计模式｜访问者模式（Visitor Pattern).md',
                  '/设计模式/设计模式｜组合模式（Composite Pattern）.md'
              ]
          },
           { title: '消息中间件',
            collapsable: false,
            sidebarDepth: 1,
            children: [
                '/消息中间件/初识消息队列.md',
                '/消息中间件/Kafka｜处理 Kafka 消息重复的有效措施.md',
                '/消息中间件/Kafka｜处理 Kafka 消息丢失的有效措施.md'
                ]
            },
            { title: '面试',
                collapsable: false,
                sidebarDepth: 1,
                children: [
                    { title: 'java',
                        collapsable: false,
                        sidebarDepth: 1,
                        children: [
                            '/面试题/java/多线程如何停止一个线程.md',
                            '/面试题/java/什么是弱引用.md',
                            '/面试题/java/解释 null 和 “null“ 之间的区别，并举例说明它们在编程中的使用场景.md',
                            '/面试题/java/Spring和Spring Boot之间有什么关联和区别.md',
                            '/面试题/java/Java 中 throw 与 throws 的区别是什么？.md',
                            '/面试题/java/Java中有哪些不同强度的引用类型？.md'
                        ]
                    },
                    { title: '数据库',
                        collapsable: false,
                        sidebarDepth: 1,
                        children: [
                            '/面试题/数据库/MySQL|为什么不推荐用外键？.md'
                        ]
                    }
                    ]
            },
            {
                title: 'Redis',
                collapsable: false,
                sidebarDepth: 1,
                children: [
                    '/Redis/Redis学习（一）｜基础部分',
                    '/Redis/Redis学习（二）｜深入学习Redis 持久化.md',
                    '/Redis/Redis学习（三）｜ Redis高可用和容错机制详解.md',
                    '/Redis/Redis学习（四）｜深入学习Redis的高级数据结构.md',
                    '/Redis/Redis学习（五）｜深入学习Redis的高级功能-发布与订阅',
                    '/Redis/Redis学习（六）｜深入理解Redis分布式锁',
                    '/Redis/Redis学习（七）｜如何保证Redis中的数据都是热点数据'
                ]
            },
            {
                        title: '待分类',
                        collapsable: false,
                        sidebarDepth: 1,
                        children: [
                            '/面试题/版本管理面试题｜SVN和Git有什么区别？.md',
                            '/面试题/版本管理｜Git -目前最好的版本管理工具.md'
                        ]
            }
      ]
  },
  plugins: [
    ['@vuepress/back-to-top'], // 返回顶部
    ['@vuepress/nprogress'], // 加载进度条
    [
        '@vuepress/pwa',
        {
          serviceWorker: true,
          updatePopup: true,
        },
      ]
  ]
}