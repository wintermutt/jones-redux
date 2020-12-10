export default function ButtonRow({children}) {
  return (
    <>
      <div className="buttonRow">
        {children.map((c, i) => (
          c && <div className="button" key={i}>{c}</div>
        ))}
      </div>

      <style jsx>{`
        .buttonRow {
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          position: absolute;
          bottom: 0;
          transform: translateY(50%);
          right: 10px;
        }

        .button {
          margin-left: 10px;
        }
      `}</style>
    </>
  )
}