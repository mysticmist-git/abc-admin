import { useState } from 'react';

export default (
  defaultIsOpen: boolean = false
): [boolean, () => void, () => void] => {
  const [isOpen, setIsOpen] = useState(defaultIsOpen);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return [isOpen, open, close];
};
