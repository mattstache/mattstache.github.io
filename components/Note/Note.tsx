import React from 'react';

import styles from './Note.module.scss';

interface INoteProps {
  message: string;
}

const Note = ({ message }: INoteProps) => {
  return (
    <>
      <div className={ styles.note }>
        { message }
      </div>
    </>
  );
};

export default Note;
