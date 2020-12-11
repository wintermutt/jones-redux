export default function Header({children}) {
  return (
    <>
      <div className="header">
        {children}
      </div>

      <style jsx>{`
        .header {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 102px;
          display: flex;
          border-bottom: 2px solid black;
        }
      `}</style>
    </>
  )
}