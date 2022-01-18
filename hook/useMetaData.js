// axios
import axios from 'axios'

// swr
import useSWR from 'swr'


// init fetcher
const fetcher = url => axios.get(url).then(res => res.data)


// init useMetaData
const useMetaData = () => {

    // make request to
    const { data, error } = useSWR(`${process.env.API_ROOT}/all/metadata`, fetcher)


    // return 
    return {
        metaDatas: data,
        isMetaLoading: !error && !data,
        isMetaError: error
    }
}



// export 
export default useMetaData