import * as Dialog from '@radix-ui/react-dialog';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  open: boolean;
};

const Modal = ({ children, open }: Props) => {
  const { push } = useRouter();
  return (
    <Dialog.Root
      open={open}
      onOpenChange={() => {
        push('/');
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 bg-blackA6 data-[state=open]:animate-overlayShow' />
        <Dialog.Content className='p-4 fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white  shadow-lg shadow-slate-300 focus:outline-none data-[state=open]:animate-contentShow'>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
