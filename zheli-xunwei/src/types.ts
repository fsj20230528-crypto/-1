export type UserLevel = '初级美食探险家' | '进阶美食探险家' | '资深美食寻宝家'

export type User = {
  id: string
  nickname: string
  level: UserLevel
  phoneMasked: string
  bio: string
}

export type CheckinRecord = {
  id: string
  city: string
  foodName: string
  shopName: string
  checkedAt: string
  checked: boolean
}

export type FavoriteType = '店铺' | '美食' | '地区' | '帖子'

export type FavoriteItem = {
  id: string
  type: FavoriteType
  title: string
  summary: string
  savedAt: string
}

export type DiaryPost = {
  id: string
  title: string
  content: string
  createdAt: string
  likes: number
  comments: number
}

export type DiaryComment = {
  id: string
  postTitle: string
  content: string
  createdAt: string
}

export type MapRegion = {
  id: string
  name: string
  x: number
  y: number
  checked: boolean
  foodName: string
  slogan: string
}

export type Achievement = {
  id: string
  title: string
  description: string
  achieved: boolean
}
