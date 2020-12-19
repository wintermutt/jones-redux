export default function Title({text, color, backgroundColor}) {
  return (
    <>
      <h1>{text}</h1>

      <style jsx>{`
        h1 {
          font-size: 14px;
          color: ${color || 'white'};
          background-color: ${backgroundColor || 'rgba(0, 0, 0, 0.5)'};
          margin: 0;
          padding: 10px;
          flex-grow: 1;
          display: flex;
          align-items: center;
          text-align: center;
          justify-content: center;
        }
      `}</style>
    </>
  )
}