import { Container } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { LazyLoadImage } from "react-lazy-load-image-component";
import LoadImage from "../Images/loader.gif"

const Button = styled(Link)`
    display: none;
    text-decoration: none;
    font-size: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.card};
    background-color: white;
    border-radius: 5px;
    padding: 6px 12px;
    margin: 12px 0px 0px 0px;
    text-align: center;
    &:hover{
        cursor: pointer;
        filter: brightness(1.2);
    }
`

const Card = styled.div`
    max-width: 240px;
    flex-basis: auto;
    display: flex;
    flex-direction: column;
    transition: all 0.4s ease-in-out;
    width: 100%;
    text-decoration: none;
    border-radius: 10px;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.3);
    background-color: ${({ theme }) => theme.card};
    &:hover{
      cursor: pointer;
      transform: translateY(-8px);
      transition: all 0.4s ease-in-out;
      box-shadow: 0 0 18px 0 rgba(0, 0, 0, 0.8);
      filter: brightness(1.3);
    }
    &:hover ${Button}{
        display: block;
    }

`
const Top = styled.div`
    height: 220px;
    width: 100%;
    border-radius: 10px 10px 0 0;
    position: relative;
`
const Image = styled(LazyLoadImage)`
    height: 100%;
    border-radius: 10px;
    object-fit: cover;
    width: 100%;
    `
const Overlay = styled.div`
    height: 100%;
    width: 100%;
    border-radius: 10px;
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(6.74deg, #0E0D0D 12.73%, rgba(217, 217, 217, 0) 90.48%);
    `
const Details = styled.div`
    display: none;
    height: 55%;
    padding: 8px 20px 24px 20px;
    display: flex;
    gap: 2px;
    flex-direction: column;
`
const Title = styled.div`
    font-size: 22px;
    font-weight: 700;
    color: ${({ theme }) => theme.text_primary};
    position: absolute;
    bottom: 0;
    left: 0;
    margin: 0 18px 6px 18px;
    display: -webkit-box;
    max-width: 100%;
    -webkit-line-clamp: 1;
    line-height: 1.2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
`
const Subdata = styled.div`
    font-size: 10px;
    font-weight: 500;
    color: ${({ theme }) => theme.text_secondary};
`

const Description = styled.div`
    font-size: 12px;
    font-weight: 500;
    overflow: hidden;
    color: ${({ theme }) => theme.text_secondary + 90};
    display: -webkit-box;
    max-width: 100%;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
`



const ShowCard = ({ showData }) => {
    return (
        <Card>
            <Top>
                <Image src={showData?.image?.original}
                />
                <Overlay />
                <Title>{showData?.name}</Title>
            </Top>
            <Details>
                <Subdata></Subdata>
                <Subdata>{showData?.rating?.average} / 10 &nbsp;• {showData?.language} &nbsp;• {showData?.premiered}</Subdata>
                <Subdata>
                    •  {showData?.genres?.map((item) => (
                        <>{item} &nbsp; </>
                    ))}
                </Subdata>
                <Description style={{ marginTop: '2px' }}>{showData?.summary}</Description>
                <Button to={`/show/${showData?.id}`}>View</Button>
            </Details>
        </Card>
    )
}

export default ShowCard