import type { Achievement, CheckinRecord, DiaryComment, DiaryPost, FavoriteItem, MapRegion, User } from '../types'

export const mockUser: User = {
  id: 'u_001',
  nickname: '阿浙小馋猫',
  level: '初级美食探险家',
  phoneMasked: '138****2333',
  bio: '沿着水墨地图，寻找一口江南烟火。',
}

export const mockRegions: MapRegion[] = [
  { id: 'hz', name: '杭州', x: 56, y: 44, checked: true, foodName: '东坡肉', slogan: '一口酱香，听见西湖的风。' },
  { id: 'sx', name: '绍兴', x: 62, y: 53, checked: false, foodName: '黄酒醉蟹', slogan: '酒香入梦，乌篷摇曳。' },
  { id: 'nb', name: '宁波', x: 73, y: 47, checked: true, foodName: '汤圆', slogan: '海风带甜，糯香入心。' },
  { id: 'wz', name: '温州', x: 74, y: 68, checked: false, foodName: '鱼丸', slogan: '鲜味滚烫，街巷正热闹。' },
  { id: 'jh', name: '金华', x: 53, y: 58, checked: true, foodName: '火腿', slogan: '烟火慢熏，岁月成香。' },
  { id: 'tz', name: '台州', x: 78, y: 60, checked: false, foodName: '海鲜面', slogan: '潮声作汤，鲜到眉梢。' },
  { id: 'ls', name: '丽水', x: 60, y: 72, checked: false, foodName: '山珍小炒', slogan: '青山入味，清香上桌。' },
  { id: 'quz', name: '衢州', x: 44, y: 62, checked: false, foodName: '三头一掌', slogan: '辣得有理，香得带劲。' },
]

export const mockCheckins: CheckinRecord[] = [
  { id: 'c1', city: '杭州', foodName: '东坡肉', shopName: '湖畔小馆', checkedAt: '2026-05-12 19:20', checked: true },
  { id: 'c2', city: '宁波', foodName: '汤圆', shopName: '月下甜铺', checkedAt: '2026-05-18 20:05', checked: true },
  { id: 'c3', city: '金华', foodName: '火腿', shopName: '烟火作坊', checkedAt: '2026-05-23 12:40', checked: true },
  { id: 'c4', city: '绍兴', foodName: '黄酒醉蟹', shopName: '乌篷酒肆', checkedAt: '', checked: false },
  { id: 'c5', city: '温州', foodName: '鱼丸', shopName: '巷口小摊', checkedAt: '', checked: false },
]

export const mockAchievements: Achievement[] = [
  { id: 'a1', title: '初探江南', description: '完成第 1 次打卡', achieved: true },
  { id: 'a2', title: '寻味三城', description: '累计打卡 3 个县市', achieved: true },
  { id: 'a3', title: '烟火常伴', description: '连续打卡 7 天', achieved: false },
  { id: 'a4', title: '宝箱猎人', description: '解锁 10 个宝箱', achieved: false },
]

export const mockFavorites: FavoriteItem[] = [
  { id: 'f1', type: '美食', title: '东坡肉', summary: '酱香厚、油而不腻，入口即化。', savedAt: '2026-05-12' },
  { id: 'f2', type: '店铺', title: '乌篷酒肆', summary: '黄酒温热，醉蟹最配。', savedAt: '2026-05-20' },
  { id: 'f3', type: '地区', title: '宁波老外滩', summary: '海风里走一走，甜汤圆更软糯。', savedAt: '2026-05-18' },
]

export const mockDiaryPosts: DiaryPost[] = [
  { id: 'p1', title: '西湖夜色与东坡肉', content: '灯影入湖，酱香入梦。', createdAt: '2026-05-12', likes: 42, comments: 7 },
  { id: 'p2', title: '宁波汤圆的甜', content: '糯米皮软，黑芝麻馅香。', createdAt: '2026-05-18', likes: 26, comments: 3 },
]

export const mockDiaryComments: DiaryComment[] = [
  { id: 'cm1', postTitle: '西湖夜色与东坡肉', content: '这家店我也想去！', createdAt: '2026-05-13' },
  { id: 'cm2', postTitle: '宁波汤圆的甜', content: '看饿了，今晚就安排。', createdAt: '2026-05-19' },
]

