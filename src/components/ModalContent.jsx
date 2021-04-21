import React from 'react';

export default function ModalContent({ title, message }) {
  return (
    <div>
      <div>{title}</div>
      <div>{message}</div>
    </div>
  );
}
