import axios, { Axios } from 'axios'
const $axios = axios.create({ baseURL: process.env.NEXT_PUBLIC_BASE_URL })
export default class Api {
  static async get(url: string) {
    try {
      const { data } = await $axios.get(url)
      return data
    } catch (e) {
      console.error(e)
    }
  }

  static async post(url: string, payload: any) {
    try {
      const { data } = await $axios.post(url, payload)
      return data
    } catch (e) {
      console.error(e)
    }
  }

  static async put(url: string, payload: any) {
    try {
      return await $axios.put(url, payload)
    } catch (e) {
      console.error(e)
    }
  }

  static async delete(url: string) {
    try {
      return await $axios.delete(url)
    } catch (e) {
      console.error(e)
    }
  }
}
