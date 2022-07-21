export interface UserResult {
  code: number
  cookie: string
  loginType: number
  profile: Profile
  token: string
  [propName: string]: unknown
}

export interface Profile {
  avatarUrl: string
  backgroundUrl: string
  nickname: string
  followeds: number
  follows: number
  userId: number
  signature: string
  playlistCount: number
  vipType: number
  gender: number
  userType: number
  birthday: number
  city: number
  [propName: string]: unknown
}
