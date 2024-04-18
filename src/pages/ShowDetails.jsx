import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { getShowDetails } from '../api'
import { CircularProgress } from '@mui/material'
const Container = styled.div`
display: flex;
flex-direction: column;
height: 100%;
width: 100%;
overflow-y: scroll;
display: flex;
flex-direction: column;
transition: all 0.4s ease-in-out;
`

const Loader = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 10%;
`
const Overlay = styled.div`
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;background: linear-gradient(27.64deg, #0E0D0D 16.08%, rgba(217, 217, 217, 0) 86.29%);
    `

const Details = styled.div`
    max-width: 1000px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;
    position: absolute;
    bottom: 0;
    left: 0;
    gap: 20px;
    @media (max-width: 768px) {
        padding: 10px;
        gap: 10px;
    }

    `

const Name = styled.div`
    font-size: 52px;
    font-weight: 700;
    color: ${({ theme }) => theme.text_primary};
    @media (max-width: 768px) {
        font-size: 36px;
    }
`
const Subdata = styled.div`
    display: flex;
    font-size: 18px;
    font-weight: 400;
    gap: 20px;
    color: ${({ theme }) => theme.text_secondary};
    @media (max-width: 768px) {
        font-size: 12px;
    }
`
const Description = styled.div`
    font-size: 18px;
    font-weight: 400;
    color: ${({ theme }) => theme.text_secondary};
    @media (max-width: 768px) {
      font-size: 12px;
    `

const BookTicket = styled.button`
    width: 100%;
    margin: 12px 0px;
    max-width: 350px;
    height: 60px;
    border-radius: 10px;
    background-color: white;
    color: #1e1f21;
    font-size: 20px;
    font-weight: 700;
    border: none;
    cursor: pointer;
    `

const ShowDetails = ({setOpenBooking}) => {

  //hooks
  const { id } = useParams()
  const [show, setShow] = useState(null)
  const [loading, setLoading] = useState(null)

  useEffect(() => {
    setLoading(true)
    getShowDetails(id).then((res) => {
      setShow(res.data)
      setLoading(false)
    }
    ).catch((error) => {
      console.log(error)
    }
    )
  }, [id])

  return (
    <Container>
      {loading ?
        <Loader>
        <CircularProgress />
        </Loader>
        : (
          <Wrapper>
            <Image src={show?.image?.original} />
            <Overlay />
            <Details>
              <Name>{show?.name}</Name>
              <div>
                <Subdata>
                  <div>• {show?.rating?.average} / 10</div>
                  <div>• {show?.status}</div>
                  <div>• {show?.runtime} Min</div>
                  <div>• {show?.premiered}</div>
                </Subdata>
                <Subdata>
                  <div>• {show?.language}</div>
                  <div>• {show?.genres?.join(', ')}</div>
                  <div>• {show?.type}</div>
                </Subdata>
              </div>
              <Description>{show?.summary}</Description>
              <BookTicket onClick={()=> setOpenBooking({state:true, id: id}) }>Book Ticket</BookTicket>
            </Details>
          </Wrapper>
        )}
    </Container>
  )
}

export default ShowDetails