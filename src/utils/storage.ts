export const storeUserInfo = async (userInfo: any) => {
  localStorage.setItem('userInfo', JSON.stringify(userInfo))
}

export const getUserInfo = () => {
  const raw = localStorage.getItem("userInfo");
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export const clearUserInfo = () => {
  localStorage.removeItem('userInfo')
}
