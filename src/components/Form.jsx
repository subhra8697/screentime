import { CloseRounded, Description } from '@mui/icons-material';
import { Modal } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { getShowDetails } from '../api';


const Container = styled.div`
width: 100%;
height: 100%;
position: absolute;
top: 0;
left: 0;
background-color: #000000a7;
display: flex;
align-items: top;
justify-content: center;
overflow-y: scroll;
transition: all 0.5s ease;
`;

const Wrapper = styled.div`
max-width: 600px;
width: 100%;
border-radius: 16px;
margin: 50px 20px;
height: min-content;
background-color: ${({ theme }) => theme.card};
color: ${({ theme }) => theme.text_primary};
padding: 10px;
display: flex;
flex-direction: column;
position: relative;
padding: 10px;
`;

const Title = styled.div`
  font-size: 22px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
  margin: 12px 20px;
`;

const MovieDetails = styled.div`
    display: flex;
    align-items: center;
    margin: 12px 20px;
`;

const Image = styled.img`
    height: 100px;
    width: 100px;
    border-radius: 8px;
    object-fit: cover;
`;

const Details = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-left: 12px;
`;

const Name = styled.div`
    font-size: 16px;
    font-weight: 500;
`;

const Desc = styled.div`
    font-size: 14px;
    font-weight: 400;
    color: ${({ theme }) => theme.text_secondary};
    display: -webkit-box;
    max-width: 100%;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const Flex = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0px 20px;
`;

const OutlinedBox = styled.div`
  min-height: 48px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  color: ${({ theme }) => theme.text_secondary};
  ${({ googleButton, theme }) =>
        googleButton &&
        `
    user-select: none; 
  gap: 16px;`}
  ${({ button, theme }) =>
        button &&
        `
    user-select: none; 
  border: none;
    font-weight: 600;
    font-size: 16px;
    background: ${theme.button};
    color:'${theme.bg}';`}
    ${({ activeButton, theme }) =>
        activeButton &&
        `
    user-select: none; 
  border: none;
    background: ${theme.primary};
    color: white;`}
  margin: 3px 20px;
  font-weight: 600;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 14px;
`;

const TextInput = styled.input`
width: 100%;
border: none;
font-size: 14px;
border-radius: 3px;
background-color: transparent;
outline: none;
color: ${({ theme }) => theme.text_secondary};
`;



const Form = ({ openBooking, setOpenBooking }) => {

    //hooks
    const [movie, setMovie] = useState(null)
    const [bookTicket, setBookTicket] = useState(null)
    const [bookings, setBookings] = useState([])

    const closeModal = () => {
        setOpenBooking({ state: false, id: null })
    }

    useEffect(() => {
        setBookings(localStorage.getItem("tickets"))
        getShowDetails(openBooking.id).then((res) => {
            setMovie(res.data)
            // setBookTicket({...bookTicket,
            //     movieId: res.data.id,
            //     movieName: res.data.name,
            // })
        }
        ).catch((err) => {
            console.log(err)
        })
    }, [openBooking])


    //book ticket
    const BookTicket = () => {
        let ticketList = bookings 
        console.log(ticketList)
        console.log(bookTicket)
        localStorage.setItem("tickets", JSON.stringify(ticketList))
        closeModal();
    }

    return (

        <Modal open={true} onClose={() => closeModal()}
        >
            <Container>
                <Wrapper>
                    <CloseRounded
                        style={{
                            position: "absolute",
                            top: "20px",
                            right: "20px",
                            cursor: "pointer",
                        }}
                        onClick={() => closeModal()}
                    />
                    <Title>Book Ticket</Title>
                    <MovieDetails>
                        <Image src={movie?.image?.original} />
                        <Details>
                            <Name>{movie?.name}</Name>
                            <Desc>{movie?.summary}</Desc>
                        </Details>
                    </MovieDetails>
                    <Title style={{ fontSize: '16px', marginBottom: '0px' }}>Your Details</Title>
                    <FormWrapper>
                        <OutlinedBox style={{ marginTop: "12px" }}>
                            <TextInput
                                placeholder="Your Name*"
                                type="text"
                                value={bookTicket?.name}
                                required={true}
                                onChange={(e) => setBookTicket({ ...bookTicket, name: e.target.value })}
                            />
                        </OutlinedBox>
                        <Flex>
                        <OutlinedBox style={{margin:0,width:'100%'}}>
                            <TextInput
                                placeholder="Date"
                                type="date"
                                value={bookTicket?.date}
                                required={true}
                                onChange={(e) => setBookTicket({ ...bookTicket, date: e.target.value })}
                            />
                        </OutlinedBox>
                        <OutlinedBox style={{margin:0,width:'100%'}}>
                            <TextInput
                                placeholder="Time"
                                type="time"
                                required={true}
                                value={bookTicket?.time}
                                onChange={(e) => setBookTicket({ ...bookTicket, time: e.target.value })}
                            />
                        </OutlinedBox>
                        </Flex>
                        <OutlinedBox
                            style={{ margin: "12px 20px 20px 20px" }}
                            button={true}
                            activeButton={true}
                            onClick={() => 
                                BookTicket()
                            }
                        >
                                Book
                        </OutlinedBox>

                    </FormWrapper>
                </Wrapper>
            </Container>
        </Modal>
    )
}

export default Form