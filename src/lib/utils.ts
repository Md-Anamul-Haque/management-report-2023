import axios from "axios"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


const getMainData = (res_data: { items?: { data: string }[] }) => {

  const { items = [] } = res_data
  const { data = '' } = items?.[0];
  if (!data) {
    throw new Error('Failed to fetch {data} from responce')
  }
  return JSON.parse(data)
}

export const getData = async (slug: String) => {
  try {//?${window.location.href.split("?")[1]}
    const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/${slug}?${window.location.href.split("?")[1]}`);
    const maindata = getMainData(data);
    return {
      success: true,
      JSON: maindata,
    }
  } catch (error: any) {
    return {
      success: false,
      error: String(error?.message) || String(error)
    }
  }
}


export const hasValue = (arr: any[], value: any) => {
  if (arr.indexOf(value) === -1) {
    return false
  } else {
    return true
  }
}