import useSWR from "swr"
import { fetcher } from "../utils"
import { UserType } from "@/types"

export function useUser (id: string) {
    const { data, error, isLoading } = useSWR<UserType>(`/api/user/${id}`, fetcher)
   
    return {
      user: data,
      isLoading,
      isError: error
    }
  }