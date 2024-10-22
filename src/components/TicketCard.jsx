import React from 'react';

const TicketCard = ({ ticket,image1,image2 }) => (
  <div className="ticket-card">
    <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
    <p>{ticket.id}</p>
    <img src={image1}/>
    </div>
    <h3>{ticket.title}</h3>
    <div style={{display:'flex',flexDirection:'row',gap:'10px'}}>
    <img src={image2}/>
    <p className='ticket-tag'> ● {ticket.tag[0]}</p>
    </div>
  </div>
);

export default TicketCard;
