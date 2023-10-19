class Cache {
  setCache(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
  }
  getCache(key: string) {
    const value = localStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }
  deleteCache(key: string) {
    localStorage.removeItem(key)
  }
  clearCache() {
    localStorage.clear()
  }
}

export default new Cache()
