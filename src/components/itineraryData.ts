export interface AlternativeOption {
  name: string;
  activityLabel: string;
  location: string;
  description: string;
  hours?: string;
  rating?: string;
  cost?: string;
  badge?: string;
  hideMap?: boolean;
}

export interface ItineraryItem {
  time?: string;
  activity: string;
  location?: string;
  type?: 'food' | 'activity' | 'travel';
  description?: string;
  hours?: string;
  alternatives?: AlternativeOption[];
  hideMap?: boolean;
}

export interface DayPlan {
  date: string;
  title: string;
  items: ItineraryItem[];
}

export const itineraryData: DayPlan[] = [
  {
    date: '6/25',
    title: '抵達烏鎮',
    items: [
      { 
        time: '13:30', 
        activity: '抵達浦東機場 T2', 
        location: '上海浦東國際機場 T2 國際/港澳台到達大廳', 
        type: 'travel',
        description: '降落、取行李，並辦理入境集合。',
        hours: '24 小時開放 / 隨班機抵達'
      },
      { 
        time: '14:00', 
        activity: '包車前往烏鎮通安客棧', 
        location: '上海浦東國際機場 T2 ➡️ 烏鎮西柵景區', 
        type: 'travel',
        description: '搭乘專屬包車，車程約 1.5 小時直達烏鎮西柵景區。',
        hours: '24 小時 / 按專屬車輛調度預約'
      },
      { 
        time: '15:30', 
        activity: '入住烏鎮通安客棧', 
        location: '烏鎮西柵景區通安客棧 (西柵景區廟南街18號)', 
        type: 'activity',
        description: '辦理西柵景區入住手續，放置行李略作歇息。',
        hours: '24 小時前台接待服務'
      },
      { 
        time: '18:30', 
        activity: '晚餐：明徽徽菜餐廳', 
        location: '烏鎮西柵景區廟南街18號', 
        type: 'food',
        description: '• 經典菜：徽州臭鱖魚、徽州毛豆腐、徽州刀板香、胡氏一品鍋\n• 營業時間: 11:00-13:30, 17:00-20:30\n• 電話: 0573-88731088 (烏鎮景區預定或諮詢)',
        hours: '11:00-13:30, 17:00-20:30'
      }
    ]
  },
  {
    date: '6/26',
    title: '入住水鄉南潯',
    items: [
      { 
        time: '06:00', 
        activity: '烏鎮「早茶客」體驗', 
        location: '烏鎮西柵景區水上集市', 
        type: 'food',
        description: '06:00-09:00 憑客房房卡預約，享用集市傳統早點（燒餅、生煎、餛飩等）。',
        hours: '06:00-09:00'
      },
      { 
        time: '09:00', 
        activity: '慢步西柵景區', 
        location: '烏鎮西柵景區', 
        type: 'activity',
        description: '晨間避開人流漫步水鄉，隨後辦理退房與寄存在地行李手續。',
        hours: '09:00-22:00'
      },
      { 
        time: '12:00', 
        activity: '午餐與包車前往南潯古鎮', 
        location: '烏鎮西柵景區 ➡️ 潯林或周邊餐館 ➡️ 南潯花間堂·求恕里客棧', 
        type: 'travel',
        description: '在烏鎮或南潯享用在地風味午餐，隨後包車前往南潯古鎮，預計車程約 1.5 小時，入住花間堂·求恕里客棧。',
        hours: '車程約 1.5 小時'
      },
      { 
        time: '15:00', 
        activity: '南潯景區遊與旅拍 (點擊切換)', 
        type: 'activity',
        location: '南潯古鎮歷史老街區',
        hours: '08:00-17:00 (小蓮莊各景點)',
        alternatives: [
          {
            name: '景區自主漫遊',
            activityLabel: '求恕里入住 ➡️ 慢遊南潯古鎮',
            location: '南潯古鎮 (小蓮莊、百間樓、張氏舊宅、嘉業堂)',
            description: '悠閒散步粉牆黛瓦、迴廊疊翠，感受林園水鄉與大宅門的人文底蘊。',
            hours: '08:00-17:00',
            badge: '景區慢步遊 🚶‍♂️'
          },
          {
            name: '古鎮旅拍體驗',
            activityLabel: '求恕里入住 ➡️ 水鄉古風旅拍',
            location: '南潯古鎮歷史老街、求恕里客棧內',
            description: '可在客棧或景區內預約水鄉旅拍，租借精美漢服或古風服裝，在幽靜的百間樓或中西合璧的古宅庭園間留下獨特的回憶。',
            hours: '08:00-17:00',
            badge: '精緻古風旅拍 📷'
          }
        ]
      },
      {
        time: '18:30',
        activity: '晚餐：南潯水鄉美味 (點擊切換)',
        type: 'food',
        location: '南潯區南西街 / 適園路 / 百間樓',
        hours: '11:00-21:30',
        alternatives: [
          {
            name: '求恕里·茴香餐廳',
            activityLabel: '晚餐方案 A：求恕里·茴香餐廳',
            location: '南潯古鎮花間堂·求恕里內',
            description: '客棧附設精緻餐廳，主打潯幫與江南地道精緻創意菜餚，環境清幽古雅。',
            rating: '4.7',
            cost: '人均約 ¥120-¥180',
            badge: '求恕里客棧附設精緻湘/浙菜',
            hours: '11:00-13:30, 17:00-20:30'
          },
          {
            name: '潯湘記·老味下飯菜',
            activityLabel: '晚餐方案 B：潯湘記·老味下飯菜',
            location: '南潯古鎮適園路商圈',
            description: '經典老牌湘菜與本幫菜的融合，香辣下飯，在當地備受喜愛。',
            rating: '4.4',
            cost: '人均約 ¥60',
            badge: '人氣湘菜館',
            hours: '10:30-14:00, 16:30-21:00'
          },
          {
            name: '百間樓·水宴餐廳',
            activityLabel: '晚餐方案 C：百間樓·水宴餐廳',
            location: '南潯古鎮百間樓歷史街區',
            description: '臨近百間樓名居的河畔餐館，主打各式傳統水鄉土菜、太湖銀魚與紅燒潯蹄，用餐時水鄉景緻一覽無遺。',
            rating: '4.6',
            cost: '人均約 ¥90',
            badge: '臨河景觀餐廳',
            hours: '11:00-14:00, 17:00-20:30'
          }
        ]
      },
      { 
        time: '20:30', 
        activity: '百間樓幽靜夜景散步', 
        location: '南潯百間樓歷史街區', 
        type: 'activity',
        description: '漫步最精美的百間樓，欣賞沿河紅燈籠倒映在水中的幽靜夜景，別有一番寧靜祥和的古鎮韻味。',
        hours: '全天開放 (建議 19:30-21:30 亮燈期間)'
      },
      {
        time: '21:30',
        activity: '按摩與足道方案 (點擊切換)',
        type: 'activity',
        location: '南潯古鎮周邊 / 中心城區',
        hours: '10:00-22:30',
        alternatives: [
          {
            name: '鹿栖·精油SPA',
            activityLabel: '按摩方案 A：鹿栖·精油SPA (南潯吾悅店)',
            location: '南潯鎮南林路518號瑞麟商業中心B座218-219號 (南潯區中心城區)',
            description: '懂你所需，打造滿意服務。細心呵護讓您全程享有高級感的精緻 SPA。推薦方案：70分鐘按摩SPA經絡刷 (特惠 ¥159)、30分鐘小舒服採耳 (¥69)、50分鐘精油SPA放鬆、15分鐘刮痧/拔罐二選一 (¥24) 等，洗去一日旅途辛勞。',
            hours: '10:00-22:30',
            rating: '4.9 (519 條熱門好評)',
            cost: '人均 ¥186',
            badge: '連鎖高奢精油SPA'
          },
          {
            name: '圣园轩影院式足道',
            activityLabel: '按摩方案 B：圣园轩影院式足道',
            location: '南潯古鎮景區周邊商圈',
            description: '提供專業的足部按摩、足療、全身放鬆。特設影院級超大螢幕，讓您在按腳、採耳的同時盡情觀賞精彩大片。',
            hours: '11:00-23:30',
            rating: '4.7',
            cost: '人均約 ¥98-¥150',
            badge: '影院式足底按摩/觀影'
          }
        ]
      }
    ]
  },
  {
    date: '6/27',
    title: '抵達杭州與西湖避暑',
    items: [
      { 
        time: '08:00', 
        activity: '享用求恕里豐盛早餐', 
        location: '南潯花間堂·求恕里客棧 (南西街109號)', 
        type: 'food',
        description: '在古風大客寓享用養生晨膳與熱茶茗。',
        hours: '07:30-10:00'
      },
      { 
        time: '09:30', 
        activity: '求恕里包車前往杭州慶春酒店放行李', 
        location: '南潯花間堂·求恕里客棧 ➡️ 杭州慶春酒店 (城際杭州西湖慶春路酒店)', 
        type: 'travel',
        description: '搭乘專車前往杭州慶春酒店寄存行李，一身輕鬆。',
        hours: '車程約 1.5 小時'
      },
      { 
        time: '11:00', 
        activity: '清河坊街與人文漫步 (點擊切換備案)', 
        type: 'activity',
        location: '杭州市上城區清河坊街',
        hours: '11:00-16:00',
        alternatives: [
          {
            name: '清河坊街經典漫遊',
            activityLabel: '漫遊行程：清河坊街老街與歷史建築探訪',
            location: '清河坊街、朱炳仁銅雕藝術博物館、胡慶餘堂國藥號（中店）、胡雪巖故居',
            description: '坐滴滴到永和豆漿吳山店下車，開始品嚐經典豆漿，隨後開啟老街與人文探訪：\n1. **清河坊街**：漫遊原汁原味的江南歷史文化名街。\n2. **朱炳仁銅雕藝術博物館**：賞鑒大師親手雕作的璀璨銅雕。\n3. **胡慶餘堂國藥號（中店）**：漫步中醫國藥老字號老豪宅院。\n4. **胡雪巖故居**：造訪雕樑畫棟、水石交融的晚清第一豪宅名居。',
            hours: '11:00-16:00',
            rating: '4.8',
            cost: '永和豆漿人均約 ¥15-¥25，胡雪巖故居門票 ¥20',
            badge: '江南古典大宅/老字號名店巡禮 🚶‍♂️'
          },
          {
            name: '不佳天氣備案',
            activityLabel: '不佳天氣備案：紫蓮花影院式足道SPA (慶春路店)',
            location: '杭州市上城區慶春路11號哨兵海鮮旁2層 (近地鐵萬安橋站 B2 口，步行約 840 米)',
            description: '雨天或高溫室內安排。影院式舒適包廂看大螢幕，可一邊舒緩足療一邊享用店內免費滷味與小龍蝦熱食。\n\n**熱門團購預算**：\n- **白天場特惠經典足道 60min**：¥121 (限 19:00 前進店，含秘製滷味)\n- **全天場經典足道 60min**：¥168 (含手作小龍蝦、滷味餐食配自助水果、免停)\n- **精油 SPA 80min**：¥329 (含高品質餐食與免停)',
            hours: '24 小時營業',
            rating: '4.7 (2623+ 條好評)',
            cost: '人均約 ¥196',
            badge: '邊按腳邊吃小龍蝦與秘製滷味 🎬🦞'
          }
        ]
      },
      { 
        time: '16:00', 
        activity: '交通：打車前往岳王廟', 
        location: '清河坊街 (或紫蓮花足道) ➡️ 西湖岳王廟景區 (西湖區北山街80號)', 
        type: 'travel',
        description: '在 16:00 時打車前往岳王廟（車程約 20 分鐘）。',
        hours: '24 小時隨呼隨到'
      },
      { 
        time: '16:30', 
        activity: '西湖漫漫：蘇堤仿古電瓶車', 
        location: '岳王廟對面蘇堤北口電瓶車調度站 ➡️ 蘇堤 ➡️ 雷峰塔站', 
        type: 'activity',
        description: '乘坐林蔭步道專用電瓶車悠閒駛過蘇堤，票價每人 ¥10-¥20。建議上車「坐在右邊」，面向西湖浩瀚開闊景觀。',
        hours: '08:00-17:00 (週末可能延長)'
      },
      { 
        time: '16:50', 
        activity: '雷峰塔下車與周邊小憩', 
        location: '西湖區南山路15號雷峰塔景區 / 淨慈寺周邊', 
        type: 'activity',
        description: '在雷峰塔下車站點稍作停歇，補充飲水與做好遮陽，觀賞淨慈寺古刹意境。',
        hours: '08:00-17:30'
      },
      { 
        time: '17:15', 
        activity: '浪漫東岸環湖精緻步行 (夕陽落日之約)', 
        location: '雷峰塔站 ➡️ 長橋 (雙投橋) ➡️ 柳浪聞鶯 ➡️ 湖濱一公園 ➡️ 湖濱銀泰 in77', 
        type: 'activity',
        description: '漫步綠浪與南山路平坦步道（從雷峰塔走到湖濱銀泰 in77）：\n1. **長橋（雙投橋）**：拍下「雷峰夕照」漫天湖光晚霞的最佳卡位夕照點。\n2. **柳浪聞鶯**：感受西湖著名翠楊，江風吹拂極度放鬆。\n3. **湖濱一公園**：順路步行抵達一線繁華湖濱路與湖濱銀泰 in77 展開晚餐與購物體驗。',
        hours: '24 小時開放 / 推薦夕照段 17:30 - 19:00'
      },
      { 
        time: '19:00', 
        activity: '西湖湖畔晚餐方案 (點擊切換)', 
        type: 'food',
        location: '杭州市延安路 / 仁和路臨湖商圈',
        hours: '08:00-21:00 (知味觀) / 10:30-21:00 (外婆家)',
        alternatives: [
          {
            name: '外婆家',
            activityLabel: '晚餐方案 A：外婆家 (湖濱 in77 店)',
            location: '延安路258號in77 A區 (臨湖音樂噴泉旁)',
            description: '全大陸知名杭幫菜。品嘗外婆紅燒肉、茶香雞等經典，同時一覽西湖華燈夜色。',
            hours: '10:30-21:00',
            rating: '4.5 🌟',
            cost: '人均約 ¥80',
            badge: '西湖臨湖窗景席'
          },
          {
            name: '知味觀小吃',
            activityLabel: '晚餐方案 B：知味觀傳統小吃 (湖濱總店)',
            location: '杭州市上城區仁和路83號',
            description: '臨湖百年老家院，一樓自選傳統杭幫小食、條頭糕與精美名點。',
            hours: '08:00-21:00',
            rating: '4.3 🌟',
            cost: '人均約 ¥20',
            badge: '傳統百味小食代表'
          }
        ]
      },
      {
        time: '21:00',
        activity: '足體養生與舒壓放鬆方案 (點擊切換)',
        type: 'activity',
        location: '杭州市上城區秋濤北路 / 慶春路商圈',
        hours: '24 小時營業',
        alternatives: [
          {
            name: '紫莲花足道',
            activityLabel: '足道方案 A：紫莲花足道 (凯旋门商业中心店)',
            location: '杭州市上城區秋濤北路333號凱旋門商業中心B座3-4樓',
            description: '高人氣口碑影院式足療名店。主打超大投影幕舒適包廂，提供頂級精緻中藥中醫泡腳、足底按摩、肩頸舒壓及全身經絡油壓舒緩。按摩時可以一邊享受專業技師的熟練手法，一邊免費觀看投影大片。店內亦免費無限量供應各種招牌現煮宵夜（如牛肉麵、水餃、現烤熱土司）與精緻水果熱茶，是西湖西子一整天長途徒步、觀光逛街累了之後最極致完美的體力補給與雙腳舒緩港灣！',
            hours: '24 小時營業',
            rating: '4.8 (好評如潮)',
            cost: '人均約 ¥118-¥168',
            badge: '特配私人投影影院/豐富精緻免費宵夜 🎬'
          },
          {
            name: '大桶大足道',
            activityLabel: '足道方案 B：大桶大足道養生馆 (慶春路店)',
            location: '杭州市上城區慶春路136號2樓',
            description: '江浙地區高人氣、知名連鎖足療足浴品牌。環境安靜素雅，主打木桶中草藥草本足浴、專業經絡穴道足部按摩與全身中式按摩，手法到位，是西湖周邊著名的安心口碑養生會館。',
            hours: '12:00-02:00',
            rating: '4.7',
            cost: '人均約 ¥130',
            badge: '江南名牌安心口碑草本足浴連鎖'
          }
        ]
      }
    ]
  },
  {
    date: '6/28',
    title: '西湖晨光與返滬行',
    items: [
      {
        time: '08:30',
        activity: '西湖漫步與靈隱揚公堤騎行',
        type: 'activity',
        location: '少年宮 ➡️ 北山街 ➡️ 漫步白堤 ➡️ 星巴克(孤山路店) ➡️ 靈隱寺 ➡️ 揚公堤 ➡️ 湖濱銀泰 in77',
        description: '1. 坐車至北山街：造訪北山街景色。\n2. 漫步白堤：觀賞西湖美景至星巴克(孤山路店)臨湖小憩。\n3. 前往靈隱古剎：打車直達靈隱寺拜佛與遊覽。\n4. 揚公堤騎行 🚲：租借隨行小紅車，經揚公堤騎回湖濱銀泰 in77。',
        hours: '08:30-11:30'
      },
      { 
        time: '12:00', 
        activity: '午餐：慶春路商圈佳餚 (點擊切換)', 
        type: 'food',
        location: '杭州慶春路精緻商圈',
        hours: '06:00-21:00',
        alternatives: [
          {
            name: '新豐小吃 (慶春店)',
            activityLabel: '新豐小吃 (慶春店)',
            location: '杭州市上城區慶春路鄰近店面',
            description: '• **在地平民人氣天花板**\n• **熱門推薦**：蝦肉小籠包 (皮薄湯鮮)、特製喉口饅頭 (香氣十足)、牛肉粉絲湯 (日常絕配)、手工蝦肉餛飩、經典片兒川。',
            hours: '06:00-21:00',
            rating: '4.5 🌟',
            cost: '人均約 ¥20 (高CP)',
            badge: '在地平民CP值天花板 🥟'
          },
          {
            name: '知味觀 (慶春路店)',
            activityLabel: '知味觀 (慶春路店)',
            location: '杭州市上城區慶春路151號',
            description: '• **江南百年老餐鋪**\n• **熱門推薦**：鮮肉及蟹粉小籠包、杭州貓耳朵、東坡肉、西湖醋魚、叫花童子雞、杭州片兒川。窗口另販售特色鮮肉月餅、條頭糕等熱烘糕點。',
            hours: '07:30-21:00',
            rating: '4.4 🌟',
            cost: '人均約 ¥45 - ¥90',
            badge: '江南百年老餐鋪 🍜'
          },
          {
            name: '新周記·巷子里的江南味 (慶春店)',
            activityLabel: '新周記·巷子里的江南味 (慶春店)',
            location: '杭州市上城區慶春路商圈店',
            description: '• **高分金牌本幫老店**\n• **熱門推薦**：新周記招牌烤雞 (外焦里嫩)、江南油爆蝦 (甜咸香脆)、秘製醬鴨、東坡肉、香干馬蘭頭、桂花糖藕。風味卓越，物超所值。',
            hours: '10:30-14:30, 16:30-21:00',
            rating: '4.7 🌟',
            cost: '人均約 ¥93 (超高性價比)',
            badge: '人氣高性價比本幫菜 🍗🍤'
          }
        ]
      },
      { 
        time: '13:00', 
        activity: '交通：退房打車前往杭州東站', 
        location: '城際杭州西湖慶春路酒店 ➡️ 杭州東站北一出口', 
        type: 'travel',
        description: '酒店大廳集合取行李，搭計程車前往杭州東站，準備乘 14:05 的高鐵返回上海。',
        hours: '24 小時隨呼隨到'
      },
      { 
        time: '14:05', 
        activity: '搭乘高鐵返回上海 (G7542 一等座)', 
        location: '杭州東站 ➡️ 上海客運西站/上海南站', 
        type: 'travel',
        description: '車次 **G7542** | 14:05 杭州東站（檢票口19A）開車 ➡️ 15:11 抵達上海南站。抵達後乘地鐵 10 號線直達豫園站，入住橘子水晶酒店。',
        hours: '14:05 準時高鐵發車'
      },
      { 
        time: '16:00', 
        activity: '漫步南京東路與外灘', 
        type: 'activity',
        location: '上海南京東路 ➡️ 外灘沿江景觀長廊',
        description: '沿著繁華璀璨的南京東路步行街漫步至黃浦江畔，迎著江風遠眺陸家嘴三大高樓魔天輪以及外灘歐式歷史建築群，飽覽十里洋場的經典夜上海風光。',
        hours: '24 小時開放 / 燈光亮燈時間: 19:00-22:00'
      },
      { 
        time: '18:30', 
        activity: '晚餐：海派風味與特色蟹黃面 (點擊切換)', 
        type: 'food',
        location: '上海市黃浦區本幫與豫園商圈',
        hours: '10:00-21:30',
        alternatives: [
          {
            name: '寄畅兴·百年蟹黄面 (豫園城隍廟店)',
            activityLabel: '寄畅兴·百年蟹黄面·露台餐廳 (豫園城隍廟店)',
            location: '黃浦區舊校場路159號豫園老街 (近城隍廟，露台景觀席)',
            description: '主打濃郁鮮美、真材實料的招牌蟹黃黃金面、蟹粉小籠與精緻本幫澆頭。露台席位可直接俯瞰金碧輝煌的豫園商城古典夜色，迎著晚風拍照極美，美味與視覺雙重驚豔。',
            hours: '10:00-21:30',
            rating: '4.7 🌟',
            cost: '人均約 ¥110-¥150',
            badge: '豫園超人氣露台景觀餐廳 🦀🍜'
          },
          {
            name: '外灘家宴·上海菜 (中山東二路店)',
            activityLabel: '外灘家宴·上海菜 (中山東二路店)',
            location: '上海市黄浦区外滩街道外滩22号中山东二路22号2楼',
            description: '• **外灘臨江海派本幫菜**\n• **熱門推薦**：紅燒肉、油爆蝦、蟹粉豆腐、清蒸白絲魚。餐館享有絕佳的黃浦江一線璀璨夜景位，味道與格調兼具。',
            hours: '11:00-14:30, 17:00-21:30',
            rating: '4.6 🌟',
            cost: '人均約 ¥150',
            badge: '外灘臨江海派本幫菜 🍤🌉'
          },

          {
            name: '沪江老正和 (四川南路店)',
            activityLabel: '沪江老正和 (四川南路店)',
            location: '黃浦區四川南路29號 (近延安東路與豫園)',
            description: '• **老字號地道海派本幫菜**\n• **熱門推薦**：草頭圈子、經典紅燒肉、油爆河蝦、醬鴨以及八寶辣醬，口味醇厚而不膩，深受老上海饕客與市民的喜愛。',
            hours: '11:00-14:00, 17:00-21:00',
            rating: '4.6 🌟',
            cost: '人均約 ¥90-¥120',
            badge: '地道老字號海派本幫菜 🍤🥩'
          }
        ]
      },
      { 
        time: '20:30', 
        activity: '上海豫園商城五彩夜景', 
        location: '豫園商城文化精緻老街步道 (黃浦區方浜中路265號)', 
        type: 'activity',
        description: '漫步金碧輝煌的古典夜觀豫園，紅燈籠與翹角飛簷亮燈，夢幻絢麗。',
        hours: '08:30-22:00 (21:30 後開始熄燈)'
      },
      { 
        time: '21:30', 
        activity: '宵夜：品味上海經典點心 (點擊切換)', 
        type: 'food',
        location: '黃浦區豫園及老弄堂周邊',
        hours: '10:00-21:30',
        alternatives: [
          {
            name: '玉蘭廂',
            activityLabel: '宵夜 A：玉蘭廂·上海弄堂糕點',
            location: '豫園商城歷史街區3樓',
            description: '精美手藝，招牌：熱小籠包、紅豆小湯、雙釀皮、條頭糕及桂花酒。',
            hours: '10:00-21:30',
            badge: '名廚手工弄堂糕餅'
          },
          {
            name: '鮮得來',
            activityLabel: '宵夜 B：鮮得來酥香排骨年糕',
            location: '黃浦區雲南南路46號',
            description: '老派上海童年招牌，炸排骨酥脆配軟糯淋汁年糕。',
            hours: '10:00-21:00',
            badge: '排骨年糕創始百年派'
          }
        ]
      }
    ]
  },
  {
    date: '6/29',
    title: '上海收尾與歸途',
    items: [
      { 
        time: '08:30', 
        activity: '豫園商城與老街伴手禮選購', 
        location: '上海市黃浦區豫園老街周邊 (方浜中路265號)', 
        type: 'activity', 
        description: '1. 漫步豫園：賞九曲橋與湖心亭。\n2. 伴手禮選購：購買沈大成、真老大房等特色特產。',
        hours: '08:30-21:30'
      },
      { 
        time: '10:15', 
        activity: '酒店退房 ➡️ 寄放行李', 
        location: '上海外灘豫園桔子水晶酒店大堂 (復興東路789號)', 
        type: 'travel',
        description: '辦理退房，行李寄放前台。',
        hours: '24 小時寄存服務'
      },
      { 
        time: '11:00', 
        activity: '市區休閒慢遊 (點擊切換方案)', 
        type: 'activity',
        location: '上海熱門市區景點 (世紀公園 / 新天地)',
        hours: '08:00-22:00',
        alternatives: [
          {
            name: '方案 A: 上海浦東',
            activityLabel: '方案 A：世紀公園、上海圖書館東館與亞太盛匯廣場',
            location: '世紀公園 (錦繡路1001號) / 上海圖書館東館 (合歡路300號) / 亞太盛匯 (科技館地鐵站)',
            description: '1. 世紀公園：漫步中心綠地、吹風休憩。\n2. 上海圖書館東館：參觀文化網紅地標與現代建築。\n3. 亞太盛匯廣場：選購服飾伴手禮，午餐可在地下街享用小揚生煎。',
            hours: '08:00-18:00 (公園) / 09:00-20:30 (上圖東館) / 10:00-20:00 (亞太盛匯)',
            badge: '綠意、閱讀與休閒購物 📚🛍️'
          },
          {
            name: '方案 B: 新天地石庫門',
            activityLabel: '方案 B：上海新天地時尚街區',
            location: '上海新天地石庫門時尚步道 (黃浦區太倉路181弄)',
            description: '1. 新天地老街區：漫遊傳統石庫門青磚瓦建築群。\n2. 露天咖啡與休閒：體驗法式林蔭道，逛買手店與時尚地標。',
            hours: '24 小時開放 / 門市一般 10:00-22:00',
            badge: '老上海石庫門與摩登時尚 🏮'
          }
        ]
      },
      { 
        time: '15:30', 
        activity: '返店取行李 ➡️ 前往機場', 
        location: '上海外灘豫園桔子水晶酒店大堂 ➡️ 浦東機場 T2', 
        type: 'travel',
        description: '返回酒店取行李，出發往浦東機場 T2 航廈。',
        hideMap: true,
        hours: '24 小時隨呼隨行'
      },
      { 
        time: '16:30', 
        activity: '浦東機場 T2：登機與貴賓室指南 (點擊切換)', 
        type: 'travel',
        location: '上海浦東國際機場 T2 國際/港澳台出發管制區',
        hours: '依國際線航班時刻',
        hideMap: true,
        alternatives: [
          {
            name: '登機與託運',
            activityLabel: '長榮航空櫃檯辦理手續',
            location: '上海浦東國際機場 T2 國際/港澳台出發大廳',
            description: '前往長榮航空櫃檯辦理登機與託運，隨後通過安檢及證件查驗。',
            badge: '出發安檢與登機 ✈️',
            hours: '起飛前 3 小時至 1 小時開放辦託運'
          },
          {
            name: 'VIP Lounge 170',
            activityLabel: 'JCB 白金卡免費貴賓室 (S2 衛星廳)',
            location: '上海浦東國際機場 S2 航廈 4 樓 (G 區登機口附近)',
            description: '【台灣 JCB 卡（白金及以上等級）憑卡與登機證免費入場】\n• **路線**：安全安檢查驗出境後，搭捷運電車至 S2 衛星廳，電梯上 4 樓。\n• **環境**：安靜歇息沙發、桌電充電插座、多款免費熱食小吃、咖啡飲料茶點。',
            hours: '每日首班至末班國際航班發送結束',
            rating: '4.6 🌟',
            badge: 'JCB 實體卡免費 💳'
          },
          {
            name: '頭等艙 69 號貴賓室',
            activityLabel: 'PP卡 / 龍騰卡通用貴賓室 (T2 管制區)',
            location: '上海浦東國際機場 T2 出發管制區 (近 69 號登機門旁)',
            description: '【Priority Pass 與龍騰卡通用】熱餐咖啡、高精桌餐與安靜辦公休整區。',
            hours: '06:00-22:00',
            rating: '4.2 🌟',
            badge: 'PP/龍騰卡通用 🛋'
          }
        ]
      },
      { 
        time: '20:05', 
        activity: '搭乘長榮航空返台回家', 
        type: 'travel',
        location: '上海浦東國際機場 T2 ➡️ 高雄 T1/桃園 T2',
        hideMap: true,
        description: '班機起飛返台：\n- ✈️ **長榮 BR0705** (飛高雄 T1，預計 22:20 抵達)：楊君、孫、邱、吳、曾、陳\n- ✈️ **長榮 BR0721** (飛桃園 T2，預計 22:00 抵達)：強哥、京慧',
        hours: '20:05 準時班機起飛'
      }
    ]
  }
];
