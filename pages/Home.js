//react
import { useState, useMemo, useEffect } from 'react'
// style
import style from "../styles/Home.module.css"
// layout
import Layout from "../components/Layout"

// link
import Link from "next/link";

// Head
import Head from "next/head"

// dynamic
import dynamic from "next/dynamic"

// metaData
// import metaDatas from '../data/metadata.json'

// categories
// import categories from '../data/categories.json'

// useCategories
import useCategories from '../hook/useCategory';


// useMetaData
import useMetaData from '../hook/useMetaData';


//Home function
function Home() {

    // invoke useCategories
    const { categories, isLoading, isError } = useCategories()

    // invoke useMetaData
    const { metaDatas, isMetaLoading, isMetaError } = useMetaData()

    console.log("Categories", categories)
    console.log("Metadata", metaDatas)


    // dynamically load map component
    const MapDisplay = useMemo(() => dynamic(() => import("../components/MapDisplay"), {
        loading: () => <p>Loading...</p>,
        ssr: false,
    }), []);


    // init useEffect
    useEffect(() => {
        // check if error
        if (isError) {
            console.log("An error has occurred")
        }
    }, [])



    // init filteredMetaData state
    const [filteredMetaData, setFilteredMetaData] = useState([])


    // init sortMetaData
    const sortMetaData = (categoryId) => {

        // check if metaDatas
        if (metaDatas && metaDatas.data) {

            // copy metaDatas
            const _metaDatas = [...metaDatas.data]

            
            // filter metadata by categoryId
            const categoryMetaData = _metaDatas.filter((data) => data.categoryId === categoryId)


            // reduce categoryMetada into groups 
            const _filteredMetaData = Object.values(categoryMetaData.reduce((prev, { country, latitude, longitude, categoryName, ...props }) => {

                // check if country is not a key in previous object
                if (!prev[country]) {

                    // init newObject
                    const newObject = { country, latitude, longitude, categoryName, _meta: [props], _metaTotal: [props].length }

                    // use country as key in previous object and pass in newObject
                    prev[country] = newObject

                } else {

                    // if country is a key in previous object, if yes, then push all data (props) into _meta array
                    prev[country]._meta.push(props)

                    // then update _metaTotal by getting the length of previous _meta
                    prev[country]._metaTotal = prev[country]._meta.length

                }

                // return prev object, to iterate again
                return prev
            }, {}))

            console.log(_filteredMetaData)

            // update filteredMeta state
            setFilteredMetaData(_filteredMetaData)

        }

    }



    return (
        <div>

            <Layout>
                {/* overall wrapper */}
                <main>
                    <section className="section section-header text-dark pb-md-5 pt-5">
                        <div className="container pt-4 pb-5">
                            <div className="row justify-content-center">
                                <div className="col-12 col-md-10 text-center ">
                                    <h1 className="display-3 font-weight-bolder mb-4">
                                        Best Crypto &amp; Blockchain Media In Africa
                                    </h1>
                                    <p className="lead mb-4 mb-lg-5 lh-3">We stand as a Blockchain and Crypto authority,
                                        and one of Africa&apos;s most influential Blockchain
                                        and Crypto media and consultancy firm,
                                        based in Nairobi, Kenya. We are the go-to entry
                                        point of all matters blockchain in Africa for
                                        both our audiences and clients.</p>

                                </div>
                            </div>
                            {isLoading ? <>
                                <div className="container py-5">
                                    <div className="d-flex justify-content-center">
                                        <div className="spinner-border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>

                                    </div>
                                    <p className="text-center mt-3">Loading...</p>
                                </div>
                            </> : <>
                                <div className="row mt-4">
                                    <div className="col-12 col-md-5 justify-content-md-center pe-1 ps-1 ps-md-1">
                                        <div>

                                            <div className={style.leftcard_bottom} style={{ paddingTop: 10 }}>
                                                <label className="text-dark">Crypto Stats</label>
                                                <br />
                                                {categories && categories.data && [...categories.data].map((category, index) => {
                                                    return <div key={index} className={style.leftcard_cards} style={{ cursor: "pointer" }} onClick={() => sortMetaData(category._id)}>
                                                        <div >{category.title}</div>
                                                        <div className={style.spotter}>

                                                            <div><img src="/arrow.svg" alt="decking"></img></div>
                                                        </div>
                                                    </div>
                                                })}

                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-12 col-md-7 ps-1 ps-md-0 pe-1 mt-3 mt-md-0">

                                        <MapDisplay metaDataList={filteredMetaData} />

                                    </div>
                                </div>
                            </>
                            }
                        </div>
                    </section>
                </main>
            </Layout>
        </div>
    )

}

export default Home;