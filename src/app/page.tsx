'use client';
import Auth from '@/components/auth';
import Modal from '@/components/modal';
import { useSearchParams } from 'next/navigation';

export default function Page() {
  const searchParams = useSearchParams();

  const authQuery = searchParams.get('auth');
  return (
    <div>
      Main Body
      {/* auth modal */}
      <Modal open={!!authQuery}>
        <Auth />
      </Modal>
    </div>
  );
}
