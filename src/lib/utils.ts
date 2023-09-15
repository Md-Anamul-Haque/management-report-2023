import axios from "axios"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


const getMainData = (res_data: { items?: { data: string }[] }) => {

  const { items = [] } = res_data
  const { data = '' } = items?.[0];
  return JSON.parse(data)
}

export const getData = async (slug: String) => {
  try {//?${window.location.href.split("?")[1]}
    const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/daily_statement?p_oc=30303031&p_fund_id=F-1&p_from_date=01/01/2023&p_to_date=10/01/2023&p_trans_type=PUR`);
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