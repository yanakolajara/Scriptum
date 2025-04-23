import Container from 'components/Container/Container';
import React from 'react';
// import { Cta } from '@/components/CTA/CTA';
import { format, formatRelative, subDays } from 'date-fns';
import './Card.scss';
import { CTA } from '../CTA/CTA';

export default function Card({ title, content, date, onEdit, onDelete }) {
  const formattedDate = format(date, 'LLL dd, yyyy - hh:mmaaaa');

  return (
    <Container className='card'>
      {/* <h2>{title}</h2> */}
      <div className='card-content'>{content}</div>
      <div className='divider' />
      <div className='card__footer'>
        <div className='card__date'>
          <p>{formattedDate}</p>
        </div>
        <div className='card-actions'>
          <CTA onClick={onEdit} variant='base'>
            Edit
          </CTA>
          <CTA onClick={onDelete} variant='danger'>
            Delete
          </CTA>
        </div>
      </div>
    </Container>
  );
}
