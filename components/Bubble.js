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
          width: 270px;
          color: rgb(42, 54, 51);
          border: 1px solid rgb(116, 136, 132);
          border-radius: 10px;
          background: rgb(206, 235, 229);
          font-size: 10px;
          line-height: 170%;
          padding: 15px;
          white-space: pre-wrap;
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