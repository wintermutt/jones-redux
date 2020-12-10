export default function Button({onClick, text}) {
  return (
    <>
      <button onClick={onClick}>
        {text}
      </button>

      <style jsx>{`
        button {
          position: relative;
          font-family: 'Press Start 2P';
          font-size: 10px;
          text-transform: uppercase;
          padding: 8px;
          background: green;
          color: rgb(204, 224, 204);
          border-width: 3px;
          border-color: rgb(129, 190, 129) rgb(59, 168, 59) rgb(59, 168, 59) rgb(129, 190, 129);
          outline: none;
        }

        button:before {
          content: '';
          position: absolute;
          top: -5px;
          left: -5px;
          bottom: -5px;
          right: -5px;
          border: 2px solid black;
        }

        button:active {
          filter: invert(100%)
        }
      `}</style>
    </>
  )
}