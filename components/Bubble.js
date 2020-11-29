export default function Bubble({ text }) {
  return (
    <>
      <div className="bubble">
        {text}
        <div className="arrow"></div>
      </div>

      <style jsx>{`
        .bubble {
          position: absolute;
          bottom: 135px;
          right: 0;
          width: 240px;
          border: 1px solid rgb(116, 136, 132);
          border-radius: 10px;
          background: rgb(206, 235, 229);
          font-size: 0.9em;
          padding: 15px;
        }

        .arrow {
          position: absolute;
          bottom: -22px;
          right: 28px;
          border-left: 13px solid transparent;
          border-right: 13px solid transparent;
          border-top: 22px solid rgb(116, 136, 132);
        }

        .arrow:before {
          content: '';
          border-left: 12px solid transparent;
          border-right: 12px solid transparent;
          border-top: 21px solid rgb(206, 235, 229);
          position: absolute;
          bottom: 2px;
          right: -12px;
        }
      `}</style>
    </>
  )
}