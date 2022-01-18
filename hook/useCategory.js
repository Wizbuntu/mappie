// axios
import axios from 'axios'

// swr
import useSWR from 'swr'


// init fetcher
const fetcher = url => axios.get(url).then(res => res.data)


// init useCategories
const useCategories = () => {
    const { data, error } = useSWR(`${process.env.API_ROOT}/all/categories`, fetcher)

    return {
        categories: data,
        isLoading: !error && !data,
        isError: error
    }
}



// export 
export default useCategories