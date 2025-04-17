import Container from 'components/Container/Container';
import React from 'react';
import './Card.scss';
import { Cta } from 'components/Cta';

export default function Card({ title, content, date, onEdit, onDelete }) {
  return (
    <Container className='card'>
      {/* <h2>{title}</h2> */}
      <div className='col-span-2 rounded-md'>{content}</div>
      <div className='divider' />
      <div className='card__footer'>
        <div className='card__date'>
          <p>{date}</p>
        </div>
        <div className='card-actions'>
          <button className='action' onClick={onEdit}>
            Edit
          </button>
          <button className='action' onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </Container>
  );
}
