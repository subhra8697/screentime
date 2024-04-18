import { SearchRounded } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getAllShows, searchShows } from '../api/index'
import ShowCard from '../components/ShowCard';
import { CircularProgress, getPaginationItemUtilityClass } from '@mui/material';
import SimpleImageSlider from "react-simple-image-slider";
import Icon from "../Images/Icon.png"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  display: flex;
  transition: all 0.4s ease-in-out;
  flex-direction: column;
`
const Loader = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Logo = styled.div`
  width: 95%;
  font-size: 32px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  gap 12px;
  padding: 12px;
`

const Top = styled.div` 
  width: 100%;
`
const ImageSlider = styled(SimpleImageSlider)`
  height: 100%;
  width: 100%;
`

const Body = styled.div`
  padding: 2% 4%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 768px) {
    padding: 5% 10%;
  }
`
const SearchBar = styled.div`
  width: 100%;
  max-width: 700px;
  display: flex;
  align-items: center;
  border-radius: 100px;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  gap: 10px;
  color: ${({ theme }) => theme.text_secondary};
  padding: 12px 30px;
  font-size: 28px;
  @media (max-width: 768px) {
    font-size: 22px;  
    padding: 10px 20px;
    gap: 8px;
  }
`

const Search = styled.input`
  height: 100%;
  width: 100%;
  border: none;
  font-size: 20px !important;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary};
  background-color: transparent;
  outline: none;
  @media (max-width: 768px) {
    font-size: 16px !important;
  }
  `

const ShowWrapper = styled.div`
  width: fit-content;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-content: flex-start;
  margin: 0;
  justify-content: center;
  padding: 40px 0;
  `

const Home = () => {

  // hooks for shows
  const [shows, setShows] = useState([])
  const [loading, setLoading] = useState(false)
  const [innerLoading, setInnerLoading] = useState(false);

  const [search, setSearch] = useState("");

  const searchShow = async (e) => {
    setInnerLoading(true);
    setSearch(e.target.value)
    console.log(e.target.value)
    await searchShows(search).then((res) => {
      setShows(res.data)
      setInnerLoading(false)
    }).catch((err) => {
      console.log(err)
      setInnerLoading(false)
    })
    if (e.target.value === "") {
      getShow()
    }
  }

  const getShow = () => {

    setLoading(true)
    getAllShows().then((res) => {
      setShows(res.data)
      setLoading(false)
    }).catch((err) => {
      console.log(err)
    })
  }

  // const getMostPopularShows = async () => {
  //   await getAllShows().then((res) => {
  //     //push images to images array
  //     let data = res.data
  //     let imgList = images
  //     for(let i=0;i<10;i++)
  //     {
  //       imgList[i] = {url: data?.image?.original}
  //       setImages(imgList)
  //     }
  //     console.log(imgList)
  //   }).catch((err) => {
  //     console.log(err)
  //   })
  // }

  useEffect(() => {
    // getMostPopularShows()
    getShow()
  }, [])

  return (
    <Container>
      {loading ?
        <Loader>
          <CircularProgress />
        </Loader>
        :
        <>
          <Logo>
            <img src={Icon} style={{width: '32px', height: '32px'}}/>
            ScreenTime
          </Logo>
          <Top>
            {/* <ImageSlider
              width="100%"
              height={400}
              images={images}
              showBullets={true}
              showNavs={true}
              autoplay={true}
            /> */}
          </Top>
          <Body>
            <SearchBar>
              <SearchRounded sx={{ color: 'inherit', fontSize: 'inherit' }} />
              <Search placeholder="Search Tv shows ..." value={search} onChange={(e) => searchShow(e)} />
            </SearchBar>
            <>
              {search === "" ?
                <ShowWrapper
                >
                  {
                    shows.map((show, id) => {
                      return (
                        <ShowCard showData={show} />
                      )
                    }
                    )
                  }
                </ShowWrapper>
                :
                <ShowWrapper
                >
                  {innerLoading ?
                    <Loader>
                      <CircularProgress />
                    </Loader>
                    : <>
                      {
                        shows.map((show, id) => {
                          return (
                            <ShowCard showData={show?.show} />
                          )
                        }
                        )
                      }
                    </>
                  }
                </ShowWrapper>
              }
            </>
          </Body>
        </>
      }
    </Container>
  )
}

export default Home