import Button from '@/shared/components/CTA/CTA';
import { format } from 'date-fns';
import '../styles/Entry.scss';

export default function EntryCard({ data, handleEdit, handleDelete }) {
  const { entry_date: date, content, title, id, icon = '📝' } = data;
  const formattedDate = format(date, 'LLLL dd, yyyy');

  return (
    <div className={`entry`}>
      <section className='entry-metadata'>
        <article className='entry-metadata-info'>
          <p className='entry-metadata-info__date'>{formattedDate}</p>
          <p className='entry-metadata-info__title'>{title}</p>
        </article>
        <div className='entry-metadata-icon'>
          <span>{icon}</span>
        </div>
      </section>
      <section className='entry-content'>
        <p className='entry-content-text'>{content}</p>
      </section>
      <section className='entry-actions'>
        <button onClick={() => handleEdit(id)} className='btn btn-secondary'>
          <span>Edit</span>
        </button>
        <button onClick={() => handleDelete(id)} className='btn btn-danger'>
          <span>Delete</span>
        </button>
      </section>
    </div>
  );
}
