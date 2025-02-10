const loading = () => {
  return (
    <>
      <div className="flex items-center justify-center h-screen w-full overflow-hidden">
        <div className="w-40 flex gap-4 items-center justify-center">
          <img src="/favicon.ico" className="animate-spin" />
          <img src="/webName.png" />
        </div>
      </div>
    </>
  );
};

export default loading;
