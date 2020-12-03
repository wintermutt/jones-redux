import { useSelector } from 'react-redux'

export default function Bubble() {
  const bubbleText = useSelector(state => state.game.ui.bubble)

  return (
    <>
      <div className="bubble">
        {bubbleText}
        <div className="arrow"></div>
      </div>

      <style jsx>{`
        .bubble {
          position: absolute;
          bottom: 135px;
          right: 0;
          width: 270px;
          color: rgb(42, 54, 51);
          border: 2px solid rgb(116, 136, 132);
          border-radius: 10px;
          background: rgb(206, 235, 229);
          font-size: 10px;
          line-height: 170%;
          padding: 15px;
          white-space: pre-wrap;
        }

        .arrow {
          position: absolute;
          bottom: -23px;
          right: 28px;
          border-left: 14px solid transparent;
          border-right: 14px solid transparent;
          border-top: 22px solid rgb(116, 136, 132);
        }

        .arrow:before {
          content: '';
          position: absolute;
          bottom: 3px;
          right: -12px;
          border-left: 12px solid transparent;
          border-right: 12px solid transparent;
          border-top: 21px solid rgb(206, 235, 229);
        }
      `}</style>
    </>
  )
}