export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-top p-24 '>
      <h1 className='text-6xl font-medium tracking-wider mt-6 text-slate-50'>TabsFlow</h1>
      <p className='mt-1.5 text-lg font-extralight text-slate-100'>Manage Tabs Like a Pro!!</p>
      <p className='mt-8 text-lg text-slate-300/90 font-extralight'>Coming Soon...</p>

      <a href='mailto:manish@tabsflow.com' className='mt-1.5  text-lg text-slate-400 font-extralight'>
        manish@tabsflow.com
      </a>

      <div className='fixed bottom-6  text-lg text-slate-500/90 font-extralight'>
        Made with ❤️ by{' '}
        <a href='mailto:manish@tabsflow.com' className='underline'>
          manishmandal.com
        </a>
      </div>
    </main>
  );
}
