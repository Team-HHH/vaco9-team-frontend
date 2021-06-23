import { parseISO } from 'date-fns';

const customizeGraphAxisTick = ({ x, y, payload }) => {
  const dateTip = parseISO(payload.value).toDateString();
  const formattedDate = `${dateTip.slice(4, 7)}, ${dateTip.slice(8, 10)}`;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={23}
        y={0}
        dy={14}
        fontSize="0.90em"
        fontFamily="bold"
        textAnchor="end"
        fill="#363636"
      >
        {formattedDate}
      </text>
    </g>
  );
};

export default customizeGraphAxisTick;
